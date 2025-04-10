<template>
  <swiper
    :slidesPerView="5"
    :spaceBetween="20"
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
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide v-for="(slider,index) in sliders" :key="index" >
      <img :src="slider.img_url" alt="" />
      <h1 class="img_h1">{{ slider.img_title }}</h1>
    </swiper-slide>
    <button class="swiper-button-prev">
      <svg
        width="42"
        height="16"
        viewBox="0 0 42 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M41 9C41.5523 9 42 8.55228 42 8C42 7.44772 41.5523 7 41 7V9ZM0.292892 7.29289C-0.0976295 7.68342 -0.0976295 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41422 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM41 7L1 7V9L41 9V7Z"
          fill="black"
          fill-opacity="0.5"
        />
      </svg>
    </button>
    <button class="swiper-button-next">
      <svg
        width="42"
        height="16"
        viewBox="0 0 42 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 7C0.447715 7 0 7.44772 0 8C0 8.55228 0.447715 9 1 9L1 7ZM41.7071 8.70711C42.0976 8.31658 42.0976 7.68342 41.7071 7.29289L35.3431 0.928932C34.9526 0.538408 34.3195 0.538408 33.9289 0.928932C33.5384 1.31946 33.5384 1.95262 33.9289 2.34315L39.5858 8L33.9289 13.6569C33.5384 14.0474 33.5384 14.6805 33.9289 15.0711C34.3195 15.4616 34.9526 15.4616 35.3431 15.0711L41.7071 8.70711ZM1 9L41 9V7L1 7L1 9Z"
          fill="black"
        />
      </svg>
    </button>
  </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";

// import "./style.css";

// import required modules
import { Pagination } from "swiper";
import { Navigation } from "swiper";


export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  
  setup() {
    return {
      modules: [Pagination, Navigation],
    };
  },
  data() {
    return {
      sliders: [],
    };
  },
  mounted() {
    fetch("  http://localhost:3000/sliders")
      .then((res) => res.json())
      .then((data) => (this.sliders = data))
      .catch((err) => console.log(err.massage));
  },
};
</script>
<style scoped>
#app {
  height: 100%;
}
html,
body {
  position: relative;
  height: 100%;
}

body {
  /* background: #eee; */
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper-wrapper {
  width: 100%;
  height: 100%;
  margin: 0 35px;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  width: 200px;
  height: 200px;
  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  object-fit: cover;
}
.swiper-button-prev:after,
.swiper-rtl .swiper-button-next:after {
  display: none;
}
.swiper-button-next:after,
.swiper-rtl .swiper-button-prev:after {
  content: "next";
  display: none;
}
.swiper-button-next,
.swiper-button-prev {
  border: none;
  position: absolute;
}
svg {
  color: aqua;
}
.swiper-button-prev {
  background-color: transparent;
  width: 60px;
  position: absolute;
  left: 0;
}
.swiper-button-next {
  background-color: transparent;
  width: 60px;
  position: absolute;
  right: 0;
}
.img_h1 {
  position: absolute;
  color: white;
  font-weight: bold;
  z-index: 2;
}
</style>
