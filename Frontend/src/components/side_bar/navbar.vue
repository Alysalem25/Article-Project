<template>
  <header class="navbar sticky-top flex-md-nowrap p-0">
    <div class="row">
      <div class="col">
        <router-link class="navbar-brand col-md-3 col-lg-2 me-0 px-3" to="/">
          <img src="../../../public/logo1.png" width="40" alt="" />
          قراء
        </router-link>
      </div>
      <div class="col notification">
        <div class="navbar-collapse" id="">
          <ul class="navbar-nav ml-auto">
            <li class="dropdown">
              <a
                @click="toggleNotification"
                class="nav-link dropdown-toggle notification-icon"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fas fa-megaphone"></i>
                <span class="badge badge-pill badge-danger">
                  <button class="button">
                    <svg viewBox="0 0 448 512" id="button" class="bell">
                      <path
                        d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"
                      ></path>
                    </svg>
                  </button>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div
      v-if="notification"
      class="notification-dropdown"
      aria-labelledby="navbarDropdown"
    >
      <div class="notification-header">
        <h3>Notifications</h3>
      </div>
      <div class="notification-content">
        <div
          v-for="(announcement, index) in announcements.slice(0, 3) " :key="index"
          class="notification-card"
        >
          <div class="notification-card-header">
            <img :src="announcement.user_img_url" alt="User Image" />
            <div class="notification-card-header-details">
              <p>{{ announcement.user_name }}</p>
              <p class="text-muted">{{ announcement.date_of_announcement }}</p>
            </div>
            <!-- <button
              @click="dismissAnnouncement(index)"
              class="notification-card-dismiss"
            >
              <i class="fas fa-times"></i>
            </button> -->
          </div>
          <div class="notification-card-body">
            <p>{{ announcement.user_announcement }}</p>
            <img
              v-if="announcement.announcement_img"
              :src="announcement.announcement_img"
              alt="Announcement Image"
            />
          </div>
        </div>
      </div>
      <router-link
        to="/announcement"
        @click="close_notification"
        class="notification-footer"
      >
        <p class="btn btn-primary btn-block">View All</p>
      </router-link>
    </div>
  </header>
</template>

<script>
import "../../../public/assets/dist/js/bootstrap.bundle.min.js";
import "../../../public/assets/dist/css/bootstrap.rtl.min.css";

export default {
  data() {
    return {
      notification: false,
      announcements: null,
      dismissedAnnouncements: [],
    };
  },
  computed: {
    unreadNotifications() {
      if (!this.announcements) {
        return 0;
      }
      return this.announcements.filter(
        (announcement) => !this.dismissedAnnouncements.includes(announcement)
      ).length;
    },
  },
  mounted() {
    fetch("http://localhost:3000/announcement")
      .then((res) => res.json())
      .then((data) => (this.announcements = data))
      .catch((err) => console.log(err.massage));
  },
  methods: {
    toggleNotification() {
      this.notification = !this.notification;
      if (document.getElementById("button").classList == "bell") {
        document.getElementById("button").classList.remove("bell");
        document.getElementById("button").classList.add("bell2");
      } else {
        document.getElementById("button").classList.remove("bell2");
        document.getElementById("button").classList.add("bell");
      }
    },
    dismissAnnouncement(index) {
      this.dismissedAnnouncements.splice(index, 1);
    },
    close_notification() {
      this.notification = false;
    },
  },
};
</script>

<style scoped>
/* Navbar styles */
.navbar {
  position: fixed;
  width: 100%;
  display: flex;
  margin: 0;
  background-color: var(--main-color);
  z-index: 100;
  justify-content: end;
  box-shadow: -5px 10px 20px rgba(0, 0, 0, 0.514);
}
.row {
  display: flex;
  flex-direction: row-reverse;
}

.navbar-brand {
  display: flex;
  justify-content: flex-end;
  flex-direction: row-reverse;
  color: white;
}

/* Notification button styles */
.notification {
  position: relative;
  text-align: center;
}

.notification-icon {
  position: relative;
  text-align: end;
  color: white;
}

.notification-icon .badge {
  position: absolute;
  top: 0;
  right: -5px;
}

/* Dropdown styles */
.dropdown-toggle::after {
  display: none;
}
.notification-dropdown {
  overflow-y: hidden;
  position: absolute;
  width: 300px;
  top: 46px;
  right: 10px;
  border-radius: 10px;
  box-shadow: 0 5px 20px -3px rgba(0, 0, 0, 0.16);
  background-color: white;
  animation: slideInDown 0.5s ease;
}

.notification-header {
  padding: 10px;
  background-color: #f8f9fa;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.notification-header h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

.notification-content {
  max-height: 300px;
  overflow-y: auto;
  scrollbar-width: thin;
}
.notification-content::-webkit-scrollbar {
  width: 2px; /* تحديد عرض علامة التمرير لتكون رفيعة */
}

.notification-card {
  padding: 20px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
}

.notification-card:hover {
  background-color: #f8f9fa;
}

.notification-card-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.notification-card-header img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.notification-card-header-details {
  flex-grow: 1;
}

.notification-card-header-details p {
  margin: 0;
  font-size: 0.9rem;
  font-weight: bold;
}

.notification-card-dismiss {
  border: none;
  background-color: transparent;
  font-size: 1.2rem;
  color: #aaa;
  cursor: pointer;
}

.notification-card-dismiss:hover {
  color: #333;
}

.notification-card-body {
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.notification-card-body p {
  margin: 0;
  line-height: 1.2;
}

.notification-card-body img {
  max-width: 100%;
  margin-top: 10px;
}

.notification-footer {
  margin-top: 10px;
  padding: 10px;
  text-align: center;
  display: flex;
  justify-content: center;
  background-color: #f8f9fa;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.notification-footer p {
  margin: 0;
}

/* Animations */
@keyframes slideInDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}
.button {
  width: 50px;
  height: 50px;
  position: relative;
  bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border-radius: 50%;
  cursor: pointer;
  transition-duration: 0.3s;
  /* box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.13); */
  border: none;
}

.bell {
  width: 18px;
  animation: bellRing 0.9s infinite;
}

.bell2 {
  width: 18px;
  /* animation: bellRing 0.9s infinite; */
}

.bell path {
  fill: white;
}

.bell2 path {
  fill: white;
}

.button:hover {
  background-color: transparent;
}

.button:hover .bell {
  /* animation: bellRing 0.9s infinite; */
}

/* bell ringing animation keyframes*/
/* @keyframes bellRing {
  0%,
  100% {
    transform-origin: top;
  }

  15% {
    transform: rotateZ(10deg);
  }

  30% {
    transform: rotateZ(-10deg);
  }

  45% {
    transform: rotateZ(5deg);
  }

  60% {
    transform: rotateZ(-5deg);
  }

  75% {
    transform: rotateZ(2deg);
  }
} */

.button:active {
  transform: scale(0.8);
}
@media only screen and (max-width: 700px) {
  .notification-card {
    padding: 10px 40px;
  }
}
</style>
