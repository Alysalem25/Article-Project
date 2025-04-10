<template>
    <!-- <navbar/> -->

  <!-- /* 404 bage 1 */ -->
  <div class="section">
    <h1 class="error">404</h1>
    <div class="page">Ooops!!! The page you are looking for is not found</div>
    <router-link class="back-home" to="/">main page</router-link>
  </div>
  <!-- /* 404 bage 1 */ -->
  <!-- /* 404 bage 2 */ -->
  <!-- <section class="page_404">
	<div class="container">
		<div class="row">	
		<div class="col-sm-12 ">
		<div class="col-sm-10 col-sm-offset-1  text-center">
		<div class="four_zero_four_bg">
			<h1 class="text-center ">404</h1>
		
		
		</div>
		
		<div class="contant_box_404">
		<h3 class="h2">
		Look like you're lost
		</h3>
		
		<p>the page you are looking for not avaible!</p>
		
		<a href="" class="link_404">Go to Home</a>
	</div>
		</div>
		</div>
		</div>
	</div>
</section> -->
  <!-- /* 404 bage 2 */ -->
  <!-- <foot />  -->
</template>

<script>
import foot from "@/components/foot.vue";
import navbar from "@/components/navbar.vue";
export default {
  components: {
    navbar,
    foot,
  },
}
</script>
<style scoped>
/* 404 bage 1 */
* {
  text-align: center;

  font-family: "Cairo", sans-serif;
}
html,
body {
  margin: 0;
  padding: 0;
  text-align: center;
  font-family: sans-serif;
  background-color: #ffffff;
}

h1,
a {
  margin: 0;
  padding: 0;
  text-decoration: none;
}

.section {
  padding: 4rem 2rem;
}

.section .error {
  font-size: 150px;
  color: var(--main-color);
  text-shadow: 1px 1px 1px rgb(112, 84, 47), 2px 2px 1px rgb(112, 84, 47),
    3px 3px 1px rgb(10, 8, 44), 4px 4px 1px rgb(10, 48, 46),
    5px 5px 1px rgb(10, 8, 44), 6px 6px 1px rgb(10, 48, 46),
    7px 7px 1px rgb(10, 8, 44), 8px 8px 1px rgb(10, 48, 46),
    25px 25px 8px rgba(0, 0, 0, 0.2);
}

.page {
  margin: 2rem 0;
  font-size: 20px;
  font-weight: 600;
  color: #444;
}

.back-home {
  display: inline-block;
  border: 2px solid #222;
  color: #222;
  text-transform: uppercase;
  font-weight: 600;
  padding: 0.75rem 1rem 0.6rem;
  transition: all 0.2s linear;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
}
.back-home:hover {
  background: #222;
  color: #ddd;
}
/* 404 bage 1 */
/* 404 bage 2 */

/*======================
    404 page
=======================*/

/* .page_404{ padding:40px 0; background:#fff; font-family: 'Arvo', serif;
}

.page_404  img{ width:100%;}

.four_zero_four_bg{
 
 background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
    height: 400px;
    background-position: center;
 }
 
 
 .four_zero_four_bg h1{
 font-size:80px;
 }
 
  .four_zero_four_bg h3{
			 font-size:80px;
			 }
			 
			 .link_404{			 
	color: #fff!important;
    padding: 10px 20px;
    background: #39ac31;
    margin: 20px 0;
    display: inline-block;}
	.contant_box_404{ margin-top:-50px;} */
/* 404 bage 2 */
</style>
