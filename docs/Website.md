---
layout: default
layout_variant: landing
title: Replication Checker for Zotero
---

<!-- The home page is laid out as the FLoRA Replication Atlas landing page:
     left-aligned hero, then sections separated by a hairline rule.
     Markup is plain HTML on purpose — kramdown does not process markdown
     inside block-level HTML without markdown="1" on every container. -->

<section class="landing-hero">
  <div class="landing-hero-inner">
    <h1 class="landing-title">Has anything in your library been replicated?</h1>
    <p class="landing-lede">
      Replication Checker for Zotero is a free plugin that looks up the papers
      in your Zotero library in FLoRA, FORRT's Library of Reproduction and
      Replication Attempts. When a paper has been replicated or reproduced, the
      plugin tags it, adds a note listing each attempt and its outcome, and
      saves the replication studies to your library.
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
  </div>
</section>

<section class="landing-section" id="what-a-check-does">
  <h2 class="landing-h2">What a check does</h2>

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
            <p class="lr-note">
              Each replication is added under <strong>FLoRA &rsaquo; FLoRA Replications</strong>
              and linked to the original.
            </p>
          </div>
        </div>
      </div>
      <figcaption class="lr-caption">
        As recorded in FLoRA in October 2026. Outcomes follow how each
        replication's authors describe their results. Browse the full records
        in the <a href="{{ site.forrt.atlas }}">FLoRA Replication Atlas</a>.
      </figcaption>
    </figure>

    <div class="landing-about-main">
      <p>
        Choose <strong>Tools → Check Current Library for Replications</strong>,
        or right-click items or a collection and choose
        <strong>Check for Replications</strong>. Items you add later are
        checked automatically. For each paper with a match in FLoRA, the
        plugin:
      </p>
      <ul>
        <li>tags the paper, for example <code>Has Been Replicated</code> and
          <code>Replication: Failure</code>, so you can filter your library by
          outcome;</li>
        <li>adds a note to the paper listing each replication or reproduction
          with its authors, year, journal, DOI and outcome;</li>
        <li>adds each replication or reproduction study to the library you
          checked, in a collection inside a <code>FLoRA</code> collection, and
          links it to the original as a related item.</li>
      </ul>
      <p>
        To see what a check does before running it on everything, start with
        one collection. In a read-only group library, the plugin asks before
        copying anything to your personal library.
        <a href="{{ site.baseurl }}/documentation/what-gets-added/">What lands in your library</a>
      </p>
    </div>
  </div>
</section>

<section class="landing-section" id="privacy">
  <h2 class="landing-h2">What leaves your computer</h2>

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
        <a href="{{ site.baseurl }}/documentation/how-matching-works/">How matching works</a>
      </p>
    </div>
  </div>
</section>

<section class="landing-section" id="what-the-results-mean">
  <h2 class="landing-h2">What the results mean</h2>

  <div class="landing-about">
    <div class="landing-about-main">
      <p>FLoRA records two kinds of attempt to check published findings.</p>
      <p>
        A <strong>replication</strong> repeats a study with new data to test
        whether the finding holds. To be included in FLoRA, a study must say
        before reporting its results that it replicates a named earlier study,
        and it must repeat a study or experiment rather than a single
        association. Close and conceptual replications both qualify. Outcomes
        are tagged <code>Replication: Successful</code>,
        <code>Replication: Failure</code> or <code>Replication: Mixed</code>,
        following how the replication's authors describe their results.
      </p>
      <p>
        A <strong>reproduction</strong> re-analyses the original study's data to
        check that the reported results can be obtained. It is coded on two
        dimensions: whether the results were obtained (<em>computationally
        successful</em> or <em>computational issues</em>), and whether they hold
        under reasonable alternative analyses (<em>robust</em>, <em>robustness
        challenges</em> or <em>robustness not checked</em>).
      </p>
      <p>
        If new data are collected, it is a replication. If the same data are
        re-analysed, it is a reproduction.
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
  <h2 class="landing-h2">About</h2>

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
      <span class="funding-logo">
        <img src="{{ site.baseurl }}/logo/ukri_logo.png" alt="UKRI logo" height="60">
      </span>
    </div>
  </div>
</section>
