<template>
  <v-row v-for="row in 1" :key="row" class="main-container" >
  

    <v-col v-for="m in 8" :key="m" class="main-row-container">
      <v-container>
      <v-container class="row-container">
        <v-radio></v-radio>
        <v-label>One</v-label>
        <v-textarea></v-textarea>
      </v-container>
    </v-container>
    </v-col>
</v-row>
</template>

<script>
export default {
  data() {
    return {
      tab: "one",
    };
  },
};
</script>

<style scoped>
.tab-title{
  font-size: 26px;
  color: white;
  width: 20%;
  border-radius: 6px;
  padding: 6px;
  margin-right: 2%;
  font-family: Abhaya Libre;
  border: 2px solid rgb(53, 53, 53);
  cursor: pointer;
}


.row-container{
  width: 100%;
  height: 100%;
  font-size: 24px;
  font-family: Abhaya Libre;
  flex-direction: column;
  
  margin: 1%;
}

.main-row-container{
  width: 98%;
  border: 2px solid rgb(156, 154, 154);
  margin: 0.5%;
  border-radius: 12px;
}

.incompleted{
  background-color: rgb(187, 102, 29);
}

.default{
  background-color: rgb(16, 126, 143);
}


.completed{
  background-color: rgb(32, 158, 66);
}

.main-container{
  display: flex;
  max-height: 100%; 
  overflow-x: scroll; 
  flex-direction: column;
}

.tab-conatiner{
  height: 20%;
  padding: 2%;
  align-items: flex-start;
  /* border-bottom: 2px solid rgb(154, 149, 149); */
  border-radius: 4px;
}
</style>
