<template>
    <navbar/>

  <div class="container">
    <div class="row">
      <div class="col-6">
        <h1 class="col_h1">تواصل معنا</h1>
        <p>
          نحن نتطلع لسماع أخباركم والاستماع إلى ما لديكم لتقولوه لا
          تترددوا في التواصل معنا
        </p>
        <div class="img_h3">
          <img src="../../public/logo1.png" alt="" />
          <dive class="h3">جريدة قراء</dive>
        </div>
      </div>
      <div class="col">
        <form action="">
          <label for=""> الاسم </label>
          <input type="text" name="name" id="" />
          <label for=""> البريد الالكتروني</label>
          <input type="email" name="email" id="" />
          <label for=""> عنوان الرسالة </label>
          <input type="text" name="masage_title" id=" " />
          <label for="">الرسالة</label>
          <input type="text" class="massage" name="massage" id="" />
          <button>ارسال</button>
        </form>
      </div>
    </div>
  </div>
  <foot /> 
</template>
<script>
import foot from "@/components/foot.vue";
import navbar from "@/components/navbar.vue";

import slider1 from "@/components/slider1/slider1.vue";
import spiner_loding from "@/components/spiner_loding.vue";
export default {
  components: {
    slider1,
    spiner_loding,
    navbar,
    foot,
  },
};
</script>
<style scoped>
*{
  font-family: 'Cairo', sans-serif;
}
.container{
  margin-top: 100px;
}
.img_h3 {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.img_h3 .h3 {
  color:var(--main-color);
  font-weight: 900;
  font-size: 40px;
}
img {
  /* width: 200px; */
  height: 200px;
}
 .row {
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  text-align: center;
}
 .col-6 .col_h1 {
  padding: 10px;
  font-size: 60px;
  font-weight: 900;
}
 .col-6 p {
  font-size: 30px;
  font-weight: 500;
}
form {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: end;
  padding: 10px 10px;
}
input {
  width: 100%;
  margin: 10px 0 10px 10px;
  padding: 10px;
  background-color: rgb(246, 246, 246);
  border: none;
}
label {
  color: black;
  font-weight: bold;
}
.massage {
  height: 100px;
}
button {
  border: none;
  background-color: rgb(81, 101, 253);
  color: white;
  width: 150px;
  height: 50px;
  margin: 10px;
  border-radius: 4px;
}
@media only screen and (max-width: 700px) {
  .row {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
  .col-6 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    width: 100%;
  }
  .col-6 .col_h1 {
    font-size: 60px;
    font-weight: 900;
  }
  .foot{
    text-align: center;
  }
}
</style>
