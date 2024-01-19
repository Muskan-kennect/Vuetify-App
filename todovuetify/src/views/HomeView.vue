<template>
  <v-container fluid class="home">
    <v-row class="start-container">
      <!-- Content for the top-half goes here -->
      <v-col class="text-center">
        <h1 class="app-title">Todo App</h1>
      </v-col>
      <v-col class="search-input-container">
        <v-text-field
          v-model="searchTerm"
          placeholder="Search Task ..."
          class="search-input"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <!-- Overlay Content -->
      <v-col class="overlay">
        <PopUp :search-term="searchTerm" :search-tasks="searchTasks"/>
      </v-col>
    </v-row>

    <v-row class="end-container">
      <!-- Other Content for the bottom-half goes here -->
      <v-col >
        <!-- Add your bottom-half content here -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import  PopUp from "../components/PopUp.vue"
import { useTaskStore } from '../store/index';
export default {
  name: 'HomeView',
  components:{
    PopUp : PopUp
  }
  ,
  data() {
    return {
      newTask: '',
      editingTaskId: null,
      editedTaskTitle: '',
      searchTerm: '', // Add searchTerm data property
    };
  },

  methods: {
    // updateTasks(tasks,searchTerm) {
    //   useTaskStore().updateTasks(tasks);
    // },
    searchTasks() {
      if (this.searchTerm) {
        const searchLower = this.searchTerm.toLowerCase();
        return useTaskStore().tasks.filter((task) =>
          task.title.toLowerCase().includes(searchLower)
        );
       
      } else {
        return this.tasks;
      }
    },
  },
}
</script>

<style scoped>
.home {
  position: relative; /* Set the position of the container to relative */
  height: 98vh;
  margin-bottom: 0.75%; /* Set the height of the container to 100% of the viewport height */
}

.start-container{
  background-color: rgb(52, 132, 213);
  height: 49vh;
}

.end-container{
  background-color: rgb(35, 14, 112);
  height: 49vh;
}

.search-input-container {

margin-left: 5%;
}

.text-center{
  top: 0px;
  left: 0px;
}

.search-input {
  height: 30%;
  margin: 2%;
  width: 50%;
  background-color: rgba(164, 202, 235, 0.721);
  color: #000;
border-radius: 12px;
}

.app-title {
  font-family: Abhaya Libre;
  font-weight: bold;
  top:80%;
  margin-top: 6%;
  margin-left: 80%;
  font-size: 30px; /* Adjust the font size as needed */
}


.top-half {
  background-color: rgb(108, 108, 223);
  width: 100%;
  height: 50%;
}

.overlay {
  position: absolute; /* Set the position of the overlay to absolute */
  top: 15%;
  width: 60%;
  left: 20%;
  height: 70%;
  border: 2px solid rgb(156, 154, 154);
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
