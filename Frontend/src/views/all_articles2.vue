<template>
  <div>
    <navbar />
    <dashboard />
    <main>
      <section>
        <div class="container" v-if="articles && articles.length > 0">
          <div
            class="text-center"
            style="
              background-color: #0b3643;
              color: white;
              font-weight: 800;
              padding: 20px 0px;
              font-size: x-large;
            "
          >
            <p>مراجعة المقالات الجديدة</p>
          </div>
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <div class="col" v-for="(article, index) in articles" :key="index">
              <router-link
                class="to_article_page2"
                :to="{ name: 'review', params: { id: article._id } }"
              >
              <div class="card">
              <img class="card-img-top rounded-3"    v-if="article.imageUrl" :src="'http://localhost:5000' + article.imageUrl" alt="Article Image" />
              <div class="card-body">
                <h5 class="card-title text-end">{{ article.title }}
                </h5>
                <p class="card-text">
                  <!-- <p>{{  }}</p> -->
                  <p v-html="getShortContent(article.content)"></p>
                  <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <small class="text-body-secondary">{{
                        article.author
                      }}</small>
                      <small
                        :style="{
                          color:
                            article.status === 'pending' ||
                            article.status === 'rejected'
                              ? 'red'
                              : 'green',
                        }"
                      >
                        {{ article.status }}
                      </small>
                    </div>
                </p>
              </div>
              <div class="card-footer">
                <small class="text-muted">{{formattedDate(article.date)}}</small>
              </div>
            </div>
              </router-link>
            </div>
           
          </div>
        </div>
        <div
          v-else
          class="text-center"
          style="
            background-color: #0b3643;
            color: white;
            font-weight: 800;
            padding: 20px 0px;
            font-size: x-large;
          "
        >
          لا يوجد مقالات
        </div>
      </section>
    </main>
  </div>
  <foot class="col-10" />
</template>

<script>
import "../../public/assets/dist/js/bootstrap.bundle.min.js";
import "../../public/assets/dist/css/bootstrap.rtl.min.css";
import foot from "@/components/foot.vue";
import spiner_loding from "@/components/spiner_loding.vue";
import navbar from "@/components/side_bar/navbar.vue";
import dashboard from "@/components/side_bar/dashbord.vue";
import axios from "axios";

export default {
  components: {
    foot,
    spiner_loding,
    navbar,
    dashboard,
  },
  data() {
    return {
      articles: null,
    };
  },
  computed: {
    
  },
  mounted() {
    axios
      .get("http://localhost:5000/articles")
      .then((res) => {
        console.log(res.data);
        this.articles = res.data;
      })
      .catch((err) => console.log(err.message)); // Fixed `err.massage` typo
      
  },
  computed: {
  getShortContent() {
    return (content) => {
      if (!content) return '';

      // Create a temporary element to extract plain text
      const tempElement = document.createElement("div");
      tempElement.innerHTML = content;
      const plainText = tempElement.textContent || tempElement.innerText || '';

      return plainText.split('').slice(0, 40).join('') + '...';
    };
  }
},
  methods: {
    formattedDate(date) {
      return new Intl.DateTimeFormat("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      }).format(new Date(date));
    },
  },
};
</script>

<style scoped>
/* body {
    position: relative;
    width: 100%;
  } */

/* .bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }
  
  @media (min-width: 768px) {
  
  } */
.row {
  display: flex;
  justify-content: center;
}

.col-9 {
  width: 79%;
}

.btn1 {
  background-color: transparent;
  /* border: 1px solid black; */
  border: none;
  padding: 5px;
  border-radius: 10px;
}

.small-box1 {
  background-color: rgb(49, 210, 255);
  text-align: center;
  padding: 10px 0 0 0;
  margin: 5px;
  margin: 20px;
  padding: 20px 0;
}

.small-box-footer1 {
  background-color: rgb(20, 145, 165);
  text-decoration: none;
  color: wheat;
  display: block;
  padding: 10px;
}

.small-box2 {
  padding: 10px 0 0 0;
  background-color: rgb(255, 182, 49);
  text-align: center;
  margin: 20px;
  padding: 20px 0;
}

.small-box-footer2 {
  background-color: rgb(230, 173, 6);
  text-decoration: none;
  color: wheat;
  display: block;
  padding: 10px;
}

.small-box3 {
  background-color: rgb(255, 235, 49);
  text-align: center;
  padding: 10px 0 0 0;
  margin: 20px;
  padding: 20px 0;
}

.small-box-footer3 {
  background-color: rgb(198, 47, 62);
  text-decoration: none;
  color: wheat;
  display: block;
  padding: 10px;
}

.small-box4 {
  padding: 10px 0 0 0;
  background-color: rgb(49, 255, 210);
  text-align: center;
  margin: 20px;
  padding: 20px 0;
}

.small-box-footer4 {
  background-color: rgb(37, 143, 61);
  text-decoration: none;
  color: wheat;
  display: block;
  padding: 10px;
}

.album {
  margin: 50px 120px 0 0;
}

.btn1:hover {
  background-color: var(--main-color);
}

section {
  margin-top: 50px;
  width: 85%;
  padding: 0px 50px;
}

.radio-button-container {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-direction: row;
}

.radio-button {
  display: inline-block;
  position: relative;
  cursor: pointer;
  margin: 0 10px;
}

.radio-button__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.radio-button__label {
  display: inline-block;
  padding-left: 30px;
  margin-bottom: 10px;
  position: relative;
  font-size: 15px;
  color: #201e1e;
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.radio-button__custom {
  position: absolute;
  top: 4px;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #555;
  transition: all 0.3s ease;
}

.radio-button__input:checked + .radio-button__label .radio-button__custom {
  background-color: var(--main-color);
  border-color: transparent;
  transform: scale(0.8);
  box-shadow: 0 0 20px var(--main-color);
}

.radio-button__input:checked + .radio-button__label {
  color: var(--main-color);
}

.radio-button__label:hover .radio-button__custom {
  transform: scale(1.5);
  border-color: var(--main-color);
  box-shadow: 0 0 20px var(--main-color);
}

.to_article_page2 {
  text-decoration: none;
}

.card {
  margin: 20px;
}

.card-text {
  direction: rtl;
}

.card:hover {
  border: none;
  transform: scale(1.1);
  /* box-shadow:0px 3px 8px; */
  box-shadow: var(--main-color) 0px 28px 57px -10px;
}

@media (max-width: 600px) {
  section {
    margin-top: 50px;
    width: 100%;
  }
  .album {
    margin: 0;
  }

  .row {
    margin: 0;
  }

  .contaner_foot {
    margin: 0;
  }
}
</style>
