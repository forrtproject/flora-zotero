---
layout: default
layout_variant: landing
title: Replication Checker for Zotero
---

<!-- The home page is laid out as the FLoRA Replication Atlas landing page:
     left-aligned hero, then sections separated by a hairline rule, each one a
     bento trio / worked example / definition rows / prose-with-a-link-rail.
     Markup is plain HTML on purpose — kramdown does not process markdown
     inside block-level HTML without markdown="1" on every container. -->

<section class="landing-hero">
  <div class="landing-hero-inner">
    <h1 class="landing-title">Has anything in your library been replicated?</h1>
    <p class="landing-lede">
      The Replication Checker scans your Zotero library for DOIs, matches them
      against FORRT's Library of Reproduction and Replication Attempts (FLoRA),
      and files what it finds as tags, notes and collections — all without
      sending identifiable data off your machine.
    </p>
    <div class="hero-actions">
      <a class="btn-primary" href="https://github.com/forrtproject/flora-zotero/releases/latest">Download the latest version</a>
      <a class="btn-ghost" href="{{ site.baseurl }}/documentation/">Read the documentation</a>
    </div>
    <p class="hero-meta">
      Works with Zotero {{ site.plugin.min_zotero }} – {{ site.plugin.max_zotero }}
      &middot; Free and open source (AGPL-3.0)
      &middot; <a href="https://github.com/forrtproject/flora-zotero/releases">Release notes</a>
    </p>
    <div class="welcome-examples">
      <div class="welcome-examples-label">Start here</div>
      <a class="welcome-doi" href="#see-it-in-action">
        <span>Video tutorial</span>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
      </a>
      <a class="welcome-doi" href="#what-it-does">
        <span>What it does</span>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
      </a>
      <a class="welcome-doi" href="#where-the-data-comes-from">
        <span>About the dataset</span>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
      </a>
      <a class="welcome-doi" href="https://github.com/forrtproject/flora-zotero/issues">
        <span>Report an issue</span>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
      </a>
    </div>
  </div>
</section>

<section class="landing-section" id="what-it-does">
  <h2 class="landing-h2">What it does</h2>

  <div class="landing-bento">
    <div class="lb-cell lb-cell--feature">
      <p class="lb-headline">Your library never leaves your machine</p>
      <div class="lb-title">Privacy-preserving matching</div>
      <p class="lb-sub">
        The plugin sends short hashed prefixes of your DOIs, never the DOIs
        themselves, so FLoRA can answer the question without learning what you
        are reading.
      </p>
      <a class="lb-go" href="{{ site.baseurl }}/documentation/how-matching-works/">
        How the matching works
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
      </a>
    </div>

    <a class="lb-cell" href="#where-the-data-comes-from">
      <div class="lb-figure">2</div>
      <div class="lb-title">kinds of evidence</div>
      <p class="lb-sub">
        Replications, which repeat prior research, and computational
        reproductions, which re-analyse the original data. Each gets its own
        tags, notes and collection.
      </p>
      <span class="lb-go">
        What counts as which
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
      </span>
    </a>

    <a class="lb-cell lb-cell--alt" href="{{ site.baseurl }}/documentation/languages/">
      <div class="lb-figure">{{ site.plugin.languages }}</div>
      <div class="lb-title">interface languages</div>
      <p class="lb-sub">
        English, German, Spanish, French, Brazilian Portuguese and European
        Portuguese. Runs on Zotero {{ site.plugin.min_zotero }} through
        {{ site.plugin.max_zotero }}.
      </p>
      <span class="lb-go">
        Read the documentation
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
      </span>
    </a>
  </div>

  <h3 class="landing-h3">Everything in the plugin</h3>
  <ul class="landing-features">
    <li><strong>Privacy-preserving matching</strong> — hash prefixes query the database without exposing your library contents</li>
    <li><strong>Batch processing</strong> — checks the whole library, selected items, or a collection in one operation</li>
    <li><strong>Replication support</strong> — detects replications, adds outcome-tagged notes, and tags items "Has Replication" / "Is Replication"</li>
    <li><strong>Reproduction support</strong> — detects computational reproductions with their own notes and "Has Reproduction" / "Is Reproduction" tags</li>
    <li><strong>Multiple originals</strong> — items with more than one original get an "Original Articles" note listing each original's title, DOI and outcome</li>
    <li><strong>Read-only libraries</strong> — detects read-only group libraries and offers to copy originals and replications into your personal library</li>
    <li><strong>Automatic tagging</strong> — contextual tags including outcomes and "Original present in Read-Only Library"</li>
    <li><strong>Detailed notes</strong> — child notes carrying title, authors, journal, outcome and DOI</li>
    <li><strong>One tidy container</strong> — every collection the plugin creates lives inside a single top-level "FLoRA" collection, and all names are configurable</li>
    <li><strong>Smart organisation</strong> — separate collections for originals from read-only libraries and their replications</li>
    <li><strong>Per-library stats</strong> — Preferences shows live FLoRA counts for your personal or any group library, and opens the Replication Atlas pre-loaded with that library's tracked DOIs</li>
    <li><strong>Bidirectional linking</strong> — originals and their replications are linked as related items</li>
    <li><strong>Blacklist management</strong> — ban unwanted replications from being re-added on future checks</li>
    <li><strong>Auto-check</strong> — new items are checked as they arrive; daily, weekly or monthly scheduled checks are also available</li>
  </ul>
