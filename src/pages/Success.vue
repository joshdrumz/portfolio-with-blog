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
            Your submission has been received. I look forward to contacting you
            soon!
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