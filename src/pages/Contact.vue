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
                Please fill out the corresponding form or contact me via the
                outlets detailed below for any inquiries or service requests.
                Feel free to also contact me on
                <a
                  href="https://www.linkedin.com/in/josh-arrants/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  >LinkedIn</a
                >
                if you would like. I look forward to hearing from you!
              </v-responsive>

              <!-- contact list -->
              <v-list two-line max-width="720" class="mx-auto">
                <v-list-item>
                  <v-list-item-icon>
                    <g-link to="mailto:joshgarrants@gmail.com">
                      <v-icon color="indigo"> mdi-email </v-icon>
                    </g-link>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title
                      >joshgarrants@gmail.com</v-list-item-title
                    >
                    <v-list-item-subtitle>Personal</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider inset width="250"></v-divider>

                <v-list-item>
                  <v-list-item-icon>
                    <g-link to="https://www.linkedin.com/in/josh-arrants/">
                      <v-icon color="indigo"> mdi-linkedin </v-icon>
                    </g-link>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>LinkedIn</v-list-item-title>
                    <v-list-item-subtitle>Josh Arrants</v-list-item-subtitle>
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
// https://medium.com/better-programming/javascript-bang-bang-i-shot-you-down-use-of-double-bangs-in-javascript-7c9d94446054
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