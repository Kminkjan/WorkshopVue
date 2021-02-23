<template>
  <v-container class="fill-height" style="height: calc(100vh - 64px);">
    <v-row class="fill-height">
      <v-col cols="8" class="chat-box" style="height: 100%">
        <div class="d-flex pa-2 flex-column fill-height">
          <message-list></message-list>
          <message-input></message-input>
        </div>
      </v-col>

      <v-col cols="4" class="white mb-5 mt-5 text-end chat-box" style="height: fit-content;">
        <people-list></people-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import PeopleList from "@/components/PeopleList";
  import MessageList from "@/components/MessageList";
  import MessageInput from "@/components/MessageInput";
  export default {
    name: 'ChatBox',
    components: {MessageInput, MessageList, PeopleList},
    data: () => ({

    })
  }
</script>

<style>

</style>
