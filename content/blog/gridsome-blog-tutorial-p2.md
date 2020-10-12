---
title: How to build a personal developer blog with Vue.js, Gridsome and Vuetify (Part 2)
category: Coding
excerpt: In part 2 of the Gridsome blog series, we'll start building a layout and pages!
created: 2020-10-11
image: ./images/how-to-vue-gridsome-vuetify.png
image_caption: Photo by Josh Arrants
author: author1
---

- [Prerequisites](#prerequisites)

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