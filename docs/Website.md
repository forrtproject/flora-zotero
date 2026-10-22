---
layout: default
layout_variant: landing
title: Replication Checker for Zotero
---

<section class="landing-hero">
  <div class="landing-hero-inner">
    <h1 class="landing-title">Has anything in your library been replicated?</h1>
    <p class="landing-lede">
      Replication Checker for Zotero is a free plugin that looks up the papers
      in your Zotero library in FLoRA, FORRT's Library of Reproduction and
      Replication Attempts, and records what it finds on the papers themselves.
    </p>
    <div class="hero-actions">
      <a class="btn-primary" href="https://github.com/forrtproject/flora-zotero/releases/latest">Download the plugin</a>
      <a class="btn-ghost" href="{{ site.baseurl }}/documentation/installation/">How to install</a>
    </div>
    <p class="hero-meta">
      Zotero {{ site.plugin.zotero }}
      &middot; Free and open source (AGPL-3.0)
      &middot; <a href="https://github.com/forrtproject/flora-zotero/releases">Release notes</a>
    </p>
    <p class="proof-strip">
      <img src="{{ site.baseurl }}/logo/ukri_logo.png" alt="UK Research and Innovation">
      <span>Built by the <strong>FORRT</strong> community &middot; funded by UKRI through <a href="https://forrt.org/marco/">Making Replications Count</a></span>
    </p>
  </div>

  <figure class="hero-figure">
    <div class="lr-card">
      <div class="lr-orig">
        <span class="lr-tag">Already in your library</span>
        <p class="lr-title">Power posing: Brief nonverbal displays affect neuroendocrine levels and risk tolerance</p>
        <p class="lr-meta">Carney, Cuddy &amp; Yap (2010)</p>
        <p class="lr-journal">Psychological Science</p>
        <p class="lr-doi">10.1177/0956797610383437</p>
        <div class="lr-tags">
          <span class="lr-chip">Has Been Replicated</span>
          <span class="lr-chip">Replication: Failure</span>
          <span class="lr-chip">Replication: Mixed</span>
        </div>
      </div>
      <div class="lr-rep">
        <span class="lr-outcome lr-outcome--mixed">mixed</span>
        <div class="lr-rep-body">
          <p class="lr-meta"><strong>Ranehill et al. (2015)</strong></p>
          <p class="lr-journal">Psychological Science</p>
        </div>
      </div>
      <div class="lr-rep">
        <span class="lr-outcome lr-outcome--failed">failed</span>
        <div class="lr-rep-body">
          <p class="lr-meta"><strong>Garrison et al. (2016)</strong></p>
          <p class="lr-journal">Social Psychological and Personality Science</p>
        </div>
      </div>
      <div class="lr-rep">
        <span class="lr-outcome lr-outcome--failed">failed</span>
        <div class="lr-rep-body">
          <p class="lr-meta"><strong>Ronay et al. (2016)</strong></p>
          <p class="lr-journal">Comprehensive Results in Social Psychology</p>
        </div>
      </div>
    </div>
    <figcaption class="lr-caption">
      As recorded in FLoRA in October 2026. Outcomes follow how each
      replication's authors describe their results. Browse the full records in
      the <a href="{{ site.forrt.atlas }}">FLoRA Replication Atlas</a>.
    </figcaption>
  </figure>
</section>

<section class="landing-section" id="what-a-check-does">
  <h2 class="landing-h2">What a check does</h2>

  <div class="landing-about">
    <div class="landing-about-main">
      <p>
        Choose <strong>Tools → Check Current Library for Replications</strong>,
        or right-click items or a collection and choose
        <strong>Check for Replications</strong>. Items you add later are
        checked automatically. For each paper with replications or
        reproductions in FLoRA, the plugin writes three things:
      </p>
    </div>
  </div>

  <div class="cell-grid">
    <div class="cell cell--lead">
      <div class="cell-num">1</div>
      <div class="cell-title">Tags on the paper</div>
      <p class="cell-sub">
        So you can filter your library by outcome.
      </p>
      <div class="cell-tags">
        <span class="lr-chip">Has Been Replicated</span>
        <span class="lr-chip">Replication: Failure</span>
      </div>
    </div>
    <div class="cell">
      <div class="cell-num">2</div>
      <div class="cell-title">A note on the paper</div>
      <p class="cell-sub">
        Listing each replication or reproduction with its authors, year,
        journal, DOI and outcome.
      </p>
    </div>
    <div class="cell cell--alt">
      <div class="cell-num">3</div>
      <div class="cell-title">The studies themselves</div>
      <p class="cell-sub">
        Each replication or reproduction is added to the library you checked,
        in a collection inside a <code>FLoRA</code> collection, and linked to
        the original as a related item.
      </p>
    </div>
  </div>

  <p class="landing-note">
    To see what a check does before running it on everything, start with one
    collection. In a read-only group library, the plugin copies the results to
    your personal library instead.
  </p>

  <nav class="landing-links">
    <span class="landing-links-label">Read more</span>
    <a href="{{ site.baseurl }}/documentation/running-a-check/">Running a check</a>
    <a href="{{ site.baseurl }}/documentation/what-gets-added/">What lands in your library</a>
    <a href="{{ site.baseurl }}/documentation/preferences/">Settings</a>
  </nav>
</section>

