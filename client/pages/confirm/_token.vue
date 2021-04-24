<template >
  <div>{{ this.$route.params.token }}</div>
</template>
<script>
export default {
  auth: false,
  mounted() {
    var self = this;
    this.$router.push("/login");
    this.$axios
      .get("api/confirm/" + this.$route.params.token)
      .then(function (result) {
        if ("error" in result.data) {
          self.$vs.notification({
            position: "top-center",
            duration: 6000,
            progress: "auto",
            color: "danger",
            title: "Error",
            text: result.data.error.description,
          });
        }
        if ("success" in result.data) {
          self.$vs.notification({
            position: "top-center",
            duration: 6000,
            progress: "auto",
            color: "success",
            title: "Success",
            text: result.data.success.message,
          });
        }
      });
  },
};
</script>
<style scoped>
</style>