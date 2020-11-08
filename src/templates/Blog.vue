<template>
  <Layout>
    <section id="title">
      <div class="my-8">
        <h1 class="display-2 font-weight-bold text-center">
          {{ $page.blog.title }}
        </h1>
        <div class="d-flex justify-center mt-6">
          <h4 class="font-weight-light text-xs-body-1">
            {{ $page.blog.author.name }}
          </h4>
          <p class="px-2">|</p>
          <h4 class="font-weight-light text-xs-body-1">
            {{ $page.blog.humanTime }}
          </h4>
          <p class="px-2">|</p>
          <h4 class="font-weight-light text-xs-body-1">
            Posted in
            <g-link
              :to="$page.blog.category.path"
              class="text-decoration-none green--text text--darken-4"
            >
              {{ $page.blog.category.title }}
            </g-link>
          </h4>
        </div>
      </div>
    </section>

    <section id="image" class="mb-12">
      <v-img :src="$page.blog.image" :alt="$page.blog.image_caption">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <p class="subheading font-italic text-center mt-4 grey--text">
        {{ $page.blog.image_caption }}
      </p>
    </section>

    <v-responsive class="mx-auto mb-8" width="56">
      <v-divider class="mb-1 grey lighten-1"></v-divider>

      <v-divider class="grey lighten-1"></v-divider>
    </v-responsive>

    <div
      class="text-md-h6 font-weight-regular px-2 markdown"
      v-html="$page.blog.content"
    ></div>

    <Disqus shortname="josharrants" :identifier="$page.blog.title" />

    <!-- <a
      href="https://twitter.com/share?ref_src=twsrc%5Etfw"
      class="twitter-share-button"
      target="_blank"
      rel="noopener noreferrer nofollow"
      data-show-count="false"
      >Tweet</a
    > -->
  </Layout>
</template>

<page-query>
  query ($id: ID!) {
    blog (id: $id) {
      title
      path
      image
      image_caption
      keywords
      excerpt
      category {
        title
        path
      }
      content
      humanTime : created(format: "MMMM Do YYYY")
      author {
        name
      }
    }
  }
</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.blog.title,
      meta: [
        { name: 'author', content: this.$page.blog.author.name },
        { name: 'description', content: this.$page.blog.excerpt },
        { name: 'keywords', content: this.$page.blog.keywords }
      ]
    };
  },
  mounted() {
    const highlights = document.querySelectorAll('.gridsome-highlight');

    highlights.forEach(code => {
      const copyBtn = document.createElement('button');
      console.log(code.attributes[1].nodeValue);
      copyBtn.innerHTML = `Copy ${code.attributes[1].nodeValue}`;
      copyBtn.addEventListener('click', this.handleCopyClick);
      code.append(copyBtn);
    });
  },
  methods: {
    handleCopyClick(e) {
      const { children } = e.target.parentElement;
      const { innerText } = Array.from(children)[0];
      this.copyToClipboard(innerText);
      alert(innerText);
    },
    copyToClipboard(str) {
      const el = document.createElement('textarea');

      el.value = str;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';

      document.body.appendChild(el);

      const selected =
        document.getSelection().rangeCount > 0
          ? document.getSelection().getRangeAt(0)
          : false;

      el.select();

      document.execCommand('copy');
      document.body.removeChild(el);
      if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
      }
    }
  }
};
</script>

<style scoped>
.markdown {
  line-height: 35px;
}

.markdown >>> ul:last-child {
  margin-top: 0;
  margin-bottom: 0;
}

.markdown >>> ul {
  margin-left: 1.5rem;
  margin-bottom: 2rem;
}

.markdown >>> blockquote {
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 30px;
  padding-left: 15px;
  border-left: 3px solid #ccc;
}

.markdown >>> a {
  color: black;
}

.markdown >>> h2 {
  /* https://medium.com/@brockreece/scoped-styles-with-v-html-c0f6d2dc5d8e */
  margin: 1.5rem 0 1.5rem 0;
}

.markdown >>> .gridsome-highlight {
  font-size: 17px;
  margin: 3rem 0 3rem 0;
}

.markdown >>> p {
  margin: 2rem 0 2rem 0;
}

.markdown >>> .language-text {
  background-color: #ddd;
  color: black;
}

.markdown >>> .gridsome-highlight button {
  color: #adb5bd;
  box-sizing: border-box;
  transition: 0.5s ease-out;
  cursor: pointer;
  user-select: none;
  background: rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0);
  padding: 5px 10px;
  font-size: 0.8em;
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 0 0.15rem;
}

/**
 * Add back the container background-color, border-radius, padding, margin
 * and overflow that we removed from <pre>.
 */
/* .markdown >>> .gridsome-highlight {
  background-color: #fdf6e3;
  border-radius: 5em;
  margin: 4em 0;
  padding: 1em;
  overflow: auto;
} */

/* .markdown >>> .gridsome-code-title {
  position: relative;
  z-index: 100;
  margin-bottom: -0.8em;
  background-color: rgb(255, 238, 188);
  color: red;
  font-style: italic;
  font-weight: 100;
  text-align: center;
  font-family: PT Mono, Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono',
    monospace;
  line-height: 1.5;
  border-top-left-radius: 0.3em;
  border-top-right-radius: 0.3em;
} */

/**
 * Remove the default PrismJS theme background-color, border-radius, margin,
 * padding and overflow.
 * 1. Make the element just wide enough to fit its content.
 * 2. Always fill the visible space in .gridsome-highlight.
 * 3. Adjust the position of the line numbers
 */
.markdown >>> .gridsome-highlight pre[class*='language-'] {
  background-color: transparent;
  margin: 0;
  padding: 0;
  overflow: initial;
  float: left;
  min-width: 100%;
}

.markdown >>> .gridsome-highlight pre[class*='language-'].line-numbers {
  padding-left: 2.8em;
}
</style>