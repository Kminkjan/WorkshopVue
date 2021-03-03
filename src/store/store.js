import Vue from 'vue'
import {loginAsUser, postMessage} from "@/store/firebase";

const LOGGED_IN_USER_KEY = 'logged_in_user_key'
let rateLimitTimout

/* Create a reactive store */
const store = Vue.observable({
    messages: [],
    users: [],
    rateLimited: false,
    currentUserId: window.localStorage.getItem(LOGGED_IN_USER_KEY)
})

/* Create centralized actions for updating the store */
const actions = {
    setMessages(newMessage) {
        store.messages = newMessage
    },
    setUsers(newUsers) {
        store.users = newUsers
    },
    async login(user) {
        // create the user
        const createdUserId = await loginAsUser(user)

        // set the id as logged in user key
        store.currentUserId = createdUserId
        window.localStorage.setItem(LOGGED_IN_USER_KEY, createdUserId)
    },
    async postMessage(message) {
        message.from = store.currentUserId

        try {
            await postMessage(message)
        } catch (e) {
            if (e === 'RATE_LIMITED') {
                store.rateLimited = true

                clearTimeout(rateLimitTimout)
                rateLimitTimout = setTimeout(() => store.rateLimited = false, 5000)
            }
        }
    }
}

/*
    Attach store and actions to the Vue prototype
    so they can be accessed from any component
*/
Vue.prototype.$store = store
Vue.prototype.$actions = actions
