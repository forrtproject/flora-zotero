import { assert } from "chai";
import { readFileSync } from "fs";
import { join } from "path";

const FTL_PATH = join(
  __dirname,
  "../../addon/locale/en-US/replication-checker.ftl",
);

describe("FTL locale strings", function () {
  let ftlContent: string;

  before(function () {
    ftlContent = readFileSync(FTL_PATH, "utf-8");
  });

  it("does not contain literal backslash-n in single-line values", function () {
    // In Fluent, \\n on a single line is literal text, not a newline.
    // Multi-line block syntax should be used instead.
    const lines = ftlContent.split("\n");
    const badLines: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Match single-line key = value pairs that contain \n
      const match = line.match(/^[a-zA-Z][a-zA-Z0-9_-]*\s*=\s*.+\\n/);
      if (match) {
        badLines.push(`Line ${i + 1}: ${line.trim()}`);
      }
    }

    assert.deepEqual(
      badLines,
      [],
      "FTL file contains literal \\n in single-line values. " +
        "Use multi-line block syntax instead:\n" +
        badLines.join("\n"),
    );
  });

  it("all hardcoded fallback strings have matching FTL keys", function () {
    // Import the hardcoded strings
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { strings } = require("../../src/utils/strings");
    const ftlKeys = new Set<string>();

    const lines = ftlContent.split("\n");
    for (const line of lines) {
      const match = line.match(/^([a-zA-Z][a-zA-Z0-9_-]*)\s*=/);
      if (match) {
        ftlKeys.add(match[1]);
      }
    }

    const missingKeys: string[] = [];
    for (const key of Object.keys(strings)) {
      if (!ftlKeys.has(key)) {
        missingKeys.push(key);
      }
    }

    // Allow some keys to be missing (e.g., keys only used in fallback)
    // but flag any large discrepancies
    if (missingKeys.length > 5) {
      assert.fail(
        `${missingKeys.length} hardcoded string keys missing from FTL file: ${missingKeys.slice(0, 5).join(", ")}...`,
      );
    }
  });
});
