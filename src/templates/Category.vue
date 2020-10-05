<template>
  <Layout>
    <h1 class="display-3 font-weight-bold my-5 text-center">
      Category | {{ $page.category.title }}
    </h1>

    <v-row
      v-for="element in $page.category.belongsTo.edges"
      :key="element.node.id"
    >
      <v-col cols="12">
        <v-hover v-slot:default="{ hover }">
          <v-card
            class="my-1 v-card-zoom"
            rounded="xl"
            dark
            :elevation="hover ? 16 : 4"
            :ripple="{ class: 'green--text' }"
            @click="$router.push(`${element.node.path}`)"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="headline">
                  {{ element.node.title }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ element.node.humanTime }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-img
              :src="element.node.image"
              :alt="element.node.image_caption"
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
              {{ element.node.excerpt }}
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  category (id: $id) {
    title
    belongsTo {
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
            humanTime : created(format: "MMMM Do YYYY")
          }
        }
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.category.title
    };
  }
};
</script>

<style scoped>
.v-card-zoom {
  transition: transform 0.4s, filter 0.4s ease-in-out;
  filter: brightness(60%);
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