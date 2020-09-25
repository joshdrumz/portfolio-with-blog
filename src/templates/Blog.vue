<template>
  <Layout>
    <section id="title">
      <div class="ma-8">
        <h1
          class="display-3 font-weight-bold mb-5 text-center deep-purple--text text--darken-2"
        >
          <!-- green--text text--lighten-3 -->
          {{ $page.blog.title }}
        </h1>
        <div class="d-flex justify-center">
          <h4 class="font-weight-light text-xs-body-1">
            {{ $page.blog.author.name }}
          </h4>
          <p class="px-2">|</p>
          <h4 class="font-weight-light text-xs-body-1">
            {{ $page.blog.humanTime }}
          </h4>
          <p class="px-2">|</p>
          <h4 class="font-weight-light text-xs-body-1">
            {{ $page.blog.category }}
          </h4>
        </div>
      </div>
    </section>

    <section id="image" class="mb-12">
      <v-img :src="$page.blog.image" :alt="$page.blog.image_caption">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <p class="subheading font-italic text-center mt-4 grey--text">
        {{ $page.blog.image_caption }}
      </p>
    </section>

    <v-divider></v-divider>

    <div class="mt-8">
      <div v-html="$page.blog.content"></div>
    </div>
  </Layout>
</template>

<page-query>
  query ($id: ID!) {
    blog (id: $id) {
      title
      path
      image
      image_caption
      excerpt
      category
      content
      datetime : created(format: "ddd MMM DD YYY hh:mm:ss zZ")
      humanTime : created(format: "Do MMMM YYYY")
      author {
        name
      }
    }
  }
</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.blog.title
    };
  }
};
</script>