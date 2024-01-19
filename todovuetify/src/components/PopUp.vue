<template>
  <v-container fluid class="full-container">
    <!-- First div with an input field and a + button -->
    <v-row class="input-container">
      <v-col>
        <v-text-field
          v-model="newTask"
          placeholder="Create New Task ..."
          class="custom-input"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-btn @click="addTaskToStore" class="custom-button">+</v-btn>
      </v-col>
    </v-row>

    <!-- Second div with three labels -->
    <v-row class="labels-container">
      <v-col class="custom-label default-color">
        All Tasks: {{ tasks.length }}
      </v-col>
      <v-col class="custom-label incomplteted-color">
        Incomplete: {{ incompleteTasksCount }}
      </v-col>
      <v-col class="custom-label completed-color">
        Completed: {{ completedTasksCount }}
      </v-col>
      <!-- <v-col class="search-input-container">
        <v-text-field
          v-model="searchTerm"
          placeholder="Search Task ..."
          class="search-input"
          @input="searchTasks"
        ></v-text-field>
      </v-col> -->
    </v-row>

    <!-- Third div with an image -->
    <v-row class="image-container">
      <v-col class="sper-set-task-container">
        <v-row v-for="task in filteredTasks" :key="task.id" class="task-item">
          <v-col
            @mouseover="showButtons(task.id)"
            @mouseleave="hideButtons(task.id)"
          >
            <v-row class="task-item-container">
              
             
              <v-col class="task-checkbox" v-if="editingTaskId === null "  >
               <v-container v-if="task.isCompleted === 0 " >
                <v-checkbox :model-value="task.isCompleted" @update:model-value="toggleTaskCompletion(task.id)"></v-checkbox>
              </v-container> 
                <v-container v-if="task.isCompleted === 1 " ><img src="https://th.bing.com/th?id=OIP.2SpQvGATzbVDA_jwcVaO7QHaIe&w=233&h=267&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" alt="Green Tick" class="tick-image" /></v-container>

              </v-col>

              <v-col class="task-title">
                <v-row v-if="editingTaskId === task.id" class="modal-edit-view">
                  <v-text-field v-model="editedTaskTitle" class="edit-input"></v-text-field>
                  <v-container class="edit-view-container">
                  <v-btn @click="saveTask(task.id)" class="save-task">Save</v-btn>
                  <v-btn @click="cancelEdit(task.id)" class="cancel1-task">Cancel</v-btn>
                  </v-container>
                </v-row>
                <v-row v-else>
                  {{ task.title }}
                  <v-btn @click="editTask(task.id)" class="edit-task">Edit</v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Fourth div with a button -->
    <v-row class="button-container">
      <v-label @click="clearCompletedTasks" class="clear-task-container"
        >Clear Completed Tasks</v-label
      >
    </v-row>
  </v-container>
</template>

<script>
import { useTaskStore } from '../store/index';

export default {
  props: {
    searchTasks: {
      type: Function,
      default: function() {
        return useTaskStore().tasks;
      },
    },
    searchTerm: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      newTask: '',
      editingTaskId: null,
      editedTaskTitle: '',
    };
  },
  computed: {
    tasks() {
      return useTaskStore().tasks;
    },
    completedTasksCount() {
      return this.tasks.filter((task) => task.isCompleted).length;
    },
    incompleteTasksCount() {
      return this.tasks.filter((task) => !task.isCompleted).length;
    },
    completedTasks() {
      return this.getCompletedTasks();
    },
    incompleteTasks() {
      return this.getIncompleteTasks();
    },
    // Filtered tasks based on searchTerm
    filteredTasks() {
      if (this.searchTerm) {
        const searchLower = this.searchTerm.toLowerCase();
        return this.tasks.filter((task) =>
          task.title.toLowerCase().includes(searchLower)
        );
      } else {
        return this.tasks;
      }
    },
  },
  methods: {

    
    addTaskToStore() {
      if (this.newTask.trim() !== '') {
        useTaskStore().addTask(this.newTask);
        this.newTask = '';
      } else {
        alert('Task title cannot be empty!');
      }
    },
    toggleTaskCompletion(taskId) {

      console.log(taskId);
      const task = this.tasks.find((t) => t.id === taskId);
      if (task) {
        task.isCompleted = !task.isCompleted;
      }
    },
    clearCompletedTasks() {
      this.tasks = this.tasks.filter((task) => !task.isCompleted);
    },
    getCompletedTasks() {
      let temp = this.tasks.filter((task) => task.isCompleted);
      if (this.searchTerm) {
        const searchLower = this.searchTerm.toLowerCase();
        return temp.filter((task) =>
          task.title.toLowerCase().includes(searchLower)
        );
      } else {
        return temp;
      }
    },
    getIncompleteTasks() {
      let temp = this.tasks.filter((task) => !task.isCompleted);
      if (this.searchTerm) {
        const searchLower = this.searchTerm.toLowerCase();
        return temp.filter((task) =>
          task.title.toLowerCase().includes(searchLower)
        );
      } else {
        return temp;
      }
    },
    editTask(taskId) {
      const task = this.tasks.find((t) => t.id === taskId);
      if (task) {
        this.editingTaskId = taskId;
        this.editedTaskTitle = task.title;
      }
    },
    cancelEdit() {
      this.editingTaskId = null;
      this.editedTaskTitle = '';
    },
    saveTask(taskId) {
      const task = this.tasks.find((t) => t.id === taskId);
      if (task) {
        task.title = this.editedTaskTitle;
        this.editingTaskId = null;
        this.editedTaskTitle = '';
      }
    },
    showButtons() {},
    hideButtons() {},
  },
};
</script>

