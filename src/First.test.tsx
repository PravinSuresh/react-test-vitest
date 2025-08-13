import { First } from "./First";

import { render, screen } from "@testing-library/react";

describe("First tests", () => {
  it("should render the component", () => {
    render(<First />);
    expect(true).toBeTruthy();

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
  });
});
