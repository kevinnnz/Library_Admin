import firebase from 'firebase'
import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from './components/Dashboard.vue'
import Project from './components/ProjectForm.vue'
import Login from './components/Login.vue'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '*',
            redirect: '/login'
        },
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/project',
            name: 'project',
            component: Project,
            props: true,
            meta: {
                requiresAuth: true
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser
    
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if(!currentUser) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router