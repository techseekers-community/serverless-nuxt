<template>
  <div></div>
</template>

<script>
export default {
  data: () => ({}),
  asyncData(context) {
    context.store.commit("activateSignIn");
  },
  methods: {
    signIn() {},
  },
};
</script>

<style scoped>
</style>
