<template>
  <div class="container">
    <div id="title">
        <h1>Dashboard</h1>
        <p>Signed-In as: {{ user.i.claims.email }}</p>
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
            <router-link :to="{path: '/projects', name: 'project', params: { type: 'Edit', project : project }}" tag="button">Edit</router-link>
            <button @click="deleteProject(project._id)">Delete</button>
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
            user: firebase.auth().currentUser.getIdTokenResult(true)
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
        deleteProject: function(_id) {
            // Add an alert before deleting an article
            // warning this can only be done once!
            fetch('http://localhost:8081/lib/api/projects/remove', { 
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + this.user.i.token
                },
                body: JSON.stringify({ _id }),
            }).then(res => {
                this.$router.go()
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
    max-width: 34rem;
}

#title {
    text-align: center;
}
</style>
