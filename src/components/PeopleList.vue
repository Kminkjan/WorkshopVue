<template>
  <div>
    <p class="display-6 font-weight-bold mb-3">
      People registered
    </p>
    <div v-for="user in users" :key="user.id" :style="'color: ' + user.color || 'black'">
      {{ user.name }} {{ user.color }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PeopleList',

  data: () => ({}),

  computed: {
    users() {
      return this.$store.users
    }
  }
}
</script>

<style>
.message {
  border-radius: 3px;
}
</style>