</section>

<section class="landing-section" id="see-it-in-action">
  <h2 class="landing-h2">See it in action</h2>
  <p class="landing-sub">
    New to the Replication Checker? This short walkthrough shows the plugin
    running against a real library.
  </p>
  <div class="flora-video">
    <video controls preload="metadata" playsinline poster="{{ site.baseurl }}/media/flora-zotero-tutorial-poster.jpg">
      <source src="{{ site.baseurl }}/media/flora-zotero-tutorial.mp4" type="video/mp4">
      Your browser cannot play this video.
      <a href="{{ site.baseurl }}/media/flora-zotero-tutorial.mp4">Download the tutorial (MP4)</a>.
    </video>
  </div>
  <div class="flora-note" role="note">
    <strong>Recorded with an earlier version.</strong> The plugin now keeps all
    of its collections inside a single <strong>FLoRA</strong> folder, and a few
    newer features are not shown in the video. See
    <a href="{{ site.baseurl }}/documentation/what-gets-added/#collection-layout">Collection layout</a>
    in the documentation for the current structure.
  </div>
</section>

<section class="landing-section" id="what-you-get">
  <h2 class="landing-h2">What lands in Zotero</h2>

  <div class="landing-record">
    <figure class="lr-figure">
      <div class="lr-card">
        <div class="lr-orig">
          <span class="lr-tag">Already in your library</span>
          <h3 class="lr-title">Power posing: Brief nonverbal displays affect neuroendocrine levels and risk tolerance</h3>
          <p class="lr-meta">Carney, Cuddy &amp; Yap (2010)</p>
          <p class="lr-journal">Psychological Science</p>
          <p class="lr-doi">10.1177/0956797610383437</p>
          <div class="lr-tags">
            <span class="lr-chip">Has Replication</span>
            <span class="lr-chip">Failed</span>
          </div>
        </div>
        <div class="lr-rep">
          <span class="lr-outcome lr-outcome--failed">failed</span>
          <div class="lr-rep-body">
            <p class="lr-meta"><strong>Ranehill et al. (2015)</strong> — Assessing the robustness of power posing</p>
            <p class="lr-journal">Psychological Science</p>
            <p class="lr-note">
              Added under <strong>FLoRA &rsaquo; Replications</strong>, linked to
              the original as a related item, and summarised in a child note
              carrying the authors, journal, outcome and DOI.
            </p>
          </div>
        </div>
      </div>
      <figcaption class="lr-caption">
        An illustration of one matched pair. Browse records like this in the
        <a href="{{ site.forrt.atlas }}">FLoRA Replication Atlas</a>.
      </figcaption>
    </figure>

    <dl class="landing-defs">
      <div class="ld-row">
        <dt>Tags on the items you already have</dt>
        <dd>
          <code>Has Replication</code>, <code>Is Replication</code>,
          <code>Has Reproduction</code>, <code>Is Reproduction</code>, the
          outcome itself, and <code>Original present in Read-Only Library</code>
          where that applies.
        </dd>
      </div>
      <div class="ld-row">
        <dt>A child note per attempt</dt>
        <dd>
          Title, authors, journal, outcome and DOI, so the evidence travels with
          the item rather than living in a separate list.
        </dd>
      </div>
      <div class="ld-row">
        <dt>Collections inside one FLoRA folder</dt>
        <dd>
          Replications and reproductions are filed into their own collections
          under a single top-level container. Every name is configurable in
          Preferences.
        </dd>
      </div>
      <div class="ld-row">
        <dt>Links in both directions</dt>
        <dd>
          Each original is linked to its replications as a Zotero related item,
          and each replication back to its original.
        </dd>
      </div>
      <div class="ld-row">
        <dt>A route out to the full record</dt>
        <dd>
          Preferences reports live FLoRA counts per library and opens the
          Replication Atlas pre-loaded with that library's tracked DOIs, where
          each outcome shows the passage it was read from.
        </dd>
      </div>
    </dl>
  </div>
