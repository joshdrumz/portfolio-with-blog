---
title: How to build a personal developer blog with Vue.js, Gridsome and Vuetify (Part 3)
category: Coding
excerpt: In part 3 of the Gridsome blog series, we'll start building out some pages for our Gridsome site.
created: 2020-10-12
keywords: 'HTML,CSS,JavaScript,JSON,Vue,Gridsome,Vuetify,GraphQL'
image: ../images/gridsome-tut/gridsome-blog-tutorial-p3.png
image_caption: Photo by Josh Arrants
author: author1
---

Welcome to part 3 of the Gridsome personal developer blog tutorial series! In part 3, we'll start building out some pages for our Gridsome site. We'll start by changing the way our home (index) page looks as well as the about page. We'll also dive into a special component that will generate a cool typewriting effect on any text provided on the page.

- [Home Page](#home-page)
- [Typewriter Component](#typewriter-component)
- [About Page](#about-page)
- [Conclusion](#conclusion)

## Home Page

Let's first review what the `pages/` directory means in our Gridsome project.

> **pages/**: All components in this directory become pages of the website. Gridsome uses what is 
    called a **file-system based router** and will create a path based on the file name, specifically located in this directory. For example, `src/pages/Index.vue` is currently our home page located at [localhost:8080/](http://localhost:8080/) and `src/pages/About.vue` is our about page located at [localhost:8080/about/](http://localhost:8080/about/).

Ok, so now let's build out our home page. Again, feel free to customize these pages and layouts to your liking!
Delete whatever is already inside of `Index.vue` and replace it with this code.

```html {codeTitle: "src/pages/Index.vue"}
<template>
  <Layout>
    <template slot="home">
      <section id="hero">
        <v-parallax :src="require('@/assets/img/hero-bg.jpg')" height="850">
          <v-row align="center" justify="center">
            <v-col cols="12">
              <div class="text-center">
                <h1 class="display-1 text-lg-h1 font-weight-thin mb-4">
                  Your name is
                  <Typewriter />
                </h1>
                <blockquote class="blockquote">
                  “Talk is cheap. Show me the code.”
                </blockquote>
                <h4 class="subheading">- Linus Torvalds</h4>
                <v-btn
                  class="mt-8"
                  rounded
                  dark
                  large
                  outlined
                  @click="$vuetify.goTo('#projects', options)"
                >
                  Projects
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-parallax>
      </section>

      <section id="projects">
        <div class="py-10"></div>

        <v-container>
          <h2
            class="display-2 font-weight-bold mb-3 text-uppercase text-center"
          >
            Projects
          </h2>

          <v-responsive class="mx-auto mb-12" width="86">
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>
          <v-row>
            <v-col
              v-for="({ src, title, excerpt, demo, code }, i) in projects"
              :key="i"
              cols="12"
              md="4"
            >
              <v-img
                :src="src"
                class="mb-4"
                height="275"
                max-width="100%"
              ></v-img>

              <h3 class="font-weight-black mb-4 text-uppercase">{{ title }}</h3>

              <div class="title font-weight-light mb-5">{{ excerpt }}</div>

              <v-btn :href="demo" target="_blank" class="mr-4">
                <v-icon>mdi-wifi</v-icon>
                <div class="ml-2">Demo</div>
              </v-btn>
              <v-btn :href="code" target="_blank" class="mr-4">
                <v-icon>mdi-code-tags</v-icon>
                <div class="ml-2">Code</div>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </section>
    </template>
  </Layout>
</template>

<script>
import Typewriter from '~/components/Typewriter';

export default {
  components: {
    Typewriter
  },
  metaInfo: {
    title: 'Home'
  },
  data() {
    return {
      duration: 600,
      offset: -50,
      easing: 'easeInOutCubic',
      projects: [
        {
          src: require('@/assets/img/projects/your-picture-here.png'),
          title: 'Your project name here',
          excerpt: 'Your project description here',
          demo: 'link to your project demo here',
          code: 'link to your project repository here'
        },
        {
          src: require('@/assets/img/projects/your-picture-here.png'),
          title: 'Your project name here',
          excerpt: 'Your project description here.',
          demo: 'link to your project demo here',
          code: 'link to your project repository here'
        },
        {
          src: require('@/assets/img/projects/your-picture-here.png'),
          title: 'Your project name here',
          excerpt: 'Your project description here',
          demo: 'link to your project demo here',
          code: 'link to your project repository here'
        }
      ]
    };
  },
  computed: {
    options() {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing
      };
    }
  }
};
</script>
```

There's a lot of things to note here. First of all, towards the top of the page we are utilizing the `<slot name="home" />` tag that was created earlier in the `Default.vue` layout component. This will allow us to place content outside of the container specified in the layout, such that it is not shrinking on the page. There's also a modified image component called `<v-parallax>` being used here. This is a Vuetify [component](https://vuetifyjs.com/en/components/parallax/) that creates a 3D effect that makes an image appear to scroll slower than the window. You can find the image that I'm using in the `src` attribute for this code [here](https://github.com/joshdrumz/portfolio-with-blog/blob/master/src/assets/img/hero-bg.jpg) or you can use what ever background image you would like. Make to sure to create a path inside of the `src/` folder called `assets/img/` and organize your images however you'd like.

Secondly, we have a `<Typewriter />` component that we will write momentarily. This is a custom component that adds a cool typewriter effect onto any piece of text that you'd like. The `<v-btn>` that on click navigates to the #projects section has some options attached to it. These options are specified so that it will navigate properly without shrinking the navbar along with it. This is simply done using a [computed](https://vuejs.org/v2/guide/computed.html) property that returns the options specified in the `data()` function.

Thirdly, we have a projects section that shows off the work you've done over the course of your career. In my opinion, these projects should always be the first thing a recruiter or customer sees on your site so they know what skills you equip. Feel free to change around the links and titles found in the `data()` function. In the template, we are simply looping through all the available "projects" in the data property.

Lastly, let's take a look at the `metaInfo` [property](https://gridsome.org/docs/head/). Gridsome uses [vue-meta](https://vue-meta.nuxtjs.org/) for handing meta info about the page. We can use this property to specify info placed in `<head>` tag of our parsed HTML. In this case, we are changing the `<title>` property to **Home** as this is our home page. We will be utilizing this property in greater detail later on to dynamically change our meta information based on the title of our blog post.

## Typewriter Component

Now, let's write out the `<Typewriter />` component that was discussed in the Home Page section.
Create a file in `components/` folder called `Typewriter.vue`.

```html {14}{codeTitle: "src/components/Typewriter.vue"}
<template>
  <div class="d-inline">
    <span class="typed-text">{{ typeValue }}</span>
    <span class="cursor" :class="{ typing: typeStatus }">&nbsp;</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      typeValue: '',
      typeStatus: false,
      typeArray: ['developing.', 'creating.', 'designing.', 'collaborating.'],
      typingSpeed: 200,
      erasingSpeed: 100,
      newTextDelay: 2000,
      typeArrayIndex: 0,
      charIndex: 0
    };
  },
  methods: {
    typeText() {
      if (this.charIndex < this.typeArray[this.typeArrayIndex].length) {
        if (this.typeStatus) this.typeStatus = true;

        this.typeValue += this.typeArray[this.typeArrayIndex].charAt(
          this.charIndex
        );
        this.charIndex += 1;

        setTimeout(this.typeText, this.typingSpeed);
      } else {
        this.typeStatus = false;
        setTimeout(this.eraseText, this.newTextDelay);
      }
    },
    eraseText() {
      if (this.charIndex > 0) {
        if (!this.typeStatus) this.typeStatus = true;
        this.typeValue = this.typeArray[this.typeArrayIndex].substring(
          0,
          this.charIndex - 1
        );
        this.charIndex -= 1;
        setTimeout(this.eraseText, this.erasingSpeed);
      } else {
        this.typeStatus = false;
        this.typeArrayIndex += 1;
        if (this.typeArrayIndex >= this.typeArray.length)
          this.typeArrayIndex = 0;
        setTimeout(this.typeText, this.typingSpeed + 1000);
      }
    }
  },
  created() {
    setTimeout(this.typeText, this.newTextDelay + 200);
  }
};
</script>

<style scoped>
span.typed-text {
  color: #65e620;
}

span.cursor {
  display: inline-block;
  margin-left: 3px;
  width: 2px;
  background-color: #fff;
  animation: cursorBlink 1s infinite;
}

span.cursor.typing {
  animation: none;
}

@keyframes cursorBlink {
  49% {
    background-color: #fff;
  }
  50% {
    background-color: transparent;
  }
  99% {
    background-color: transparent;
  }
}
</style>
```

I won't spend too much time explaining the technical aspects of this component. Honestly, I followed a YouTube tutorial on how to do this in Vue, which you can find [here](https://www.youtube.com/watch?v=ZIbASNgVMlQ). If you'd like to change the words that rotate on the screen, change the values inside of `typeArray` in the `data()` function. The order of the words do matter, meaning that the first word in `typeArray` will be the first word that is typed, and so on.

## About Page

The next page we will build is the about page! This page will be useful for users to learn more about you and where to find you on various social media platforms.  
Delete whatever is already inside of `About.vue` and replace it with this code.

```html {codeTitle: "src/pages/About.vue"}
<template>
  <Layout>
    <template slot="home">
      <section id="about-me" class="grey lighten-3">
        <div class="py-12"></div>

        <div class="text-center">
          <h2 class="display-2 font-weight-bold mb-3">ABOUT ME</h2>

          <v-responsive class="mx-auto mb-8" width="56">
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

          <v-responsive
            class="mx-auto text-md-h6 text-sm-subtitle-1 font-weight-light mb-8 px-4"
            max-width="720"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
            ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
            officia deserunt mollit anim id est laborum.
          </v-responsive>

          <v-avatar class="elevation-12 mb-12" size="128">
            <v-img
              :src="require('@/assets/img/josh-avatar.jpg')"
              alt="Josh Arrants avatar"
            ></v-img>
          </v-avatar>

          <div></div>

          <v-btn
            class="mt-8"
            rounded
            large
            outlined
            @click="$vuetify.goTo('#socials')"
          >
            <v-icon>mdi-chevron-double-down</v-icon>
          </v-btn>
        </div>

        <div class="py-16"></div>
      </section>

      <section id="socials">
        <div class="py-10"></div>

        <v-container class="text-center">
          <div class="text-center">
            <h2 class="display-2 font-weight-bold mb-3">Connect with me!</h2>

            <v-responsive class="mx-auto mb-12" width="56">
              <v-divider class="mb-1"></v-divider>

              <v-divider></v-divider>
            </v-responsive>

            <v-row>
              <v-col
                v-for="({ icon, text, title, to }, i) in socials"
                :key="i"
                cols="12"
                md="4"
              >
                <v-card class="py-12 px-4" color="grey lighten-4" flat>
                  <v-theme-provider dark>
                    <div>
                      <g-link :to="to">
                        <v-avatar
                          class="v-avatar-zoom"
                          color="primary"
                          size="88"
                        >
                          <v-icon large>{{ icon }}</v-icon>
                        </v-avatar>
                      </g-link>
                    </div>
                  </v-theme-provider>

                  <v-card-title
                    class="justify-center font-weight-black text-uppercase"
                  >
                    {{ title }}
                  </v-card-title>

                  <v-card-text class="subtitle-1">
                    {{ text }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-container>

        <div class="py-6"></div>
      </section>
    </template>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'About'
  },
  data() {
    return {
      socials: [
        {
          to: 'https://www.linkedin.com/in/your-linkedin-here/',
          icon: 'mdi-linkedin',
          title: 'LinkedIn',
          text: 'Your LinkedIn description here'
        },
        {
          to: 'https://github.com/your-github-here/',
          icon: 'mdi-github',
          title: 'Github',
          text: 'Your GitHub description here'
        },
        {
          to: 'link to resume here',
          icon: 'mdi-email',
          title: 'Résumé',
          text: 'Your Resume description here'
        }
      ]
    };
  }
};
</script>

<style scoped>
.v-avatar-zoom {
  transition: transform 0.4s, filter 0.4s ease-in-out;
  filter: brightness(70%);
}

.v-avatar-zoom:hover {
  filter: brightness(100%);
  transform: scale(1.2);
}
</style>

```

Once again, we are utilizing the `<slot name="home" />` tag to place content outside of the container specified in the layout. This page is similar to the Home Page in a few ways. One thing I will note here is the styles found in the `<style scoped>` tag. When a user hovers over one of the social media avatars down towards the bottom of the page, we are triggering an animation using just plain CSS. Feel free to tweak the brightness and transform values as you like! You can find all images used on this page [here](https://github.com/joshdrumz/portfolio-with-blog/tree/master/src/assets/img) for a reference size.

## Conclusion

I think that should do it for this part of the Gridsome blog series! Thank you for reading this far. Please leave any questions or thoughts down in the comments section below. In [part 4](/blog/how-to-build-a-personal-developer-blog-with-vue-js-gridsome-and-vuetify-part-4/), we'll build out a contact page with a form powered by Netlify Forms and a custom 404 page for when our users visit a path on our site that doesn't exist!