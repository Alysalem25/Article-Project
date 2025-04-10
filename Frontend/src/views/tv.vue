<template>
    <navbar/>

  <div class="container">
    <div class="row">
      <div class="col" v-if="video">
        <h1>video title</h1>
        <div class="spinner" v-if="!loaded">
          <spiner_loding />
        </div>
        <iframe
          :src="video.video_url"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          @load="onIframeLoad"
          v-show="loaded"
        ></iframe>
        <h1 class="video_title"> {{ video.video_title }}</h1>
        <p>
         
        </p>
        <br />
        <a :href="video.video_url">video link on youtupe {{ video.video_url}}</a>
      </div>
      <div v-else>
        <div id="app">
          <div class="col">
            <h1>about ......</h1>
            <div class="spinner" v-if="!loaded">
              <spiner_loding />
            </div>
            <iframe
              width="860"
              height="415"
              src="https://www.youtube.com/embed/-4P1HFZjTGQ"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
              @load="onIframeLoad"
              v-show="loaded"
            ></iframe>
            <h1 class="video_title">video title</h1>
            <p>explain what is ....</p>
            <br />
            <a>video link</a>
          </div>
        </div>
      </div>
    </div>
    <div class="col sidebar_col">
      <div class="sidebar">
        <h1 @click="show_video_titles()">All videos</h1>
<!-- <<<<<<< HEAD -->
        <!-- <div class="video_p" v-if="show" v-for="(video,index) in videos" :key="index"> -->
<!-- ======= -->
        <div class="video_p" v-for="video in videos" :key="video">
<!-- >>>>>>> 078aa65720ca10a2e3b50ea4ccc7bd1c530a3827 -->
          <button class="route_link" @click="fetch_data(video.id)">
            <p class="p_id">{{ video.id }} -</p>
            <p>
              {{ video.video_title }}
            </p>
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
  
  <foot /> 
</template>
<script>
import foot from "@/components/foot.vue";
import navbar from "@/components/navbar.vue";

import sidebar from "@/components/sidebar.vue";
import spiner_loding from "@/components/spiner_loding.vue";
export default {
  components: {
    sidebar,
    spiner_loding,
    navbar,
    foot,
  },
  data() {
    return {
      videos: [],
      video: null,
      loaded: false,
      show: true,
    };
  },
  computed: {
    allVideos() {
      return this.videos;
    },
    screenWidth() {
      return document.body.offsetWidth;
    },
  },
  mounted() {
    fetch("http://localhost:3000/videos")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.videos = data;
      })
      .catch((err) => console.log(err.massage));
  },
  methods: {
    fetch_data(id) {
      console.log(id);
      fetch("http://localhost:3000/videos/" + id)
        .then((res) => res.json())
        .then((data) => {
          this.video = data;
          console.log(data);
        })
        .catch((err) => console.log(err.message));
    },
    onIframeLoad() {
      this.loaded = true;
    },
    show_video_titles() {
      if (this.screenWidth < 700) {
        console.log("tw");
        if (this.show === false) {
          this.show = true;
          console.log("true1");
        } else if (this.show === true) {
          this.show = false;
          console.log("true2");
        }
      } else {
        console.log("any thing");
      }
    },
  },
};
</script>


<style scoped>
* {
  font-family: "Cairo", sans-serif;
}
.container {
  display: flex;
  justify-content: space-between;
}
.sidebar_col {
  text-align: end;
  width: 100%;
}
.row {
  width: 100%;
}
h1 {
  margin: 30px 20px;
}
p {
  font-size: 20px;
}
a {
  margin: 20px;
}
.sidebar {
  text-align: end;
  width: 150%;
  border-left: 1px solid #333;
  margin: 30px 0;
}
.route_link {
  text-decoration: none;
  border: none;
  background-color: transparent;
  /* text-align: start; */
  position: relative;
}
.route_link::before {
  content: "";
  position: absolute;
  width: 0%;
  height: 2px;
  bottom: 0;
  background-color: var(--main-color);
}
.route_link:hover::before {
  width: 100%;
  animation-name: border_bottom;
  animation-timing-function: ease-out;
  animation-duration: 1s;
  animation-iteration-count: 1;
}
iframe {
  width: 860px;
  height: 415px;
}
@keyframes border_bottom {
  0% {
    width: 0%;
  }
  /* 50%{
    width: 50%;
  } */
  100% {
    width: 100%;
  }
}
.video_p {
  margin: 20px 0;
}
p {
  display: inline;
  font-size: 20px;
}
.p_id {
  margin: 40px 10px;
}
@media only screen and (max-width: 700px) {
  
  /* .video_p{
    display: none;
  } */
}
@media only screen and (max-width: 1000px) {
  .container {
    flex-direction: column-reverse;
  }
  .sidebar {
    width: 100%;
    margin: 75px 0 0 0;
    overflow: auto;
    display: block;
    white-space: nowrap;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  iframe {
    width: 100%;
    height: 300px;
  }
  .col{
    display: flex;
    align-items: baseline;
    flex-direction: column;
    justify-content: center;
  }
}

</style>
