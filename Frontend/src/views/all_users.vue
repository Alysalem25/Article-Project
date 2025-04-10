<template>
  <div>
    <navbar />
      <dashbord />


      <div class="container mt-5">
        <h1>all users</h1>
      </div>

    <div class="container mx-5 overflow-auto d-flex justify-content-center mt-2 ">

  
      <table class="table w-75">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Surname</th>
            <th scope="col">Email</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">role</th>
            <th scope="col">function</th>
          </tr>
        </thead>
        <tbody >
          <tr  v-for="(user,index) in all_users" :key="index" >
            <th scope="row">{{ user._id }}</th>
            <td>{{ user.firstName }}</td>
            <td>{{ user.surname }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.role }}</td>
            <td><button @click="deleteUser(user._id)">delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
<!-- <foot  class="col-10"/> -->
</template>

<script>

import navbar from "@/components/side_bar/navbar.vue";
import dashbord from "@/components/side_bar/dashbord.vue";
import router from "@/router";
import axios from "axios";
import foot from "@/components/foot.vue";

export default {
  components: {
    navbar,
    dashbord,
    foot,
  },
  computed: {
    // ...mapState(["user"]),
    // filteredUsers() {
    //   const role = this.user.role;

    //   if (role === "qpresedent") {
    //     return this.all_users.filter((user) => user.role !== "qpresedent");
    //   } else if (role === "newspapereditor") {
    //     return this.all_users.filter(
    //       (user) =>
    //         user.role !== "newspapereditor" && user.role !== "qpresedent"
    //     );
    //   } else if (role === "author") {
    //     return this.all_users.filter(
    //       (user) =>
    //         user.role !== "qpresedent" &&
    //         user.role !== "author" &&
    //         user.role !== "newspapereditor"
    //     );
    //   } else if (role === "editor") {
    //     return this.all_users.filter((user) => user.role === "user");
    //   } else {
    //     return this.all_users;
    //   }
    // },
  },
  data() {
    return {
      all_users: [],
    };
  },
  mounted() {
    // fetch("http://localhost:3000/all_users")
    //   .then((res) => res.json())
    //   .then((data) => (this.all_users = data))
    //   .catch((err) => console.log(err.message));
    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        console.log(res.data);
        this.all_users = res.data;
        const userId = localStorage.getItem("userId");
        this.all_users = this.all_users.filter((user) => user._id != userId);

      })
      .catch((err) => {
        console.log(err.message);
      });
  },
  methods: {
    go_to_profile(id) {
      this.$router.push({ name: "user_profile", params: { id: id } });
    },
    deleteUser(id) {
      if(id == localStorage.getItem("userId")){
        alert("you can't delete your account");
        return;
      }
      axios
        .delete(`http://localhost:5000/users/${id}`)
        .then((res) => {
          console.log(res.data);
          this.all_users = this.all_users.filter((user) => user._id != id);
          // router.push({ name: "login" });
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },
};
</script>

<style>
.table {
  margin-top: 40px;
  cursor: pointer;
  background-color: var(--main-color);
}
.table tbody tr:hover {
  background-color: rgb(255, 210, 49);
}
</style>
