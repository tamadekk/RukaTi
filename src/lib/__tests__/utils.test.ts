import { describe, it, expect } from "bun:test";
import { checkHasChanges } from "../utils";

describe("checkHasChanges", () => {
  it("returns false when no values changed", () => {
    const formData = { name: "Alice", bio: "hello" };
    const originalData = { name: "Alice", bio: "hello" };
    expect(checkHasChanges(formData, originalData, ["name", "bio"])).toBe(
      false,
    );
  });

  it("returns true when a checked key has changed", () => {
    const formData = { name: "Bob", bio: "hello" };
    const originalData = { name: "Alice", bio: "hello" };
    expect(checkHasChanges(formData, originalData, ["name"])).toBe(true);
  });

  it("returns false when only an unchecked key changed", () => {
    const formData = { name: "Alice", bio: "updated" };
    const originalData = { name: "Alice", bio: "original" };
    expect(checkHasChanges(formData, originalData, ["name"])).toBe(false);
  });

  it("returns false when originalData is null", () => {
    const formData = { name: "Alice" };
    expect(checkHasChanges(formData, null, ["name"])).toBe(false);
  });

  it("returns false when originalData is undefined", () => {
    const formData = { name: "Alice" };
    expect(checkHasChanges(formData, undefined, ["name"])).toBe(false);
  });

  it("treats null formData value as empty string for comparison", () => {
    const formData = { bio: null as unknown as string };
    const originalData = { bio: "" };
    expect(checkHasChanges(formData, originalData, ["bio"])).toBe(false);
  });

  it("detects change when formData value is null and original is non-empty", () => {
    const formData = { bio: null as unknown as string };
    const originalData = { bio: "some text" };
    expect(checkHasChanges(formData, originalData, ["bio"])).toBe(true);
  });

  it("returns false when keys array is empty", () => {
    const formData = { name: "Alice" };
    const originalData = { name: "Bob" };
    expect(checkHasChanges(formData, originalData, [])).toBe(false);
  });
});
