<template>
  <Layout>
    <h1 class="display-3 font-weight-bold my-5 text-center">Blog</h1>

    <v-responsive class="mx-auto mb-8" width="56">
      <v-divider class="mb-1"></v-divider>

      <v-divider></v-divider>
    </v-responsive>

    <div v-for="edge in $page.blogs.edges" :key="edge.node.id">
      <v-row class="my-8">
        <v-col md="4">
          <g-link :to="edge.node.path">
            <v-img
              :src="edge.node.image"
              :alt="edge.node.image_caption"
              class="v-img-zoom"
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
          </g-link>
        </v-col>
        <v-col md="8">
          <v-card elevation="0">
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
          </v-card>
        </v-col>
      </v-row>
    </div>
    <Pager :info="$page.blogs.pageInfo" />
  </Layout>
</template>

<page-query>
query ($page: Int) {
  blogs: allBlog (sortBy: "created", perPage: 5, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
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
import { Pager } from 'gridsome';
import * as timeago from 'timeago.js';

export default {
  metaInfo: {
    title: 'Blog'
  },
  components: {
    Pager
  },
  methods: {
    formatDate(date) {
      return timeago.format(date);
    }
  }
};
</script>

<style scoped>
.v-img-zoom {
  transition: transform 0.4s, filter 0.4s ease-in-out;
  filter: brightness(80%);
}

.v-img-zoom:hover {
  filter: brightness(100%);
  transform: scale(1.1);
}

/* https://github.com/vuetifyjs/vuetify/issues/9130 */
.v-card__text,
.v-card__title {
  word-break: normal; /* maybe !important  */
}

/* Phones */
@media only screen and (max-width: 600px) {
  .v-img-zoom {
    filter: brightness(100%);
  }
  .v-img-zoom:hover {
    transform: scale(1.05);
  }
}
</style>