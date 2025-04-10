<template>
  <div>
    <navbar />
    <dashboard />
    <main>
      <section class="container ">
        <div class="row" v-if="theNumber">
          <div class="col-md-5 col-12">
            <div class="small-box1">
              <div class="inner">
                <h2>عدد المقالات المنشورة</h2>
                <h3>{{ theNumber.accepted_articles }}</h3>
              </div>
            </div>
          </div>
          <div class="col-md-5 col-12">
            <div class="small-box2">
              <div class="inner">
                <h2>عدد المقالات المرفوضة</h2>
                <h3>{{ theNumber.rejected_articles }}</h3>
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-if="theNumber">
          <div class="col-md-5 col-12">
            <div class="small-box4">
              <div class="inner">
                <h2>عدد المقالات تحت المراجعة</h2>
                <h3>{{ theNumber.under_work_articles }}</h3>
              </div>
            </div>
          </div>
          <div class="col-md-5 col-12">
            <div class="small-box3">
              <div class="inner">
                <h2>عدد التعليقات</h2>
                <h3>{{ theNumber.comments }}</h3>
              </div>
            </div>
          </div>
        </div>

        <div class="radio-button-container">
          <div class="radio-button" @click="changeRadio(1)">
            <input type="radio" class="radio-button__input" id="radio1" name="radio-group" checked>
            <label class="radio-button__label" for="radio1">
              <span class="radio-button__custom"></span>
              نشرت
            </label>
          </div>
          <div class="radio-button" @click="changeRadio(2)">
            <input type="radio" class="radio-button__input" id="radio2" name="radio-group">
            <label class="radio-button__label" for="radio2">
              <span class="radio-button__custom"></span>
              المرفوض
            </label>
          </div>
          <div class="radio-button" @click="changeRadio(3)">
            <input type="radio" class="radio-button__input" id="radio3" name="radio-group">
            <label class="radio-button__label" for="radio3">
              <span class="radio-button__custom"></span>
              تحت النشر
            </label>
          </div>
        </div>

        <div class="container">
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" v-if="filteredArticles.length">
            <div class="col" v-for="article in filteredArticles" :key="article.id">
              <router-link class="to_article_page2" :to="{ name: 'aricle_page', params: { id: article.id } }">
                <div class="card">
                  <img :src="article.article_img" loading="lazy" alt="" />
                  <div class="card-body">
                    <p class="card-text">
                    <div class="article_title">
                      <h1>{{ article.article_title }}</h1>
                    </div>
                    {{ article.part_of_article }}
                    </p>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                        <button type="button" class="btn1 btn-sm btn-outline-secondary">تعديل</button>
                      </div>
                      <small class="text-body-secondary">{{ article.article_from }}</small>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
          <div v-else>
            <spiner_loding />
          </div>
        </div>
      </section>
    </main>
    <div class="contaner_foot">
      <foot />
    </div>
  </div>
</template>
<script>
import foot from "@/components/foot.vue";
import spiner_loding from "@/components/spiner_loding.vue";
import navbar from "@/components/side_bar/navbar.vue";
import dashboard from "@/components/side_bar/dashbord.vue";

export default {
  components: {
    foot,
    spiner_loding,
    navbar,
    dashboard,
  },
  data() {
    return {
      the_number_of: [],
      radioSelection: 1,
      all_user_articles: [],
    };
  },
  computed: {
    theNumber() {
      return this.the_number_of[0] || {};
    },
    filteredArticles() {
      if (this.radioSelection === 1) {
        return this.all_user_articles.filter((article) => article.status === "accsept");
      } else if (this.radioSelection === 2) {
        return this.all_user_articles.filter((article) => article.status === "rejected");
      } else if (this.radioSelection === 3) {
        return this.all_user_articles.filter((article) => article.status === "pending");
      }
      return [];
    },
  },
  mounted() {
    // Fetching data is not needed since we have hardcoded the data in `all_user_articles`
    // Remove the fetch requests if not necessary
    fetch("http://localhost:3000/the_number_of")
      .then((res) => res.json())
      .then((data) => (this.the_number_of = data))
      .catch((err) => console.log(err.message));

    fetch("http://localhost:3000/all_user_articles")
      .then((res) => res.json())
      .then((data) => (this.all_user_articles = data))
      .catch((err) => console.log(err.message));
  },
  methods: {
    changeRadio(selection) {
      this.radioSelection = selection;
    },
  },
};
</script>


<style scoped>
.container {
  /* background-color: var(--second-color); */
  margin-top: 40px;
}

.contaner_foot {
  margin-right: 150px;

}

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
  margin-right: 155px;
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

.small-box2 {
  padding: 10px 0 0 0;
  background-color: rgb(255, 182, 49);
  text-align: center;
  margin: 20px;
  padding: 20px 0;
}


.small-box3 {
  background-color: rgb(255, 235, 49);
  text-align: center;
  padding: 10px 0 0 0;
  margin: 20px;
  padding: 20px 0;
}

.small-box4 {
  padding: 10px 0 0 0;
  background-color: rgb(49, 255, 210);
  text-align: center;
  margin: 20px;
  padding: 20px 0;
}

.card-text {
  direction: rtl;
}

.album {
  margin: 50px 120px 0 0;
}

.btn1:hover {
  background-color: var(--main-color);
}

.containerr {
  margin: 70px 0;
  width: 100%;
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

.radio-button__input:checked+.radio-button__label .radio-button__custom {
  background-color: var(--main-color);
  border-color: transparent;
  transform: scale(0.8);
  box-shadow: 0 0 20px var(--main-color);
}

.radio-button__input:checked+.radio-button__label {
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

.card:hover {
  border: none;
  transform: scale(1.1);
  /* box-shadow:0px 3px 8px; */
  box-shadow: var(--main-color) 0px 28px 57px -10px;
  /* box-shadow: rgb(254, 206, 47) 0px 34px 35px, rgb(254, 206, 35) 0px -32px 30px, rgb(254, 206, 35) 0px -4px 1px, rgb(254, 206, 40) 0px 12px 13px, rgb(254, 206, 32) 0px -3px 5px; */
}

@media (max-width: 600px) {
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