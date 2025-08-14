import { render, screen, within } from "@testing-library/react";
import { SimplePost } from "./SimplePost";

describe("SimplePost test suite", () => {
  it("should be rendered in the document - no likes", () => {
    const name = "Someone";
    const content = "Some content";
    render(
      <SimplePost
        user={name}
        content={content}
      />
    );
    // screen.debug();
    const postContainer = screen.getByTestId("post-container");
    expect(postContainer).toBeInTheDocument();

    const user = screen.getByRole("heading");
    expect(user).toHaveTextContent(name);

    const paragraph = screen.getByRole("paragraph");
    expect(paragraph).toHaveTextContent(content);

    const likeList = screen.queryByRole("list");
    expect(likeList).not.toBeInTheDocument();
  });
  it("should be rendered in the document - likes", () => {
    const name = "Someone";
    const content = "Some content";
    const likesBy = ["Mary", "Tom"];
    render(
      <SimplePost
        user={name}
        content={content}
        likesBy={likesBy}
      />
    );

    const likeList = screen.getByTestId("likes-container");
    expect(likeList).toBeInTheDocument();

    const likes = within(likeList).getAllByRole("listitem");
    expect(likes).toHaveLength(likesBy.length);
    expect(likes[0]).toHaveTextContent(likesBy[0]);
    expect(likes[1]).toHaveTextContent(likesBy[1]);
  });
});
