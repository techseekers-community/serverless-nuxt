<template>
  <div>
    <h2>Welcome {{ $auth.user.firstName }} {{ $auth.user.lastName }} !</h2>
    <vs-button
      size="large"
      class="margin-bottom"
      gradient
      success
      @click="logout"
      >Logout</vs-button
    >
  </div>
</template>

<script>
export default {
  data: () => ({}),
  methods: {
    logout() {
      this.$auth.logout();
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.app {
  background-color: #f4f7f8;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.input {
  margin: 0px 0px 20px 0px;
}
.sign-in {
  background-color: #ffffff;
  border-radius: 20px;
  padding: 20px;
}
.title {
  margin: 0px 0px 20px 0px;
}
</style>
