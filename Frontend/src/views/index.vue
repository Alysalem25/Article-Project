<template>
  <div>
    <navbar />
    <div class="main_all">
      <div class="container">
        <div class="row">
          <h1>Hello world</h1>
          <div
            class="col-8 Div position-relative"
            style="border-right: 1px solid #00000047"
          >
            <div class="div_img1" v-if="lasest.length > 0">
              <div>
                <!-- <img src="img1.png" /> -->
                <img
                  v-if="lasest[0].imageUrl"
                  :src="'http://localhost:5000' + lasest[0].imageUrl"
                  alt="Article Image"
                  class="article-image w-100"
                />

                <!-- <img src="../assets/img1.png" class="img1" height="470" alt=""> -->
                <div class="img_detalis">
                  <div class="p_time">
                    {{ lasest[0].date }}
                  </div>
                  <p class="writer">الكاتب:{{ lasest[0].author }}</p>
                </div>
                <h1 class="img1_titel1">{{ lasest[0].title }}</h1>
              </div>
            </div>
          </div>
          <!-- <hr > -->
          <!-- <div class="col"></div> -->
          <div class="col-4">
            <!-- <div class="div_img2"> -->
            <!-- <div class="div_img2" v-for="img in imgs"> -->
            <div class="div_img2" v-if="lasest.length > 1">
              <img
                v-if="lasest[1].imageUrl"
                :src="'http://localhost:5000' + lasest[1].imageUrl"
                alt="Article Image"
                class="article-image"
              />
              <!-- <img src="../assets/img1.png" class="img2" height="200" alt=""> -->
              <div class="img_detalis2">
                <div class="p_time2">
                  {{ lasest[1].date }}
                </div>
                <p class="writer2">الكاتب:{{ lasest[1].author }}</p>
              </div>
              <p class="img2_titel2">{{ lasest[1].title }}</p>
            </div>
            <hr />
            <div class="div_img2" v-if="lasest.length > 2">
              <img
                v-if="lasest[2].imageUrl"
                :src="'http://localhost:5000' + lasest[2].imageUrl"
                alt="Article Image"
                class="article-image"
              />
              <!-- <img src="../assets/img1.png" class="img2" height="200" alt=""> -->
              <div class="img_detalis2">
                <div class="p_time2">
                  {{ lasest[2].date }}
                </div>
                <p class="writer2">الكاتب:{{ lasest[2].author }}</p>
              </div>
              <p class="img2_titel2">{{ lasest[2].title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
<hr/>
<br/>
    <div class="slider">
      <h1 class="slider_title">الاقسام</h1>
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
        <swiper-slide v-for="(slider, index) in sliders" :key="index">
          <img :src="slider.img_url" alt="" />
          <h1 class="img_h1">{{ slider.img_title }}</h1>
        </swiper-slide>
      </swiper>
    </div>
    <hr/>
    <br />
    <div class="lastest_article" v-if="articles.length > 0">
      <div class="lastest_article_titels">
        <h1 class="section_article_title">
          احدث
          <span>المقالات</span>
        </h1>
        <router-link class="to_article_page" to="/all_articles"
          >أقرأ المزيد
        </router-link>
      </div>
      <div
        class="container_lastest_article m-4"
        :key="article._id"
        v-for="article in articles"
      >
        <div class="row lg-my-5 d-flex align-items-center">
          <div class="col-6 article_discription" style="gap: 9px">
            <p class="article_writer">
              كتب بواسطة : {{ article.author }}
              <!-- <hr class="line"> -->
            </p>
            <h3 class="article_title">{{ article.title }}</h3>
            <p
              class="part_of_article"
              v-html="getShortContent(article.content)"
            ></p>

            <div class="div">
              <router-link
                class="to_article_page2"
                :to="{ name: 'aricle_page', params: { id: article._id } }"
              >
                أقرأ المزيد
              </router-link>
              <div class="article_time">
                <p class="p_article_from">
                  {{ article.date }}
                </p>
              </div>
            </div>
          </div>
          <div class="col-6 col_img">
            <img
              v-if="article.imageUrl"
              :src="'http://localhost:5000' + article.imageUrl"
              alt="Article Image"
              class="article-image w-100"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <spiner_loding />
    </div>
    <!----------------------------slider 2 ------------------------------------>
    <div class="slider">
      <div class="sider2_head">
        <h1 class="slider_title">الاكثر قراءه</h1>
        <router-link to="/all_articles" style="text-decoration: none"
          >عرض الجميع</router-link
        >
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
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }"
        class="mySwiper"
      >
        <swiper-slide
          v-for="(most, index) in most_read"
          class="swiperSlide"
          :key="index"
        >
          <div class="divImg2">
            <img :src="most.article_img_url" />
            <!-- <img src="../assets/img1.png" class="img2" height="200" alt=""> -->
            <div class="img_detalis2">
              <div class="p_time2">
                {{ most.article_from }} . {{ most.article_time_read }}
              </div>
              <p class="writer2">الكاتب:{{ most.article_writer }}</p>
            </div>
            <h3 class="img2_titel2">{{ most.article_title }}</h3>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <!----------------------------slider 2 ------------------------------------>
    <div class="small_form">
      <h1>اشترك ليصلك جميع المقالات</h1>
      <p>
        ابقي علي اطلاع مع مقالتنا فور نزولها مع خدمة الرسائل البريدية هذه الخدمة
        مجانية تماماً
      </p>
      <input type="E-mail" name="" placeholder="البريد الإلكتروني" value="" />
      <button type="button">أشترك</button>
    </div>
  </div>
</template>

<script>
import foot from "@/components/foot.vue";
import navbar from "@/components/navbar.vue";

import slider1 from "@/components/slider1/slider1.vue";
import spiner_loding from "@/components/spiner_loding.vue";

import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";

import axios from "axios";

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
      lasest: [],
      sliders: null,
      most_read: null,
      articles: [],
      comments: [],
    };
  },
  computed: {
    getShortContent() {
      return (content) => {
        if (!content) return "";

        // Create a temporary element to extract plain text
        const tempElement = document.createElement("div");
        tempElement.innerHTML = content;
        const plainText =
          tempElement.textContent || tempElement.innerText || "";
        console.log(plainText.length);
        return  (plainText.split(" ").slice(0, 90).join(" "));
        // return "..... " + (plainText.split(" ").slice(0, 10).join(" ") + "...");
      };
    },
  },
  mounted() {
    // setTimeout(() => {

    // fetch("http://localhost:3000/lasest")
    //   .then((res) => res.json())
    //   .then((data) => (this.lasest = data))
    //   .catch((err) => console.log(err.massage));
    axios
      .get("http://localhost:5000/last3articles")
      .then((res) => {
        console.log(res.data);
        this.lasest = res.data;
        this.articles = res.data;

        this.articles.forEach((article) => {
          article.date = new Intl.DateTimeFormat("ar-EG", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
          }).format(new Date(article.date));
        });

        // Loop over the articles to fetch each author's data
        this.articles.forEach((article, index) => {
          axios
            .get("http://localhost:5000/users/" + article.author)
            .then((userRes) => {
              console.log(`Author ${index + 1}:`, userRes.data);
              this.articles[index].authorDetails = userRes.data; // Store author info inside the article
              this.articles[index].author =
                userRes.data.firstName + " " + userRes.data.surname; // Replace author ID with author name
            })
            .catch((err) => console.log("Author fetch error:", err.message));
        });
      })
      .catch((err) => console.log("Article fetch error:", err.message));

    fetch("http://localhost:3000/sliders")
      .then((res) => res.json())
      .then((data) => (this.sliders = data))
      .catch((err) => console.log(err.massage));
    fetch("http://localhost:3000/most_read")
      .then((res) => res.json())
      .then((data) => (this.most_read = data))
      .catch((err) => console.log(err.massage));
    // fetch("http://localhost:3000/articles")
    //   .then((res) => res.json())
    //   .then((data) => (this.articles = data))
    //   .catch((err) => console.log(err.massage));
    fetch("http://localhost:3000/comments")
      .then((res) => res.json())
      .then((data) => (this.comments = data))
      .catch((err) => console.log(err.massage));
    // }, 4000);
    // console.log(this.articles)
  },
  // computed: {
  //   accsept_articals() {
  //     return this.articles.filter((article) => article.status === "accsept");
  //   },
  // },
};
</script>

