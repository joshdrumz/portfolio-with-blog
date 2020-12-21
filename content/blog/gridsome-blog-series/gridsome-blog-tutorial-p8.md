---
title: How to build a personal developer blog with Vue.js, Gridsome and Vuetify (Part 8)
category: Coding
excerpt: In part 8 of the Gridsome blog series, we'll add some additional features to our blog such as pagination and a copy code button!
created: 2020-10-17
keywords: 'HTML,CSS,JavaScript,JSON,Vue,Gridsome,Vuetify,GraphQL,Netlify'
image: ../images/gridsome-tut/gridsome-blog-tutorial-p8.png
image_caption: Photo by Josh Arrants
author: author1
---

Welcome to part 8 of the Gridsome personal developer blog tutorial series! In part 8, we'll add some additional features to our blog such as pagination and a copy code button. This is also the last part of the Gridsome blog tutorial series! Thank you for following this far and I hope you've enjoyed the content. Please leave any questions or thoughts down in the comments section below.

- [Pagination](#pagination)
- [Copy Code Button](#copy-code-button)
- [Dark Mode](#dark-mode)
- [Conclusion](#conclusion)

## Pagination

Pagination is usually a feature that is more complicated to add than it should be. Luckily, Gridsome and GraphQL make this feature extremely easy. Gridsome has it's own built-in `Pager` component for easy pagination. We'll be importing this component and using it on our `Blog.vue` and `Category.vue` template. You can read about how pagination works in Gridsome [here](https://gridsome.org/docs/pagination/#paginate-data).

Let's edit our `Blog.vue` page (located in `src/pages/`) to include a pagination feature!  
First, we'll need to edit our current GraphQL query a bit.

```graphql {2-7}
# src/pages/Blog.vue
query ($page: Int) {
  blogs: allBlog (sortBy: "created", perPage: 5, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
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
```

Here, we're using the `@paginate` directive to add automatic pagination for our _Blog_ collection. We need to pass in a `$page: Int` parameter variable to load sources for a specific page. Then, we're defining how many _Blog_ nodes should appear per page, using the `perPage` option. We'll also need to pass in the `$page` parameter into the `page` option we just defined. Make sure to also include a `pageInfo` field inside the query with both subfields, `totalPages` and `currentPage`.

Now we can use the built-in `Pager` component from Gridsome we touched on previously.  
First, import the `Pager` component and register it in `components`.

```html {2,9-11}{codeTitle: "Inside script tag"}
<script>
import { Pager } from 'gridsome';
import * as timeago from 'timeago.js';

export default {
  metaInfo: {
    title: 'Blog'
  },
  components: {
    Pager
  },
  methods: {
    formatDate(date) {
      return timeago.format(date);
    }
  }
};
</script>
```

Second, place the Pager component below the last `<div>`, but not before `</Layout>`.

```html {codeTitle: "Inside template tag"}
   <div class="text-center">
      <Pager :info="$page.blogs.pageInfo" class="pagination" />
    </div>
  </Layout>
</template>
```

At this point, the pagination functionality should be working! However, it looks quite ugly. Let's target that class of `pagination` we assigned to the `Pager` component and add some quick styles. You can place this CSS anywhere inside of the `<style scoped>` tag inside of the `Blog.vue` page.

```css
/* Pagination styling */
.pagination {
  display: inline-block;
}

.pagination a {
  color: black;
  float: left;
  font-size: 22px;
  padding: 8px 16px;
  margin: 0 4px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.pagination a.active {
  background-color: #4caf50;
  border-radius: 5px;
  color: white;
}

.pagination a:hover:not(.active) {
  background-color: #ddd;
}
```

To see your pagination functionality in full action, you'll need to write a few more blog posts. In this case, a total of six blog posts is needed to see our pagination taking effect, since the `perPage` option was set to five. You could also change the `perPage` option to a slightly lesser number if you'd like for testing purposes.

Perfect! Let's also add pagination to our Category template page!

Open our `Category.vue` template (located in `src/templates/`) and edit the GraphQL query to include pagination.

```graphql
# src/templates/Category.vue
query ($id: ID!, $page: Int) {
  category (id: $id) {
    title
    belongsTo (sortBy: "created", perPage: 5, page: $page) @paginate {
      pageInfo {
        totalPages
        currentPage
      }
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
```

This query adds the same pagination functionality as the previous one, so I won't go into detail here.

Next, import the `Pager` component and register it in `components`.

```html {2,11-13}{codeTitle: "Inside script tag"}
<script>
import { Pager } from 'gridsome';
import * as timeago from 'timeago.js';

export default {
  metaInfo() {
    return {
      title: this.$page.category.title
    };
  },
  components: {
    Pager
  },
  methods: {
    formatDate(date) {
      return timeago.format(date);
    }
  }
};
</script>
```

Second, place the Pager component below the last `<div>`, but not before `</Layout>`, just as we have done previously, the only difference being what we pass into it.

```html {codeTitle: "Inside template tag"}
   <div class="text-center">
      <Pager :info="$page.category.belongsTo.pageInfo" class="pagination" />
    </div>
  </Layout>
</template>
```

Finally, make sure to add the same CSS to the `Pager` component in `<style scoped>`.

## Copy Code Button

Another feature I'd like to share with you is a "Copy Code" button. I've always found it annoying to highlight over a bunch of text in a programming-related tutorial just to copy it. With this feature, we'll add a button to each syntax highlighted fenced code block in our markdown posts that allows a user to copy that code to their clipboard. Let's dive in!

We only need to add this feature inside of our `Blog.vue` template, since all fenced code blocks reside there. First, we'll need to access the DOM to select all fenced code blocks and add a button to them. Below the `data()` function inside of the `<script>` tag, add a `mounted()` lifecycle hook with this code inside of it. If you're unfamiliar with lifecycle hooks with Vue.js, read about it [here](https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks).

```js {codeTitle: "mounted()"}
mounted() {
  const highlights = document.querySelectorAll('.gridsome-highlight');

  highlights.forEach(div => {
    const copyBtn = document.createElement('button');
    const language = div.attributes[1].value;
    copyBtn.innerHTML = `Copy ${language}`;
    copyBtn.addEventListener('click', this.handleCopyClick);
    div.append(copyBtn);
  });
},
```

In this piece of code, we're selecting all fenced code blocks, which is a class called `.gridsome-highlight`, and then looping through all of them and adding a button each iteration. Each `.gridsome-highlight` element has a `language` property that tells us which language is being used in that specific fenced code block. We're also adding an event listener that runs a method called `handleCopyClick` when the user clicks the button.

Below `mounted()`, let's write out the `handleCopyClick` method.

```js {codeTitle: "handleCopyClick()"}
methods: {
  handleCopyClick(e) {
    const { children } = e.target.parentElement;
    const { innerText } = Array.from(children)[0];
    this.copyToClipboard(innerText);
  },
}
```

With some destructuring, we can access the code itself within a `.gridsome-highlight` element. Now we have to implement the functionality to copy that code to the user's clipboard.

Write another method under `handleCopyClick` called `copyToClipboard`.

```js {codeTitle: "copyToClipboard()"}
copyToClipboard(str) {
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
```

Here, we're interacting with the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard) and implementing the functionality to allow the user to copy our tutorial code to their clipboard. Please note that this API is not supported in Internet Explorer.

We also need to style this button a little bit. Add this piece of CSS anywhere in your `<style scoped>` tag.

```css
.markdown >>> .gridsome-highlight button {
  color: #adb5bd;
  box-sizing: border-box;
  transition: 0.5s ease-out;
  cursor: pointer;
  user-select: none;
  background: rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0);
  padding: 5px 10px;
  font-size: 0.8em;
  position: absolute;
  margin-top: 1rem;
  top: 0;
  right: 1rem;
  border-radius: 0 0.15rem;
}
```

It'd also be nice if we alerted the user that they have successfully copied our code. Let's start by adding a boolean flag in `data()` called `showAlert` that will initially equal `false`. This property will represent whether our alert should be shown or not.

```js {codeTitle: "data()"}
data() {
  return {
    showAlert: false
  };
},
```

Once the code has been successfully copied, we should be changing `showAlert` to `true`. This can be placed inside of our `handleCopyClick` method.

```js {4}{codeTitle: "handleCopyClick()"}
handleCopyClick(e) {
  const { children } = e.target.parentElement;
  const { innerText } = Array.from(children)[0];
  this.showAlert = true;
  this.copyToClipboard(innerText);
},
```

Let's now add an alert to the webpage to tell the user that they've successfully copied our code. Add a Vuetify `v-alert` element to the top of our template.

```html {codeTitle: "Inside template tag"}
<template>
  <Layout>
    <template slot="home">
      <v-alert
        border="left"
        colored-border
        dismissible
        type="success"
        elevation="2"
        transition="scale-transition"
        :value="showAlert"
        @click="showAlert = false"
      >
        Code copied!
      </v-alert>
    </template>
```

I utilized the `home` slot so that the alert is placed outside of the container. `v-alert` will only show if `showAlert` is equal to `true`. Notice the `dismissible` prop inside of `v-alert`. This allows the user to exit or "dismiss" the alert so it isn't permanently placed on the page. However, we need to make sure `showAlert` is changed to false when the user dismisses the alert. This is done with a `@click` event.

Lastly, I'll add a few slight CSS tweaks to make sure it looks good on mobile, etc.

```css
.v-alert {
  position: fixed;
  z-index: 1;
  width: 20%;
  top: 10em;
  right: 2em;
}

/* Phones */
@media only screen and (max-width: 600px) {
  .v-alert {
    width: 45%;
    top: 8em;
  }
}
```

That should do it! Refresh the page or restart the development server to see these changes!

## Dark Mode

The last feature we'll cover is Dark Mode. Everyone loves a webpage with dark mode, right? Luckily, Vuetify makes this feature extremely easy to implement. The only slip-up we might encounter is with some of the custom CSS we placed in our project (specifically in the `Blog.vue` template, for example). We can target the Vuetify instance itself to grab the theme property and toggle it from light to dark with some easy JavaScript.

Let's first dive into our navigation bar and place a button on the top of the page that will serve as a toggle between the light and dark themes.

Open up `AppBar.vue` and add this button under the last `<v-spacer />` element inside of `<template>`.

```html {3-10}{numberLines: 25}{codeTitle: "src/components/AppBar.vue"}
<v-spacer />

<v-btn icon @click="toggleDarkMode">
  <div v-if="!$vuetify.theme.dark">
    <v-icon>mdi-moon-waning-crescent</v-icon>
  </div>
  <div v-else>
    <v-icon>mdi-white-balance-sunny</v-icon>
  </div>
</v-btn>

<v-btn icon v-for="({ icon, to }, i) in socials" :key="i">
  <a :href="to" target="_blank" rel="noopener noreferrer nofollow">
    <v-icon>{{ icon }}</v-icon>
```

Here, we're utilizing some Vue directives to conditionally render an icon inside the button based on Vuetify's current theme state. Also, notice how we're able to access the state directly inside of the template with `$vuetify`. This access is automatically configured when we installed Vuetify into our project at the beginning of the series.

Inside of `<v-btn>`, we're placing an on click method called `toggleDarkMode`. This method will toggle between the light and dark themes and store the current theme state (a boolean value) into [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) so when the user comes back to our webpage, it will save their theme preference so they don't have to toggle themes each time they reload or revisit the site.

Let's write out the `toggleDarkMode` method now.  
Inside of the same file, place this chunk of code under the existing `data()` block.

```js
methods: {
  toggleDarkMode() {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    localStorage.setItem('dark_theme', this.$vuetify.theme.dark.toString());
  }
},
```

We also need to grab the user's set theme preference from `localStorage` each time the website is loaded. Let's do this functionality inside of a `mounted()` lifecycle hook.

Place this chunk of code under the `methods` block.

```js
mounted() {
  const theme = localStorage.getItem('dark_theme');
  if (theme) {
    theme == 'true'
      ? (this.$vuetify.theme.dark = true)
      : (this.$vuetify.theme.dark = false);
  }
}
```

For now, dark mode should be working! If you'd like to have your site default to dark mode, add this property in the `opts` object inside of `main.js`.

```js {codeTitle: "src/main.js"}
const opts = {
  theme: {
    dark: true
  }
}; // opts includes, vuetify themes, icons, etc.
```

You may have noticed that some of our pages look a bit weird when toggled to a darker shade. We'll need to fix these pages so that dark mode can look great on all pages of our site.

First, add a class of `white--text` to the `<v-tab>` element in our `AppBar.vue` component so that our route titles don't change to a blue color when toggled to dark mode.

```html {9}{numberLines: 11}{codeTitle: "src/components/AppBar.vue"}
<template v-slot:extension>
  <v-tabs show-arrows centered fixed-tabs>
    <v-tabs-slider color="#65e620"></v-tabs-slider>
    <v-tab
      v-for="({ name, to }, i) in links"
      :key="i"
      :to="to"
      :ripple="{ class: 'green--text' }"
      class="white--text"
      >{{ name }}</v-tab
    >
  </v-tabs>
</template>
```

Next, let's edit the `About.vue` page to look great on dark mode.  
Start with the `<section>` tag towards the top of the file.

```html {6}{numberLines: true}{codeTitle: "src/pages/About.vue"}
<template>
  <Layout>
    <template slot="home">
      <section
        id="about-me"
        :class="!$vuetify.theme.dark ? 'grey lighten-3' : 'grey darken-4'"
      >
        <div class="py-12"></div>
```

In this change, we're v-binding the `class` attribute to change based on the current theme state. In this case, the background of the about section should be a lighter gray when we're on light mode and a darker gray when dark mode is toggled.

Scroll further down the same file and change the `color` attribute of `<v-card>` with the same functionality as before.

```html {10}{numberLines: 78}
<v-row>
  <v-col
    v-for="({ icon, text, title, to }, i) in socials"
    :key="i"
    cols="12"
    md="4"
  >
    <v-card
      class="py-12 px-4"
      :color="!$vuetify.theme.dark ? 'grey lighten-2' : 'grey darken-4'"
      flat
    >
```

Next, let's now edit the `Blog.vue` page.  
Edit the `<v-card-title>` tag towards the middle of the `<template>` section. Make sure you remove the `<v-hover>` tag as well.

```html {4}{numberLines: 35}{codeTitle: "src/pages/Blog.vue"}
<v-card-title>
  <g-link
    :to="edge.node.path"
    :class="$vuetify.theme.dark ? 'white--text' : 'black--text'"
  >
    {{ edge.node.title }}
  </g-link>
</v-card-title>
```

In the same file, also add this quick snippet of CSS so the underline under the parsed `<g-link>` tag is removed.

```css
.v-card a {
  text-decoration: none;
}
```

Next, inside of the `Blog.vue` template, remove or comment this piece of CSS.

```css {codeTitle: "src/templates/Blog.vue"}
/* .markdown >>> a {
  color: black;
} */
```

Next, let's edit the `Category.vue` template.  
Edit the `<v-card-title>` tag towards the middle of the `<template>` section. Make sure you remove the `<v-hover>` tag just like before.

```html {4}{numberLines: 38}{codeTitle: "src/templates/Category.vue"}
<v-card-title>
  <g-link
    :to="element.node.path"
    :class="$vuetify.theme.dark ? 'white--text' : 'black--text'"
  >
    {{ element.node.title }}
  </g-link>
</v-card-title>
```

In the same file, also add the same piece of CSS as we added in the `Blog.vue` page.

```css
.v-card a {
  text-decoration: none;
}
```

Lastly, we'll need to edit the pagination stylings so that it is correctly displayed while the current theme state is dark. In our project, pagination is present on both the `Blog.vue` page and the `Category.vue` template. The easiest way to implement this is by v-binding the `class` attribute on the `<Pager />` component to switch between a `pagination` class when light mode is present and a `pagination-dark` class when dark mode is toggled.

Let's first edit the `Blog.vue` page.  
Start by copying all of the current pagination CSS and pasting it below while also inverting the necessary colors to reflect a dark mode presence.

```css {7,20,24}{codeTitle: "src/pages/Blog.vue"}
/* Pagination styling (dark) */
.pagination-dark {
  display: inline-block;
}

.pagination-dark a {
  color: white;
  float: left;
  font-size: 22px;
  padding: 8px 16px;
  margin: 0 4px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.pagination-dark a.active {
  background-color: #4caf50;
  border-radius: 5px;
  color: black;
}

.pagination-dark a:hover:not(.active) {
  background-color: rgb(114, 114, 114);
}
```

The only differences here are the three lines highlighted in the above code block. We're keeping all the same CSS properties while also inverting the colors.

Now we'll need to implement this change in the `<Pager />` component itself.

```html {3}{numberLines: 60}
<Pager
  :info="$page.blogs.pageInfo"
  :class="!$vuetify.theme.dark ? 'pagination' : 'pagination-dark'"
/>
```

Simply repeat these two edits for the `Category.vue` template file and you should be good to go!

![alt](https://res.cloudinary.com/josharrants/image/upload/v1608520530/josharrants.com/gridsome-blog-series/p8/dark-mode_jpzjpn.webp#thumbnail)


## Conclusion

That should be it for this series! Thank you for reading this far and I hope you are enjoyed following along! Please leave any questions or thoughts down in the comments section below. Please stay tuned for more programming related tutorial content similar to this series in the future!