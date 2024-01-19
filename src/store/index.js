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
        isCompleted: 0,
      };
      this.tasks.push(newTask);
    },
    updateTasks(state, tasks) {
      state.tasks = tasks;
    },
    clearCompletedTasks() {
      this.tasks = this.tasks.filter((task) => !task.isCompleted);
    },

  },
});