<style scoped>
* {
  font-family: "Cairo", sans-serif;
}
.container1 {
  margin: 3rem;
}
.section_article_title {
  position: relative;
  /* text-align: center; */
  width: 500px;
  /* right: 0; */
  /* background-color: aqua; */
  /* height: auto; */
  /* top: 100px; */
}
.section_article_title::after {
  /* content: ""; */
  position: absolute;
  bottom: 0px;
  right: 330px;
  width: 5px;
  height: 80px;
  background-color: var(--main-color);
  border-radius: 30px;
  z-index: -1;
  transform: rotate(30deg);
}
.section_article_title::before {
  /* content: ""; */
  position: absolute;
  bottom: 20px;
  right: 350px;
  width: 5px;
  height: 60px;
  background-color: var(--main-color);
  border-radius: 30px;
  z-index: -1;
  transform: rotate(30deg);
}
* {
  text-align: center;
}

p,
h1 {
  color: black;
  text-align: center;
}

h1 {
  font-size: 50px;
}
.img_h1 {
  position: absolute;
  color: white;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
}

.div_img1 {
  width: 100%;
}
.swiperSlide {
  border: 1px solid #00000047;
  padding-bottom: 10px;
}
.img_detalis,
.img_detalis2 {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  padding: 0px 10px;
}

