<template>
  <Layout>
    <div>
      <h1 v-html="$page.blog.title"></h1>
      <div>
        <!-- <p>{{ $page.blog.author.name }}</p> -->
      </div>
    </div>

    <v-row align="center" justify="center">
      <v-img
        :src="$page.blog.image"
        :alt="$page.blog.image_caption"
        aspect-ratio="1"
        class="grey lighten-2"
        max-width="500"
        max-height="300"
      >
        <!-- <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-row>
        </template>-->
      </v-img>
      <p>{{ $page.blog.image_caption }}</p>
    </v-row>

    <div>
      <p v-html="$page.blog.excerpt"></p>
      <div v-html="$page.blog.content"></div>
    </div>
  </Layout>
</template>

<script>
export default {};
</script>

<page-query>
  query ($id: ID!) {
    blog (id: $id) {
      title
      path
      image(width:500)
      image_caption
      excerpt
      content
    }
  }
</page-query>

<style>
</style>