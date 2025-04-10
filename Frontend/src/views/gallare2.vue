<template>
  <div class="container" v-for="gallare in gallares">
    <div class="row row_topics">
      <button @click="togalle_event($event)" class="selected" id="all">
        all
      </button>
      <div class="col topics">
        <button
          @click="togalle_event($event)"
          v-for="(topic, index) in gallare.topics"
          class="not_selected"
          :id="index + 1"
        >
          topic {{ topic.topic_num }}
        </button>
      </div>

      <div class="col" v-for="(topic, index) in gallare.topics">
        <div
          v-if="
            selectedTopic === null || selectedTopic === (index + 1).toString()
          "
        >
          <h1>topic {{ topic.topic_num }}</h1>
          <p>{{topic.topic_description}}</p>
          <swiper
            :slidesPerView="5"
            :spaceBetween="30"
            :loop="true"
            :navigation="true"
            :modules="modules"
            :centeredSlides="true"
            :autoplay="{
              delay: 2500,
              disableOnInteraction: false,
            }"
            :breakpoints="{
              '0': {
                slidesPerView: 1.5,
                spaceBetween: 10,
              },
              '640': {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              '768': {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              '1024': {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }"
            class="mySwiper"
          >
            <swiper-slide v-for="img in topic.imgs">
              <div class="img_container">
                <img :src="img.img_url" alt="" />
                <p class="img_discription">about..</p>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";

export default {
  data() {
    return {
      all: false,
      topic1: true,
      topic2: false,
      topic3: false,
      gallares: [],
      topics: [],
      target: "",
      top1: true,
      selectedTopic: null, // added this data property
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Autoplay, Pagination, Navigation],
    };
  },
  mounted() {
    fetch("http://localhost:3000/gallares")
      .then((res) => res.json())
      .then((data) => (this.gallares = data))
      .catch((err) => console.log(err.massage));
  },
  methods: {
    togalle_event(e) {
      // remove the selected class from all buttons
      document.querySelectorAll(".topics button").forEach((button) => {

          button.classList.remove("selected");
          button.classList.add("not_selected");
        
      });

      // toggle the selected and not_selected classes on the clicked button
      if (e.target.id != "all") {
        e.target.classList.toggle("selected");
        e.target.classList.toggle("not_selected");
      }

      // update the value of selectedTopic
      if (e.target.id === "all") {
        this.selectedTopic = null;
      } else {
        this.selectedTopic = e.target.id;
      }
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Cairo", sans-serif;
}
.row_topics {
  display: contents;
}

.topics {
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: row;
  text-align: center;
}

.topics .not_selected {
  margin: 20px 10px;
  padding: 10px 30px;
  border: none;
  background-color: rgb(238, 238, 238);
  border-radius: 6px;
}

.selected {
  background-color: transparent;
  color: rgb(254, 206, 47);
  margin: 20px 10px;
  padding: 10px 30px;
  border: 2px solid rgb(254, 206, 47);
  border-radius: 6px;
}

img {
  height: 100px;
}
#app {
  height: 100%;
}
html,
body {
  position: relative;
  height: 100%;
}

body {
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  /* width: 100%; */
  height: 100%;
  object-fit: cover;
  position: relative;
}

.swiper {
  margin-left: auto;
  margin-right: auto;
}
.img_discription {
  position: absolute;
  background-color: #000000;
  color: aqua;
  bottom: -15px;
  width: 100%;
  display: none;
}
.img_container {
  width: 100%;
  height: 100%;
}
.img_container:hover .img_discription {
  display: block;
}
h1 {
  text-align: center;
}
img {
  width: 100%;
}
</style>
