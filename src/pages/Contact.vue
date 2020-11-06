<template>
  <Layout>
    <div>
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
          <label> Don't fill this out: <input name="bot-field" /> </label>
        </p>
        <div class="sender-info">
          <div>
            <label for="name" class="label" hidden>Your name</label>
            <v-text-field
              label="Name"
              name="name"
              :counter="50"
              :rules="nameRules"
              v-model="formData.name"
              required
            />
          </div>
          <div>
            <label for="email" hidden>Your email</label>
            <v-text-field
              label="E-mail"
              name="email"
              :rules="emailRules"
              v-model="formData.email"
              required
            />
          </div>
        </div>

        <div class="message-wrapper">
          <label for="message" hidden>Message</label>
          <v-textarea
            outlined
            name="message"
            label="Message"
            :rules="[v => !!v || 'Message is required']"
            v-model="formData.message"
            required
          ></v-textarea>
        </div>

        <v-btn type="submit" :disabled="!valid"> Submit form </v-btn>
      </v-form>
    </div>
  </Layout>
</template>

<script>
export default {
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
</style>