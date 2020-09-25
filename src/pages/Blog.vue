<template>
  <Layout>
    <h1 class="display-3 font-weight-bold mb-5 text-center">Blog</h1>

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

    <v-row>
      <v-col cols="12">
        <v-card
          v-for="edge in $page.blogs.edges"
          :key="edge.node.id"
          class="my-12"
        >
          <v-list-item>
            <v-list-item-avatar
              v-if="edge.node.category === 'Coding'"
              color="green"
            >
              <v-icon>mdi-xml</v-icon>
            </v-list-item-avatar>
            <v-list-item-avatar
              v-else-if="edge.node.category === 'Personal'"
              color="green"
            >
              <v-icon>mdi-face</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline">{{
                edge.node.title
              }}</v-list-item-title>
              <v-list-item-subtitle
                >by {{ edge.node.author.name }} on
                {{ formatDate(edge.node.created) }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>

          <v-img
            :src="edge.node.image"
            :alt="edge.node.image_caption"
            height="194"
          ></v-img>

          <v-card-text>
            {{ edge.node.excerpt }}
          </v-card-text>

          <v-card-actions>
            <v-btn
              text
              color="deep-purple accent-4"
              @click="$router.push(`${edge.node.path}`)"
            >
              Read Post
            </v-btn>
            <!-- <v-btn text color="deep-purple accent-4"> Bookmark </v-btn> -->
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </Layout>
</template>

<page-query>
query {
  blogs: allBlog {
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
        category
        author {
          id
          name
        }
      }
    }
  }
}
</page-query>

<script>
import moment from 'moment';

export default {
  metaInfo: {
    title: 'Blog'
  },
  data() {
    return {
      tab: 0,
      blogs: []
    };
  },
  mounted() {
    this.blogs = this.$page.blogs.edges;
  },
  watch: {
    tab(val) {
      if (this.tab === 0) {
        this.showAllBlogs();
      } else {
        this.showBlogsByCategory(val);
      }
    }
  },
  methods: {
    showAllBlogs() {
      this.blogs = this.$page.blogs.edges;
      console.log(this.blogs);
    },
    showBlogsByCategory(val) {
      this.blogs = this.$page.blogs.edges.filter(edge => {
        return edge.node.category === val;
      });
      console.log(this.blogs);
    },
    formatDate(date) {
      return moment(date).format('MMMM Do YYYY');
    }
  }
};
</script>

<style>
</style>