<style scoped>
.full-container {
display: flex;
flex-direction: column;
width: 100%;
font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
height: 100%;
}

.input-container {
position: relative;
height: 10%;
display: flex;
flex-direction: row;
}

.search-input-container {

margin-left: 5%;
}

.checkbox-class{
  width: 2%;
  height: 2%;
}

.edit-view-container{
  display: flex;
  flex-direction: row;
  margin-left: 30%;
}
.search-input {
  height: 30%;
  margin-top: 2%;
border-radius: 12px;
}

.sper-set-task-container {
flex-direction: column;
width: 100%;
height: 100%;
}

.tick-image {
  width: 20px;
  height: 20px;
}

.modal-edit-view{
  top: 50%;
  background-color: rgba(174, 160, 160, 0.337);
  left: 10%;
  height: 50%;
  border-radius:20px ;
  
}

.task-item {
display: flex;
align-items: center;
width: 98%;
font-size: 22px;
margin-left: 2%;
color: gray;
border-bottom: 1px solid rgb(193, 192, 192);
margin-top: 0px;
flex-direction: row;
height: 20%;
transition: background-color 0.3s ease;
position: relative;
}

.task-item:hover {
background-color: rgba(0, 0, 0, 0.1);
}

.incompletedTask {
margin-left: 0%;
padding-left: 2%;
width: 98%;
background-color: rgb(210, 207, 207);
}

.task-checkbox {
  height: 5px;
  width: 5px;
border: 2px solid #333;
border-radius: 50%;
margin-right: 8px;
cursor: pointer;
}

.completed-checkbox .v-input--selection-controls__input {
  border-color: #4caf50;
  background-color: #4caf50;
}

.task-checkbox img {
width: 20px;
height: 20px;
}

.task-checkbox.completed {
background-color: white;
border: 2px solid white;
border-radius: 50%;
}

.task-title {
margin-left: 2%;
display: flex;
align-items: center;
justify-content: space-between;
position: relative;
width: 80%; /* Adjust as needed */
}

.edit-task {
display: none;
position: absolute;
right: 0;
padding: 8px;
cursor: pointer;
opacity: 0;
transition: opacity 0.3s ease;
border-radius: 6px;
font-size: 14px;
background-color: #4caf50;
color: white;
margin-right: 8px;
}

.edit-task:hover {
background-color: #45a049;
}

.cancel-task {
display: none;
position: absolute;
right: 2%;
padding: 8px;
cursor: pointer;
opacity: 0;
transition: opacity 0.3s ease;
border-radius: 6px;
font-size: 14px;
background-color: #5f64a7;
color: white;
}

.save-task{
border-radius: 24px;
background-color: rgb(18, 70, 18);
color: white;
}

.cancel1-task{
background-color: rgb(135, 51, 51);
color: white;
border-radius: 24px;
}
.cancel-task:hover {
background-color: #4f539b;
}

.task-item:hover .edit-task,
.task-item:hover .cancel-task {
display: block;
opacity: 1;
}

.edit-input {
width: 40%;
padding: 6px;
border-radius: 12px;

margin-top: 4px;
margin-left: 4 px;
background-color: whitesmoke;
color: black;
}

.custom-input {
width: 96%;
height: 80%;
font-size: 24px;
position: absolute;
color: black;
border-bottom-width: 2px;
border-top-width: 0px;
border-left-width: 0px;
border-right-width: 0px;
border-radius: 12px;
border-color: rgb(166, 165, 165);
font-family: inherit;
margin: 0;
}

.custom-button {
background-color: rgba(53, 53, 138, 0.716);
color: white;
position: relative;
border-radius: 50%;
margin-right: 5%;
margin-top: 3%;
margin-left: 10%;
border-color: aliceblue;
border-bottom-width: 2px;
border-color: gray;
font-size: 26px;
cursor: pointer;
position: absolute;

width: 8%;
height: 60%;
transform: translateY(-50%);
}

.labels-container {
display: flex;
height: 20%;
padding: 2%;
border-width: 8px;
border-color: black;
justify-content: flex-start;
align-items: center;
font-size: 12px;
}

.custom-label {
color: white;
font-family: inherit;
font-size: 14px;
margin-left: 2%;
border-radius: 6px;
padding-top: 0.5%;
width: 20%;
margin: 3%;
height: 60%;
box-sizing: border-box;
}

.default-color {
background-color: rgb(69, 143, 167);
}

.completed-color {
background-color: rgb(54, 141, 54);
}

.incomplteted-color {
background-color: rgb(115, 29, 29);
}

.clear-task-container {
cursor: pointer;
font-size: 28px;
margin-top: 1%;
color: rgb(167, 166, 166);
}

.clear-task-container :hover{
  color: black;
}

.image-container {
display: flex;
min-height: 70%;
overflow-y: auto;
border: 3px solid rgb(190, 184, 184);
align-items: center;
justify-content: center;
}

.task-item-container {
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
position: relative;
}

.image-container img {
max-width: 100%;
max-height: 100%;
}

.button-container {
height: 8%;
display: flex;
font-size: 20px;
font-family: inherit;
color: inherit;
padding-bottom: 2%;
border-width: 3rem;
border-color: gray;
align-items: center;
justify-content: center;
}

</style>
