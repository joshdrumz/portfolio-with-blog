<template>
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
</template>

<script>
export default {
  data() {
    return {
      userScrolled: false
    };
  },
  methods: {
    scrollToTop() {
      // https://dev.to/vvo/how-to-solve-window-is-not-defined-errors-in-react-and-next-js-5f97
      // Nice! Only took me an hour to figure this build error out :D
      if (typeof window !== 'undefined') {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
    },
    showButton() {
      if (typeof window !== 'undefined') {
        if (window.scrollY > 0) {
          this.userScrolled = true;
        } else if (window.scrollY <= 0) {
          this.userScrolled = false;
        }
      }
    }
  },
  created() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.showButton);
    }
  }
};
</script>

<style scoped>
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