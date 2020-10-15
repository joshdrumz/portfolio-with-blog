<template>
  <Layout>
    <h1 class="display-3 font-weight-bold my-5 text-center">Blog</h1>

    <v-responsive class="mx-auto mb-8" width="56">
      <v-divider class="mb-1"></v-divider>

      <v-divider></v-divider>
    </v-responsive>

    <!-- <v-row v-for="edge in $page.blogs.edges" :key="edge.node.id">
      
        <v-hover v-slot:default="{ hover }">
          <v-card
            class="my-1 v-card-zoom"
            rounded="xl"
            dark
            :elevation="hover ? 16 : 4"
            :ripple="{ class: 'green--text' }"
            @click="$router.push(`${edge.node.path}`)"
          >
            <v-list-item>
              <v-list-item-avatar
                v-if="edge.node.category.title === 'Coding'"
                color="green"
              >
                <v-icon>mdi-xml</v-icon>
              </v-list-item-avatar>
              <v-list-item-avatar
                v-else-if="edge.node.category.title === 'Personal'"
                color="green"
              >
                <v-icon>mdi-face</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="headline">{{
                  edge.node.title
                }}</v-list-item-title>
                <v-list-item-subtitle
                  >{{ edge.node.author.name }} |
                  {{ formatDate(edge.node.created) }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>

            <v-img
              :src="edge.node.image"
              :alt="edge.node.image_caption"
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

            <v-card-text>
              {{ edge.node.excerpt }}
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row> -->

    <v-row v-for="edge in $page.blogs.edges" :key="edge.node.id">
      <v-col>
        <v-card rounded="xl" elevation="0">
          <!-- <v-img
              :src="edge.node.image"
              :alt="edge.node.image_caption"
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
            </v-img> -->
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
    </v-row>
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