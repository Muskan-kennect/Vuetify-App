<template>
  <div class="full-container">
    <!-- First div with an input field and a + button -->
    <div class="input-container">
      <input
        v-model="newTask"
        placeholder="Create New Task ..."
        class="custom-input"
      />
      <button @click="addTaskToStore" class="custom-button">+</button>
    </div>

    <!-- Second div with three labels -->
    <div class="labels-container">
      <div class="custom-label default-color">All Tasks: {{ tasks.length }}</div>
      <div class="custom-label incomplteted-color">
        Incomplete: {{ incompleteTasksCount }}
      </div>
      <div class="custom-label completed-color">
        Completed: {{ completedTasksCount }}
      </div>

      <div class="search-input-container">
      <input v-model="searchTerm" placeholder="Search Task ..." class="search-input" @input="searchTasks" />
    </div>
    </div>

    <!-- Third div with an image -->
    <div class="image-container">
      <div class="sper-set-task-container">
        <div
          v-for="task in incompleteTasks"
          :key="task.id"
          class="task-item"
          @mouseover="showButtons(task.id)"
          @mouseleave="hideButtons(task.id)"
        >
          <div class="task-item-container">
            <div
              class="task-checkbox"
              :class="{ 'completed': task.isCompleted }"
              @click="toggleTaskCompletion(task.id)"
            >
              <img
                v-if="task.isCompleted"
                src="https://th.bing.com/th/id/OIP.Cc9rDrBzCE-wwGGyqLdy0AHaIz?w=253&h=215&c=7&r=0&o=5&pid=1.7"
                alt="Green Tick"
              />
            </div>
            <div class="task-title">
              <div v-if="editingTaskId === task.id">
                <input v-model="editedTaskTitle" class="edit-input" />
                <button class="save-task" @click="saveTask(task.id)">Save</button>
                <button class="cancel1-task" @click="cancelEdit(task.id)">Cancel</button>
              </div>
              <div v-else>
                {{ task.title }}
            <div class="edit-task" @click="editTask(task.id)">Edit</div>
              </div>
            </div>
           
          </div>
        </div>
        <div v-for="task in completedTasks" :key="task.id" class="task-item incompletedTask">
          <div class="task-item-container">
            <div
              class="task-checkbox"
              :class="{ 'completed': task.isCompleted }"
              @click="toggleTaskCompletion(task.id)"
            >
              <img
                v-if="task.isCompleted"
                src="https://th.bing.com/th/id/OIP.Cc9rDrBzCE-wwGGyqLdy0AHaIz?w=253&h=215&c=7&r=0&o=5&pid=1.7"
                alt="Green Tick"
              />
            </div>
            <div class="task-title">{{ task.title }}</div>
          </div>
        </div>
      </div>
    </div>
    <br />

    <!-- Fourth div with a button -->
    <div class="button-container">
      <label @click="clearCompletedTasks" class="clear-task-container">Clear Completed Tasks</label>
    </div>
  </div>
</template>

<script>

import { useTaskStore } from '../store/index';

export default {
data() {
  return {
    newTask: '',
    editingTaskId: null,
    editedTaskTitle: '',
    searchTerm: '', // Add searchTerm data property
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
      return this.tasks.filter((task) => task.title.toLowerCase().includes(searchLower));
    } else {
      return this.tasks;
    }
  },

},
methods: {
  addTaskToStore() {
    useTaskStore().addTask(this.newTask);
    this.newTask = '';
  },
  toggleTaskCompletion(taskId) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      task.isCompleted = !task.isCompleted;
    }
  },
  clearCompletedTasks() {
    this.tasks = this.tasks.filter((task) => {
      if(task.isCompleted){
          task.isCompleted = !task.isCompleted;
      }
    });
  },
  getCompletedTasks() {

      let temp = this.tasks.filter((task) => task.isCompleted);
      if (this.searchTerm) {
      const searchLower = this.searchTerm.toLowerCase();
      return temp.filter((task) => task.title.toLowerCase().includes(searchLower));
    } else {
      return temp;
    }
  },
  getIncompleteTasks() {
    
      let temp = this.tasks.filter((task) => !task.isCompleted);
      if (this.searchTerm) {
      const searchLower = this.searchTerm.toLowerCase();
      return temp.filter((task) => task.title.toLowerCase().includes(searchLower));
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
  // Function to search tasks based on searchTerm
  searchTasks() {
    // You can add additional logic if needed
    console.log('Search functionality here');
   
  },
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
height: 20%;
display: flex;
flex-direction: row;
}

.search-input-container {
margin-top: -6%;
margin-left: 10%;
}

.search-input {
border-radius: 12px;
}

.sper-set-task-container {
flex-direction: column;
width: 100%;
height: 100%;
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
width: 20px;
height: 20px;
border: 2px solid #333;
border-radius: 50%;
margin-right: 8px;
cursor: pointer;
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
margin-top: -4%;
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
width: 60%;
padding: 6px;
border-radius: 12px;
margin-right: 6px;
}

.custom-input {
width: 100%;
height: 80%;
font-size: 24px;
color: grey;
border-bottom-width: 2px;
border-top-width: 0px;
border-left-width: 0px;
border-right-width: 0px;
border-radius: 12px;
border-color: rgb(166, 165, 165);
font-family: inherit;
padding-left: 2%;
margin: 0;
}

.custom-button {
background-color: rgba(38, 38, 111, 0.716);
color: white;
border-radius: 50%;
border-color: aliceblue;
border-bottom-width: 2px;
border-color: gray;
font-size: 26px;
cursor: pointer;
position: absolute;
right: 10px;
top: 50%;
width: 8%;
height: 60%;
transform: translateY(-50%);
}

.labels-container {
display: flex;
height: 15%;
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
margin-top: -5%;
margin-left: 2%;
border-radius: 6px;
padding-top: 0.5%;
width: 20%;
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
color: rgb(167, 166, 166);
}

.image-container {
display: flex;
min-height: 70%;
overflow-y: auto;
margin-top: -4%;
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
