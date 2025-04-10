<template>
  <nav>
    <div>
      <div class="row">
        <div class="col">
          <img src="../../public/logo1.png" alt="logo" class="logo" />
        </div>
        <div class="col d-none d-md-flex">
          <router-link class="link" to="/who_are_we">من نحن </router-link>
          <router-link class="link" to="/send_to_us">راسلنا</router-link>
          <router-link class="link" to="/">الرئيسيه </router-link>
        </div>
        <div class="col d-none d-md-flex justify-content-end">
          <input
            class="form-control w-50 mx-2 mr-sm-2"
            type="search"
            placeholder="البحث"
            aria-label="Search"
            v-model="search_value"
            @keyup.enter="search_go"
          />
          <button
            class="btn btn-outline-success my-sm-0"
            type="button"
            @click="search_go"
          >
            ابحث
          </button>
          <router-link to="/sing_in" v-if="showToLogIn" class="btn btn2"
            >انشاء مستخدم</router-link
          >
          <router-link to="/login" v-if="showToLogIn" class="btn btn2"
            >تسجيل الدخول</router-link
          >
          <button v-if="!showToLogIn" class="btn btn2" @click="goToProfile">
            الملف الشخصي
          </button>
        </div>
        <div class="col d-flex d-md-none justify-content-end">
          <button
            class="btn_drop_menu w-25 d-md-none"
            id="btn_drop_menu"
            @click="toggleDropdown"
          >
            ☰
          </button>
        </div>
      </div>
      <div class="menu" id="menu" v-show="btn_drop_menu">
        <div class="col_dropdown">
          <router-link class="link1" to="/" @click="close"
            >الرئيسيه</router-link
          >
          <router-link class="link1" to="/who_are_we" @click="close"
            >من نحن</router-link
          >
          <router-link class="link1" to="/send_to_us" @click="close"
            >راسلنا</router-link
          >
          <router-link to="/sing_in" v-if="showToLogIn" class="btn btn2"
            >انشاء مستخدم</router-link
          >
          <router-link to="/login" v-if="showToLogIn" class="btn btn2"
            >تسجيل الدخول</router-link
          >
          <button v-if="!showToLogIn" class="btn btn2" @click="goToProfile">
            الملف الشخصي
          </button>

          <div class="col d-flex d-md-none justify-content-end">
            <button
              class="btn btn-outline-success my-sm-0"
              type="button"
              @click="search_go"
            >
              ابحث
            </button>
            <input
              class="form-control w-100 mx-2 mr-sm-2"
              type="search"
              placeholder="البحث"
              aria-label="Search"
              v-model="search_value"
              @keyup.enter="search_go"
            />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      btn_drop_menu: false,
      search_value: "",
      showToLogIn: false,
    };
  },
  mounted() {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.log("no user");
      this.showToLogIn = true;
    } else {
      console.log(userId);
      console.log("user");
    }
  },
  methods: {
    goToProfile() {
      this.$router.push({
        name: "profile",
        params: { id: localStorage.getItem("userId") },
      });
    },

    toggleDropdown() {
      this.btn_drop_menu = !this.btn_drop_menu;
    },
    close() {
      this.btn_drop_menu = false;
    },
    search_go() {
      // window.location.reload();
      if (this.search_value) {
        this.$router.push({
          name: "search_resalt",
          params: { topic: this.search_value },
        });
        this.search_value = "";
      }
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Cairo", sans-serif;
}
nav {
  box-shadow: 0px 10px 10px -15px #111;
}

.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}
.col {
  margin: 0 30px;
}
.logo {
  height: 100px;
}
.link {
  text-decoration: none;
  color: black;
  margin: 20px;
}
.link:hover {
  color: rgb(81, 101, 253);
}

.btn2 {
  background-color: rgb(81, 101, 253);
  color: white;
  width: 200px;
  margin: 10px;
  text-decoration: none;
}

.btn_drop_menu {
  display: none;
  border: none;
  background-color: transparent;
  font-size: 24px;
  cursor: pointer;
}
.menu {
  display: none;
  flex-direction: column;
  position: absolute;
  right: 0;
  top: 115px;
  background-color: white;
  width: 100%;
  z-index: 111;
  box-shadow: 0px 15px 10px -15px #111;
}
.menu .link1 {
  text-decoration: none;
  font-weight: 900;
  font-size: 20px;
  color: black;
  margin: 10px 0;
  text-align: center;
}
.menu .link1:hover {
  color: rgb(81, 101, 253);
}
@media only screen and (max-width: 768px) {
  .row {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
  }
  .col {
    margin: 0;
  }
  .logo {
    height: 40px;
  }
  .col_dropdown {
    margin: 0 40px 23px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .btn_drop_menu {
    display: block;
  }
  .col.d-none {
    display: none !important;
  }
  .menu {
    display: flex;
  }
}
</style>
