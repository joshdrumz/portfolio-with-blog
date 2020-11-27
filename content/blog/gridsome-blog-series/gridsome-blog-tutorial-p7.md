---
title: How to build a personal developer blog with Vue.js, Gridsome and Vuetify (Part 7)
category: Coding
excerpt: In part 7 of the Gridsome blog series, we'll start to build out the Category template which will allow our users to find blog post content that is specifically aimed at a single topic.
created: 2020-10-16
keywords: 'HTML,CSS,JavaScript,JSON,Vue,Gridsome,Vuetify,GraphQL,Netlify'
image: ../images/gridsome-tut/gridsome-blog-tutorial-p7.png
image_caption: Photo by Josh Arrants
author: author1
---

Welcome to part 7 of the Gridsome personal developer blog tutorial series! In part 6, we'll start to build out the Category template which will allow our users to find blog post content that is specifically aimed at a single topic or field.

- [Category Template](#category-template)
- [Conclusion](#conclusion)

## Category Template

Now we have the ability to create a path in our Gridsome site that display blog posts by its assigned category. This will help our users find blog post content that is related to specific topics. In our site, the `category/<category name>/` path will only be accessible through a link on the Blog page or Blog template. This is available as `$page.blog.category.path`.

Before we start building the Category template, let's create one more blog post that is assigned under a different category.

Create a markdown file inside of the `blog/` directory called `code-post.md`.

```md {codeTitle: "content/blog/code-post.md"}
---
title: My First Code Post!
category: Coding
excerpt: Welcome to my first code related post!
created: 2020-11-04
keywords: 'HTML,CSS,JavaScript,JSON,Vue,Gridsome,Vuetify,GraphQL,Netlify'
image: ../images/code-post/code.png
image_caption: Photo by John Doe
author: author1
---

## Introduction

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Code Example


    function copyToClipboard(str) {
      const el = document.createElement('textarea');

      el.value = str;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';

      document.body.appendChild(el);

      const selected =
        document.getSelection().rangeCount > 0
          ? document.getSelection().getRangeAt(0)
          : false;

      el.select();

      document.execCommand('copy');
      document.body.removeChild(el);
      if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
      }
    }


## Conclusion

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```

Inside of the `Code Example` section, also make sure to wrap that JavaScript code in a [fenced code block](https://www.markdownguide.org/extended-syntax#fenced-code-blocks). Unfortunately, I could not show that here due to some issues in syntax highlighting on my end. Regarding the image, you can use any coding related image you want by going to [unsplash.com](https://unsplash.com/) and search "Coding".

Notice how our `category` field is different from **Personal**. It is now **Coding**. Remember, once a new _Blog_ node has been created, a new _Category_ node will also be created, if it did not previously exist. Now, we should have two _Category_ nodes that are available in the GraphQL data layer, **Personal** and **Coding**.

Let's start to create the Category template now that we have two _Category_ nodes to work with.

Create a file inside of the `templates/` directory called `Category.vue`.

```html {codeTitle: "src/templates/Category.vue"}
<template>
  <Layout>
    <h1 class="display-3 font-weight-bold my-5 text-center">
      Category | {{ $page.category.title }}
    </h1>

    <v-responsive class="mx-auto mb-8" width="56">
      <v-divider class="mb-1"></v-divider>

      <v-divider></v-divider>
    </v-responsive>

    <div
      v-for="element in $page.category.belongsTo.edges"
      :key="element.node.id"
    >
      <v-row class="my-8">
        <v-col md="4">
          <g-link :to="element.node.path">
            <v-img
              :src="element.node.image"
              :alt="element.node.image_caption"
              class="v-img-zoom"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </g-link>
        </v-col>
        <v-col md="8">
          <v-card elevation="0">
            <v-hover v-slot:default="{ hover }">
              <v-card-title>
                <g-link
                  :to="element.node.path"
                  class="black--text"
                  :class="hover ? 'text-decoration' : 'text-decoration-none'"
                >
                  {{ element.node.title }}
                </g-link>
              </v-card-title>
            </v-hover>

            <v-card-subtitle>
              {{ formatDate(element.node.created) }}
            </v-card-subtitle>

            <v-card-text>
              {{ element.node.excerpt }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  category (id: $id) {
    title
    belongsTo (sortBy: "created") {
      edges {
        node {
          ... on Blog {
            id
            title
            excerpt
            path
            image
            image_caption
            created
          }
        }
      }
    }
  }
}
</page-query>

<script>
import * as timeago from 'timeago.js';

export default {
  metaInfo() {
    return {
      title: this.$page.category.title
    };
  },
  methods: {
    formatDate(date) {
      return timeago.format(date);
    }
  }
};
</script>

<style scoped>
.v-img-zoom {
  transition: transform 0.4s, filter 0.4s ease-in-out;
  filter: brightness(80%);
}

.v-img-zoom:hover {
  filter: brightness(100%);
  transform: scale(1.1);
}

/* https://github.com/vuetifyjs/vuetify/issues/9130 */
.v-card__text,
.v-card__title {
  word-break: normal; /* maybe !important  */
}

/* Phones */
@media only screen and (max-width: 600px) {
  .v-img-zoom {
    filter: brightness(100%);
  }
  .v-img-zoom:hover {
    transform: scale(1.05);
  }
}
</style>
```

This template is quite similar to the Blog page, where we are viewing all available _Blog_ nodes and displaying them. Our GraphQL query here is a bit more complicated but just understand that since the _Category_ collection directly depends on the _Blog_ collection, this is the query that needs to be written. However, recall the purpose of a template in Gridsome. It's meant for the viewing of **single** node views. In a way, we are still doing that, in which are viewing all available _Blog_ nodes that are assigned to one single _Category_ node. If you understood how the [Blog page](/blog/how-to-build-a-personal-developer-blog-with-vue-js-gridsome-and-vuetify-part-6/#blog-page) works, this template should be easier to understand as well.

## Conclusion

That should do it for this part of the Gridsome blog tutorial series! Thank you for reading this far and I hope you are enjoying the content so far! Please leave any questions or thoughts down in the comments section below. In [part 8](/blog/how-to-build-a-personal-developer-blog-with-vue-js-gridsome-and-vuetify-part-8/), we'll add some additional features to our blog such as pagination and a copy code button!