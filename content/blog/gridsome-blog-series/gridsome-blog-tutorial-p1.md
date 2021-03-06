---
title: How to build a personal developer blog with Vue.js, Gridsome and Vuetify (Part 1)
category: Coding
excerpt: In this tutorial, we'll learn how to build a personal markdown based blog keeping the JAMstack convention in mind!
created: 2020-10-10
keywords: 'HTML,CSS,JavaScript,JSON,Vue,Gridsome,Vuetify,GraphQL'
image: ../images/gridsome-tut/gridsome-blog-tutorial-p1.png
image_caption: Photo by Josh Arrants
author: author1
---

Hello world! Thank you for taking the time to visit my blog page. 
This is the first programming related tutorial I have written.
I'm excited to begin my journey teaching others, just as I learned from content creators on YouTube and Udemy.
The site you are viewing now was also created using Vue.js, Gridsome, and Vuetify.

In this guide, I will show you how to create your very own blog using Gridsome!  
In part 1 of this series, we'll go through the setup and installation process of Gridsome and Vuetify.

- [Prerequisites](#prerequisites)
- [What is Vue.js?](#what-is-vuejs)
- [What is Gridsome?](#what-is-gridsome)
- [What is Vuetify?](#what-is-vuetify)
- [Installing Gridsome](#installing-gridsome)
- [Folder Structure](#folder-structure)
- [Setting up Vuetify in Gridsome](#setting-up-vuetify-in-gridsome)
- [Conclusion](#conclusion)

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

To enable these settings in VSCode, open your command pallette (Ctrl + Shift + P) and select `Vetur: Generate grammar from 'vetur.grammar.customBlocks'`. Then, open the command pallette once more and select `Developer: Reload Window`.

## What is Vue.js?

[Vue.js](https://vuejs.org/) is a JavaScript front-end framework that makes normal day-to-day JS related tasks
much easier for developers. Vue is noted as one of three JS front-end frameworks that are mostly used by 
developers, including React and Angular. Before learning any JS framework, it is highly recommended 
that you learn vanilla JS first, in order to know how everything works under the hood.

## What is Gridsome?

[Gridsome](https://gridsome.org/docs/) is a Vue.js powered [JAMstack](https://gridsome.org/docs/jamstack)
framework for building statically generated websites & apps that are [fast by default](https://gridsome.org/docs/fast-by-default/). 
Gridsome is the Vue alternative to Gatsby for React.
Fundamentally, Gridsome is "data-driven", meaning that it uses a GraphQL data layer to fetch data 
from various sources in order to dynamically generate pages from it.
In recent time, it has become a convention to build your websites and apps using the JAMstack
due to its better performance, higher security, lower cost of scaling, and an overall better developer experience.

## What is Vuetify?

[Vuetify](https://vuetifyjs.com/en/) is a Vue UI library that is based on [Material Design](https://en.wikipedia.org/wiki/Material_Design), a design language developed by Google in 2014. For the purposes of this project, Vuetify will help expedite the process of making our webpage look great by providing Material Design components that require almost no CSS tweaking.

## Installing Gridsome

To start installing Gridsome onto your local machine, open your terminal and make sure you have Node installed. I'd highly recommend opening your folder in VSCode and utilizing the [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal) to run commands with the text editor.

```bash
node --version && npm -v
```

You should see version numbers in the terminal, meaning it installed correctly. You should have Node v8.3 or higher installed for Gridsome to work properly.

![Node version numbers in terminal](https://res.cloudinary.com/josharrants/image/upload/v1606257150/josharrants.com/gridsome-blog-series/p1/version_numbers_terminal_n9mmjr.png#thumbnail)

Now, you can install the [Gridsome CLI](https://gridsome.org/docs/#1-install-gridsome-cli-tool) globally:

```bash
npm install --global @gridsome/cli
 // or
 yarn global add @gridsome/cli
```

After you're done installing that, create a new folder with the name of the project (personal-blog, dev-blog, etc.).
Make sure your terminal is located at the new directory you just created.
We will create a new Gridsome project inside this folder using this command:

```bash
gridsome create .
```

Once that's done installing, we can run the development server with:

```bash
gridsome develop
 // or
 npm run develop
```

Now our development server is accessible at [localhost:8080](http://localhost:8080).  
We can also access the GraphQL playground provided by Gridsome for testing out queries (will be used later)
at [localhost:8080/___explore](http://localhost:8080/___explore) (three underscores).

![Gridsome Home Page](https://res.cloudinary.com/josharrants/image/upload/v1606258444/josharrants.com/gridsome-blog-series/p1/gridsome-develop_b9qjhn.png#thumbnail)

## Folder Structure

Upon running `gridsome create .` you can see that many files were generated.  

```txt
.
├── static/
└── src/
    ├── components/
    ├── layouts/
    │   └── Default.vue
    ├── pages/
    │   ├── About.vue
    │   └── Index.vue
    ├── templates/
    ├── main.js
├── gridsome.config.js
├── gridsome.server.js
├── package.json
```

Let's examine what each file is used for in our project.

- `static/` - Files in this directory will be copied to `dist/` during a production build. For example, `static/robots.txt` will be located at https://example.com/robots.txt.
- `src/` - This directory contains most of the code that we will be building the site with.
  - `main.js` - Contains application configuration settings and has access to the **Client API**.
  - `components/` - Directory that holds reusable pieces of code for layouts and pages.
  - `layouts/` - Files that are created here are intended to **wrap** pages and templates. 
    This is where you would reference a navigation bar, footer, etc.
  - `pages/` - All components in this directory become pages of the website. Gridsome uses what is 
    called a **file-system based router** and will create a path based on the file name, specifically located in this directory. For example, `src/pages/Index.vue` is currently our home page located at [localhost:8080/](http://localhost:8080/) and `src/pages/About.vue` is our about page located at [localhost:8080/about/](http://localhost:8080/about/).
  - `templates/` - Templates are used for single blog post views (or anything else) of GraphQL collections. 
    Our project will look for a component in this directory to display a single blog post based on an ID.
    The name of the template file must match the name of a GraphQL collection.
- `gridsome.config.js` - This file contains configuration and options for installed plugins.
- `gridsome.server.js` - An optional file that is used to access various parts of the Gridsome server.
  It must export a function while will have access to the API.
- `package.json` - Standard Node.js JSON file that contains basic information about the project.

## Setting up Vuetify in Gridsome

In order to use Vuetify with our Gridsome project, we need to do a couple things.  
First, install vuetify:

```bash
npm install vuetify --save
```

Then, we'll need to register the Vuetify plugin, include the Vuetify CSS file, and add a link to the
head for Google's material design icons in your `main.js` file. We installed Vuetify v2 so we need to
configure our file for version 2. Replace the code in `src/main.js` with this:

```js {codeTitle: "src/main.js"}
// v2.0
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import DefaultLayout from '~/layouts/Default.vue';

export default function (Vue, { appOptions, head }) {
  head.link.push({
    rel: 'stylesheet',
    href: 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css',
  });
  
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900',
  });
  
  const opts = {}; // opts includes, vuetify themes, icons, etc.
  Vue.use(Vuetify);
  
  appOptions.vuetify = new Vuetify(opts);
  
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout);
}
```

In order to build a Gridsome app with Vuetify for production, we'll need to allowlist Vuetify in Webpack. 
First, install the `webpack-node-externals` package as a dev dependency:

```bash
npm install webpack-node-externals --save-dev
```

Now let's modify our `gridsome.server.js` file to include the package and allowlist Vuetify.

```js {8}{codeTitle: "gridsome.server.js"}
const nodeExternals = require('webpack-node-externals');

module.exports = function (api) {
  api.chainWebpack((config, { isServer }) => {
    if (isServer) {
      config.externals([
        nodeExternals({
          allowlist: [/^vuetify/]
        });
      ]);
    }
  });

  api.loadSource(store => {
    // Use the Data store API here: https://gridsome.org/docs/data-store-api
  });
}
```

> **Note**: Before webpack-node-externals version 2.4, use whitelist instead of allowlist.

You should notice that now our webpage looks a little different now that Vuetify is working.

![Vuetify working on Gridsome project site](https://res.cloudinary.com/josharrants/image/upload/v1606259120/josharrants.com/gridsome-blog-series/p1/init-vuetify_gtvmwh.png#thumbnail)

You can see that Vuetify's default styles have now been enabled and our webpage looks a bit weird at the moment. Of course we'll make it look great in future tutorials!

## Conclusion

In [part 2](/blog/how-to-build-a-personal-developer-blog-with-vue-js-gridsome-and-vuetify-part-2/), we'll start building out a layout for our developer blog!