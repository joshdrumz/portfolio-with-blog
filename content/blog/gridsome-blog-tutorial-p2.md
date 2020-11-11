---
title: How to build a personal developer blog with Vue.js, Gridsome and Vuetify (Part 2)
category: Coding
excerpt: In part 2 of the Gridsome blog series, we'll start building a layout for our Gridsome site.
created: 2020-10-11
keywords: 'HTML,CSS,JavaScript,JSON,Vue,Gridsome,Vuetify,GraphQL'
image: ./images/gridsome-blog-tutorial-p2.png
image_caption: Photo by Josh Arrants
author: author1
---

- [Prerequisites](#prerequisites)
- [Building a Layout](#building-a-layout)
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

## Building a Layout

Let's recall what the purpose of a [layout](https://gridsome.org/docs/layouts/#layouts) is in Gridsome:

> **/layouts**: Files that are created here are intended to wrap pages and templates. This is where you would reference a navigation bar, footer, etc.

This is the place where we will create a navigation bar, footer, and other components that are meant to be visible on all pages of our Gridsome site.

Assuming you have followed the [previous tutorial](/blog/how-to-build-a-personal-developer-blog-with-vue-js-gridsome-and-vuetify-part-1), you should see a file called `Default.vue`. We will work in this file for our layout that will be used in all of our pages.

Remove everything inside of the `<template>` and `<style>` tag for now and replace it with the below code. 

```html {codeTitle: "src/layouts/Default.vue"}
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

You may have noticed the extra `<slot />` tag above the `<v-container>` tag. We will utilize this for our pieces of UI that we want to place outside of the limited width specified in the container (i.e. an image that takes the width of the entire window). If you're unfamilar with how slots work in Gridsome, please read about it [here](https://gridsome.org/docs/layouts/#multiple-content-slots).

Now, let's build out an app bar for users to easily navigate our site.  
Create a file in the `components/` folder called `AppBar.vue` and place this code inside of it.

```html {codeTitle: "src/components/AppBar.vue"}
<template>
  <v-app-bar app dark dense hide-on-scroll elevate-on-scroll>
    <v-btn icon>
      <g-link to="/">
        <v-icon>mdi-code-tags</v-icon>
      </g-link>
    </v-btn>

    <v-spacer />

    <template v-slot:extension>
      <v-tabs show-arrows centered fixed-tabs>
        <v-tabs-slider color="#65e620"></v-tabs-slider>
        <v-tab
          v-for="({ name, to }, i) in links"
          :key="i"
          :to="to"
          :ripple="{ class: 'green--text' }"
          >{{ name }}</v-tab
        >
      </v-tabs>
    </template>

    <v-spacer />

    <v-btn icon v-for="({ icon, to }, i) in socials" :key="i">
      <a :href="to" target="_blank" rel="noopener noreferrer nofollow">
        <v-icon>{{ icon }}</v-icon>
      </a>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { name: 'Home', to: '/' },
        { name: 'About', to: '/about' },
        { name: 'Blog', to: '/blog' },
        { name: 'Contact', to: '/contact' }
      ],
      socials: [
        {
          to: 'your LinkedIn URL here (or any social platform you want)',
          icon: 'mdi-linkedin'
        },
        { to: 'https://github.com/your-github/', icon: 'mdi-github' },
        { to: 'mailto:you@example.com', icon: 'mdi-email' },
        {
          to: '/',
          icon: 'mdi-file-document-outline'
        }
      ]
    };
  }
};
</script>

<style scoped>
.v-toolbar__title a {
  text-decoration: none;
  color: white;
}

.v-btn a {
  text-decoration: none;
  color: white;
}
</style>
```

`AppBar.vue` serves as a navigation bar that helps users easily navigate to our routes in the site. Feel free to change the colors around as you like! Notice the text inside of `<v-icon>`. Using Vuetify as our UI library inside of Gridsome, we have full access to the collection of icons from [Material Design Icons](https://materialdesignicons.com/). You may pick and choose from the material design icons website to your liking.

Notice the `<g-link>` tag. This is Gridsome's special element that generally serves as a wrapper for `<router-link>` from Vue Router. Using the `<g-link>` tag in our Gridsome app helps load pages very fast because the clicked page is already downloaded.
However, for linking to external sites (LinkedIn, Github), Gridsome recommends to use a normal anchor tag. Read more [here](https://gridsome.org/docs/linking/) if you're interested.

Let's also create our footer that will be present on all pages of our site.  
Create a file in the `components/` folder called `Footer.vue` and place this code inside of it.

```html {codeTitle: "src/components/Footer.vue"}
<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile>
      <v-card-title class="teal">
        <strong class="subheading">Connect with me!</strong>

        <v-spacer></v-spacer>

        <v-btn v-for="icon in icons" :key="icon.to" class="mx-4" dark icon>
          <a :href="icon.to" target="_blank" rel="noopener noreferrer nofollow">
            <v-icon size="24px">
              {{ icon.icon }}
            </v-icon>
          </a>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>Your Name Here</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      icons: [
        {
          to: 'your LinkedIn URL here (or any social platform you want)',
          icon: 'mdi-linkedin'
        },
        { to: 'https://github.com/your-github/', icon: 'mdi-github' }
      ]
    };
  }
};
</script>

<style scoped>
.v-btn a {
  text-decoration: none;
  color: white;
}
</style>
```

If you'd like the footer to be in a static position (moving with the scrollbar), you can add the `app` prop in the `<v-footer>` tag. Our `<style>` tag has some CSS to change the default styling of the `<a>` tag. We are simply removing the default underline on a hyperlink and changing the font color.

Now, we can create the `<ScrollToTop />` component. This is a component that will add a floating action button at the bottom of the page whenever the user scrolls towards the bottom of the page. On click, the user will be smoothly transitioned back to the top of the page. This sort of functionality is commonly found on documentation and blog websites.

```html {codeTitle: "src/components/ScrollToTop.vue"}
<template>
  <transition name="bounce">
    <v-btn
      class="md-5 mr-3"
      dark
      fab
      bottom
      right
      color="#00796B"
      fixed
      @click="scrollToTop"
      v-if="userScrolled"
    >
      <v-icon dark>mdi-chevron-up</v-icon>
    </v-btn>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      userScrolled: false
    };
  },
  methods: {
    scrollToTop() {
      // https://dev.to/vvo/how-to-solve-window-is-not-defined-errors-in-react-and-next-js-5f97
      if (typeof window !== 'undefined') {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
    },
    showButton() {
      if (typeof window !== 'undefined') {
        if (window.scrollY > 0) {
          this.userScrolled = true;
        } else if (window.scrollY <= 0) {
          this.userScrolled = false;
        }
      }
    }
  },
  created() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.showButton);
    }
  }
};
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}
</style>
```

In this component, we are accessing some properties of the browser window to check for when the user scrolls down, and attaching that functionality to a floating action button. However, since we are working in a Node.js environment, window is not defined. There is a workaround for this, detailed in this [article](https://dev.to/vvo/how-to-solve-window-is-not-defined-errors-in-react-and-next-js-5f97).

## Conclusion

I think that should be enough for this part of the tutorial. We have successfully built a layout that will wrap around each one of our pages. Thank you for reading this far if you have and I look forward to reading your comments and inquiries!

In [part 3](/blog/how-to-build-a-personal-developer-blog-with-vue-js-gridsome-and-vuetify-part-3/), we'll start building out some pages for our developer blog!