<template>
  <div class="home">
    <div class="top-half">
      <!-- Content for the top-half goes here -->
      <h1 class="app-title">Todo App</h1>
    </div>
    
    <div class="overlay"><PopUp/></div>
    <div class="bottom-half">
    </div>
  </div>
</template>

<script>
import  PopUp from "../components/PopUp.vue"
export default {
  name: 'HomeView',
  components:{
    PopUp : PopUp
  }
}
</script>

<style scoped>
.home {
  position: relative; /* Set the position of the container to relative */
  height: 98vh;
  margin: -0.5%;
  margin-top: -1%;
   margin-top: -1%;
   margin-bottom: 0.75%; /* Set the height of the container to 100% of the viewport height */
}

.app-title {
  font-family: 'Abhaya Libre', sans-serif;
  font-weight: bold;
  top:80%;
  font-size: 24px; /* Adjust the font size as needed */
}


.top-half {
  background-color: rgb(108, 108, 223);
  width: 100%;
  height: 50%;
}

.overlay {
  position: absolute; /* Set the position of the overlay to absolute */
  top: 10%;
  width: 60%;
  left: 20%;
  height: 70%;
  border-radius: 12px;
  background-color: white/* Adjust the color and opacity of the overlay */
}

.middle-div {
  background-color: lightblue;
  width: 60%;
  height: 50%;
  margin: 0 auto;
}

.bottom-half {
  background-color: rgb(58, 58, 150);
  width: 100%;
  height: 50%;
}
</style>
