// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Josh Arrants',
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Author',
        path: './content/author/*.md'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Blog',
        path: './content/blog/**/*.md',
        remark: {
          plugins: [
            '@gridsome/remark-prismjs',
          ]
        },
        refs: {
          author: 'Author',
          // tags: {
          //   typeName: 'Tag',
          //   create: true
          // },
          category: {
            typeName: 'Category',
            create: true
          }
        }
      }
    }
  ],
  transformers: {
    remark: {
      externalLinksTarget: "_blank",
      externalLinksRel: ["nofollow", "noopener", "noreferrer"],
    }
  },
  templates: {
    Blog: [{
      path: '/blog/:title',
      component: './src/templates/Blog.vue'
    }],
    Category: [{
      path: '/category/:title',
      component: './src/templates/Category.vue'
    }]
  }
}
