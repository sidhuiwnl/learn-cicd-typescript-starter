import { getAPIKey } from "../../../src/api/auth";
import { IncomingHttpHeaders } from "http";
import { describe, test, expect } from "vitest";

describe("getAPIKey – failing edge cases", () => {

  test("fails when ApiKey has extra spaces before the key", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey    my-secret-key",
    };

    // Expected behavior (robust parsing)
    expect(getAPIKey(headers)).toBe("my-secret-key");
  });

  test("fails when ApiKey has only spaces and no key", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey   ",
    };

    // Empty key should be treated as invalid
    expect(getAPIKey(headers)).toBeNull();
  });

  test("fails when scheme is lowercase apikey", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "apikey my-secret-key",
    };

    // Auth schemes are usually case-insensitive
    expect(getAPIKey(headers)).toBe("my-secret-key");
  });

  test("fails when authorization header has leading whitespace", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "   ApiKey my-secret-key",
    };

    // Leading whitespace should not break parsing
    expect(getAPIKey(headers)).toBe("my-secret-key");
  });

});
