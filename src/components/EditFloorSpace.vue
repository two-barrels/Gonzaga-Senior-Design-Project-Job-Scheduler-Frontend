<template>
  <Toast position="top-center" group="bc" @close="togglewarnonCancel()">
      <template #message>
        <div class ="warning">
          <p> Are you sure you want to remove this space? </p><br>
          <button @click="togglewarnonDelete(); createConfirmationToast()"> Confirm </button>
          <button @click = "togglewarnonDelete()"> Cancel </button>
        </div>
      </template>
    </Toast>
    <Toast position="top-center" group="tc"></Toast>
    <div v-if="showPopup" class="popup"> 
        <h3> Edit Space </h3>
          <form>
            <label for="sname">Space Name:</label><br>
            <input type="text" class="sname" value="Desk"><br>
            <label for="floor_num">Floor Name:</label><br>
            <select name="Floors">
            <option value="f1">{{floorName}}</option>
            </select><br>
            <label for="max_num">Max Occupancy:</label><br>
            <input type="number" class="max_num" min="1"><br>
            <label>Space Details:</label><br>
            <textarea class="descript" rows="7" cols="50"></textarea><bbr></bbr>
            <Button @click="createConfirmationToast()" class ="editbuttsave" label = "Save" > Save </Button>
            <Button @click="createConfirmationToast(); togglePopup()" class ="exitbuttsave" label = "Save and Exit" ></Button>
            <button v-on:click="togglePopup()"> Exit </button> 
          </form>
    </div>
    <div v-if="pressed" class="popup"> 
      <h3> Edit Space </h3>
          <form>
            <label for="sname">Space Name:</label><br>
            <input type="text" class="sname" value="Desk"><br>
            <label for="floor_num">Floor ID:</label><br>
            <input type="number" class="floor_num" min="1"><br>
            <label for="max_num">Max Occupancy:</label><br>
            <input type="number" class="max_num" min="1"><br>
            <label>Space Details:</label><br>
            <textarea class="descript" rows="5" cols="50"></textarea><br>
            <Button @click="createConfirmationToast()" class ="editbuttsave" label = "Save" ></Button>
            <Button @click="createConfirmationToast(); togglePopup()" class ="exitbuttsave" label = "Save and Exit" ></Button>
            <button v-on:click="confFunc()"> Exit </button> 
          </form>
    </div>
    <div class = "floor">
      <vue-collapsible-panel-group>
    <vue-collapsible-panel :expanded="false">
        <template #title>
            {{floorName}}
        </template>
        <template #content>
            <p> Click on a room or desk to edit </p>
            <div class = "desk">
                <div class="edit">
                    <button v-on:click="togglePopup()"> Edit </button> 
                </div> 
                <div class="delete">
                    <Button @click="createWarningToast()" label = "Delete" ></Button>
                </div> 
                <h1> Desk 1</h1>
            </div>
            <div class = "desk">
              <div class="edit">
                    <button v-on:click="confFunc()"> Edit </button> 
                </div> 
                <div class="delete">
                    <Button @click="createWarningToast()" label = "Delete"></Button>
              </div> 
              <h1> Conference Room 1</h1>
            </div>
        </template>
    </vue-collapsible-panel>
</vue-collapsible-panel-group>
    </div>
  </template>
  
  <script>
  import {
    VueCollapsiblePanelGroup,
    VueCollapsiblePanel,
  } from '@dafcoe/vue-collapsible-panel'
  import '@dafcoe/vue-collapsible-panel/dist/vue-collapsible-panel.css'
 
  import { useToast } from 'primevue/usetoast';
  import Button from 'primevue/button'
  import Toast from 'primevue/toast'
  import vClickOutside from 'v-click-outside'

 // import {useToast} from 'primevue/usetoast'
 

  
  export default {
    name: 'edit-floor-space',
    data()
    {
        return{
            pressed: false,
            showPopup: false,
            toast:useToast(),
            visible:false
        };
        
    },
    directives: {
      clickOutside: vClickOutside.directive
    },
    props: {
      floorName: String
    }, 
    components: {
      VueCollapsiblePanelGroup,
      VueCollapsiblePanel,
      Button,
      Toast,
    },
    methods: {     
        confFunc(){
          this.pressed = !this.pressed;
        },
        togglePopup() {
          this.showPopup = !this.showPopup
        },
        createConfirmationToast() {
          this.toast.add({severity:'success', summary:"Changes Saved Successfully", life:2000, group:'tc'}) // detail: 'Are you sure you want to remove this space?'
        },
        createWarningToast() {
          this.toast.add({ severity: 'warn', summary: 'Delete', group: 'bc'});
           
        },
        togglewarnonDelete(){
          this.toast.removeGroup('bc');
        },
        togglewarnonCancel(){
          this.toast.removeGroup('bc');
          this.visible = false;
        }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  #title, #content {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
  }
  button{
  background-color: #c4870c; 
  color: white;
  padding: 15px 32px;
  text-align: center;
  border-radius: 15%;
  text-decoration: none;
  /* display: inline-block; */
  font-size: 16px;
  transition-duration: 0.4s;
    &::hover {
      background-color: green;
      color: white;
    }
  }

  /* Popup container - can be anything you want */
.desk .edit {
  position: relative;
  float:right;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}


.desk{
    border-bottom: 1px solid grey;
    margin-top: unset;
    padding-top: 0px;
    padding-right: 0px;
    padding-bottom: 0px;
    padding-left: 5px;
}

.desk .delete{
  position: relative;
  float: right;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* The actual popup */
.popup {
  width: 500px;
  height: 500px;
  background-color: #d68e11;
  color: #fff;
  text-align: center;
  border-radius: 10px;
  padding: 8px 0;
  position: absolute;
  z-index: 100;
  margin-right: 50%;
  margin-left: 20%;
}

.editbuttsave{
  margin-top: 20%;
}

  </style>
  