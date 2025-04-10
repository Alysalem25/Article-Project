<template>
  <navbar />
  <dashbord />

  <div class="container">
    <div class="row">
      <div class="col-2 img_col">
        <img src="../../public/user.png" alt="" />
        <p class="username">
          {{ user_info.firstName }} {{ user_info.surname }}
        </p>
        <p class="email">{{ user_info.email }}</p>
      </div>
      <div class="col-5 main_input_col">
        <h3>Profile Settings</h3>
        <div class="name_inputs">
          <div class="frist_name">
            <label for="">First Name</label>
            <input
              type="text"
              v-model="user_info.firstName"
              name="frist_name"
              id=""
              readonly
            />
          </div>
          <div class="surname">
            <label for="">Surname</label>
            <input
              type="text"
              v-model="user_info.surname"
              name="surname"
              id=""
              readonly
            />
          </div>
        </div>
        <label for="">Email</label>
        <input type="email" v-model="user_info.email" name="email" id="" readonly />
        <label for="">Mobile Number</label>
        <input
          type="number"
          v-model="user_info.phone"
          name="mobile_number"
          id=""
          readonly
        />
        <label for="">Address Line 1</label>
        <input
          type="text"
          v-model="user_info.address"
          name="address_line1"
          id=""
          readonly
        />
        <label for="">State</label>
        <input type="text" v-model="user_info.state" name="state" id="" readonly />
        <label for="">National ID</label>
        <input
          type="number"
          disabled
          v-model="user_info.nationalId"
          name="national_id"
          id=""
          readonly
        />
        <label for="">Education</label>
        <input
          type="text"
          name="education"
          v-model="user_info.education"
          id=""
          readonly
        />
        <button type="button" class="btn">Save Profile</button>
      </div>
    </div>
  </div>
    <foot />
</template>

<script>
import navbar from "@/components/side_bar/navbar.vue";
import dashbord from "@/components/side_bar/dashbord.vue";
import foot from "@/components/foot.vue";
import axios from "axios";

export default {
  components: {
    navbar,
    dashbord,
    foot,
  },
  computed: {
    // ...mapState(["user"]),
  },
  data() {
    return {
      user_info: {},
      id: this.$route.params.id,
      isDisabled: true,
    };
  },
  mounted() {
    axios.get("http://localhost:5000/users/" + this.id).then((res) => {
      this.user_info = res.data;
      this.skills = res.data.skills;
    });
  },
  methods: {
   
  },
};
</script>
<style scoped>
.frist_name {
  margin: 5px;
}
.container {
  margin: 70px 0;
}
.container_foot {
  margin-right: 150px;
}
.img_col {
  text-align: center;
}
.img_col img {
  margin: 80px auto 10px auto;
  width: 90px;
  border-radius: 40%;
}
label,
input {
  display: block;
  margin: 10px 0px;
  width: 100%;
}
.name_inputs {
  display: flex;
  margin: -5px;
}
.frist_name,
.surname {
  display: flex;
  flex-direction: column;
  margin: 5px;
  width: 50%;
}
.name_inputs input {
  display: inline;
  width: 100%;
}
.name_inputs label {
  display: block;
}
.skills_div {
  display: flex;
  flex-wrap: wrap;
  margin: 20px;
}

.skills_div p {
  display: inline-block;
  margin: 5px;
  padding: 5px 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
}
button {
  border: none;
}
button img {
  width: 10px;
}
button {
  margin: 10px auto;
  transition: all 0.3s ease-in-out;
}
button:hover {
  transform: scale(1.2);
}
.main_input_col {
  display: flex;
  flex-direction: column;
  padding: 20px;
}
.add_experince {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.add_experince label {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.add_experince input {
  padding: 10px;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
}

.add_experince input:focus {
  outline: none;
}
.btn {
  background-color: rgb(1, 15, 91);
  color: white;
}
.experince_div {
  display: flex;
  flex-direction: row;
}
input::placeholder {
  margin: 10px;
}
.col-4 {
  padding: 20px;
}
@media only screen and (max-width: 700px) {
  .row {
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
  .col-4,
  .col-3,
  .col-5 {
    width: 100%;
  }
  .img_col {
    width: 100%;
  }
  .container_foot {
    margin: 0;
  }
}
</style>
