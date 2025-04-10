<template>
  <navbar />
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="login_logo">
          <img src="../../public/logo1.png" alt="" />
          <p class="login_p">جريدة قراء</p>
        </div>
        <form @submit.prevent="registerUser" class="col-9">
          <div class="main_input_col">
            <h3>Profile Settings</h3>

            <div class="name_inputs">
              <div class="first_name">
                <label for="first_name">First Name</label>
                <input
                  type="text"
                  v-model="firstName"
                  name="first_name"
                  required
                />
              </div>
              <div class="surname">
                <label for="surname">Surname</label>
                <input type="text" v-model="surname" name="surname" required />
              </div>
            </div>

            <label for="email">Email</label>
            <input type="email" v-model="email" name="email" required />
            <div class="pass_div">
              <label for=""> كلمه المرور </label>
              <input
                required
                type="password"
                id="input_pass"
                v-model="password"
              />
              <img @click="toggele_show" :src="show_pass_img_url" alt="" />
            </div>

            <label for="mobile_number">Mobile Number</label>
            <input
              type="number"
              v-model="mobileNumber"
              name="mobile_number"
              required
            />

            <div class="role_selection">
              <label>Role:</label>
              <div>
                <input
                  type="radio"
                  id="reader"
                  value="reader"
                  v-model="role"
                  required
                />
                <label for="reader">Reader</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="editor"
                  value="editor"
                  v-model="role"
                  required
                />
                <label for="editor">Editor</label>
              </div>
            </div>

            <div v-if="role === 'editor'">
              <label for="address_line1">Address Line 1</label>
              <input
                type="text"
                v-model="addressLine1"
                name="address_line1"
                required
              />

              <label for="address_line2">Address Line 2</label>
              <input
                type="text"
                v-model="addressLine2"
                name="address_line2"
                required
              />

              <label for="state">State</label>
              <input type="text" v-model="state" name="state" required />

              <label for="national_id">National ID</label>
              <input
                type="number"
                v-model="nationalId"
                name="national_id"
                required
              />

              <label for="education">Education</label>
              <input
                type="text"
                v-model="education"
                name="education"
                required
              />
            </div>

            <button type="submit" class="btn">Register</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <foot />
</template>

<script>
import axios from "axios";
import foot from "@/components/foot.vue";
import navbar from "@/components/navbar.vue";

export default {
  components: {
    navbar,
    foot,
  },
  data() {
    return {
      show_pass_img_url: "view.png",
      show_pass: false,
      firstName: "",
      surname: "",
      email: "",
      mobileNumber: "",
      role: "",
      addressLine1: "",
      addressLine2: "",
      state: "",
      nationalId: "",
      education: "",
    };
  },
  methods: {
    toggele_show() {
      this.show_pass = !this.show_pass;
      if (this.show_pass) {
        document.getElementById("input_pass").type = "text";
        this.show_pass_img_url = "hide.png";
      } else if (!this.show_pass) {
        document.getElementById("input_pass").type = "password";
        this.show_pass_img_url = "view.png";
      }
    },

    async registerUser() {
      try {
        // Validate required fields
        if (
          !this.firstName ||
          !this.surname ||
          !this.email ||
          !this.password ||
          !this.mobileNumber ||
          !this.role
        ) {
          alert("Please fill in all required fields.");
          return;
        }

        // Additional validation for editor role
        if (
          this.role === "editor" &&
          (!this.addressLine1 ||
            !this.state ||
            !this.nationalId ||
            !this.education)
        ) {
          alert("Please fill in all editor details.");
          return;
        }

        // Prepare user data
        const userData = {
          firstName: this.firstName,
          surname: this.surname,
          email: this.email,
          password: this.password,
          phone: this.mobileNumber,
          role: this.role,
          address: this.role === "editor" ? this.addressLine1 : null,
          state: this.role === "editor" ? this.state : null,
          nationalId: this.role === "editor" ? this.nationalId : null,
          education: this.role === "editor" ? this.education : null,
        };

        console.log("Registering User:", userData);

        // Send request to backend
        const response = await axios.post(
          "http://localhost:5000/users",
          userData
        );

        // Store JWT token securely
        const token = response.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", response.data.user._id); // Store user ID

        // Decode token to get user ID (optional)
        const payload = JSON.parse(atob(token.split(".")[1])); // Decoding JWT payload
        const userId = payload.userId;

        alert(response.data.message);
//         <div class="alert alert-warning alert-dismissible fade show" role="alert">
//   <strong>Holy guacamole!</strong> You should check in on some of those fields below.
//   <button type="button" class="close" data-dismiss="alert" aria-label="Close">
//     <span aria-hidden="true">&times;</span>
//   </button>
// </div>


        window.location.href = `/profile/${userId}`;
      } catch (error) {
        console.error("Registration failed:", error);

        // Handle specific backend errors
        if (error.response && error.response.data) {
          // alert(
          //   error.response.data.error ||
          //     "Registration failed. Please try again."
          // );
        } else {
          alert("An error occurred. Please check your connection.");
        }
      }
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Cairo", sans-serif;
}

.row {
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  text-align: center;
}

.col {
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login_logo {
  margin: 20px;
  text-align: center;
}

img {
  border-radius: 0;
  height: 140px;
}

.login_p {
  color: var(--main-color);
  display: block;
  font-weight: 900;
  font-size: 40px;
}

.main_input_col {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

label,
input {
  display: block;
  margin: 10px 0;
  width: 100%;
}

.name_inputs {
  display: flex;
  margin: -5px;
}

.first_name,
.surname {
  display: flex;
  flex-direction: column;
  margin: 5px;
  width: 50%;
}

.name_inputs input {
  width: 100%;
}

.name_inputs label {
  display: block;
}

.role_selection {
  display: flex;
  flex-direction: column;
  margin: 10px 0;
}

.role_selection div {
  display: flex;
  align-items: center;
}

.role_selection input {
  margin-right: 5px;
}

.pass_div {
  width: 100%;
  text-align: end;
  position: relative;
}
.pass_div img {
  position: absolute;
  height: 30px;
  right: 0;
  top: 52%;
  margin: 0 5px;
}
</style>
