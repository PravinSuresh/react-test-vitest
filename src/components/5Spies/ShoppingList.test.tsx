import { render, screen, within } from "@testing-library/react";
import { ShoppingList } from "./ShoppingList";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import * as Utils from "./Utils";

describe("Shopping List Test Suite", () => {
  const ingredients = ["milk", "bread", "chicken"];

  it("should select ingredients - external and date spy", async () => {
    const onItemSelectSpy = vi.spyOn(Utils, "onItemSelect");

    render(
      <ShoppingList
        groceries={ingredients}
        selectItem={Utils.onItemSelect}
      />
    );

    const user = userEvent.setup();

    const shoppingList = screen.getByRole("list");
    expect(shoppingList).toBeInTheDocument();
    const ingredientItems = within(shoppingList).getAllByRole("listitem");
    expect(ingredientItems).toHaveLength(3);
    const milkIngredient = ingredientItems[0];
    await user.click(milkIngredient);
    expect(onItemSelectSpy).toHaveBeenCalledWith("milk");
  });

  it("should select ingredients - local spy", async () => {
    const onItemSelectSpy = vi.spyOn(Utils, "onItemSelectWithTime");
    const dateSpy = vi.spyOn(Date, "now");

    render(
      <ShoppingList
        groceries={ingredients}
        selectItem={Utils.onItemSelectWithTime}
      />
    );

    const user = userEvent.setup();

    const shoppingList = screen.getByRole("list");
    expect(shoppingList).toBeInTheDocument();
    const ingredientItems = within(shoppingList).getAllByRole("listitem");
    expect(ingredientItems).toHaveLength(3);
    const milkIngredient = ingredientItems[0];
    await user.click(milkIngredient);
    expect(onItemSelectSpy).toHaveBeenCalledWith("milk");
    expect(dateSpy).toHaveBeenCalled();
  });
});
