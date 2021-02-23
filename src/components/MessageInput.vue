<template>
  <div class="white chat-box flex-shrink-1 mt-4 pa-3">
    <v-row class="align-center">
      <v-col>
        <v-textarea
            name="input-7-1"
            label="Message"
            v-model="message"
            :rules="[rules.length(128)]"
            counter
            dense
            @keypress.enter.exact.prevent="postMessage"
            hide-details
            auto-grow
            rows="1"
        ></v-textarea>
      </v-col>
      <v-col cols="auto">
        <v-btn icon @click="postMessage"
               color="blue">
          <v-icon dark>
            mdi-send
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-alert v-if="rateLimited"
        border="right"
        colored-border
        type="error"
        elevation="2"
             class="mt-3">
      Please stop spamming! 😅
    </v-alert>
  </div>
</template>

<script>
import {differenceInSeconds} from 'date-fns'

let rlTimeout

export default {

  name: 'MessageInput',

  components: {},
  data: () => ({
    rateLimited: false,
    message: '',
    rules: {
      length: len => v => (v || '').length <= len || `Invalid character length, required ${len}`,
    },
  }),

  methods: {
    postMessage() {
      if (!this.message || this.message.length > 128) return

      // Yeah I know, you can bypass the rate limiter by deleting these lines. Please don't ;)
      if (this.messages.filter(message => differenceInSeconds(new Date(), new Date(message.time) ) < 10).length >= 5) {
        this.rateLimited = true
        clearTimeout(rlTimeout)
        rlTimeout = setTimeout(() => this.rateLimited = false, 5000)
        return
      }

      this.$actions.postMessage({message: this.message})

      // Then clear the message
      this.message = ''
    },
  },

  computed: {
    messages () {
      return this.$store.messages
    }
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
