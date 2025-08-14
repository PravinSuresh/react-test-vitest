import { renderHook, act } from "@testing-library/react";
import { useArray } from "./useArray";

describe("UseArray hook test suite", () => {
  describe("useArray with numbers", () => {
    it("should contain initial array", () => {
      const initialArray = [1, 2, 3, 4, 5];
      const renderResult = renderHook(() => useArray(initialArray));
      expect(renderResult.result.current.array).toEqual(initialArray);
    });

    it("should add new elements to array", () => {
      const initialArray = [1, 2, 3, 4, 5];
      const renderResult = renderHook(() => useArray(initialArray));
      act(() => {
        renderResult.result.current.push(12);
      });
      expect(renderResult.result.current.array).toEqual([...initialArray, 12]);
    });
  });

  describe("useArray with string", () => {
    it("should filter elements which do not contain uppercase", () => {
      const initialArray = ["apple", "Mango", "grapes"];
      const renderResult = renderHook(() => useArray(initialArray));
      act(() => {
        renderResult.result.current.filter(
          (str) => str[0] !== str[0].toUpperCase()
        );
      });
      expect(renderResult.result.current.array).toEqual(["apple", "grapes"]);
    });
  });
});
