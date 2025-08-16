import { Post } from "./Post";
import { render, screen, within, act } from "@testing-library/react";
import { vi } from "vitest";
import * as DataService from "./DataService";

// vi.mock("./DataService", () => ({
//   getCommentsForPost: () => {
//     console.log("calling comments for post");
//     return [{ content: "comment 1" }, { content: "comment 2" }];
//   },
// }));

describe("Post tests with mock", () => {
  it("should load initial comments", async () => {
    const getCommentsForPostSpy = vi.spyOn(DataService, "getCommentsForPost");
    getCommentsForPostSpy.mockResolvedValueOnce([
      { content: "comment 1" },
      { content: "comment 2" },
    ]);
    await act(async () => {
      render(
        <Post
          content='comment 3'
          id='123'
          user='Pravin'
        />
      );
    });

    const commentContainer = screen.getByTestId("post-comment-container");
    const comments = within(commentContainer).getAllByRole("paragraph");
    expect(comments.length).toBe(2);
    expect(comments[0]).toHaveTextContent("comment 1");
    expect(comments[1]).toHaveTextContent("comment 2");

    expect(getCommentsForPostSpy).toHaveBeenCalledOnce();
    expect(getCommentsForPostSpy).toHaveBeenCalledWith("123");
  });
});
