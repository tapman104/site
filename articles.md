---
layout: default
title: Articles
permalink: /articles/
---

<section class="container" style="padding: 6rem 0;">
  <div class="section-header">
    <h1 class="section-title">All Articles</h1>
    <p class="section-subtitle">Deep dives, tutorials, and thoughts on the web.</p>
  </div>

  <div class="bento-grid" style="grid-template-columns: 1fr; max-width: 800px; margin: 0 auto;">
    {% for post in site.posts %}
    <a href="{{ post.url | relative_url }}" class="bento-item">
      <div class="bento-inner">
        <div class="meta-info" style="justify-content: flex-start;">
          <span class="date">{{ post.date | date: "%b %d, %Y" }}</span>
          <span>•</span>
          <span>{{ post.content | number_of_words | divided_by: 200 | plus: 1 }} min read</span>
        </div>
        <h3>{{ post.title }}</h3>
        <p>{{ post.excerpt | strip_html | truncate: 200 }}</p>
        <div class="read-more">
          <span>Read Article</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </div>
      </div>
    </a>
    {% endfor %}
  </div>
</section>
