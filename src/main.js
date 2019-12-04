import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './Router'

Vue.config.productionTip = false

let app = ''

var firebaseConfig = {
  // YOUR CONFIG SETTINGS HERE
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
