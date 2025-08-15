import { render, screen, within } from "@testing-library/react";
import { ShoppingList2 } from "./ShoppingList2";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("ShoppingList2 test suite", () => {
  describe("working scenario", () => {
    const groceries = ["apple", "orange"];
    const selectItem = vi.fn();

    it("should render the component", () => {
      render(
        <ShoppingList2
          groceries={groceries}
          selectItem={selectItem}
        />
      );
      const shoppinglist = screen.getByTestId("shopping-list-2");
      expect(shoppinglist).toBeInTheDocument();
      const items = within(shoppinglist).getAllByRole("listitem");
      expect(items.length).toEqual(groceries.length);
      expect(items[0]).toHaveTextContent(groceries[0]);
      expect(items[0]).toHaveStyle("textDecoration: none");
    });

    it("should render component and on click should strike the item", async () => {
      render(
        <ShoppingList2
          groceries={groceries}
          selectItem={selectItem}
        />
      );
      const shoppinglist = screen.getByTestId("shopping-list-2");
      const items = within(shoppinglist).getAllByRole("listitem");
      const user = userEvent.setup();
      await user.click(items[0]);
      expect(items[0]).toHaveTextContent(groceries[0]);
      expect(items[0]).toHaveStyle("textDecoration: line-through");
      expect(items[1]).toHaveStyle("textDecoration: none");
    });

    it("should strike the item on first click and unstrike on next click on the same item", async () => {
      render(
        <ShoppingList2
          groceries={groceries}
          selectItem={selectItem}
        />
      );
      const shoppinglist = screen.getByTestId("shopping-list-2");
      const items = within(shoppinglist).getAllByRole("listitem");
      const user = userEvent.setup();
      await user.click(items[0]);
      expect(items[0]).toHaveTextContent(groceries[0]);
      expect(items[0]).toHaveStyle("textDecoration: line-through");
      await user.click(items[0]);
      expect(items[0]).toHaveStyle("textDecoration: none");
    });
  });

  describe("error scenario", () => {
    const props = {
      groceries: ["apple", "apple"],
      selectItem: vi.fn(),
    };

    it("should throw error in the page", () => {
      render(<ShoppingList2 {...props} />);
      const errorElement = screen.getByTestId("error-message");
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent(/duplicate/);
      expect(errorElement).toHaveStyle("color: rgb(255, 0, 0)");
    });
  });
});
