// store.js
import { defineStore } from 'pinia';

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
  }),
  actions: {
    addTask(title) {
      const newTask = {
        id: this.tasks.length + 1,
        title,
        isCompleted: false,
      };
      this.tasks.push(newTask);
    },
    clearCompletedTasks() {
      this.tasks = this.tasks.filter((task) => !task.isCompleted);
    },

  },
});
