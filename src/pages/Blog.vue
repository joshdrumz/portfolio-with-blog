<template>
  <Layout>
    <h1 class="display-3 font-weight-bold my-5 text-center">Blog</h1>

    <v-responsive class="mx-auto mb-8" width="56">
      <v-divider class="mb-1"></v-divider>

      <v-divider></v-divider>
    </v-responsive>

    <div v-for="edge in $page.blogs.edges" :key="edge.node.id">
      <v-row>
        <v-col md="4">
          <v-img
            :src="edge.node.image"
            :alt="edge.node.image_caption"
            max-width="300"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
        <v-col md="8">
          <v-card rounded="xl" elevation="0">
            <v-hover v-slot:default="{ hover }">
              <v-card-title>
                <g-link
                  :to="edge.node.path"
                  class="black--text"
                  :class="hover ? 'text-decoration' : 'text-decoration-none'"
                >
                  {{ edge.node.title }}
                </g-link>
              </v-card-title>
            </v-hover>

            <v-card-subtitle>
              {{ formatDate(edge.node.created) }} |
              <g-link
                :to="edge.node.category.path"
                class="text-decoration-none green--text text--darken-4"
              >
                {{ edge.node.category.title }}
              </g-link>
            </v-card-subtitle>

            <v-card-text>
              {{ edge.node.excerpt }}
            </v-card-text>

            <!-- <v-divider class="ml-4"></v-divider> -->
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- <v-row v-for="edge in $page.blogs.edges" :key="edge.node.id">
      <v-col>
        <v-img
          :src="edge.node.image"
          :alt="edge.node.image_caption"
          class="d-flex"
          height="300"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <v-card rounded="xl" elevation="0">
          <v-hover v-slot:default="{ hover }">
            <v-card-title>
              <g-link
                :to="edge.node.path"
                class="black--text"
                :class="hover ? 'text-decoration' : 'text-decoration-none'"
              >
                {{ edge.node.title }}
              </g-link>
            </v-card-title>
          </v-hover>

          <v-card-subtitle>
            {{ formatDate(edge.node.created) }} |
            <g-link
              :to="edge.node.category.path"
              class="text-decoration-none green--text text--darken-4"
            >
              {{ edge.node.category.title }}
            </g-link>
          </v-card-subtitle>

          <v-card-text>
            {{ edge.node.excerpt }}
          </v-card-text>

          <v-divider class="ml-4"></v-divider>
        </v-card>
      </v-col>
    </v-row> -->
  </Layout>
</template>

<page-query>
query {
  blogs: allBlog (sortBy: "created") {
    edges {
      node {
        id
        title
        path
        content
        image
        image_caption
        excerpt
        created
        humanTime : created(format: "MMMM Do YYYY")
        category {
          title
          path
        }
        author {
          name
        }
      }
    }
  }
}
</page-query>

<script>
import * as timeago from 'timeago.js';

export default {
  metaInfo: {
    title: 'Blog'
  },
  methods: {
    formatDate(date) {
      return timeago.format(date);
    }
  }
};
</script>

<style scoped>
.v-card-zoom {
  transition: transform 0.4s, filter 0.4s ease-in-out;
  filter: brightness(70%);
}

.v-card-zoom:hover {
  filter: brightness(100%);
  transform: scale(1.1);
}

/* Phones */
@media only screen and (max-width: 600px) {
  .v-card-zoom {
    filter: brightness(100%);
  }
  .v-card-zoom:hover {
    transform: scale(1.05);
  }
}
</style>