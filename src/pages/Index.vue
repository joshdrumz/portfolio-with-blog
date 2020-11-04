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
                  @click="$vuetify.goTo('#projects', options)"
                >
                  <!-- <v-icon>mdi-chevron-double-down</v-icon> -->
                  Projects
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-parallax>
      </section>

      <!-- <div></div> -->

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
          src: require('@/assets/img/projects/csgo-tracker-alt.png'),
          title: 'CSGO Statistics',
          excerpt:
            'Using the Tracker CS:GO API, I built a single page application that takes in a valid Steam ID (64) username and displays CS:GO statistics such as K/D ratio, time played, and kills. This project uses Node.js, Express, Vue.js, and the Fetch API.',
          demo: 'https://radiant-ridge-74167.herokuapp.com/',
          code: 'https://github.com/joshdrumz/csgo-tracker'
        },
        {
          src: require('@/assets/img/projects/expense-tracker.png'),
          title: 'Expense Tracker',
          excerpt:
            'This project is a full-stack web application that tracks expenses and incomes of any user that enters in a transaction. It uses the MERN stack (MongoDB, Express, React, Node). React accepts data through an HTTP client package called Axios.',
          demo: 'https://agile-badlands-18303.herokuapp.com/',
          code: 'https://github.com/joshdrumz/expense-tracker'
        },
        {
          src: require('@/assets/img/projects/foundnation-website.png'),
          title: 'Foundnation',
          excerpt:
            'Designed and implemented a website for Foundnation, a non-profit organization revitalized around the Pay It Forward scholarship movement. I used the Django framework, a Python based web framework, to build this site.',
          demo: 'https://www.payitfwdscholarship.com/',
          code: 'https://github.com/joshdrumz/foundnation-website'
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