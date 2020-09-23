<template>
  <div class="no-scroll">
    <Layout>
      <template slot="home">
        <v-img :src="require('@/assets/img/bg-404.jpg')">
          <v-item-group>
            <v-row align="center" justify="center">
              <v-col cols="12" md="4">
                <v-img :src="require('@/assets/img/404.png')"></v-img>
                <h1>404</h1>
              </v-col>
            </v-row>
          </v-item-group>

          <!-- <v-row align="center" justify="center">
          <div class="d-flex">
            <v-row class="text-center" cols="12">
              <v-img :src="require('@/assets/img/404.png')"></v-img>
              <h1>404</h1>
            </v-row>
          </div>
        </v-row> -->
        </v-img>
      </template>
    </Layout>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.no-scroll {
  margin: 0;
  height: 100%;
  overflow: hidden;
}
</style>