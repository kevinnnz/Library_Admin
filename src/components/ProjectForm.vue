<template>
  <div class="container">
    <h1>{{ type }} Project</h1>
    <input v-model="project.projectTitle" type="text" placeholder="Project Title">
    <br />
    <textarea cols="40" rows="5" v-model="project.projectDescription" type="text" placeholder="Project Description"></textarea>
    <input v-model="project.links.frontend" type="text" placeholder="Frontend Link">
    <br />
    <input v-model="project.links.backend" type="text" placeholder="Backend Link">
    <br />
    <input v-model="project.links.demo" type="text" placeholder="Demo Link">
    <br />
    <button @click="edit" v-if="type === 'Edit'">Save</button>
    <button @click="add" v-else-if="type === 'Add'">Add</button>
    <button @click="cancel">Cancel</button>
  </div>
</template>

<script>
import firebase from 'firebase'
import axios from 'axios'

export default {
  name : 'Project',
  props : {
    type: String,
    project: Object,
  },
  data() {
    return {
      user: firebase.auth().currentUser.getIdToken(true)
    }
  },
  methods : {
    cancel : function() {
        this.$router.replace('dashboard')
    },
    edit : function() {
        // call API
        fetch('http://localhost:8081/lib/api/projects/edit', { 
          method: 'POST',
          mode: 'cors',
          headers: {
              'Content-Type': 'application/json',
              'Authorization' : 'Bearer ' + this.user.i
          },
          body: JSON.stringify(this.project),
        }).then(res => {
          this.$router.replace('dashboard')
        }).catch(error => {
          alert(error)
        })
    },
    add : function() {
        fetch('http://localhost:8081/lib/api/projects/', { 
          method: 'POST',
          mode: 'cors',
          headers: {
              'Content-Type': 'application/json',
              'Authorization' : 'Bearer ' + this.user.i
          },
          body: JSON.stringify(this.project),
        }).then(res => {
          this.$router.replace('dashboard')
        }).catch(error => {
          alert(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container { 
    margin: 0 auto;
    text-align: center;
    max-width: 34rem;
  }

  input {
    margin: 10px 0;
    width: 100%;
    padding: 15px;
  }

  textarea {
    margin: 10px 0;
    width: 100%;
    padding: 15px;
    resize: none;
  }

  button {
    margin-top: 20px;
    padding: 15px;
    cursor: pointer;
    margin-left: 10px;
    margin-right: 10px;
  }


</style>
