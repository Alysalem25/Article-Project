<template>
  <div class="sidebar">
    <h1>All videos</h1>
    <div class="video_p" v-for="video in videos">
      <router-link
        class="route_link"
        :to="{ name: 'tv', params: { id: video.id } }"
        @click="fetch_data"
      >
        <p class="p_id">{{ video.id }} - </p>
        <p>
          {{ video.video_title }}
        </p>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      videos: [],
      id: this.$route.params.id,
    };
  },
  mounted() {
    fetch("http://localhost:3000/videos")
      .then((res) => res.json())
      .then((data) => (this.videos = data))
      .catch((err) => console.log(err.massage));
  },
  methods: {},
};
</script>
<style scoped>
.sidebar {
  text-align: end;
  width: 150%;
  border-left: 1px solid #333;
  margin: 30px 0;
}
.route_link {
  text-decoration: none;
  /* text-align: start; */
}
.video_p{
    margin: 20px 0;

}
p{

    display: inline;
    font-size: 20px;
}
.p_id {
  margin: 40px 10px;
}
</style>
