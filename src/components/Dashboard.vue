<template>
  <div class="container">
    <div id="title">
        <h1>Dashboard</h1>
        <p>Signed-In as: {{ user.email }}</p>
        <button @click="logout">Logout</button>
    </div>
    <div>
        <h2>Projects</h2>
        <p><router-link :to="{path: '/projects', name: 'project', params: { type: 'Add', project : {
            projectTitle : '',
            projectDescription : '',
            links : [{
                frontend : '',
                backend : '',
                demo : ''
            }]
        } }}">New Project</router-link></p> 
        <div v-for="(project, index) in projects" :key="index">
            <p><strong>{{ project.projectTitle }}</strong></p>
            <p>{{ project.projectDescription }}</p>
            <p><router-link :to="{path: '/projects', name: 'project', params: { type: 'Edit', project : project }}">Edit</router-link> | Delete</p>
        </div> 
    </div>  
    
  </div>
</template>

<script>
import firebase from 'firebase'
import axios from 'axios'

export default {
    name: 'dashboard',
    data() { 
        return{
            projects: [],
            books : [],
            user: firebase.auth().currentUser.getIdTokenResult()
        }
    },
    created() {
        axios.get('http://localhost:8081/lib/api/projects').then(
            (res) => this.projects = res.data
        )
        /* axios.get('http://localhost:8081/lib/api/books').then(
            (res) => this.books = res.data
        ) */
    },
    methods: {
        logout: function() {
            firebase.auth().signOut().then(() => {
                this.$router.replace('login')
            })
        },
        delete: function() {
            
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
    margin: 0 auto;
    max-width: 34rem;
}

#title {
    text-align: center;
}
</style>
