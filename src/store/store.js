import Vue from 'vue'
import {loginAsUser, postMessage} from "@/store/firebase";

const LOGGED_IN_USER_KEY = 'logged_in_user_key'

/* Create a reactive store */
const store = Vue.observable({
    messages: [],
    users: [],
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
        const colors = ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green',
            'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'blue-grey']

        user.color = colors[Math.floor(Math.random() * colors.length)]

        // create the user
        const createdUserId = await loginAsUser(user)

        // set the id as logged in user key
        store.currentUserId = createdUserId
        window.localStorage.setItem(LOGGED_IN_USER_KEY, createdUserId)
    },
    async postMessage(message) {
        message.from = store.currentUserId
        message.time = Date.now()
        await postMessage(message)
    }
}

/*
    Attach store and actions to the Vue prototype
    so they can be accessed from any component
*/
Vue.prototype.$store = store
Vue.prototype.$actions = actions
