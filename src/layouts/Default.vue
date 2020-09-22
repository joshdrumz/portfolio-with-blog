<template>
  <v-app>
    <v-app-bar app dark dense hide-on-scroll elevate-on-scroll>
      <v-btn icon>
        <g-link to="/">
          <v-icon>fas fa-drum</v-icon>
        </g-link>
      </v-btn>

      <v-spacer />

      <template v-slot:extension>
        <v-tabs show-arrows centered fixed-tabs>
          <v-tabs-slider color="#65e620"></v-tabs-slider>
          <v-tab
            v-for="link in links"
            :key="link.id"
            :to="link.to"
            exact
            :ripple="{ class: 'green--text' }"
          >{{ link.name }}</v-tab>
        </v-tabs>
      </template>

      <v-spacer />

      <v-btn icon v-for="s in socials" :key="s.id">
        <g-link :to="s.to">
          <v-icon>{{ s.icon }}</v-icon>
        </g-link>
      </v-btn>
    </v-app-bar>

    <transition name="bounce">
      <v-btn
        class="md-5 mr-3 elevation-21"
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

    <!-- <v-card>
      <v-toolbar dark dense>
        <v-btn icon>
          <g-link to="/">
            <v-icon>fas fa-drum</v-icon>
          </g-link>
        </v-btn>

        <v-spacer />

        <v-text-field
          placeholder="Search"
          class="ml-8"
          style="max-width: 350px;"
          prepend-inner-icon="mdi-magnify"
          clearable
          outlined
          rounded
          dense
          hide-details
        />

        <v-btn icon v-for="s in socials" :key="s.id">
          <g-link :to="s.to">
            <v-icon>{{ s.icon }}</v-icon>
          </g-link>
        </v-btn>

        <template v-slot:extension>
          <v-tabs centered fixed-tabs>
            <v-tabs-slider color="#65e620"></v-tabs-slider>
            <v-tab
              v-for="link in links"
              :key="link.id"
              :to="link.to"
              exact
              :ripple="{ class: 'green--text' }"
            >{{ link.name }}</v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
    </v-card>-->

    <!-- <v-alert type="success" v-show="alertMounted">I'm a success alert.</v-alert> -->

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
  </v-app>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import Typewriter from '~/components/Typewriter.vue';

export default {
  components: {
    Typewriter
  },
  data() {
    return {
      userScrolled: false,
      links: [
        { id: 0, name: 'Home', to: '/' },
        { id: 1, name: 'About', to: '/about' },
        { id: 2, name: 'Blog', to: '/blog' },
        { id: 3, name: 'Contact', to: '/contact' }
      ],
      socials: [
        {
          id: 0,
          to: 'https://www.linkedin.com/in/josh-arrants/',
          icon: 'mdi-linkedin'
        },
        { id: 1, to: 'https://github.com/joshdrumz/', icon: 'mdi-github' },
        { id: 2, to: 'mailto:joshgarrants@gmail.com', icon: 'mdi-email' },
        {
          id: 3,
          to: '/',
          icon: 'mdi-file-document-outline'
        }
      ]
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    },
    showButton() {
      if (window.scrollY > 0) {
        this.userScrolled = true;
      } else if (window.scrollY <= 0) {
        this.userScrolled = false;
      }
    }
  },
  created() {
    window.addEventListener('scroll', this.showButton);
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
