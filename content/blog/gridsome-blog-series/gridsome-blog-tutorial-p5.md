---
title: How to build a personal developer blog with Vue.js, Gridsome and Vuetify (Part 5)
category: Coding
excerpt: In part 5 of the Gridsome blog series, we'll start to build out the blog functionality.
created: 2020-10-14
keywords: 'HTML,CSS,JavaScript,JSON,Vue,Gridsome,Vuetify,GraphQL,Netlify'
image: ../images/gridsome-tut/gridsome-blog-tutorial-p5.png
image_caption: Photo by Josh Arrants
author: author1
---

Welcome to part 5 of the Gridsome personal developer blog tutorial series! In part 5, we'll start to build out the blog functionality by integrating the [GraphQL data layer](https://gridsome.org/docs/data-layer/) that will look for markdown files in our project and create paths in our site accordingly.

- [Installing Plugins](#installing-plugins)
- [Editing the Config](#editing-the-config)
- [Creating our first Blog Post](#creating-our-first-blog-post)

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

Now that we have our necessary plugins installed, we'll also need to edit our `gridsome.config.js` file in order to "register" the plugins in our Gridsome project. Edit the `gridsome.config.js` file with this code.

```js {codeTitle: "gridsome.config.js"}{numberLines: true}
module.exports = {
  siteName: 'John Doe',
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Blog',
        path: './content/blog/**/*.md',
        refs: {
          author: 'Author',
          category: {
            typeName: 'Category',
            create: true
          }
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Author',
        path: './content/author/*.md'
      }
    }
  ],
}
```

In this instance, we are registering the `@gridsome/source-filesystem` plugin and customizing it's options. Let's explain what exactly we want in our blog.

For the purposes of this series, we are going to give our blog posts a few properties. Every blog post should have an author, category, and the post itself. We can also set explicit fields that we want to created in the head of our markdown files. You can think about this in terms of GraphQL types (or collections). This means that we should have three types: Author, Category, and Blog. `typeName` in the options is where we can define the name of our GraphQL type. `typeName` must also match the name of a file in our `templates/` folder, if one is being created.

In our options, `path` is used to tell Gridsome where to look for our files. Make sure you create a folder (outside of `src/`) such as `content/blog/` and `content/author/`. We will create markdown files inside of these folders momentarily. The path should be a [glob](https://en.wikipedia.org/wiki/Glob_(programming)) pattern.

`refs` defines fields that will have a reference to another node. The referenced `typeName` needs to exist for `refs` to work properly. However, a content type can also be created automatically if `create: true` is set. In our case, one `category` might be used for multiple blog posts, so `create: true` must be in place.

Down below the `typeName: Blog` block, we're also registering a new instance of `@gridsome/source-filesystem`. This is necessary to tell Gridsome to look in several locations in our project. In this case, we need to define this in order to tell Gridsome to look in our `content/author/` file path.

Let's also set some global remark options for what should happen when our markdown files are parsed into HTML. Append this chunk of code inside of `gridsome.config.js`, and make sure to add it after the `plugins` array.

```js {codeTitle: "still gridsome.config.js"}{numberLines: 26}
transformers: {
  remark: {
    externalLinksTarget: "_blank",
    externalLinksRel: ["nofollow", "noopener", "noreferrer"],
    plugins: [
      'gridsome-plugin-remark-prismjs-all'
    ]
  }
},
```

This code is talking directly to the `@gridsome/transformer-remark` plugin. In this case, we want every link (`<a>` tag) to open a new tab when clicked and set the `rel` equal to `rel="nofollow noopener noreferrer"`. Read more about what these `rel` values mean [here](https://www.w3schools.com/TAGS/att_a_rel.asp).

At this point, we're almost ready to start importing and querying blog posts. There is one last piece of code that needs to be added to our `gridsome.config.js` file. Before we dive into this chunk, let's review what the purpose of `templates/` are in Gridsome.

> `templates/` - [Templates](https://gridsome.org/docs/templates/) are used for single blog post views (or anything else) of GraphQL collections. Our project will look for a component in this directory to display a single blog post based on an ID. The name of the template file must match the name of a GraphQL collection.

In our case, we need to make a template file for two of our GraphQL collections: Blog and Category. Theoretically, you could also make a template file for the Author collection, but since our blog posts will be written by maybe one or two authors, this won't be necessary. It would come in handy for a larger scale website, such as [dev.to](https://dev.to), where the content of their blog posts are produced by a community of thousands of authors.

Append this code to end of the last chunk of code we just added in `gridsome.config.js`.

```js {codeTitle: "once again, gridsome.config.js"}{numberLines: 35}
templates: {
  Blog: [{
    path: '/blog/:title',
    component: './src/templates/Blog.vue'
  }],
  Category: [{
    path: '/category/:title',
    component: './src/templates/Category.vue'
  }]
}
```

The code above shows us how we connect a file in our `templates/` directory to a GraphQL collection. The naming of the template file is important as we are required to name our template file the same as the GraphQL collection it's referencing.

In the `path`, we are defining what our routes should like in our site. For example, "blog/welcome-to-my-blog" will be a path on our site based on the title (`:title`) of our blog post, which in this case would be "Welcome To My Blog!".

Alright! Let's start creating some blog posts! Please leave any questions you might have in the comments below.

## Creating our first Blog Post

