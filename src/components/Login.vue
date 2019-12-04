<template>
  <div class="container">
    <div class="outline">
      <h1 id="masthead">Library</h1>
      <br />
      <input v-model="email" type="text" placeholder="Email">
      <br/>
      <input v-model="password" type="password" placeholder="Password"/>
      <br />
      <button @click="signin">Sign-In</button>
    </div> 
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name : "login",
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods : {
    signin : function() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        () => {
          this.$router.replace('dashboard')
        },
        (err) => {
          alert('An error has occured!' + err.message)
        }
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #masthead {
    font-family: 'Asap', sans-serif;
    font-weight: 600;
    color: #0066FF;
    font-size: 60px;
  }

  .container { 
    width: 100%;
    text-align: center;    
  }

  .outline {
      border-radius: 25px;
      border: 2px solid #0066FF;
      background-color: #FFFFFF;
      padding: 20px;
      width: 500px;
      margin: 0 auto;
  }

  input {
    margin: 10px 0;
    width: 50%;
    padding: 15px;
  }

  button {
    margin-top: 20px;
    width: 25%;
    padding: 15px;
    cursor: pointer;
    margin-bottom: 40px;
  }


</style>
