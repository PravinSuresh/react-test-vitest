import { Post } from "./Post";
import { render, screen, within, act } from "@testing-library/react";
import axios from "axios";
import type { Comment } from "./Model";

describe("Post tests with mocks", () => {
  const someUserName = "test user";
  const someContent = "test content...";
  const someId = "test-id";
  const someComments: Comment[] = [{ content: "cool1" }, { content: "cool2" }];

  it("should load received comments", async () => {
    const axiosSpy = vi.spyOn(axios, "get");
    axiosSpy.mockResolvedValueOnce({
      data: someComments,
    });
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

  it("should call service to load comments", async () => {
    const axiosSpy = vi.spyOn(axios, "get");
    axiosSpy.mockResolvedValueOnce({
      data: someComments,
    });
    await act(async () => {
      render(
        <Post
          user={someUserName}
          content={someContent}
          id={someId}
        ></Post>
      );
    });

    expect(axiosSpy).toHaveBeenCalledOnce();
    console.log(axiosSpy.mock.calls[0]);
    const axiosGetSpyCallUrl = axiosSpy.mock.calls[0][0];
    expect(axiosGetSpyCallUrl.endsWith(someId)).toBe(true);
    const axiosGetSpyCallId = axiosSpy.mock.calls[0][1]?.params.id;
    expect(axiosGetSpyCallId).toBe(someId);
  });

  test("Network call throwing error", async () => {
    const axiosSpy = vi.spyOn(axios, "get");
    axiosSpy.mockRejectedValueOnce(new Error("Backend error"));
    await act(async () => {
      render(
        <Post
          user={someUserName}
          content={someContent}
          id={someId}
        ></Post>
      );
    });

    const errorLabel = screen.getByTestId("error-label");
    expect(errorLabel).not.toBeEmptyDOMElement();
  });
});
