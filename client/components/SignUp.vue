<template>
  <div>
    <vs-dialog :loading="loading" blur prevent-close v-model="displayDialog">
      <template #header>
        <h2>Sign Up</h2>
      </template>
      <div>
        <vs-row class="margin-bottom" justify="space-between" align="center">
          <vs-col
            class="padding-right"
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            w="6"
          >
            <base-input
              v-model.trim="$v.form.firstName.$model"
              placeholder="First Name"
              :validations="$v.form.firstName"
            />
          </vs-col>
          <vs-col
            class="padding-left"
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            w="6"
          >
            <base-input
              v-model.trim="$v.form.lastName.$model"
              placeholder="Last Name"
              :validations="$v.form.lastName"
            />
          </vs-col>
        </vs-row>
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
        <p class="label margin-bottom">Date of birth</p>
        <vs-row class="margin-bottom" justify="space-between" align="center">
          <vs-col
            class="padding-right"
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            w="4"
          >
            <base-select
              v-model.trim="$v.form.dob.$model"
              placeholder="Day"
              :options="days"
            />
          </vs-col>
          <vs-col
            class="padding-left padding-right"
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            w="4"
          >
            <base-select
              v-model.trim="$v.form.mob.$model"
              placeholder="Month"
              :options="months"
            />
          </vs-col>
          <vs-col
            class="padding-left"
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            w="4"
          >
            <base-select
              v-model.trim="$v.form.yob.$model"
              placeholder="Year"
              :options="years"
            />
          </vs-col>
        </vs-row>
        <base-radio
          v-model.trim="$v.form.gender.$model"
          :options="genders"
          label="Gender"
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
        <div class="footer-dialog">
          <vs-button
            size="large"
            class="margin-bottom"
            gradient
            success
            block
            @click="register"
            :disabled="$v.form.$invalid"
          >
            Sign Up
          </vs-button>
        </div>
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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      dob: "",
      mob: "",
      yob: "",
      gender: "",
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
      firstName: { alpha, required, minLength: minLength(4) },
      lastName: { alpha, required, minLength: minLength(4) },
      email: { email, required },
      password: {
        required,
        oneUppercase,
        oneLowercase,
        oneNumber,
        oneSpecial,
        minLength: minLength(8),
      },
      dob: { required, between: between(1, 31) },
      mob: { required },
      yob: { required },
      gender: { required },
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
    days: {
      get() {
        var list = [];
        for (var i = 1; i < 32; i++) {
          list.push({ label: i.toString(), value: i.toString() });
        }
        return list;
      },
    },
    months: {
      get() {
        return [
          { label: "Jan", value: "Jan" },
          { label: "Feb", value: "Feb" },
          { label: "Mar", value: "Mar" },
          { label: "Apr", value: "Apr" },
          { label: "May", value: "May" },
          { label: "Jun", value: "Jun" },
          { label: "Jul", value: "Jul" },
          { label: "Aug", value: "Aug" },
          { label: "Sep", value: "Sep" },
          { label: "Oct", value: "Oct" },
          { label: "Nov", value: "Nov" },
          { label: "Dec", value: "Dec" },
        ];
      },
    },
    years: {
      get() {
        var list = [];
        for (var i = 1; i < 100; i++) {
          const year = new Date().getFullYear() + 1 - i;
          list.push({ label: year.toString(), value: year.toString() });
        }
        return list;
      },
    },
    genders: {
      get() {
        return ["Male", "Female", "Custom"];
      },
    },
  },
  methods: {
    register() {
      const self = this;
      this.loading = true;
      this.$axios
        .post("api/register", {
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          email: this.form.email,
          dob: this.form.dob + "/" + this.form.mob + "/" + this.form.yob,
          gender: this.form.gender,
          password: this.form.password,
        })
        .then(function (result) {
          self.loading = false;
          self.resetForm();
          self.displayDialog = false;

          if ("data" in result) {
            if ("success" in result.data) {
              if ("message" in result.data.success) {
                self.$vs.notification({
                  position: "top-center",
                  duration: 6000,
                  progress: "auto",
                  color: "success",
                  title: "Thanks for joining",
                  text: result.data.success.message,
                });
              }
            }
          }
        })
        .catch(function (e) {
          if (e.response.data.error) {
            self.alert.title = "Error";
            self.alert.message = e.response.data.error;
            // dispatch('setAlert', "Error", e.response.data.error)
          } else {
            self.alert.title = "Error";
            self.alert.message =
              "Looks like something wrong with us 😓. Please try again later.";

            // dispatch('setAlert', "Error", "")
          }
          self.loading = false;
          self.alert.active = true;
          var interval = setInterval(() => {
            self.alert.progress++;
          }, 6000 / 100);

          setTimeout(() => {
            self.alert.active = false;
            self.alert.title = "";
            self.alert.message = "";
            clearInterval(interval);
            self.alert.progress = 0;
          }, 6000);
          throw e;
        });
    },
    resetForm() {
      this.form.firstName = "";
      this.form.lastName = "";
      this.form.email = "";
      this.form.password = "";
      this.form.dob = "";
      this.form.mob = "";
      this.form.yob = "";
      this.form.gender = "";
      this.loading = false;
    },
  },
};
</script>

<style scoped>
</style>
