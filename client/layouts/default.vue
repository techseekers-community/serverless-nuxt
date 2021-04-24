<template>
  <div>
    <SignIn v-model="signInActive" />
    <SignUp v-model="signUpActive" />
    <Nuxt />
  </div>
</template>
<script>
export default {
  computed: {
    signInActive: {
      get() {
        return this.$store.state.authform.signInActive;
      },
      set(value) {
        if (!value) {
          this.$store.commit("deativateSignIn");
        }
      },
    },
    signUpActive: {
      get() {
        return this.$store.state.authform.signUpActive;
      },
      set(value) {
        if (!value) {
          this.$store.commit("activateSignIn");
        }
      },
    },
  },
};
</script>


<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.margin-bottom {
  margin-bottom: 1rem;
}
.margin-right {
  margin-right: 2rem;
}
.padding-right {
  padding-right: 1rem;
}
.padding-left {
  padding-left: 1rem;
}
.label {
  color: #606770;
  font-size: 12px;
  font-weight: normal;
}
.twenty {
  width: 10rem;
}
</style>