</section>

<section class="landing-section" id="where-the-data-comes-from">
  <h2 class="landing-h2">Where the data comes from</h2>

  <div class="landing-about">
    <div class="landing-about-main">
      <p>
        The Replication Checker reads FLoRA, the
        <a href="{{ site.forrt.flora }}">FORRT Library of Reproduction and Replication Attempts</a>,
        which records replications and reproductions of studies across many
        areas of science. Entries fall into two kinds.
      </p>
      <p>
        <strong>Replications</strong> are studies that intentionally repeat
        prior research to test whether the original findings hold. To be
        included in FLoRA, a study must:
      </p>
      <ul>
        <li>self-identify as a replication (e.g. "replication of Author (Year)") <em>before</em> reporting results — replication must be an aim, not just a result;</li>
        <li>identify the specific target study or studies it replicates;</li>
        <li>replicate a study or experiment, not just a single association or finding.</li>
      </ul>
      <p>
        Replications range from close or direct (same methods, same population)
        to conceptual (the same hypothesis by different methods), as long as
        those criteria are met. The plugin tags outcomes as
        <strong>Successful</strong>, <strong>Failed</strong> or
        <strong>Mixed</strong>, following how the replication authors
        characterise their own results.
      </p>
      <p>
        <strong>Reproductions</strong> are attempts to computationally verify
        that the reported results can be obtained from the original study's data
        and methods. They are coded along two dimensions:
      </p>
      <ul>
        <li><strong>Computational success</strong> — were the original results obtained? (<em>Computationally Successful</em> vs <em>Computational Issues</em>)</li>
        <li><strong>Robustness</strong> — do the results hold under reasonable alternative specifications? (<em>Robust</em>, <em>Robustness Challenges</em>, or <em>Robustness Not Checked</em>)</li>
      </ul>
      <p>
        <strong>The key distinction:</strong> if new data are collected or used
        (an additional decade of observations, say), it is a
        <em>replication</em>. If the same data are re-analysed to verify the
        original results, it is a <em>reproduction</em>.
      </p>
      <p>
        Coverage is not complete, and no record should be read as a verdict on
        any single paper. If a replication is missing or a record looks wrong,
        sending it in is the fastest way to get it fixed.
      </p>
    </div>

    <aside class="landing-about-aside">
      <a href="{{ site.forrt.flora }}">FLoRA database</a>
      <a href="{{ site.forrt.hub }}">FORRT Replication Hub</a>
      <a href="{{ site.forrt.atlas }}">FLoRA Replication Atlas</a>
      <a href="{{ site.forrt.explorer }}">FLoRA Explorer</a>
      <a href="{{ site.baseurl }}/documentation/">Plugin documentation</a>
    </aside>
  </div>
</section>

<section class="landing-section" id="about-the-project">
  <h2 class="landing-h2">About the project</h2>

  <div class="landing-about">
    <div class="landing-about-main">
      <p>
        The Replication Checker was built as a <a href="{{ site.forrt.main_site }}">FORRT</a>
        project — a working prototype for the open science community that helps
        researchers notice, unobtrusively, when something they are citing has
        been tested again.
      </p>
      <p>
        <strong>Feedback.</strong> Found a bug, or something unclear in the
        documentation?
        <a href="https://github.com/forrtproject/flora-zotero/issues">Open an issue</a>.
        You can also
        <a href="https://tinyurl.com/y5evebv9">contact us anonymously about the Replication Checker</a>.
      </p>
      <p>
        <strong>Contributors.</strong> The plugin is built and maintained by the
        FORRT community —
        <a href="{{ site.forrt.contributors }}">see everyone who has contributed</a>.
      </p>
      <p>
        <strong>Funding.</strong> Development was funded by UKRI as part of the
        <a href="https://forrt.org/marco/">Making Replications Count</a> project.
      </p>
      <span class="funding-logo">
        <img src="{{ site.baseurl }}/logo/ukri_logo.png" alt="UKRI logo" height="60">
      </span>
    </div>

    <aside class="landing-about-aside">
      <a href="https://github.com/forrtproject/flora-zotero/releases/latest">Download the plugin</a>
      <a href="{{ site.baseurl }}/documentation/">Documentation</a>
      <a href="{{ site.baseurl }}/contributing/">Contributing guide</a>
      <a href="{{ site.baseurl }}/release-guide/">Release guide</a>
      <a href="https://github.com/forrtproject/flora-zotero">Source on GitHub</a>
      <a href="https://github.com/forrtproject/flora-zotero/issues">Report an issue</a>
    </aside>
  </div>
</section>
