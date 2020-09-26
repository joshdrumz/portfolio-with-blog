<template>
  <Layout>
    <template slot="home">
      <section id="about-me" class="teal lighten-4">
        <div class="py-12"></div>

        <div class="text-center">
          <h2 class="display-2 font-weight-bold mb-3">ABOUT ME</h2>

          <v-responsive class="mx-auto mb-8" width="56">
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

          <v-responsive
            class="mx-auto title font-weight-light mb-8"
            max-width="720"
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos
            labore, debitis saepe ullam voluptas quo quam fuga vitae quia
            commodi ratione earum incidunt excepturi in voluptatem quibusdam
            reprehenderit. Eius eum est cumque, repellendus, explicabo dolorum
            saepe voluptatibus inventore facere deleniti assumenda debitis
            consectetur ullam, aspernatur vitae suscipit voluptates nobis at.
          </v-responsive>

          <v-avatar class="elevation-12 mb-12" size="128">
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
          </v-avatar>

          <div></div>

          <v-btn color="grey" href="https://vuetifyjs.com" outlined large>
            <span class="grey--text text--darken-1 font-weight-bold">
              Link somewhere
            </span>
          </v-btn>
        </div>

        <div class="py-12"></div>
      </section>

      <section id="features" class="grey lighten-3">
        <div class="py-12"></div>

        <v-container class="text-center">
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
              <v-card class="py-12 px-4" color="grey lighten-5" flat>
                <v-theme-provider dark>
                  <div>
                    <v-avatar color="primary" size="88">
                      <g-link :to="to">
                        <v-icon large>{{ icon }}</v-icon>
                      </g-link>
                    </v-avatar>
                  </div>
                </v-theme-provider>

                <v-card-title
                  class="justify-center font-weight-black text-uppercase"
                  v-text="title"
                ></v-card-title>

                <v-card-text class="subtitle-1" v-text="text"> </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <div class="py-12"></div>
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
