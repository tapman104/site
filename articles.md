---
layout: default
title: Articles
permalink: /articles/
---

<div class="container" style="padding: 4rem 0;">
  <h1 style="font-size: 3rem; margin-bottom: 2rem;">All Articles</h1>

  <div class="bento-grid" style="grid-template-columns: 1fr;">
    {% for post in site.posts %}
    <article class="bento-item">
      <div class="meta-info">
        <span>{{ post.date | date: "%B %-d, %Y" }}</span>
        <span>•</span>
        <span>{{ post.content | number_of_words | divided_by: 200 | plus: 1 }} min read</span>
      </div>
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      <p>{{ post.excerpt | strip_html | truncate: 200 }}</p>
      <a href="{{ post.url | relative_url }}" style="color: var(--primary); display: inline-block; margin-top: 1rem;">Read More →</a>
    </article>
    {% endfor %}
  </div>
</div>
