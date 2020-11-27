---
title: How to build a personal developer blog with Vue.js, Gridsome and Vuetify (Part 6)
category: Coding
excerpt: In part 6 of the Gridsome blog series, we'll start to build out the blog page and template and style them with CSS accordingly.
created: 2020-10-15
keywords: 'HTML,CSS,JavaScript,JSON,Vue,Gridsome,Vuetify,GraphQL,Netlify'
image: ../images/gridsome-tut/gridsome-blog-tutorial-p6.png
image_caption: Photo by Josh Arrants
author: author1
---

Welcome to part 6 of the Gridsome personal developer blog tutorial series! In part 6, we'll start to build out the blog page and template and style them with CSS accordingly.

- [Blog Page](#blog-page)
- [Blog Template](#blog-template)
- [Conclusion](#conclusion)

## Blog Page

In the last part of this series, we successfully created a blog post (w/ markdown) with an author and a category attached to it. Now we can view these blog posts on a page in our Gridsome site for users to view them in a collection and click on them to view the single blog post itself.

Create a file inside of the `pages/` directory called `Blog.vue`.

```html {codeTitle: "src/pages/Blog.vue"}
<template>
  <Layout>
    <h1 class="display-3 font-weight-bold my-5 text-center">Blog</h1>

    <v-responsive class="mx-auto mb-8" width="56">
      <v-divider class="mb-1"></v-divider>

      <v-divider></v-divider>
    </v-responsive>

    <div v-for="edge in $page.blogs.edges" :key="edge.node.id">
      <v-row class="my-8">
        <v-col md="4">
          <g-link :to="edge.node.path">
            <v-img
              :src="edge.node.image"
              :alt="edge.node.image_caption"
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
                  :to="edge.node.path"
                  class="black--text"
                  :class="hover ? 'text-decoration' : 'text-decoration-none'"
                >
                  {{ edge.node.title }}
                </g-link>
              </v-card-title>
            </v-hover>

            <v-card-subtitle>
              {{ formatDate(edge.node.created) }} |
              <g-link
                :to="edge.node.category.path"
                class="text-decoration-none green--text text--darken-4"
              >
                {{ edge.node.category.title }}
              </g-link>
            </v-card-subtitle>

            <v-card-text>
              {{ edge.node.excerpt }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </Layout>
</template>

<page-query>
query {
  blogs: allBlog (sortBy: "created") {
    edges {
      node {
        id
        title
        path
        content
        image
        image_caption
        excerpt
        created
        category {
          title
          path
        }
        author {
          name
        }
      }
    }
  }
}
</page-query>

<script>
import * as timeago from 'timeago.js';

export default {
  metaInfo: {
    title: 'Blog'
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
  word-break: normal; /* maybe !important */
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

There's quite a lot to cover on this page. I'll first note that I'm using an external npm package called `timeago.js` to format our dates into a readable date for our users. The GraphQL generated field `created` looks bad on the front-end itself, so this lightweight package will help us to format our the date that our blog posts were created correctly. Read the documentation for `timeago.js` [here](https://timeago.org/). Feel free to install any other formatting package you'd like. You can install `timeago.js` into your project with this command:

```bash
npm install timeago.js
```

Using `timeago.js`, I've simply created a method called `formatDate(date)` which accepts any valid date and formats it. You're now able to use this method in the `<template>` and pass in `edge.node.created`. 

Inside of `<page-query>`, we are using a query that is almost identical to the GraphQL queries we wrote in the [last tutorial](/blog/how-to-build-a-personal-developer-blog-with-vue-js-gridsome-and-vuetify-part-5/#gridsomes-graphql-explorer). We are simply grabbing all existing _Blog_ nodes and displaying them on the browser. There are a few differences in this query, such as the `sortBy: "created"` snippet and that we are renaming the query to `blogs` instead of using the default name `allBlog`. `sortBy: "created"` will organize all _Blog_ nodes by the date it was created, which makes sense. Renaming our query to `blogs` means that we can write `$page.blogs.edges` instead of `$page.allBlog.edges`. This looks a bit cleaner in my opinion.

After writing our GraphQL query inside of `Blog.vue`, Gridsome allow us to grab the data from this query using `$page` inside of our `<template>`. This enables us to loop through all available posts using Vue's `v-for` directive and display all the posts on the site. However, inside of a `<script>` tag, we'd need to append `$page` with `this.$page`. This syntax will be useful for when we need to change or add information to `<meta>` for SEO purposes.

You may have noticed that we are linking to a _Category_ path that does not exist at the moment. We will be writing a `Category.vue` template in later tutorials to organize our blogs into categories if the user is interested in reading blog posts that are aimed on one specific topic or field.

I've also added a CSS animation to add a `:hover` effect to our images. Feel free to change around the values as you'd like!

Let's move on to creating the `Blog.vue` template, which will actually display the content of our blog posts!

## Blog Template

Now we can create a file that will grab only one blog post based on what the user selected in the `Blog.vue` page. The name of our file here is important and must not change. Otherwise, Gridsome will not know what file needs to be read in order to grab one single blog post from the _Blog_ GraphQL collection. Create a file inside of the `templates/` directory called `Blog.vue`.

```html {codeTitle: "src/templates/Blog.vue"}
<template>
  <Layout>
    <section id="title">
      <div class="my-8">
        <h1 class="display-2 font-weight-bold text-center">
          {{ $page.blog.title }}
        </h1>
        <div class="d-flex justify-center mt-6">
          <h4 class="font-weight-light text-xs-body-1">
            {{ $page.blog.author.name }}
          </h4>
          <p class="px-2">|</p>
          <h4 class="font-weight-light text-xs-body-1">
            {{ $page.blog.humanTime }}
          </h4>
          <p class="px-2">|</p>
          <h4 class="font-weight-light text-xs-body-1">
            Posted in
            <g-link
              :to="$page.blog.category.path"
              class="text-decoration-none green--text text--darken-4"
            >
              {{ $page.blog.category.title }}
            </g-link>
          </h4>
        </div>
      </div>
    </section>

    <section id="image" class="mb-12">
      <v-img :src="$page.blog.image" :alt="$page.blog.image_caption">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <p class="subheading font-italic text-center mt-4 grey--text">
        {{ $page.blog.image_caption }}
      </p>
    </section>

    <v-responsive class="mx-auto mb-8" width="56">
      <v-divider class="mb-1 grey lighten-1"></v-divider>

      <v-divider class="grey lighten-1"></v-divider>
    </v-responsive>

    <div
      class="text-md-h6 font-weight-regular px-2 markdown"
      v-html="$page.blog.content"
    ></div>
  </Layout>
</template>

<page-query>
  query ($id: ID!) {
    blog (id: $id) {
      title
      path
      image
      image_caption
      keywords
      excerpt
      category {
        title
        path
      }
      content
      humanTime : created(format: "MMMM Do YYYY")
      author {
        name
      }
    }
  }
</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.blog.title,
      meta: [
        { name: 'author', content: this.$page.blog.author.name },
        { name: 'description', content: this.$page.blog.excerpt },
        { name: 'keywords', content: this.$page.blog.keywords }
      ]
    };
  },
};
</script>

