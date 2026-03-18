import { assert } from "chai";
import { getChecker, getPlugin } from "../fixtures/helpers";

describe("Plugin Initialization", function () {
  it("plugin is initialized", function () {
    assert.isTrue(getPlugin().data.initialized);
  });

  it("can access Zotero APIs", function () {
    const libraryID = Zotero.Libraries.userLibraryID;
    assert.isNumber(libraryID);
  });

  it("matcher is initialized", function () {
    const checker = getChecker();
    assert.isNotNull(checker.matcher);
  });
});
