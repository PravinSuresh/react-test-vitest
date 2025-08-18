import { Post } from "./Post";
import { render, screen, within, act } from "@testing-library/react";
import type { Comment } from "./Model";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";

describe("Post tests with mocks", () => {
  const someUserName = "test user";
  const someContent = "test content...";
  const someId = "test-id";
  const someComments: Comment[] = [{ content: "cool1" }, { content: "cool2" }];
  const server = setupServer(
    http.get("http://localhost:4000/comments/*", () => {
      return HttpResponse.json(someComments);
    })
  );

  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterAll(() => server.resetHandlers());

  it("should load received comments", async () => {
    await act(async () => {
      render(
        <Post
          user={someUserName}
          content={someContent}
          id={someId}
        ></Post>
      );
    });

    screen.debug();

    const commentsContainer = screen.getByTestId("post-comment-container");
    const comments = within(commentsContainer).getAllByRole("paragraph");
    expect(comments.length).toBe(2);
    expect(comments[0]).toHaveTextContent(someComments[0].content);
    expect(comments[1]).toHaveTextContent(someComments[1].content);
  });
});
