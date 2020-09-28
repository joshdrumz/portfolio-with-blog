<template>
  <v-app>
    <AppBar />

    <ScrollToTop />

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
    <Footer />
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
import AppBar from '~/components/AppBar';
import ScrollToTop from '~/components/ScrollToTop';
import Footer from '~/components/Footer';

export default {
  components: {
    AppBar,
    ScrollToTop,
    Footer
  }
};
</script>