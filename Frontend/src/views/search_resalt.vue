<template>
  <navbar />
  <div class="container">
    <div class="sidebar">
      <h1>الاقسام</h1>
      <p v-for="topic in topics" :key="topic" @click="filterByTopic(topic)">
        {{ topic }}
      </p>
    </div>
    <h1 class="h1_topic">نتائج البحث عن : {{ this.$route.params.topic }}</h1>
    <div class="row" v-if="articles.length > 0" v-for="article in articles" :key="article.id">
      <div class="col-9">
        <img class="card-img-top rounded-3"    v-if="article.imageUrl" :src="'http://localhost:5000' + article.imageUrl" alt="Article Image" />
        <div class="about_article">
          <p class="writer">كتب بواسطة: {{ article.author }}</p>
          <h1 class="article_title1">{{ article.title }}</h1>
          <p class="part_of_article" v-html="getShortContent(article.content)"></p>
          <div class="time_and_topic">
            <div class="topic" id="topic">{{ article.topic }}</div>
            <div class="time">{{article.date}}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <spiner_loding />
    </div>
  </div>
  <foot />
</template>

<script>
import foot from "@/components/foot.vue";
import navbar from "@/components/navbar.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import spiner_loding from "@/components/spiner_loding.vue";
import axios from "axios";

export default {
  components: {
    spiner_loding,
    Swiper,
    SwiperSlide,
    navbar,
    foot,
  },
  setup() {
    return {
      modules: [Pagination],
      topics: ["الكل", "ادب", "فلسفه", "لغه", "موسيقي", "فن"], // List of topics
      select: true,
      topic: "الكل", // Default selected topic
    };
  },
  data() {
    return {
      articles: [],
    };
  },
  computed: {
    // Computed property to get the articles based on the selected topic
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
    // Method to filter the articles by topic
    // filterByTopic(topic) {
    //   if (topic === "الكل") {
    //     // Show all articles if "الكل" is selected
    //     this.search_results = this.articles;
    //   } else {
    //     // Filter articles based on the selected topic
    //     this.search_results = this.articles.filter(
    //       (article) => article.topic === topic
    //     );
    //   }

    //   // Update the select state and topic
    //   this.select = topic === "الكل";
    //   this.topic = topic;
    // },
  },
  mounted() {
    // fetch("http://localhost:3000/articles")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     this.articles = data; // Store all articles in the "articles" data property
    //     this.filterByTopic(this.topic); // Call the filterByTopic method with the initial topic parameter
    //   })
      // .catch((err) => console.log(err.message));
      axios.get(`http://localhost:5000/articleResulted/${this.$route.params.topic }`).then((res) => {
        this.articles = res.data;
        // this.filterByTopic(this.topic);
      }).catch((err) => console.log(err.message));
  },
};
</script>

<style scoped>
* {
  font-family: "Cairo", sans-serif;
}
.swiper {
  display: none;
}
.h1_topic {
  text-align: center;
  margin-left: 300px;
}
h2 {
  text-align: end;
}
.row {
  position: relative;
  margin: 20px;
}
img {
  width: 50%;
  height: 350px;
}
.col-9 {
  display: flex;
  flex-direction: row-reverse;
}
.about_article {
  display: flex;
  flex-direction: column;
  width: 50%;
}
.writer {
  text-align: end;
  position: relative;
  margin: 20px 50px 20px 0;
  font-size: 25px;
}
.writer::after {
  position: absolute;
  content: "";
  width: 20px;
  height: 3px;
  margin: 0px 10px;
  background-color: rgb(227, 227, 227);
  top: 50%;
}
.article_title1 {
  margin: 10px 20px 10px 0;
  text-align: end;
  background-color: transparent;
}
.part_of_article {
  text-align: end;
  margin: 10px 20px 10px 0;
  font-size: 20px;
  font-weight: 500;
}
.time_and_topic {
  display: flex;
  justify-content: space-between;
  align-items: end;
}
.topic,
.time {
  display: inline;
  margin: 10px;
}
.sidebar {
  text-align: end;
  margin: 30px;
  padding: 0 30px;
  position: absolute;
  border-left: 2px solid #333;
  width: 20%;
  top: 226px;
  right: 0;
}
.sidebar h1 {
  position: relative;
  /* margin-left: ; */
}
.sidebar h1::after {
  content: "";
  position: absolute;
  width: 84px;
  height: 2px;
  background-color: var(--main-color);
  bottom: 0px;
  right: -22px;
}
.sidebar p {
  text-align: end;
  font-size: 30px;
}
.swiper_hand_made {
  display: none;
}
@media only screen and (max-width: 700px) {
  .conatiner {
    position: relative;
    top: 70px;
  }
  .h1_topic {
    text-align: center;
    margin: 40px 0px 20px 0;
  }

  .sidebar {
    display: none;
    justify-content: center;
    position: absolute;
    top: -100px;
    max-width: 100%;
  }
  .sidebar h1 {
    display: none;
  }
  .sidebar p {
    margin: 0 20px;
  }
  .row {
    margin: 20px 0;
  }
  .col-9 {
    flex-direction: column;
    width: 100%;
  }
  .col-9 img {
    width: 100%;
  }
  .about_article {
    width: 100%;
  }
  .writer {
    font-size: 20px;
  }
  .topic {
    margin: 0;
  }
  .part_of_article {
    text-align: end;
    margin: 10px 20px 10px 0;
    font-size: 15px;
    font-weight: 500;
  }
  .time_and_topic {
    display: flex;
    justify-content: space-between;
    align-items: end;
  }
  .time {
    margin: 0;
  }
  .swiper_hand_made {
    overflow: auto;
    display: block;
    white-space: nowrap;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .swiper_hand_made p {
    display: inline;
    margin: 10px;
    font-size: 20px;
    font-weight: 800;
    background-color: rgb(238, 238, 238);
    border: none;
    border-radius: 10px;
    display: inline-block;
    padding: 14px;
  }
  .swiper_hand_made .select {
    background-color: transparent;
    border: 2px solid var(--main-color);
    color: var(--main-color);
  }
}
</style>