<section class="landing-section" id="privacy">
  <h2 class="landing-h2">What leaves your computer</h2>

  <div class="landing-split">
    <div class="landing-about">
      <div class="landing-about-main">
      <p>
        The plugin does not send your DOIs to look them up. It converts each DOI
        into a three-character code (the start of its MD5 hash) and sends only
        these codes to the FLoRA server. There are 4,096 possible codes, so each
        is shared by a very large number of DOIs. The server returns every FLoRA
        record with a matching code, and the plugin works out on your computer
        which of them are in your library.
      </p>
      <p>
        One feature sends more: <strong>Open in FLoRA Atlas</strong>, in the
        plugin's settings, opens a web page whose address lists the DOIs of your
        matched papers. Neither the FLoRA server nor the Atlas links requests
        together or tracks users.
      </p>
      </div>
    </div>

    <figure class="hash-flow">
      <span class="hash-label">In your library</span>
      <div class="hash-value">10.1177/0956797610383437</div>
      <span class="hash-arrow">↓ first three characters of its MD5 hash</span>
      <span class="hash-label">Sent to the server</span>
      <div class="hash-value hash-value--sent">494</div>
      <p class="hash-note">
        <strong>4,096</strong> codes exist, so one code stands for a very large
        number of DOIs. The server never learns which paper you asked about.
      </p>
    </figure>

  </div>
</section>

<section class="landing-section" id="what-the-results-mean">
  <h2 class="landing-h2">What the results mean</h2>

  <div class="landing-about">
    <div class="landing-about-main">
      <p>FLoRA records two kinds of attempt to check published findings.</p>
    </div>
  </div>

  <div class="cell-grid">
    <div class="cell">
      <div class="cell-title">Replication</div>
      <p class="cell-sub">
        Repeats a study with new data to test whether the finding holds. To be
        included in FLoRA, a study must say before reporting its results that it
        replicates a named earlier study, and it must repeat a study or
        experiment rather than a single association. Close and conceptual
        replications both qualify.
      </p>
      <div class="cell-tags">
        <span class="lr-chip">Replication: Successful</span>
        <span class="lr-chip">Replication: Failure</span>
        <span class="lr-chip">Replication: Mixed</span>
      </div>
    </div>
    <div class="cell">
      <div class="cell-title">Reproduction</div>
      <p class="cell-sub">
        Re-analyses the original study's data to check that the reported results
        can be obtained. It is coded on two dimensions: whether the results were
        obtained (<em>computationally successful</em> or <em>computational
        issues</em>), and whether they hold under reasonable alternative
        analyses (<em>robust</em>, <em>robustness challenges</em> or
        <em>robustness not checked</em>).
      </p>
    </div>
  </div>

  <div class="landing-about">
    <div class="landing-about-main">
      <p>
        If new data are collected, it is a replication. If the same data are
        re-analysed, it is a reproduction. Outcomes follow how the replication's
        authors describe their results.
      </p>
      <p>
        FLoRA is incomplete, and a single record is not a verdict on a paper. A
        replication may test only one study from a multi-study paper, and its
        outcome is its authors' own assessment. The plugin checks only items
        that have a DOI. If a replication is missing or a record looks wrong,
        <a href="{{ site.forrt.data_issues }}">report it to the FLoRA team</a>.
      </p>
    </div>
  </div>

  <nav class="landing-links">
    <span class="landing-links-label">Read more</span>
    <a href="{{ site.baseurl }}/documentation/outcomes/">Reading an outcome</a>
    <a href="{{ site.baseurl }}/documentation/how-matching-works/">Where the data comes from</a>
    <a href="{{ site.forrt.atlas }}">FLoRA Replication Atlas</a>
  </nav>
</section>

<section class="landing-section" id="video">
  <h2 class="landing-h2">Video walkthrough (6 minutes)</h2>
  <div class="flora-video">
    <video controls preload="metadata" playsinline poster="{{ site.baseurl }}/media/flora-zotero-tutorial-poster.jpg">
      <source src="{{ site.baseurl }}/media/flora-zotero-tutorial.mp4" type="video/mp4">
      Your browser cannot play this video.
      <a href="{{ site.baseurl }}/media/flora-zotero-tutorial.mp4">Download the tutorial (MP4)</a>.
    </video>
  </div>
  <div class="flora-note" role="note">
    <strong>Recorded with an earlier version.</strong> The plugin now keeps all
    its collections inside one <code>FLoRA</code> collection, and some tag names
    have changed. See
    <a href="{{ site.baseurl }}/documentation/what-gets-added/">What lands in your library</a>
    for the current layout.
  </div>
</section>

<section class="landing-section" id="about">
  <div class="landing-cta">
    <div>
      <h2>Check your own library</h2>
      <p>
        Install the plugin and run a check on one collection to see what it
        adds. Works with Zotero {{ site.plugin.zotero }}.
      </p>
    </div>
    <div class="hero-actions">
      <a class="btn-primary" href="https://github.com/forrtproject/flora-zotero/releases/latest">Download the plugin</a>
      <a class="btn-ghost" href="{{ site.baseurl }}/documentation/">Documentation</a>
    </div>
  </div>

  <div class="landing-about">
    <div class="landing-about-main">
      <p>
        Replication Checker for Zotero is built by the
        <a href="{{ site.forrt.contributors }}">FORRT community</a> and was
        funded by UK Research and Innovation through the
        <a href="https://forrt.org/marco/">Making Replications Count</a> project.
        Report bugs or problems with the documentation on
        <a href="https://github.com/forrtproject/flora-zotero/issues">GitHub</a>,
        or <a href="https://tinyurl.com/y5evebv9">send feedback anonymously</a>.
        If you use the plugin in your research, please
        <a href="{{ site.baseurl }}/documentation/citation/">cite it</a>.
      </p>
    </div>
  </div>
</section>
