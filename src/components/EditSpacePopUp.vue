<!-- <template>
  <h3> Edit Space </h3>
  <form>
    <label for="sname">Space Name:</label><br>
    <input type="text" class="sname"  v-model="popupSpaceData.spaces_name"><br>
    <label for="floor_num">Floor Name:</label><br>
    <select name="Floors" v-model="popupSpaceData.floor_id">
    <option value="f1" v-for="(val, idx) in floors_data" :key="idx">{{val.floor_id}}</option> 
    </select><br>
    <label for="max_num">Max Occupancy:</label><br>
    <input type="number" class="max_num" min="1" v-model="popupSpaceData.max_occupancy"><br>
    <label>Space Details:</label><br>
    <textarea class="descript" rows="7" cols="50" v-model="popupSpaceData.description"></textarea><bbr></bbr>
    <div v-if="check">
      <Button @click="saveChanges()" class ="editbuttsave" label = "Save" > Save </Button>
      <Button @click="saveChanges();togglePopup()" class ="exitbuttsave" label = "Save and Exit" ></Button>
      <button @click="togglePopup()"> Exit </button> 
    </div>
    <div v-else>
      <Button @click="createSpace();createSpacePopUp()" class ="exitbuttsave" label = "Create Space" ></Button>
      <button @click="createSpacePopUp()"> Exit </button> 
    </div>    
  </form>
</template>
    
    <script>
    import '@dafcoe/vue-collapsible-panel/dist/vue-collapsible-panel.css'
    import { useToast } from 'primevue/usetoast'
    import http from '@/services/http-helper'
    import Button from 'primevue/button'

  
    
    export default {
      name: 'edit-floor-space',
      data() {
        return {
            dummySpace: { spaces_name: 'Name', floor_id: 1, max_occupancy: 1, description: "Description"},
            toast:useToast(),
            visible:false,
            // check: true
        };
          
      },
      components: {
        Button
      },
      props: {
        spaceData: Object,
        isCreate: Boolean

      }, 
      computed: {
        popupSpaceData() {
          return this.isCreate ? this.dummySpace : this.spaceData
        }
      },
      methods: {    
          togglePopup() {
            this.check = true
            this.showPopup = !this.showPopup
          },
          saveChanges(){
            http.put(`spaces/${this.popupSpaceData.id}`, this.popupSpaceData)
              .then(response => {
                  // Handle success
                  console.log(response.data);
                  // Optionally close the popup or show a success message
                  this.toast.add({severity:'success', summary:'Changes saved successfully', life:2000, group:'tc'});
              })
              .catch(error => {
                  // Handle error
                  console.error(error);
                  // Optionally show an error message
                  this.toast.add({severity:'error', summary:'Error saving changes', life:2000, group:'tc'});
              })
          },
          createSpace(){
          http.post(`spaces/`, this.popupSpaceData)
            .then(response => {
                // Handle success
                console.log(response.data);
                this.popupSpaceData.id = response.data.id
                this.spaces_data.push(this.popupSpaceData)
                // Optionally close the popup or show a success message
                this.toast.add({severity:'success', summary:'Changes saved successfully', life:2000, group:'tc'});
            })
            .catch(error => {
                // Handle error
                console.error(error);
                // Optionally show an error message
                this.toast.add({severity:'error', summary:'Error saving changes', life:2000, group:'tc'});
            })
        },
        createSpacePopUp(){
          this.check = false
          this.popupSpaceData = this.dummySpace
          this.showPopup = !this.showPopup
        },   
      }
    }
    </script>
    
    Add "scoped" attribute to limit CSS to this component only 
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
  .space .edit {
    position: relative;
    float:right;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  
  .space{
      border-bottom: 1px solid grey;
      margin-top: unset;
      padding-top: 0px;
      padding-right: 0px;
      padding-bottom: 0px;
      padding-left: 5px;
  }
  
  .space .delete{
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
  .createSpace{
    text-align: right;
  }
  .editbuttsave{
    margin-top: 20%;
  }
  
    </style>
     -->