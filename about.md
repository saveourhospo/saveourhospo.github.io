---
layout: page
title: "About"
permalink: about.html
---
{% assign mailParts = site.settings.email | split: "" %}
<div class="about">
    <p>Add your own place by github merge request or sending us a at <span>{{ mailParts | join: "</span><span>" }}</span></p>
</div>