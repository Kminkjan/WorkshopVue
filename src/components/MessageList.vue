<template>
    <div id="message-box" class="white chat-box flex-grow-1 pa-3">

<!--      TODO Use the message component for every message-->
<!--      You'll have to pass the message object to the component (Look into "props" in the Vue docs) -->

    </div>
</template>

<script>

export default {
  name: 'MessageList',
  components: {},
  data: () => ({

  }),

  computed: {
    messages() {
      // TODO retrieve the messages from the data store
      /* HINT - You can access the store (as defined in store.js) with "this.$store" */
      /* HINT - You need to return something in computed values */
    }
  },

  methods: {
    scrollToEndOfMessages() {
      this.$nextTick(() => {
        // Makes sure that we are at the end when new messages come in
        const elem = document.getElementById('message-box');
        elem.scrollTop = elem.scrollHeight;
      })
    }
  },

  watch: {
    'messages': {
      immediate: true,
      handler: function () {
        this.scrollToEndOfMessages()
      }
    }
  },

  created() {
    setTimeout(this.scrollToEndOfMessages, 1000)
  }
}
</script>

<style>
#message-box {
  overflow-y: scroll;
}

.chat-box {
  border-radius: 6px;
}
</style>
