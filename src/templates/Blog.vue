<template>
  <Layout>
    <template slot="home">
      <v-alert
        border="left"
        colored-border
        dismissible
        type="success"
        elevation="2"
        transition="scale-transition"
        :value="showAlert"
        @click="showAlert = false"
      >
        Code copied!
      </v-alert>
    </template>
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
  data() {
    return {
      showAlert: false
    };
  },
  mounted() {
    const highlights = document.querySelectorAll('.gridsome-highlight');

    highlights.forEach(div => {
      const copyBtn = document.createElement('button');
      const language = div.attributes[1].value;

      if (language === 'sh' || language === 'bash') {
        copyBtn.style.marginTop = '0';
        copyBtn.style.right = '0';
      }

      language === 'html'
        ? (copyBtn.innerHTML = `Copy Vue`)
        : (copyBtn.innerHTML = `Copy ${language}`);

      copyBtn.addEventListener('click', this.handleCopyClick);
      div.append(copyBtn);
    });
  },
  methods: {
    handleCopyClick(e) {
      const { children } = e.target.parentElement;
      const { innerText } = Array.from(children)[0];
      this.showAlert = true;
      this.copyToClipboard(innerText);
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
/* https://medium.com/@brockreece/scoped-styles-with-v-html-c0f6d2dc5d8e */
.markdown {
  line-height: 35px;
}

.markdown >>> ul:first-child {
  margin: 2rem 0 2rem 2rem;
}

.markdown >>> blockquote {
  font-size: 18px;
  margin: 10px 0 10px 30px;
  padding-left: 15px;
  border-left: 3px solid #ccc;
}

.markdown >>> a {
  color: black;
}

.markdown >>> h2 {
  margin: 1.5rem 0 1.5rem 0;
}

.markdown >>> .gridsome-highlight {
  font-size: 17px;
  margin: 0 0 3rem 0;
}

.markdown >>> p {
  margin: 2rem 0 2rem 0;
}

.markdown >>> ul > li > p {
  margin: 0;
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
  margin-top: 1rem;
  top: 0;
  right: 1rem;
  border-radius: 0 0.15rem;
}

.markdown >>> .gridsome-code-title {
  position: relative;
  z-index: 1;
  background-color: #66b13d;
  color: black;
  font-style: normal;
  font-size: 22px;
  text-align: left;
  line-height: 1.5;
  border-top-left-radius: 0.3em;
  border-top-right-radius: 0.3em;
}

.markdown >>> img[src*='#thumbnail'] {
  display: block;
  margin: auto;
  width: 100%;
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

.markdown >>> .gridsome-highlight pre[class='language-html'] {
  margin-top: 1rem;
}

.markdown >>> .gridsome-highlight pre[class='language-js'] {
  margin-top: 1rem;
}

.markdown >>> .gridsome-highlight pre[class*='language-'].line-numbers {
  padding-left: 2.8em;
  margin-top: 1rem;
}

.v-alert {
  position: fixed;
  z-index: 1;
  width: 20%;
  top: 10em;
  right: 2em;
}

/* Phones */
@media only screen and (max-width: 600px) {
  .v-alert {
    width: 45%;
    top: 8em;
  }
}
</style>