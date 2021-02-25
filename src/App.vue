<template>
  <v-app >
    <v-app-bar
      app
      color="primary"
      dark
    >


      <v-toolbar-title id="header">Chatbox</v-toolbar-title>

      <v-spacer></v-spacer>


      <span>{{user.name}}</span>

    </v-app-bar>

    <v-main class="blue-grey lighten-5">
      <chatbox/>
    </v-main>

    <v-dialog
        v-model="dialog"
        persistent
        max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          Register
        </v-card-title>

        <v-card-text>
          Please enter an username
        </v-card-text>

        <v-card-text>
          <v-text-field
              label="Username"
              required
              :rules="[rules.length(30)]"
              v-model="username"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="green darken-1"
              text
              :disabled="!username || username.length > 30"
              @click="addUser">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import Chatbox from './components/Chatbox';
import {listenToMessages} from "@/store/firebase";

export default {
  name: 'App',

  components: {
    Chatbox,
  },

  mounted() {
    listenToMessages(this.$actions)

    console.log(this.$store.currentUserId)

    if (!this.$store.currentUserId) {
      this.dialog = true
    }
  },

  methods: {
    addUser () {
      this.$actions.login({name: this.username})
      this.dialog = false
    }
  },

  computed: {
    user () {
      return this.$store.users.find(user => user.id ===  this.$store.currentUserId) || {}
    }
  },

  data: () => ({
    username: '',
    dialog: false,
    rules: {
      length: len => v => (v || '').length <= len || `Invalid character length, required ${len}`,
    },
  }),
};
</script>

<style>
  #header {
    font-family: 'Raleway', sans-serif;
  }

  .v-main:before {
    content: ' ';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    opacity: 0.2;
    background-image: url(./assets/pexels-scott-webb-27406.jpg);
    background-repeat: no-repeat;
    background-position: 50% 0;
    background-size: cover;
  }
</style>
