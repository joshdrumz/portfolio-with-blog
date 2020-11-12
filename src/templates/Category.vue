<template>
  <Layout>
    <h1 class="display-3 font-weight-bold my-5 text-center">
      Category | {{ $page.category.title }}
    </h1>

    <v-responsive class="mx-auto mb-8" width="56">
      <v-divider class="mb-1"></v-divider>

      <v-divider></v-divider>
    </v-responsive>

    <div
      v-for="element in $page.category.belongsTo.edges"
      :key="element.node.id"
    >
      <v-row class="my-8">
        <v-col md="4">
          <g-link :to="element.node.path">
            <v-img
              :src="element.node.image"
              :alt="element.node.image_caption"
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
                  :to="element.node.path"
                  class="black--text"
                  :class="hover ? 'text-decoration' : 'text-decoration-none'"
                >
                  {{ element.node.title }}
                </g-link>
              </v-card-title>
            </v-hover>

            <v-card-subtitle>
              {{ formatDate(element.node.created) }}
            </v-card-subtitle>

            <v-card-text>
              {{ element.node.excerpt }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div class="text-center">
      <Pager :info="$page.category.belongsTo.pageInfo" class="pagination" />
    </div>
  </Layout>
</template>

<page-query>
query ($id: ID!, $page: Int) {
  category (id: $id) {
    title
    belongsTo (sortBy: "created", perPage: 5, page: $page) @paginate {
      pageInfo {
        totalPages
        currentPage
      }
      edges {
        node {
          ... on Blog {
            id
            title
            excerpt
            path
            image
            image_caption
            created
          }
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
  metaInfo() {
    return {
      title: this.$page.category.title
    };
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

/* Pagination styling */
.pagination {
  display: inline-block;
}

.pagination a {
  color: black;
  float: left;
  font-size: 22px;
  padding: 8px 16px;
  margin: 0 4px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.pagination a.active {
  background-color: #4caf50;
  border-radius: 5px;
  color: white;
}

.pagination a:hover:not(.active) {
  background-color: #ddd;
}
</style>