.img1_titel1,
.img2_titel2 {
  display: flex;
  justify-content: end;
  margin: 0;
  padding: 0px 10px;
}

img {
  width: 100%;
}

.col-8 {
  border-right: 1px solid black;
}

.slider_title,
span {
  font-size: 50px;
  /* margin: 10px; */
  /* background: linear-gradient(to left, rgb(201, 87, 255)  ,rgb(83, 103, 255)); */
  background: linear-gradient(to left, rgb(3, 2, 4), rgb(83, 103, 255));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.lastest_article {
  margin: 3rem;
}

.lastest_article_titels {
  /* margin: 5px; */
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  align-items: center;
}

.to_article_page,
.to_article_page2 {
  font-size: 30px;
  text-decoration: none;
}

.article_discription {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
}

.article_writer,
.article_title,
.to_article_page2,
.article_time,
.part_of_article {
  text-align: end;
}

.sider2_head {
  display: flex;
  padding: 20px;
  margin: 20px;
  flex-direction: row-reverse;
  justify-content: space-between;
}
.article_title {
  font-size: 25px;
  font-weight: 1000;
}

.part_of_article {
  font-size: 20px;
}

.article_writer {
  position: relative;
}
.article_writer::before {
  position: absolute;
  display: none;
  content: "";
  width: 20px;
  height: 3px;
  margin: 0px 10px;
  background-color: rgb(227, 227, 227);
  top: 50%;
  right: -30px;
}

.p_article_from {
  text-align: end;
}

.line {
  position: absolute;
  top: -5px;
  width: 40px;
  display: inline-flex;
  color: #000;
  border: 1px solid #000;
}
.small_form {
  margin: 60px 0;
}
.small_form h1 {
  color: rgb(56, 56, 56);
  font-size: 50px;
}
.small_form p {
  color: rgb(96, 96, 96);
  font-size: 20px;
  font-weight: 100;
  margin: 10px;
  padding: 10px;
}
.small_form input {
  width: 300px;
  height: 35px;
}

.small_form input::placeholder {
  text-align: end;
  margin-right: 15px;
}

.small_form button {
  width: 100px;
  height: 35px;
  border: none;
  background-color: rgb(81, 101, 253);
  color: rgb(242, 242, 242);
  margin: 10px 0;
}
.article_img {
  width: 90% !important;
}
.div {
  display: flex;
  flex-direction: column;
  justify-content: end;
}
/* .p_article_time_to_read,.p_article_time_to_read{
  display: inline;
} */
@media (max-width: 781px) {
  .sider2_head {
    padding: 0 25px;
    margin: 0;
    align-items: center;
  }
  .container_lastest_article {
    margin-top: 25px;
  }
  .section_article_title {
    margin: 0px !important;
  }
  .section_article_title span {
    margin: 0 !important;
  }
  .div .to_article_page2 {
    font-size: 17px;
  }
  .div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .article_discription {
    gap: 0 !important;
  }
  .article_discription .part_of_article {
    font-size: 15px;
  }
  .article_discription p,
  .article_discription h3 {
    margin: 0 !important;
    padding: 0 !important;
  }

  .article_img {
    width: 100% !important;
    height: 25vh !important;
  }

  .section_article_title {
    text-align: end;
  }
  .main_all {
    margin: 85px 0 0;
  }
  .div_img2 {
    margin: 0 0 10px;
  }
  .img_detalis2 {
    font-size: 10px;
  }
  .img_detalis2 p {
    margin: 0;
  }
  .img1_titel1 {
    font-size: 25px;
    margin-bottom: 15px;
  }
  .Div {
    border-right: none !important;
  }
}
@media only screen and (max-width: 700px) {
  .div_img2 {
    width: 50%;
  }
  .container1 {
    margin: 0;
  }
  .main_all {
    margin-top: 80px;
  }

  .container .row {
    display: flex;
    flex-direction: column;
    margin: 5px;
    /* background-color: aqua;  */
  }

  .img1_titel1 {
    font-size: 50px;
  }

  .col-8 {
    border: none;
    width: 100%;
  }

  .col-4 {
    width: 100%;
    /* margin: 5px; */

    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .img2_titel2 {
    font-size: smaller;
    font-weight: 600;
  }

  .p_time2 {
    display: none;
  }

  .divImg2 {
    width: 100%;
    height: 100%;
    margin: 0px;
  }

  .part_of_article {
    font-size: 10px;
    /* font-weight:bold; */
  }

  .section_article_title {
    width: 200px;
  }
  .section_article_title,
  .section_article_title span {
    font-size: 30px;
    margin-left: 40px;
  }

  .section_article_title::after {
    /* content: ""; */
    position: absolute;
    bottom: 0px;
    right: 100px;
    width: 5px;
    height: 30px;
    background-color: var(--main-color);
    border-radius: 30px;
    z-index: -1;
    transform: rotate(30deg);
  }
  .section_article_title::before {
    /* content: ""; */
    position: absolute;
    bottom: 0px;
    right: 120px;
    width: 5px;
    height: 20px;
    background-color: var(--main-color);
    border-radius: 30px;
    z-index: -1;
    transform: rotate(30deg);
  }

  .to_article_page,
  .to_article_page2 {
    font-size: 10px;
    font-weight: 20;
    display: inline;
    margin: 0;
    padding: 0;
  }

  .lastest_article {
    padding-bottom: 10px;
    margin: 0;
  }
  .lastest_article_titels[data-v-a83bd3b0] {
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    align-items: center;
    padding: 0 25px;
  }
  .small_form h1 {
    color: rgb(56, 56, 56);
    font-size: 30px;
  }
  .small_form input {
    width: auto;
    height: 35px;
  }
}
@media (max-width: 425px) {
  .container_lastest_article .row {
    flex-direction: column-reverse;
    padding: 0 35px;
    margin: 0 0 25px;
  }
  .container_lastest_article .row .col_img {
    width: 100%;
  }
  .div {
    margin: 8px 0;
  }
  .article_discription {
    width: 100%;
  }
  .img1_titel1 {
    font-size: 35px;
    margin-bottom: 25px;
  }
}
.swiper-button-prev:after,
.swiper-button-prev::before,
.swiper-button-next::after,
.swiper-button-next::before {
  content: " " !important;
}
.swiper-button-next,
.swiper-rtl .swiper-button-prev {
  color: white !important;
}
.swiper-button-prev,
.swiper-rtl .swiper-button-next {
  color: white !important;
}
</style>
