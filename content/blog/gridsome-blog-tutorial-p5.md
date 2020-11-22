---
title: How to build a personal developer blog with Vue.js, Gridsome and Vuetify (Part 5)
category: Coding
excerpt: In part 5 of the Gridsome blog series, we'll start to build out the blog functionality.
created: 2020-10-14
keywords: 'HTML,CSS,JavaScript,JSON,Vue,Gridsome,Vuetify,GraphQL,Netlify'
image: ./images/gridsome-tut/gridsome-blog-tutorial-p5.png
image_caption: Photo by Josh Arrants
author: author1
---

Welcome to part 5 of the Gridsome personal developer blog tutorial series! In part 5, we'll start to build out the blog functionality by integrating the [GraphQL data layer](https://gridsome.org/docs/data-layer/) that will look for markdown files in our project and create paths in our site accordingly.

- [Installing Plugins](#installing-plugins)
- [Editing the Config](#editing-the-config)

## Installing Plugins

In order to get started with building out our blog functionality, we first need to install some necessary plugins. The first plugin that we'll install is `@gridsome/source-filesystem`. This plugin is responsible for transforming our blog posts (markdown files) into content that can be fetched with GraphQL in our components.

You can find all documentation for specific Gridsome plugins [here](https://gridsome.org/plugins/).

There are several ways to dynamically import content into our Gridsome project. For example, you could call an API that contains your blog posts with Strapi. You could also use a content management system (CMS), such as [Contentful](https://www.contentful.com/) or [Sanity.io](https://www.sanity.io/) using the official plugins provided by Gridsome. Read more on how to import blog post content into Gridsome [here](https://gridsome.org/docs/fetching-data/).

For this series, we will be importing content via the [file-system source](https://gridsome.org/docs/fetching-data/#import-with-source-plugins). To do this we need to install `@gridsome/source-filesystem`. Stop your development server if it's currently running and run this command:

```bash
npm install @gridsome/source-filesystem
```

A filesystem source will also require a transformer in order to parse our markdown files. In order for Gridsome to understand the content of our files, we must also install `@gridsome/transformer-remark` as a dev dependency.

```bash
npm install --save-dev @gridsome/transformer-remark
```

We'll also being using an additional plugin that adds syntax highlighting to code blocks in markdown files using [PrismJS](https://prismjs.com/). For additional features, we can use the unofficial plugin created by [David Couronné](https://www.npmjs.com/~davidcouronne) called `gridsome-plugin-remark-prismjs-all`. If you'd like to use the official syntax highlighting plugin from Gridsome, you can install `@gridsome/remark-prismjs`.

```bash
npm install gridsome-plugin-remark-prismjs-all
```

## Editing the Config

Now that we have our necessary plugins installed, we'll also need to edit our `gridsome.config.js` file in order to "register" the plugins in our Gridsome project.