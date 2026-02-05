import { getAPIKey } from "../../../src/api/auth"
import { IncomingHttpHeaders } from "http";
import { describe, test, expect } from "vitest"

describe("getApiKey", () => {

    test("return null when authorixation header is missing", () => {
        const headers: IncomingHttpHeaders = {}
        expect(getAPIKey(headers)).toBeNull();
    })

    test("returns null when the schema is not Apikey", () => {
        const headers: IncomingHttpHeaders = {
            authorization: "Bearer abc123"
        }
        expect(getAPIKey(headers)).toBeNull();

    })

    test("returns null when ApiKey has no value", () => {
        const headers: IncomingHttpHeaders = {
            authorization: "ApiKey",
        };
        expect(getAPIKey(headers)).toBeNull();
    });

    test("returns the API key when header is valid", () => {
        const headers: IncomingHttpHeaders = {
            authorization: "ApiKey my-secret-key",
        };
        expect(getAPIKey(headers)).toBe("my-secret-key");
    });
})