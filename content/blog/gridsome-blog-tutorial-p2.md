---
title: How to build a personal developer blog with Vue.js, Gridsome and Vuetify (Part 2)
category: Coding
excerpt: In part 2 of the Gridsome blog series, we'll start building a layout and pages!
created: 2020-10-11
keywords: 'HTML,CSS,JavaScript,JSON,Vue,Gridsome,Vuetify,GraphQL'
image: ./images/how-to-vue-gridsome-vuetify.png
image_caption: Photo by Josh Arrants
author: author1
---

- [Prerequisites](#prerequisites)
- [Building a Layout](#building-a-layout)

## Prerequisites

In order to follow this tutorial, you'll need to have/know the following:

- [Node](https://nodejs.org/en/download/) v8.3 or higher
- [npm](https://www.npmjs.com/) (this comes packaged with Node) or [Yarn](https://yarnpkg.com/)
- Basic knowledge of HTML, CSS, JavaScript, and [Vue](https://vuejs.org/v2/guide/)
- Minimal knowledge of how [GraphQL](https://www.graphql.com/) works
- A general understanding of how to use the [terminal](https://www.linode.com/docs/tools-reference/tools/using-the-terminal/)
- A text editor such as [VSCode](https://code.visualstudio.com/) (preferred) or [Sublime Text](https://www.sublimetext.com/3)

If you're using VSCode, I'd highly recommend installing these extensions.

- [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) - Intellisense, code completion, emmet, etc. (for Vue)
- [GraphQL for VSCode](https://marketplace.visualstudio.com/items?itemName=kumar-harsh.graphql-for-vscode) - Syntax highlighting
- [vuetify-vscode](https://marketplace.visualstudio.com/items?itemName=vuetifyjs.vuetify-vscode) - Useful code snippets for use with Vuetify

Also, for GraphQL syntax highlighting to work with Gridsome, add this snippet to your [settings.json](https://code.visualstudio.com/docs/getstarted/settings).

```json
"vetur.grammar.customBlocks": {
  "page-query": "graphql",
  "static-query": "graphql"
},
```

## Building a Layout

Let's recall what the purpose of a [layout](https://gridsome.org/docs/layouts/#layouts) is in Gridsome:

> **/layouts**: Files that are created here are intended to wrap pages and templates. This is where you would reference a navigation bar, footer, etc.

This is the place where we will create a navigation bar, footer, and other components that are meant to be visible on all pages of our Gridsome site.

Assuming you have followed the [previous tutorial](/blog/how-to-build-a-personal-developer-blog-with-vue-js-gridsome-and-vuetify-part-1), you should see a file called `Default.vue`. We will work in this file for our layout that will be used in all of our pages.

Remove everything inside of the `<template>` and `<style>` tag for now and replace it with the below code. 

```html
// Default.vue
<template>
  <v-app>
    <AppBar />

    <ScrollToTop />

    <v-main>
      <slot name="home" />
      <v-container fluid>
        <v-row>
          <v-col sm="6" offset-sm="3">
            <slot />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import AppBar from '~/components/AppBar';
import ScrollToTop from '~/components/ScrollToTop';
import Footer from '~/components/Footer';

export default {
  components: {
    AppBar,
    ScrollToTop,
    Footer
  }
};
</script>
```

While utilizing Vuetify, it's always a good idea to have an entry point to our "app". It's actually a required component in Vuetify. We can accomplish this with the `<v-app>` component. Feel free to read more about this component [here](https://vuetifyjs.com/en/components/application/#application). The components `<AppBar />`, `<ScrollToTop />` and `<Footer />` are customly written components that we will write soon. It's always a good idea to write reusable Vue files into [components](https://gridsome.org/docs/components/#import-to-other-pages-or-components) to help organize your project.