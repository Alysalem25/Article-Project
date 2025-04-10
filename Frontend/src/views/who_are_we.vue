<template>
  <navbar />
  <div class="container1" v-if="who_are_we.length > 0">
    <div class="row row_about">
      <div class="col-6 لمحة">لمحة عن <span>قراء</span></div>
      <div class="col-6 about">
        <div class="about_us_img">
          <img src="../../public/logo1.png" alt="" />
          <dive class="h3">جريدة قراء</dive>
        </div>
        <p>
          {{ who_are_we[0].about_us }}
        </p>
      </div>
    </div>
  </div>
  <div v-else>
    <spiner_loding />
  </div>
  <div class="container2" v-if="who_are_we.length > 0">
    <div class="row"><img :src="who_are_we[1].img_url" alt="" /></div>
    <div class="row row_gols">
      <div class="col-6 gols">
        <h2>اهدافنا</h2>
        <p>{{ who_are_we[1].Our_goals }}</p>
      </div>
      <div class="col-6 gols">
        <h2>رؤيتنا</h2>
        <p>{{ who_are_we[1].Our_vision }}</p>
      </div>
    </div>
  </div>
  <div v-else>
    <spiner_loding />
  </div>
  <div class="container3" v-if="who_are_we.length > 0">
    <div class="row sucssed">شركاء <span>النجاح</span></div>
    <div class="row">
      <div class="col-3"><img :src="who_are_we[2].alex_logo" alt="" /></div>
      <div class="col-3"><img :src="who_are_we[2].mdarj_logo" alt="" /></div>
      <div class="col-3"><img :src="who_are_we[2].meeza_logo" alt="" /></div>
      <div class="col-3">
        <img :src="who_are_we[2].art_space_logo" alt="" />
      </div>
    </div>
  </div>
  <div v-else>
    <spiner_loding />
  </div>
  <!-- ------------------------------slider3------------- -->
  <div class="slider">
    <div class="sider2_head">
      <div class="col">
        <h1 class="slider_title">الاكثر قراءه</h1>
      </div>
      <div class="col">
      </div>
    </div>
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
          slidesPerView: 3,
          spaceBetween: 10,
        },
        '1024': {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      }"
      class="mySwiper"
    >
      <swiper-slide v-for="team_w in team_work">
        <div class="div_img2">
          <img :src="team_w.person_img" />
          <!-- <img src="../assets/img1.png" class="img2" height="200" alt=""> -->
          <div class="img_detalis2">
            <h3 class="writer2">الكاتب:{{ team_w.person_name }}</h3>
          </div>
          <p class="img2_titel2">{{ team_w.person_role }}</p>
        </div>
      </swiper-slide>
    </swiper>
    <!-- <div v-else>
    <spiner_loding/>
    </div> -->
  </div>
  <!-- ------------------------------slider3------------- -->
  <foot />
</template>

<script>
import foot from "@/components/foot.vue";
import navbar from "@/components/navbar.vue";

import spiner_loding from "@/components/spiner_loding.vue";
import slider1 from "@/components/slider1/slider1.vue";
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
    slider1,
    spiner_loding,
    navbar,
    foot,
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
      who_are_we: [],
      team_work: null,
    };
  },
  mounted() {
    fetch("http://localhost:3000/who_are_we")
      .then((res) => res.json())
      .then((data) => (this.who_are_we = data))
      .catch((err) => console.log(err.massage));
    fetch("http://localhost:3000/team_work")
      .then((res) => res.json())
      .then((data) => (this.team_work = data))
      .catch((err) => console.log(err.massage));
  },
};
</script>
<style scoped>
* {
  font-family: "Cairo", sans-serif;

  text-align: center;
}
.row {
  flex-direction: row-reverse;
}
.row_about {
  margin: 3rem;
}

