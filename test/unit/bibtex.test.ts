import { assert } from "chai";
import {
  parseBibtex,
  bibtexTypeToZoteroType,
} from "../../src/utils/zoteroIntegration";
import {
  fullArticleBibtex,
  minimalBibtex,
  conferencePaperBibtex,
  thesisBibtex,
  malformedBibtex,
  nestedBracesBibtex,
} from "../fixtures/bibtexSamples";

describe("BibTeX parsing", function () {
  describe("parseBibtex", function () {
    it("returns null for null/undefined/empty input", function () {
      assert.isNull(parseBibtex(null));
      assert.isNull(parseBibtex(undefined));
      assert.isNull(parseBibtex(""));
    });

    it("returns null for malformed input", function () {
      assert.isNull(parseBibtex(malformedBibtex));
    });

    it("parses full article BibTeX", function () {
      const result = parseBibtex(fullArticleBibtex);
      assert.isNotNull(result);
      assert.equal(result!.entryType, "article");
      assert.equal(result!.title, "A Replication of the Original Study");
      assert.equal(result!.author, "Smith, John and Doe, Jane");
      assert.equal(result!.journal, "Journal of Replications");
      assert.equal(result!.year, "2022");
      assert.equal(result!.volume, "10");
      assert.equal(result!.number, "3");
      assert.equal(result!.pages, "100-115");
      assert.equal(result!.doi, "10.5678/replication");
      assert.equal(result!.issn, "1234-5678");
      assert.equal(result!.publisher, "Academic Press");
    });

    it("parses minimal BibTeX", function () {
      const result = parseBibtex(minimalBibtex);
      assert.isNotNull(result);
      assert.equal(result!.entryType, "misc");
      assert.equal(result!.title, "Minimal Entry");
      assert.equal(result!.year, "2023");
      assert.isUndefined(result!.journal);
      assert.isUndefined(result!.author);
    });

    it("parses conference paper BibTeX", function () {
      const result = parseBibtex(conferencePaperBibtex);
      assert.isNotNull(result);
      assert.equal(result!.entryType, "inproceedings");
      assert.equal(
        result!.booktitle,
        "Proceedings of the Conference on Testing",
      );
      assert.equal(result!.pages, "50-60");
    });

    it("parses thesis BibTeX", function () {
      const result = parseBibtex(thesisBibtex);
      assert.isNotNull(result);
      assert.equal(result!.entryType, "phdthesis");
      assert.equal(result!.institution, "University of Testing");
    });

    it("handles nested braces in field values", function () {
      const result = parseBibtex(nestedBracesBibtex);
      assert.isNotNull(result);
      assert.include(result!.title!, "Study");
      assert.include(result!.title!, "Nested");
    });
  });

  describe("bibtexTypeToZoteroType", function () {
    it("maps article to journalArticle", function () {
      assert.equal(bibtexTypeToZoteroType("article"), "journalArticle");
    });

    it("maps inproceedings to conferencePaper", function () {
      assert.equal(
        bibtexTypeToZoteroType("inproceedings"),
        "conferencePaper",
      );
    });

    it("maps proceedings to conferencePaper", function () {
      assert.equal(
        bibtexTypeToZoteroType("proceedings"),
        "conferencePaper",
      );
    });

    it("maps book to book", function () {
      assert.equal(bibtexTypeToZoteroType("book"), "book");
    });

    it("maps phdthesis to thesis", function () {
      assert.equal(bibtexTypeToZoteroType("phdthesis"), "thesis");
    });

    it("maps mastersthesis to thesis", function () {
      assert.equal(bibtexTypeToZoteroType("mastersthesis"), "thesis");
    });

    it("maps techreport to report", function () {
      assert.equal(bibtexTypeToZoteroType("techreport"), "report");
    });

    it("maps misc to document", function () {
      assert.equal(bibtexTypeToZoteroType("misc"), "document");
    });

    it("maps incollection to bookSection", function () {
      assert.equal(bibtexTypeToZoteroType("incollection"), "bookSection");
    });

    it("maps unpublished to manuscript", function () {
      assert.equal(bibtexTypeToZoteroType("unpublished"), "manuscript");
    });

    it("defaults to journalArticle for unknown types", function () {
      assert.equal(bibtexTypeToZoteroType("unknown"), "journalArticle");
      assert.equal(bibtexTypeToZoteroType("xyz"), "journalArticle");
    });

    it("is case-insensitive", function () {
      assert.equal(bibtexTypeToZoteroType("ARTICLE"), "journalArticle");
      assert.equal(
        bibtexTypeToZoteroType("InProceedings"),
        "conferencePaper",
      );
    });
  });
});