<style scoped>
/* https://medium.com/@brockreece/scoped-styles-with-v-html-c0f6d2dc5d8e */
.markdown {
  line-height: 35px;
}

.markdown >>> ul:first-child {
  margin: 2rem 0 2rem 2rem;
}

.markdown >>> blockquote {
  font-size: 18px;
  margin: 10px 0 10px 30px;
  padding-left: 15px;
  border-left: 3px solid #ccc;
}

.markdown >>> a {
  color: black;
}

.markdown >>> h2 {
  margin: 1.5rem 0 1.5rem 0;
}

.markdown >>> .gridsome-highlight {
  font-size: 17px;
  margin: 0 0 3rem 0;
}

.markdown >>> p {
  margin: 2rem 0 2rem 0;
}

.markdown >>> ul > li > p {
  margin: 0;
}

.markdown >>> .language-text {
  background-color: #ddd;
  color: black;
}

.markdown >>> .gridsome-code-title {
  position: relative;
  z-index: 1;
  background-color: #66b13d;
  color: black;
  font-style: normal;
  font-size: 22px;
  text-align: left;
  line-height: 1.5;
  border-top-left-radius: 0.3em;
  border-top-right-radius: 0.3em;
}

.markdown >>> img[src*='#thumbnail'] {
  display: block;
  margin: auto;
  width: 100%;
}

/**
 * Remove the default PrismJS theme background-color, border-radius, margin,
 * padding and overflow.
 * 1. Make the element just wide enough to fit its content.
 * 2. Always fill the visible space in .gridsome-highlight.
 * 3. Adjust the position of the line numbers
 */
.markdown >>> .gridsome-highlight pre[class*='language-'] {
  background-color: transparent;
  margin: 0;
  padding: 0;
  overflow: initial;
  float: left;
  min-width: 100%;
}

.markdown >>> .gridsome-highlight pre[class*='language-'].line-numbers {
  padding-left: 2.8em;
  margin-top: 1rem;
}
</style>
```

Templates in Gridsome are meant to be used to single blog post views of GraphQL collections. In this file, that is exactly what we're doing. Our GraphQL query, located inside of `<page-query>`, is searching for a single _Blog_ node based on an ID, which is collected from the previous web page, `Blog.vue` in the `pages/` folder.

There's a lot of CSS tweaking going on inside of `<style scoped>`. This is needed to properly format our parsed markdown content into a great looking blog post! However, there's a slight issue when working with scoped styles inside of a `v-html` parsed directive in Vue. Luckily, after a few days of searching for a solution, I found this [article](https://medium.com/@brockreece/scoped-styles-with-v-html-c0f6d2dc5d8e) written by Brock Reece. It introduces a new feature I did not know existed in Vue.js called the **Deep Selector**. This allows us to style individual components of our parsed markdown content using this new syntax created by the founder of Vue.js, Evan You.

You may have noticed that our `metaInfo()` property inside of the `<script>` tag looks a bit different that what we've been using before, `metaInfo:`. In our case, we need to [dynamically change](https://gridsome.org/docs/head/#add-head-meta-data-to-pages--templates) the information on `<meta>` tags depending on what blog post we're fetching from the GraphQL data layer. If you wish to access `this.$page` or any data on a component/page, we need to make `metaInfo` a function.

## Conclusion

That should do it for this part of the Gridsome blog tutorial series! Thank you for reading this far and I hope you are enjoying the content so far! Please leave any questions or thoughts down in the comments section below. In [part 7](/blog/how-to-build-a-personal-developer-blog-with-vue-js-gridsome-and-vuetify-part-7/), we'll build out the Category template which will allow our users to find blog post content that is specifically aimed at a single topic or field.