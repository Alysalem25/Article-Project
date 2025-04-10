<template>
  <div>
    <button id="menu" @click="sidebar_toggle">
      <svg
        id="svg"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi-list"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
        />
      </svg>
    </button>
    <div class="sidebar">
      <ul>
        <li class="nav-item" v-if="userinfo.role === 'admin' || userinfo.role === 'editor'" @click="close">
          <router-link
            to="/text_editor"
            class="nav-link d-flex align-items-center gap-2 active"
            aria-current="page"
            href="#"
          >
            اضافة مقال
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-plus-square"
              viewBox="0 0 16 16"
            >
              <path
                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
              />
              <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
          </router-link>
        </li>
        <li class="nav-item" v-if="userinfo.role === 'admin' || userinfo.role === 'editor'" @click="close">
          <router-link
            to="/my_articles"
            class="nav-link d-flex align-items-center gap-2 active"
            aria-current="page"
            href="#"
          >
            مقالاتي
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-book"
              viewBox="0 0 16 16"
            >
              <path
                d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"
              />
            </svg>
          </router-link>
        </li>
        <li class="nav-item" @click="close">
          <router-link
          :to="`/profile/${this.id}`"
                      class="nav-link d-flex align-items-center gap-2 active"
            aria-current="page"
            href="#"
          >
            الملف الشخصي
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>
          </router-link>
        </li>
        <li class="nav-item" v-if="userinfo.role === 'admin' || userinfo.role === 'editor'" @click="close">
          <router-link
            to="/announcement"
            class="nav-link d-flex align-items-center gap-2 active"
            aria-current="page"
            href="#"
          >
            التعميمات
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-megaphone"
              viewBox="0 0 16 16"
            >
              <path
                d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0v-.214c-2.162-1.241-4.49-1.843-6.912-2.083l.405 2.712A1 1 0 0 1 5.51 15.1h-.548a1 1 0 0 1-.916-.599l-1.85-3.49a68.14 68.14 0 0 0-.202-.003A2.014 2.014 0 0 1 0 9V7a2.02 2.02 0 0 1 1.992-2.013 74.663 74.663 0 0 0 2.483-.075c3.043-.154 6.148-.849 8.525-2.199V2.5zm1 0v11a.5.5 0 0 0 1 0v-11a.5.5 0 0 0-1 0zm-1 1.35c-2.344 1.205-5.209 1.842-8 2.033v4.233c.18.01.359.022.537.036 2.568.189 5.093.744 7.463 1.993V3.85zm-9 6.215v-4.13a95.09 95.09 0 0 1-1.992.052A1.02 1.02 0 0 0 1 7v2c0 .55.448 1.002 1.006 1.009A60.49 60.49 0 0 1 4 10.065zm-.657.975 1.609 3.037.01.024h.548l-.002-.014-.443-2.966a68.019 68.019 0 0 0-1.722-.082z"
              />
            </svg>
          </router-link>
        </li>
        <li class="nav-item" v-if="userinfo.role === 'admin'"   @click="close">
          <router-link
            to="/all_users"
            class="nav-link d-flex align-items-center gap-2 active"
            aria-current="page"
            href="#"
          >
            جميع المستحمين
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-people"
              viewBox="0 0 16 16"
            >
              <path
                d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"
              />
            </svg>
          </router-link>
        </li>
        <li class="nav-item" v-if="userinfo.role === 'admin'" @click="close">
          <router-link
            to="/all_articles2"
            class="nav-link d-flex align-items-center gap-2 active"
            aria-current="page"
            href="#"
          >
            جميع المقالات
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-people"
              viewBox="0 0 16 16"
            >
              <path
                d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"
              />
            </svg>
          </router-link>
        </li>
        <li class="nav-item" @click="exit">
          <router-link
            class="nav-link d-flex align-items-center gap-2 active"
            aria-current="page"
            to=""
          >
            خروج
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-door-open"
              viewBox="0 0 16 16"
            >
              <path
                d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"
              />
              <path
                d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z"
              />
            </svg>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      open: true,
      id : localStorage.getItem("userId"),
      userinfo: {},
    };
  },
  computed: {

  },
  mounted() {
    console.log(this.id);
    axios
      .get("http://localhost:5000/users/"+this.id)
      .then((res) => {
        console.log(res.data);
        this.userinfo = res.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
  methods: {
    // sidebar_toggle() {
    //   this.open = !this.open;
    // },
    // close() {
    //   if (window.innerWidth <= 768) {
    //     this.sidebar_toggle();
    //   }
    // },
    exit() {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.clear();
      window.location.href = "/";
    },
  },
};
</script>
<style scoped>
.sidebar {
  background-color: var(--main-color);
  position: fixed;
  right: 0;
  top: 40px;
  width: 15%;
  height: 100vh;
  /* overflow: hidden; */
  z-index: 1;
  text-align: center;
  opacity: 0.95;
}

ul {
  flex-direction: column;
  /* margin: 30px 0; */
  display: flex;
  list-style-type: none;
  align-items: flex-end;
}

.bi {
  vertical-align: -0.125em;
  /* fill: rgb(254, 206, 47); */
  max-width: 15px;
  max-height: 15px;
  /* margin: 10px; */
}

.bi2 {
  vertical-align: -0.125em;
  max-width: 15px;
  max-height: 15px;
  /* margin: 10px; */
}

.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.sidebar ul li.nav-item a:hover {
  transform: translateX(-10px);
}

.sidebar ul li.nav-item a {
  color: var(--white);
  font-weight: bolder;
  letter-spacing: 2px;
  transition: 0.5s;
}

.btn-bd-primary {
  --bd-violet-bg: #712cf9;
  --bd-violet-rgb: 112.520718, 44.062154, 249.437846;

  --bs-btn-font-weight: 600;
  --bs-btn-color: var(--bs-white);
  --bs-btn-bg: var(--bd-violet-bg);
  --bs-btn-border-color: var(--bd-violet-bg);
  --bs-btn-hover-color: var(--bs-white);
  --bs-btn-hover-bg: #6528e0;
  --bs-btn-hover-border-color: #6528e0;
  --bs-btn-focus-shadow-rgb: var(--bd-violet-rgb);
  --bs-btn-active-color: var(--bs-btn-hover-color);
  --bs-btn-active-bg: #5a23c8;
  --bs-btn-active-border-color: #5a23c8;
}

ul {
  /* margin: 30px 0; */
  list-style-type: none;
}

li {
  margin: 20px 0;
}

a {
  font-weight: 700;
  justify-content: center;
  align-items: end;
}

button {
  position: fixed;
  border: none;
  background-color: var(--main_color);
  left: 0;
  top: 0;
  z-index: 10000000039;
  text-align: center;
  display: none;
  /* margin: 5px auto; */
}

#svg {
  color: black;
  width: 30px;
  height: 30px;
}

@media only screen and (max-width: 700px) {
  button {
    display: block;
  }

  .sidebar {
    /* transform: translate(100%); */
    width: 100%;
  }
}
</style>
