<template>
  <Layout>
    <div class="push-down">
      <div id="notfound">
        <div class="notfound">
          <div class="notfound-404">
            <h1
              :style="
                $vuetify.theme.dark ? { color: 'white' } : { color: '#232323' }
              "
            >
              4<span></span>4
            </h1>
          </div>
          <h2
            :style="
              $vuetify.theme.dark ? { color: 'white' } : { color: '#232323' }
            "
          >
            Oops! This page could not be found.
          </h2>
          <p>
            The page you are looking for does not exist, has been removed, or
            it's temporarily unavailable.
          </p>
          <g-link to="/">Back to homepage</g-link>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: '404'
  }
};
</script>

<style scoped>
.push-down {
  margin-top: 100px;
}

#notfound {
  position: relative;
  height: 50vh;
}

#notfound .notfound {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.notfound {
  max-width: 520px;
  width: 100%;
  text-align: center;
  line-height: 1.4;
}

.notfound .notfound-404 {
  height: 190px;
}

.notfound .notfound-404 h1 {
  font-size: 146px;
  font-weight: 700;
  margin: 0px;
  color: #232323;
}

.notfound .notfound-404 h1 > span {
  display: inline-block;
  width: 120px;
  height: 120px;
  background-image: url('../../content/blog/images/404.png');
  background-size: cover;
  -webkit-transform: scale(1.4);
  -ms-transform: scale(1.4);
  transform: scale(1.4);
  z-index: -1;
}

.notfound h2 {
  font-size: 22px;
  font-weight: 700;
  margin: 0;
  text-transform: uppercase;
  color: #232323;
}

.notfound p {
  color: #787878;
  font-weight: 300;
}

.notfound a {
  display: inline-block;
  padding: 12px 30px;
  font-weight: 700;
  background-color: #f99827;
  color: #fff;
  border-radius: 40px;
  text-decoration: none;
  -webkit-transition: 0.2s all;
  transition: 0.2s all;
}

.notfound a:hover {
  opacity: 0.8;
}

@media only screen and (max-width: 767px) {
  .notfound .notfound-404 {
    height: 115px;
  }
  .notfound .notfound-404 h1 {
    font-size: 86px;
  }
  .notfound .notfound-404 h1 > span {
    width: 86px;
    height: 86px;
  }
}
</style>