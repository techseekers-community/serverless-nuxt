<template>
  <div>
    <vs-dialog
      :loading="loading"
      not-close
      blur
      prevent-close
      v-model="displayDialog"
    >
      <template #header>
        <h2>Sign In</h2>
      </template>
      <div ref="content">
        <base-input
          class="margin-bottom"
          v-model.trim="$v.form.email.$model"
          type="email"
          icon="@"
          placeholder="Email"
          :validations="$v.form.email"
        />
        <base-input
          class="margin-bottom"
          v-model.trim="$v.form.password.$model"
          type="password"
          iconclass="bx bx-lock-open-alt"
          placeholder="Password"
          :validations="$v.form.password"
        />
      </div>
      <template #footer>
        <vs-alert
          closable
          danger
          class="margin-bottom"
          :progress="alert.progress"
          v-model="alert.active"
        >
          <template #title> {{ alert.title }} </template>
          {{ alert.message }}
        </vs-alert>
        <vs-row class="margin-bottom" justify="space-between" align="center">
          <a href="#">Forgot Password?</a>
        </vs-row>
        <vs-button
          size="large"
          class="margin-bottom"
          gradient
          block
          :disabled="$v.form.$invalid"
          @click="signIn"
          >Sign in</vs-button
        >
        <vs-button
          size="large"
          class="margin-bottom"
          gradient
          success
          block
          @click="$store.commit('activateSignUp')"
          >Create New Account</vs-button
        >
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import {
  alpha,
  email,
  required,
  minLength,
  between,
  helpers,
} from "vuelidate/lib/validators";
import BaseInput from "./form_components/BaseInput.vue";
import BaseRadio from "./form_components/BaseRadio.vue";
import BaseSelect from "./form_components/BaseSelect.vue";

export const oneUppercase = (value) => {
  if (!helpers.req(value)) {
    return true;
  }
  const match = value.match(/[A-Z]/g) || [];
  return match.length >= 1;
};
export const oneLowercase = (value) => {
  if (!helpers.req(value)) {
    return true;
  }
  const match = value.match(/[a-z]/g) || [];
  return match.length >= 1;
};
export const oneSpecial = (value) => {
  if (!helpers.req(value)) {
    return true;
  }
  const match = value.match(/[!@#$%^&*()]/g) || [];
  return match.length >= 1;
};
export const oneNumber = (value) => {
  if (!helpers.req(value)) {
    return true;
  }
  const match = value.match(/\d/g) || [];
  return match.length >= 1;
};

export default {
  components: { BaseInput, BaseSelect, BaseRadio },
  component: [BaseInput],
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    form: {
      email: "",
      password: "",
    },
    alert: {
      active: false,
      title: "",
      message: "",
      progress: 0,
    },
    loading: false,
  }),
  validations: {
    form: {
      email: { email, required },
      password: {
        required,
        oneUppercase,
        oneLowercase,
        oneNumber,
        oneSpecial,
        minLength: minLength(8),
      },
    },
  },
  computed: {
    displayDialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$v.$reset();
        this.$emit("input", value);
      },
    },
  },
  methods: {
    signIn() {
      var self = this;
      this.loading = true;
      this.$auth
        .loginWith("local", { data: this.form })
        .then(function (result) {
          self.loading = true;
          self.resetForm();
          self.displayDialog = false;
        });
    },
    resetForm() {
      this.form.email = "";
      this.form.password = "";
      this.loading = false;
    },
  },
};
</script>

<style scoped>
a {
  font-size: 0.8rem;
  opacity: 0.7;
}
</style>
