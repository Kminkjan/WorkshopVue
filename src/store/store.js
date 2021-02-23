import Vue from 'vue'

/* Create a reactive store */
const store = Vue.observable({  count: ''  })

/* Create centralized actions for updating the store */
const actions = {
    incrementCount() {
        store.count += 1
    },
    decrementCount() {
        store.count -= 1
    }
}

/*
    Attach store and actions to the Vue prototype
    so they can be accessed from any component
*/
Vue.prototype.$store = store
Vue.prototype.$actions = actions