.about {
  display: flex;
  flex-direction: column;
}
.about .about_us_img img {
  /* width: 200px; */
  height: 200px;
}
.div_img2 img {
  width: 100%;
}
.about_us_img {
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.about_us_img .h3 {
  color: var(--main-color);
  font-weight: 900;
  font-size: 40px;
}
.about p {
  font-size: 20px;
}
.لمحة {
  position: relative;
  width: 500px;
  height: fit-content;
  font-weight: bolder;
  font-size: 80px;
  text-align: end;
}
.لمحة ::after {
  /* content: ""; */
  position: absolute;
  bottom: 20px;
  right: 250px;
  width: 5px;
  height: 80px;
  background-color: var(--main-color);
  border-radius: 30px;
  z-index: -1;
  transform: rotate(30deg);
}
.لمحة ::before {
  /* content: ""; */
  position: absolute;
  bottom: 20px;
  right: 230px;
  width: 5px;
  height: 60px;
  background-color: var(--main-color);
  border-radius: 30px;
  z-index: -1;
  transform: rotate(30deg);
}
.لمحة span {
  text-align: center;
  display: block;
  background: linear-gradient(to left, rgb(3, 2, 4), rgb(83, 103, 255));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.container2 {
  margin: 3rem;
}
.gols {
  /* width: ; */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: end;
}
.gols h2 {
  /* width: 20px; */
  text-align: end;
  border-bottom: 2px solid var(--main-color);
  right: 0;
}
.gols p {
  font-weight: 300;
  font-size: 20px;
  text-align: end;
}
.sucssed {
  position: relative;
  width: 100%;
  /* height: fit-content; */
  font-weight: bolder;
  display: inline;
  font-size: 70px;
  text-align: center;
}
.sucssed ::after {
  content: "";
  position: absolute;
  bottom: 0px;
  right: 250px;
  width: 5px;
  height: 80px;
  background-color: var(--main-color);
  border-radius: 30px;
  z-index: -1;
  transform: rotate(30deg);
}
.sucssed ::before {
  content: "";
  position: absolute;
  bottom: 0px;
  right: 230px;
  width: 5px;
  height: 60px;
  background-color: var(--main-color);
  border-radius: 30px;
  z-index: -1;
  transform: rotate(30deg);
}
.sucssed span {
  text-align: end;
  display: inline;
  background: linear-gradient(to left, rgb(3, 2, 4), rgb(83, 103, 255));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.container3 .row {
  background-color: rgb(250, 250, 250);
  margin: 3rem;
}
.container3 .row .col-3 img {
  width: 150px;
  height: 150px;
  filter: grayscale(100%);
  aspect-ratio: 3/2;
  object-fit: contain;
  /* mix-blend-mode: color-burn; */
}
.container3 .row .col-3 img:hover {
  width: 150px;
  height: 150px;
  filter: none;
}
.sider2_head {
  display: flex;
  flex-direction: row-reverse;
  margin: 10px;
}
@media only screen and (max-width: 700px) {
  .container1 {
    margin-top: 100px;
  }
  .container1 .row {
    display: flex;
    justify-content: center;
  }
  .row_about {
    margin: 0;
  }
  .لمحة {
    text-align: center;
  }
  .row_gols {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }
  .container2 {
    margin: 5px;
  }
  .container3 .row {
    margin: 0;
  }
  .container2 .row {
    margin: 0;
  }
  .container2 .row img {
    border-radius: 30px;
  }
  .gols p {
    font-weight: 300;
    font-size: 20px;
  }
  .gols {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .gols h2 {
    text-align: center;
    border-bottom: 2px solid var(--main-color);
    right: 0;
  }
  .gols p {
    font-weight: 300;
    font-size: 20px;
  }
  .container3 .row .col-3 img {
    width: 60px;
    height: 100px;
    filter: grayscale(100%);
  }
  .container3 .row .col-3 img:hover {
    width: 60px;
    height: 100px;
    filter: none;
  }
  .لمحة {
    position: relative;
    width: 500px;
    top: 10px;
    height: -moz-fit-content;
    height: fit-content;
    font-weight: bolder;
    font-size: 60px;
  }
  .لمحة ::after {
    /* content: ""; */
    position: absolute;
    bottom: 5px;
    right: 118px;
  }
  .لمحة ::before {
    /* content: ""; */
    position: absolute;
    bottom: 5px;
    right: 108px;
  }
  .about {
    width: 100%;
  }
}
</style>
