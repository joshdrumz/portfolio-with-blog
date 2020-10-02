<template>
  <Layout>
    <section id="title">
      <div class="my-8">
        <h1 class="display-2 font-weight-bold text-center">
          <!-- green--text text--lighten-3 -->
          {{ $page.blog.title }}
        </h1>
        <div class="d-flex justify-center mt-6">
          <h4 class="font-weight-light text-xs-body-1">
            {{ $page.blog.author.name }}
          </h4>
          <p class="px-2">|</p>
          <h4 class="font-weight-light text-xs-body-1">
            {{ $page.blog.humanTime }}
          </h4>
          <p class="px-2">|</p>
          <h4 class="font-weight-light text-xs-body-1">
            Posted in
            <g-link
              :to="$page.blog.category.path"
              class="text-decoration-none green--text text--darken-4"
            >
              {{ $page.blog.category.title }}
            </g-link>
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

    <!-- <v-divider></v-divider> -->

    <div
      class="text-md-h6 font-weight-regular px-2 markdown"
      v-html="$page.blog.content"
    ></div>
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
      category {
        title
        path
      }
      content
      humanTime : created(format: "MMMM Do YYYY")
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

<style scoped>
.markdown {
  line-height: 35px;
}

.markdown >>> h2 {
  /* https://medium.com/@brockreece/scoped-styles-with-v-html-c0f6d2dc5d8e */
  margin: 1.5rem 0 1.5rem 0;
}

.markdown >>> pre {
  margin: 2.25rem 0 2.25rem 0;
}

.markdown >>> p {
  margin: 2.25rem 0 2.25rem 0;
}
</style>