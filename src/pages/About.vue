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
            Hello! I want to thank you for visiting my website! I'm Josh
            Arrants. I am a software engineer with a passion for development and
            creation. I graduated in December of 2019 with a Bachelor's Degree
            in Computer Science from Kennesaw State University. I landed my
            first job as a remote software engineer shortly after graduation.
            Take a look at my <g-link to="/blog">blog</g-link> for information
            and tutorials on how I created this website as well as personal
            posts about my life! I feel compelled to pass on the knowledge from
            my experience of college and the real world to others. Feel free to
            contact me on
            <a
              href="https://www.linkedin.com/in/josh-arrants/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              >LinkedIn</a
            >
            for any inquiries or business related questions!
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
          to: 'https://www.linkedin.com/in/josh-arrants/',
          icon: 'mdi-linkedin',
          title: 'LinkedIn',
          text:
            'My LinkedIn displays what is detailed in the résumé in a more professional and feasible format.'
        },
        {
          to: 'https://github.com/joshdrumz/',
          icon: 'mdi-github',
          title: 'Github',
          text:
            'The portal for all hosted versions of my projects and where code repositories live.'
        },
        {
          to: 'mailto:joshgarrants@gmail.com',
          icon: 'mdi-email',
          title: 'Résumé',
          text:
            "My résumé lists the projects I've worked on, as well as skills, education, and relevant experience."
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
