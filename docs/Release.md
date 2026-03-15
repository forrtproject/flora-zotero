<!-- Update this file before each release. It will be inserted into the GitHub Release body under "✨ New in This Release". Use markdown bullet points. -->

- Added **Multiple Originals support**: replication/reproduction items with more than one original article now receive a dedicated "Original Articles" note listing each original's title, DOI, and outcome (fetched in a single batch API call after items are created)
- Added **Multiple Originals tags**: `Replication: Multiple Originals` / `Reproduction: Multiple Originals` tags applied instead of outcome tags when an item has more than one original
- Fixed **consecutive folder renames**: changing the Replication or Reproduction folder name multiple times in Preferences now correctly renames the same existing collection each time, instead of creating a new one on every rename
- **Fall back to full library check**: When a library (not a collection) is selected, the plugin now runs checkEntireLibrary() instead of showing a "no collection selected" error
