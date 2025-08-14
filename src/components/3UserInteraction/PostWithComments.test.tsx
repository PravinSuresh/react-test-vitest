import { render, screen, within } from "@testing-library/react";
import { PostWithComment } from "./PostWithComments";
import { beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";

describe("PostWithComment test suite", () => {
  describe("user interaction", () => {
    const content = "some content";
    const user = "Some User";

    beforeEach(() => {
      render(
        <PostWithComment
          content={content}
          user={user}
        />
      );
    });

    test("if user can comment", async () => {
      const user = userEvent.setup();
      const commentInput = screen.getByTestId("comment-input");
      const commentContent = "You are a Front end engineer";
      await user.type(commentInput, commentContent);
      expect(commentInput).toHaveValue(commentContent);
    });

    test("if comment area is cleared on click", async () => {
      const user = userEvent.setup();
      const commentInput = screen.getByTestId("comment-input");
      const button = screen.getByRole("button");
      await user.click(button);
      expect(commentInput).toBeEmptyDOMElement();
    });

    test("if comment is added and visible on the screen on button click", async () => {
      const user = userEvent.setup();
      const commentInput = screen.getByTestId("comment-input");
      const commentContent = "Pravin does not give up";

      await user.type(commentInput, commentContent);

      const button = screen.getByRole("button");
      await user.click(button);

      const commentSection = screen.getByTestId("post-comment-container");
      const para = within(commentSection).getAllByRole("paragraph");
      expect(para.length).toBe(1);
      expect(para[0]).toHaveTextContent(commentContent);
    });
  });
});
