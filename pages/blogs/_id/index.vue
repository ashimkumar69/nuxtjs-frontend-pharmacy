<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" lg="8" class="mx-auto">
          <v-card>
            <v-img :src="blog.picture" height="350px"></v-img>
            <v-card-subtitle class="pb-0">{{ blog.published_at }}</v-card-subtitle>
            <v-card-title>{{ blog.title }}</v-card-title>
            <v-card-text v-html="blog.body"></v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "BlogDetails",
  data() {
    return {
      blog: {},
    };
  },
  async asyncData({ store, $axios, params }) {
    try {
      const blog = await $axios.$get(`/showBlog/${params.id}`);
      return {
        blog: blog.data,
      };
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style>
</style>