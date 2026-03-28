<style>
a:not(.flora-btn) { color: #b80205; }
a:not(.flora-btn):hover { color: #ff84d0; }
.flora-btn {
  display: inline-block;
  background-color: #b80205;
  color: #fff !important;
  padding: 14px 36px;
  border-radius: 8px;
  font-size: 1.15em;
  font-weight: bold;
  text-decoration: none !important;
  letter-spacing: 0.01em;
  transition: background-color 0.15s;
}
.flora-btn:hover { background-color: #ff84d0; color: #fff !important; }
</style>

<p align="center">
  <a href="https://github.com/forrtproject/flora_zotero/releases/latest" class="flora-btn">⬇️ Download Latest Version</a>
</p>

A Zotero plugin that discovers replication studies for items in your library using the [FORRT Library of Reproduction and Replication Attempts (FLoRA)](https://forrt.org/replication-hub/flora/). It scans your local library for DOIs, checks against FLoRA using privacy-preserving prefix matching, notifies you when reproductions and replications exist, and allows easy addition to your library — all without sending identifiable data off your machine.

This plugin was developed as a [FORRT](https://forrt.org/) project to build a working prototype for the open science community. It helps researchers discover replication studies by identifying items with known replications and unobtrusively notifying them via tags and notes.  

## Features

- 🔍 **Privacy-preserving matching**: Uses hash prefixes to query the database without exposing your library contents
- 📚 **Batch processing**: Checks entire library, selected items, or collections in one operation
- 🔁 **Replication support**: Detects replication studies, adds outcome-tagged notes, and tags items with "Has Replication" / "Is Replication"
- 🧪 **Reproduction support**: Detects computational reproductions with dedicated notes and "Has Reproduction" / "Is Reproduction" tags
- 📄 **Multiple originals support**: Items with more than one original study receive an "Original Articles" note listing each original's title, DOI, and outcome
- 📖 **Read-only library support**: Automatically detects read-only group libraries and offers to copy originals and replications to your Personal library
- 🏷️ **Automatic tagging**: Adds contextual tags including "Has Replication", "Is Replication", outcome tags, and "Original present in Read-Only Library"
- 📝 **Detailed notes**: Creates child notes with replication/reproduction details (title, authors, journal, outcome, DOI)
- 🗂️ **Configurable folders**: Customize the collection names for replications and reproductions in Preferences
- 🔗 **Smart organization**: Creates separate collections for originals from read-only libraries and their replications
- 🔄 **Bidirectional linking**: Automatically links original studies with their replications as related items
- 🚫 **Blacklist management**: Ban unwanted replications from being re-added during future checks
- ⚡ **Auto-check**: Checks newly added items automatically; scheduled checks (daily/weekly/monthly) also available
- 🌍 **Multi-language support**: Available in 5 languages (English, German, Spanish, Portuguese Brazil, Portuguese Europe)

## About the dataset

The Replication Checker uses the [FORRT Literature Database (FLoRA)](https://forrt.org/replication-hub/flora/) that contains replications and reproductions of studies from many different areas of science. These are distinct divided into:

**Replications** are studies that intentionally repeat prior research to test whether the original findings hold. To be included in FLoRA, a study must:

- Self-identify as a replication (e.g., "replication of Author (Year)") *before* reporting results — replication must be an aim, not just a result
- Identify specific target study/studies that it replicates
- Replicate a study or experiment, not just a single association or finding

Replications can range from close/direct (same methods, same population) to conceptual (testing the same hypothesis with different methods), as long as the above criteria are met. The plugin tags replication outcomes as **Successful**, **Failed**, or **Mixed**, based on how the replication authors characterise their results.

**Reproductions** are attempts to computationally verify whether reported results can be obtained from the original study's data and methods. Reproductions are coded along two dimensions:

- **Computational success**: Were the original results obtained? (*Computationally Successful* vs *Computational Issues*)
- **Robustness**: Do results hold under reasonable alternative specifications? (*Robust*, *Robustness Challenges*, or *Robustness Not Checked*)

**Key distinction**: If new data are collected or used (e.g., an additional decade of data), it is a *replication*. If the same data are re-analysed to verify the original results, it is a *reproduction*.

For more information on usage and functionality, head to [Documentation](https://forrt.org/flora_zotero/documentation).

## Feedback

Do you have feedback for us? Open an issue [here](https://github.com/forrtproject/flora_zotero/issues) if you encounter bugs or documentation issues. You can also [contact us anonymously about the Replication Checker](https://tinyurl.com/y5evebv9).

## Funding

The development of the Zotero Replication Checker was funded by UKRI as part of the [Making Replications Count](https://forrt.org/marco/) project.

<img src="logo/ukri_logo.png" alt="UKRI logo" height="60" style="background-color:#fff;">

## Contributors

This plugin is built and maintained by the FORRT community. View all contributors at:

[forrt.org/contributors](https://forrt.org/contributors/?project=flora-zotero-plugin&&collapse-filter)
