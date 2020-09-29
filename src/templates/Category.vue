<template>
  <Layout>
    <h1 class="display-3 font-weight-bold my-5 text-center">
      Category - {{ $page.category.title }}
    </h1>

    <v-row
      v-for="element in $page.category.belongsTo.edges"
      :key="element.node.id"
    >
      <v-col cols="12">
        <v-card
          class="my-1"
          rounded="xl"
          dark
          @click="$router.push(`${element.node.path}`)"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="headline">{{
                element.node.title
              }}</v-list-item-title>
              <!-- <v-list-item-subtitle
                >by {{ element.node.author.name }} on
                {{ element.node.humanTime }}</v-list-item-subtitle
              > -->
            </v-list-item-content>
          </v-list-item>
        </v-card>
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
            path
            created
            humanTime : created(format: "Do MMMM YYYY")
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

<style>
</style>