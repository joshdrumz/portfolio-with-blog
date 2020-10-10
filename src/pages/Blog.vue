<template>
  <Layout>
    <h1 class="display-3 font-weight-bold my-5 text-center">Blog</h1>

    <!-- <v-tabs v-model="tab" grow>
      <v-tab>All Blogs</v-tab>
      <v-tab>Personal</v-tab>
      <v-tab>Coding</v-tab>
    </v-tabs> -->

    <!-- <v-col class="justify-space-around">
      <v-card
        v-for="edge in $page.blogs.edges"
        :key="edge.node.id"
        class="mt-5"
      >
        <v-img
          class="align-end"
          height="200px"
          :src="edge.node.image"
          :alt="edge.node.image_caption"
        >
        </v-img>

        <v-card-title>{{ edge.node.title }}</v-card-title>

        <v-card-subtitle>{{ formatDate(edge.node.created) }}</v-card-subtitle>

        <v-card-actions>
          <v-btn @click="$router.push(`${edge.node.path}`)" color="green" text>
            Go to Post
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col> -->

    <!-- :elevation="hover ? 16 : 4" -->

    <v-row v-for="edge in $page.blogs.edges" :key="edge.node.id">
      <v-col cols="12">
        <v-hover v-slot:default="{ hover }">
          <v-card
            class="my-1 v-card-zoom"
            rounded="xl"
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

            <v-card-text>
              {{ edge.node.excerpt }}
            </v-card-text>

            <!-- <v-card-actions>
              <v-btn
                text
                color="deep-purple accent-4"
                @click="$router.push(`${edge.node.path}`)"
              >
                Read Post
              </v-btn>
              <v-btn text color="deep-purple accent-4"> Bookmark </v-btn>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions> -->
          </v-card>
        </v-hover>
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