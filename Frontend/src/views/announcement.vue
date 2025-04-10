<template>
  <div>
    <navbar />
    <dashbord />

    <div class="container" v-if="announcement">
      <div class="announcement-form" v-if="isBoss">
        <h2>اكتب تعميمه </h2>
        <div class="form-content">
          <div class="form-group">
            <label for="file-upload" class="file-upload-label m-3"
              >  اختر صوره  : </label
            >
            <input
              id="file-upload"
              type="file"
              @change="previewImage"
              accept="image/*"
            />
          </div>
          <div class="form-group">
            <div class="preview-img" v-if="previewUrl">
              <h3>Preview:</h3>
              <img :src="previewUrl" alt="Preview Image" />
            </div>
          </div>
          <div class="form-group">
            <textarea
              v-model="announcementText"
              placeholder="ادخل تعميمه"
              rows="5"
            ></textarea>
          </div>
          <div class="form-group">
            <button @click="addAnnouncement" :disabled="!announcementText">
              نشر
            </button>
          </div>
        </div>
      </div>

      <div class="announcement-list">
        <div
          class="announcement-item"
          v-for="announc in announcement"
          :key="announc"
        >
          <div class="user-info">
            <div class="role">
              {{ announc.user_role }}
            </div>
            <img :src="announc.user_img_url" alt="" />
            <p>{{ announc.user_name }}</p>
          </div>
          <p class="time">{{ announc.date_of_announcement }}</p>
          <div class="announcement-content">
            <img
              class="announcement-img"
              v-if="announc.announcement_img"
              :src="announc.announcement_img"
              alt=""
            />
            <p>{{ announc.user_announcement }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <spiner_loding />
    </div>

    <div class="contaner_foot">
      <foot />
    </div>
  </div>
</template>

<script>
import dashbord from "@/components/side_bar/dashbord.vue";
import navbar from "@/components/side_bar/navbar.vue";
import spiner_loding from "@/components/spiner_loding.vue";
import foot from "@/components/foot.vue";

export default {
  components: {
    dashbord,
    navbar,
    foot,
    spiner_loding,
  },
  data() {
    return {
      announcement: null,
      previewUrl: "",
      announcementText: "",
    };
  },
  computed: {
    user() {
      return this.$store.state.user || {};
    },
    isBoss() {
      return this.user.role === "qpresedent";
    },
  },
  mounted() {
    fetch("http://localhost:3000/announcement")
      .then((res) => res.json())
      .then((data) => (this.announcement = data))
      .catch((err) => console.log(err.message));
  },
  methods: {
    previewImage(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          this.previewUrl = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.previewUrl = "";
      }
    },
    addAnnouncement() {
      if (this.announcementText.trim() !== "" || this.previewUrl) {
        const newAnnouncement = {
          user_role: "User Role",
          user_img_url: "User Image URL",
          user_name: "User Name",
          date_of_announcement: new Date().toLocaleDateString(),
          announcement_img: this.previewUrl,
          user_announcement: this.announcementText,
        };

        this.announcement.unshift(newAnnouncement);

        this.previewUrl = "";
        this.announcementText = "";
      } else {
        alert("Please enter an announcement before posting.");
      }
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 20px;
  margin: 20px;
}

.announcement-form {
  background-color:var(--second-color);
  padding: 20px;
  margin: 53px;
  direction: rtl;
}

.announcement-form h2 {
  margin-top: 0;
}

.announcement-form input[type="file"] {
  margin-bottom: 10px;
  border-radius: 20px;
}

.preview-img h3 {
  margin-top: 0;
}
.preview-img img{
  width: 100%;
}

textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.announcement-list {
  margin-bottom: 20px;
}

.announcement-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  margin: 54px;
  display: flex;
  display: flex;
    justify-content: space-between;
}

.user-info {
  flex: 0 0 100px;
  text-align: center;
  margin-right: 10px;
}

.user-info img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 5px;
}
.announcement-content{
  text-align: end;
}
.user-info p {
  margin-bottom: 0;
}

.time {
  margin-bottom: 5px;
  font-size: 12px;
  color: #888;
}

.announcement-content .announcement-img {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.contaner_foot {
  margin-top: 20px;
  margin-right: 150px;
}
@media (max-width: 600px) {
  .container {
    margin-right: 0;
    padding: 30px;
    margin: 0;
    max-width: 99vw;
  }
  .row {
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
  }
  .col-2 {
    margin: 20px 0;
    width: auto;
  }
  .col-8 {
    margin: 20px 0;
    min-width: auto;
    width: 100%;
  }
  .announcement_img {
    margin: 0;
  }
  .role {
    right: 90px;
    display: block;
  }
  .form-group{
    display: flex;
    flex-direction: column;
  }
  .contaner_foot {
    margin: 0;
  }
  .announcement-item {
    margin: 10px 0;
    flex-direction: column;
  }
  .announcement-form {
    background-color: #f7f7f7;
    /* padding: 20px; */
    margin: 0px;
}
}
</style>
