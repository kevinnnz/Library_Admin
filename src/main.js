import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './Router'

Vue.config.productionTip = false

let app = ''

var firebaseConfig = {
  apiKey: "AIzaSyBssP-9YfPwEYhSkp5UWl1c2m7g40oJfto",
  authDomain: "kevinnnz.firebaseapp.com",
  databaseURL: "https://kevinnnz.firebaseio.com",
  projectId: "kevinnnz",
  storageBucket: "kevinnnz.appspot.com",
  messagingSenderId: "440965300084",
  appId: "1:440965300084:web:4a9012f444bd2bb7a17621",
  measurementId: "G-K6009ETC7D"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      render: h => h(App),
    }).$mount('#app')
  }
})
