<template>
  <div>
<!--    TODO make this look a lot better! Use your own creativity-->
<!--    HINT - Use CSS and the Vuetify docs-->
    {{message}}
  </div>
</template>

<script>
  import {formatDistanceToNow} from 'date-fns'

  export default {
    name: 'Message',

    props: {
      message: {
        type: Object,
        required: true
      }
    },

    computed: {
      sender () {
        /* TODO figure out how to get the sender from the store */
        /* HINT - Don't know how to search in a list? Google how to search an item in a list in Javascript! */
      },
      isMyMessage () {
        /* TODO figure out if I've send this message! */
        /* HINT - All the information is in the message and in the store! */
      },
      dateDistanceToNow () {
        return formatDistanceToNow(new Date(this.message.time), { addSuffix: true})
      }
    }
  }
</script>

<style>
  .message {
    border-radius: 3px;
  }
</style>
