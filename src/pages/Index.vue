<template>
  <Layout>
    <template slot="home">
      <section id="hero">
        <v-parallax :src="require('@/assets/img/hero-bg.jpg')" height="850">
          <v-row align="center" justify="center">
            <v-col cols="12">
              <div class="text-center">
                <h1 class="display-1 text-lg-h1 font-weight-thin mb-4">
                  Josh Arrants is
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
                  @click="$vuetify.goTo('#projects')"
                >
                  <v-icon>mdi-chevron-double-down</v-icon>
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

          <v-responsive class="mx-auto mb-12" width="56">
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>
          <!-- <div class="px-12"> -->
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

              <v-btn class="font-weight-black"> Continue Reading </v-btn>
            </v-col>
          </v-row>
        </v-container>
        <!-- </div> -->
        <!-- <div class="py-12"></div> -->
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
    title: ''
  },
  data() {
    return {
      projects: [
        {
          src:
            'https://images.unsplash.com/photo-1423784346385-c1d4dac9893a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
          title: 'Expense Tracker',
          excerpt:
            'This project is a full-stack web application that tracks expenses and incomes of any user that enters in a transaction. This project uses the MERN stack (MongoDB, Express, React, Node). React accepts data through an HTTP client package called Axios.',
          demo: 'https://agile-badlands-18303.herokuapp.com/',
          code: 'https://github.com/joshdrumz/expense-tracker'
        },
        {
          src:
            'https://images.unsplash.com/photo-1423784346385-c1d4dac9893a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
          title: 'Expense Tracker',
          excerpt:
            'This project is a full-stack web application that tracks expenses and incomes of any user that enters in a transaction. This project uses the MERN stack (MongoDB, Express, React, Node). React accepts data through an HTTP client package called Axios.',
          demo: 'https://agile-badlands-18303.herokuapp.com/',
          code: 'https://github.com/joshdrumz/expense-tracker'
        },
        {
          src:
            'https://images.unsplash.com/photo-1423784346385-c1d4dac9893a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
          title: 'Expense Tracker',
          excerpt:
            'This project is a full-stack web application that tracks expenses and incomes of any user that enters in a transaction. This project uses the MERN stack (MongoDB, Express, React, Node). React accepts data through an HTTP client package called Axios.',
          demo: 'https://agile-badlands-18303.herokuapp.com/',
          code: 'https://github.com/joshdrumz/expense-tracker'
        }
      ]
    };
  }
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
