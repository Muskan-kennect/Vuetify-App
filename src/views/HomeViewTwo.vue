<!-- <template>
  <v-app>
    <v-container class="bg-secondary" style="height: calc(50vh - 8px);background-color: cadetblue;">
      <v-row no-gutters v-for="m in 6" :key="m" cols="12">
        <v-col v-for="n in 4" :key="n" cols="12" sm="4">
           Display v-text-field conditionally 
           <v-text-field
            v-if="m === 4 && n === 4"
            placeholder="Search Here..."
            class="bg-secondary text-black"
            style="
              font-weight: bold;
              font-size: 20px;
              color: black;
              border-radius: 22px;
            "
          ></v-text-field>
          <v-card
            class="bg-black"
          
            style="
              font-weight: bold;
              font-size: 28px;
              font-family: 'Abhaya Libre';
              background-color: cadetblue;
              margin-left: 10%;
              width: 90%;
            "
          >
            <v-card-text>
              <v-label style="font-size: 28px"></v-label>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container
      style="
        position: absolute;
        top: 20%;
        left: 20%;
        width: 60%;
        height: 70%;
        border-radius: 20px;
        background-color: #ffffff;
        border: 4px solid gray;
      "
    >
      <v-row no-gutters>
        <v-text-field style="border-radius: 22px" placeholder="Enter a Task ..."></v-text-field>
        <v-btn class="mt-3 ml-2 bg-primary" style="border-radius: 50%; font-size: 28px">+</v-btn>
      </v-row>
      <ComponentOne />
      <v-row no-gutters>
        <v-btn style="width: 100%; color: cadetblue">clear Completed Tasks</v-btn>
      </v-row>
    </v-container>

    <v-container class="bg-indigo darken-3" style="height: calc(50vh - 8px)">
      <v-row no-gutters v-for="m in 3" :key="m" cols="12">
        <v-col v-for="n in 3" :key="n" cols="12" sm="4" class="indigo darken-3">
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
  import ComponentOne from '../components/PopUpTwo.vue';

  export default {
    components: {
      ComponentOne:ComponentOne,
    },
  };
</script>
  
  <style scoped></style>
   -->

   <template>
    <v-container class="main">
      <!-- Upper half with blue background -->
      <v-row class="blue-background" v-for="row in 1" :key="row">
        <v-col v-for="column in 7" :key="column">
          <v-card class="m-2 " color="white" elevation="2" >
            <!-- Your content goes here -->
            <v-card-text style="font-weight: 700;display: block;font-size: 32px;color: aliceblue;font-family:Abhaya Libre;" :class="{ 'text-aliceblue': column === 3, 'text-transaparent': !(column === 3 ) }">
            <v-label :class="column === 3 ? 'blue-background-test-show': 'blue-background-test-hide' ">Todo App</v-label>
            <v-text-field v-model="myModel" label="Enter Task here ..."></v-text-field>
           
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="overlay-background" v-for="row in 1" :key="row">
        <v-col class="overlay-column">
         
          <v-text-field v-model="myModel" label="Enter Text"></v-text-field>

          <v-btn class="search-button">+</v-btn>
        </v-col>
        <v-col  class="overlay-top">
        <v-label  class="tab-title default" color="bg-warning"
        >All Tasks:</v-label
      >
      <v-label
        value="two incompleted"
        class="tab-title incompleted" 
        >Incompleted:</v-label
      >
      <v-label class="tab-title completed" color="bg-success"
        >Completed:</v-label
      >
      </v-col>
        <v-col  class="overlay-column-middle">
          <ComponentOne/>
        </v-col>
        <v-col  class="overlay-end">
          <v-btn class="overlay-text">Clear Completed Tasks</v-btn>
        </v-col>
      </v-row>
      <!-- Lower half with green background -->
      <v-container class="green-background" >
        <v-col v-for="column in 8" :key="column">
          <v-card class="m-2 " color="white" elevation="2" >
            <!-- Your content goes here -->
            <v-card-text style="font-weight: 700;font-size: 32px;color: rgb(24, 57, 140);font-family:Abhaya Libre;">{{  "Todo App" }}</v-card-text>
          </v-card>
        </v-col>
      </v-container>
    </v-container>
  </template>
  
  <script>
  import ComponentOne from '../components/PopUpTwo.vue';
  import 'vuetify/dist/vuetify.min.css';


  export default {
    components: {
      ComponentOne:ComponentOne,
    },
  };
</script>
  
  <style scoped>


.main{
  width: 100%;
  height: 100%;
}
  .blue-background {
    background-color: rgb(69, 145, 193);
    display: flex;
    width: 100%;
    margin-left: -20%;
    flex-direction: column;
  }

  .blue-background-test-hide{
    color: rgb(69, 145, 193);
  }

  .blue-background-test-show{
    color: aliceblue;
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
  .main{
    height: 100%;
    width: 100%;
  }

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
  
  .green-background {
    background-color: rgb(24, 57, 140);
    display: flex;
   
    flex-direction: column;
  }


  .overlay-column-middle{
    margin: 4px;
    border-bottom: 2px groove rgb(158, 155, 155);
    border-radius: 6px;
    height: 60%;
    width: 99%;
  }
  .overlay-background {
    background-color: rgb(241, 242, 245);
    display: flex;
    border-radius: 20px;
    border:2px solid gray;
    width: 60%;
    top: 20%;
    left: 20%;
    height: 60%;
    flex-direction: column;
    position: absolute; /* Ensure it's positioned absolutely */
    z-index: 100; 
  }

  .search-button{
    border-radius: 50%;
    background-color:rgb(37, 82, 197) ;
    color: white;
    font-size: 32px;
    cursor: pointer;
    width: 20%;
    height: 20%;
  }

  .overlay-column{
    margin: 4px;
    border-bottom: 2px groove rgb(158, 155, 155);
    border-radius: 6px;
    height: 10%;
    width: 99%;
  }

  .overlay-top{
    border-bottom: 2px groove rgb(158, 155, 155);
    border-radius: 6px;
    height: 11%;
    width: 99%;
  }

  .overlay-end{
    margin: 1px;
    border-bottom: 2px groove rgb(158, 155, 155);
    border-radius: 6px;
    height: 10%;
    width: 99%;
  }

  .overlay-text{
    font-size: 28px;
    font-family: Abhaya Libre;
    color:grey;
    background-color: inherit;
    cursor: pointer;
  }

  .overlay-text:hover{
    color: black;
    /* background-color: rgb(196, 190, 190); */
  }
  </style>
  