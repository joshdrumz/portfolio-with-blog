---
title: How to build a personal developer blog with Vue.js, Gridsome and Vuetify (Part 4)
category: Coding
excerpt: In part 4 of the Gridsome blog series, we'll continue building out some pages for our Gridsome site, including a contact page powered by Netlify Forms and a custom 404 page!
created: 2020-10-13
keywords: 'HTML,CSS,JavaScript,JSON,Vue,Gridsome,Vuetify,GraphQL,Netlify'
image: ../images/gridsome-tut/gridsome-blog-tutorial-p4.png
image_caption: Photo by Josh Arrants
author: author1
---

Welcome to part 4 of the Gridsome personal developer blog tutorial series! In part 4, we will continue to build out more pages for our Gridsome site and add new pages such as the contact page with forms powered by Netlify Forms. We will also create a custom 404 page for users that land on a path in our site that does not exist or has been removed.

- [Contact Page](#contact-page)
- [Success Page](#success-page)
- [Custom 404 Page](#custom-404-page)
- [Conclusion](#conclusion)

## Contact Page

Let's start building out a contact page for our users to easily send form submissions via Netlify Forms. 
Create a file inside of the `pages/` directory called `Contact.vue`.

```html {codeTitle: "src/pages/Contact.vue"}
<template>
  <Layout>
    <template slot="home">
      <v-sheet id="contact" tag="section" tile>
        <div class="py-6"></div>
        <v-container>
          <h2
            class="display-2 font-weight-bold mb-3 text-uppercase text-center"
          >
            Contact Me
          </h2>
          <v-responsive class="mx-auto mb-8 green" width="56">
            <v-divider class="mb-1 blue"></v-divider>

            <v-divider class="blue"></v-divider>
          </v-responsive>
          <v-row>
            <v-col md="6">
              <v-responsive
                class="mx-auto text-md-h6 text-sm-subtitle-1 font-weight-light mb-8 px-4"
                max-width="720"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure  
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
                officia deserunt mollit anim id est laborum.
              </v-responsive>

              <!-- contact list -->
              <v-list two-line max-width="720" class="mx-auto">
                <v-list-item>
                  <v-list-item-icon>
                    <g-link to="mailto:email@example.com">
                      <v-icon color="indigo"> mdi-email </v-icon>
                    </g-link>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title
                      >email@example.com</v-list-item-title
                    >
                    <v-list-item-subtitle>Personal</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider inset width="250"></v-divider>

                <v-list-item>
                  <v-list-item-icon>
                    <g-link to="https://www.linkedin.com/in/your-linkedin-here/">
                      <v-icon color="indigo"> mdi-linkedin </v-icon>
                    </g-link>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>LinkedIn</v-list-item-title>
                    <v-list-item-subtitle>Your name here</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>

            <v-col md="6" align-self="end">
              <v-form
                name="contact"
                method="POST"
                ref="form"
                v-model="valid"
                @submit.prevent="handleSubmit"
                action="/success/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
              >
                <input type="hidden" name="form-name" value="contact" />
                <p hidden>
                  <label>
                    Don't fill this out: <input name="bot-field" />
                  </label>
                </p>
                <div class="sender-info">
                  <div class="my-2">
                    <label for="name" class="label" hidden>Your name</label>
                    <v-text-field
                      label="Name"
                      name="name"
                      outlined
                      flat
                      :rules="nameRules"
                      v-model="formData.name"
                      required
                    />
                  </div>
                  <div class="my-2">
                    <label for="email" hidden>Your email</label>
                    <v-text-field
                      label="E-mail"
                      name="email"
                      outlined
                      :rules="emailRules"
                      v-model="formData.email"
                      required
                    />
                  </div>
                </div>

                <div class="message-wrapper">
                  <label for="message" hidden>Message</label>
                  <v-textarea
                    label="Message"
                    name="message"
                    outlined
                    :rules="[v => !!v || 'Message is required']"
                    v-model="formData.message"
                    required
                  ></v-textarea>
                </div>

                <v-btn
                  type="submit"
                  color="green"
                  class="mt-2"
                  :disabled="!valid"
                >
                  Submit
                </v-btn>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </template>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Contact'
  },
  data() {
    return {
      formData: {},
      valid: true,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 50) || 'Name must be less than 50 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ]
    };
  },
  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        )
        .join('&');
    },
    handleSubmit(e) {
      fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: this.encode({
          'form-name': e.target.getAttribute('name'),
          ...this.formData
        })
      })
        .then(() => this.$router.push('/success'))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
.v-list-item__icon a {
  text-decoration: none;
}
</style>
```

In this page, we are utilizing the power of [Netlify Forms](https://docs.netlify.com/forms/setup/), which is the platform that I will use to push our Gridsome site to production. Read [here](https://gridsome.org/docs/guide-forms/#netlify-forms) in the Gridsome docs to get started with Netlify Forms. For testing purposes, it's fine that our form is not being submitted to anything quite yet. 

Note the `data-netlify` and `data-netlify-honeypot` attributes attached to our form. `data-netlify` simply signifies that this is a Netlify Forms form. `data-netlify-honeypot` is a special attribute that will lure bots trying to send spam, meaning that Netlify will automatically reject them. Later on in the series, we will setup our Netlify page to automatically send an email notification when a user has submitted our form successfully.

Next, we need to add a `formData` variable to hold our data that will be sent to Netlify. `formData` is bound to our inputs to automatically update `formData` when the input is changed. This is possible due to Vue's [two-way data binding](https://vuejs.org/v2/guide/forms.html).

Note our submit handler, `handleSubmit()`, to send our `formData` to Netlify. This is done by listening to the form submit action and using the `fetch()` API to post our data located in `formData`. We're also making sure the data is properly formatted before sending it to Netlify with the `encode()` method.

We're also creating some special validation rules for our form. These rules must be satisfied before a user is allowed to submit our form. In other words, the `<v-btn>` with `type="submit"` will be disabled (grayed out) until the form has been completely validated. This is all done using Vuetify's `v-form` tag. You can find documentation for form validation with Vuetify [here](https://vuetifyjs.com/en/components/forms/#validation-with-submit-clear). You have the option to specify validation rules in the `data()` function or directly inside of a form element using the `rules` attribute. Make sure to v-bind the `rules` attribute so you can add JavaScript code inside of it. Feel free to play around with the validation rules, or add additional fields onto the form!

We're requesting that the form, on a successful submit, be redirected to a `success/` path. We will need to create a page called `Success.vue` to make this happen, otherwise we will get back a 404 page.

## Success Page

Let's build a success page on redirect of a successful form submit from our contact page.
Create a file inside of the `pages/` directory called `Success.vue`.

```html {codeTitle: "src/pages/Success.vue"}
<template>
  <Layout>
    <v-row justify="center">
      <v-col cols="12">
        <div class="push-down">
          <div class="text-center my-4">
            <v-icon color="green" x-large>mdi-check-circle-outline</v-icon>
          </div>

          <h2
            class="display-2 font-weight-bold my-3 text-uppercase text-center"
          >
            Thank you!
          </h2>

          <v-responsive
            class="mx-auto text-md-h6 text-sm-subtitle-1 text-center font-weight-light mb-6 px-4"
            max-width="720"
          >
            Your submission has been received. 
            I look forward to contacting you soon!
          </v-responsive>

          <div class="text-center my-4">
            <g-link to="/">
              <v-btn>Back to homepage</v-btn>
            </g-link>
          </div>
        </div>
      </v-col>
    </v-row>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Success'
  }
};
</script>

<style scoped>
.push-down {
  margin-top: 175px;
}

a {
  text-decoration: none;
}
</style>
```

The purpose of this page is to tell our users that they have successfully submitted the contact page form. Nothing too special here, just something here that looks good!

## Custom 404 Page

By default, Gridsome will throw a 404 page to tell the user that the path they've landed on was either removed or does not exist. However, this page doesn't look very good. Luckily, Gridsome allows us to create our own custom 404 page to our liking. 

The path and name of this file in our project is [important](https://gridsome.org/docs/pages/#custom-404-page). It must be created inside of the `pages/` directory. Create a file inside of the `pages/` directory called `404.vue`.

```html {70}{codeTitle: "src/pages/404.vue"}
<template>
  <Layout>
    <div class="push-down">
      <div id="notfound">
        <div class="notfound">
          <div class="notfound-404">
            <h1>4<span></span>4</h1>
          </div>
          <h2>Oops! This page could not be found.</h2>
          <p>
            The page you are looking for does not exist, has been removed, or
            it's temporarily unavailable.
          </p>
          <g-link to="/">Back to homepage</g-link>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: '404'
  }
};
</script>

<style scoped>
.push-down {
  margin-top: 100px;
}

#notfound {
  position: relative;
  height: 50vh;
}

#notfound .notfound {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.notfound {
  max-width: 520px;
  width: 100%;
  text-align: center;
  line-height: 1.4;
}

.notfound .notfound-404 {
  height: 190px;
}

.notfound .notfound-404 h1 {
  font-size: 146px;
  font-weight: 700;
  margin: 0px;
  color: #232323;
}

.notfound .notfound-404 h1 > span {
  display: inline-block;
  width: 120px;
  height: 120px;
  background-image: url('../assets/img/404.png');
  background-size: cover;
  -webkit-transform: scale(1.4);
  -ms-transform: scale(1.4);
  transform: scale(1.4);
  z-index: -1;
}

.notfound h2 {
  font-size: 22px;
  font-weight: 700;
  margin: 0;
  text-transform: uppercase;
  color: #232323;
}

.notfound p {
  color: #787878;
  font-weight: 300;
}

.notfound a {
  display: inline-block;
  padding: 12px 30px;
  font-weight: 700;
  background-color: #f99827;
  color: #fff;
  border-radius: 40px;
  text-decoration: none;
  -webkit-transition: 0.2s all;
  transition: 0.2s all;
}

.notfound a:hover {
  opacity: 0.8;
}

@media only screen and (max-width: 767px) {
  .notfound .notfound-404 {
    height: 115px;
  }
  .notfound .notfound-404 h1 {
    font-size: 86px;
  }
  .notfound .notfound-404 h1 > span {
    width: 86px;
    height: 86px;
  }
}
</style>
```

You can find the image I use for this page [here](https://github.com/joshdrumz/portfolio-with-blog/blob/master/content/blog/images/404.png). We are simply telling the user that they have landed on a page that does not exist, or has been temporarily removed. This is an important page to have on all web applications big or small. We've also provided a button for the user to click that will take them back to a page that does exist, which in this case is the homepage.

## Conclusion

That should do it for this part of the Gridsome blog series! Thank you for reading this far and I hope you are enjoying the content so far. Please leave any questions or thoughts down in the comments section below. In [part 5](/blog/how-to-build-a-personal-developer-blog-with-vue-js-gridsome-and-vuetify-part-5/), we'll start to build out the blog functionality by integrating the [GraphQL data layer](https://gridsome.org/docs/data-layer/) that will look for markdown files in our project and create paths in our site accordingly. 