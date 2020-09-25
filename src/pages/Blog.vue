<template>
  <Layout>
    <h1 class="display-3 font-weight-bold mb-5 text-center">Blog</h1>

    <v-tabs v-model="tab" grow>
      <v-tab>All Blogs</v-tab>
      <!-- <v-tab v-for="edge in $page.blogs.edges" :key="edge.node.id">{{
        edge.node.category
      }}</v-tab> -->
      <v-tab>personal</v-tab>
      <v-tab>coding</v-tab>
    </v-tabs>

    <v-row class="justify-space-around">
      <v-card
        v-for="edge in $page.blogs.edges"
        :key="edge.node.id"
        class="mt-5"
      >
        <v-card-title>{{ edge.node.title }}</v-card-title>

        <v-card-subtitle>{{ formatDate(edge.node.created) }}</v-card-subtitle>

        <v-card-actions>
          <v-btn @click="$router.push(`${edge.node.path}`)" color="green" text>
            Go to Post
          </v-btn>
        </v-card-actions>
      </v-card>
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
      blogs: {}
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