<template>
  <vs-input
    icon-after
    block
    :type="type"
    :placeholder="placeholder"
    v-model="inputText"
  >
    <template v-if="icon != '' || iconclass != ''" #icon>
      <i v-if="iconclass != ''" :class="iconclass"></i>
      {{ icon }}
    </template>
    <template v-if="invalid" #message-danger>
      {{ errors[0] }}
    </template>
  </vs-input>
</template>
<script>
const TEMPLATES_MAP = {
  alpha: "Required alphabets only.",
  email: "Must be a valid email address.",
  minLength: "Must have a length no less than {{min}}.",
  required: "Required field.",
  oneUppercase: "Required one uppercase.",
  oneLowercase: "Required one lowercase.",
  oneNumber: "Required one number.",
  oneSpecial: "Required one special character.",
};
export default {
  props: {
    placeholder: {
      type: String,
      required: true,
    },
    validations: {
      required: false,
      type: Object,
    },
    icon: {
      type: String,
      required: false,
      default: "",
    },
    iconclass: {
      type: String,
      required: false,
      default: "",
    },
    type: {
      type: String,
      default: "text",
      validator(value) {
        return ["text", "email", "password"].includes(value);
      },
    },

    value: {
      type: String,
      required: true,
    },
  },
  computed: {
    inputText: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    errors() {
      if (!this.invalid) {
        return [];
      }
      return Object.keys(this.validations.$params).reduce(
        (errors, validator) => {
          if (!this.validations[validator]) {
            const compiled = this.lodash.template(TEMPLATES_MAP[validator]);
            errors.push(compiled(this.validations.$params[validator]));
          }
          return errors;
        },
        []
      );
    },
    invalid() {
      return this.validations.$dirty && this.validations.$invalid;
    },
  },
};
</script>
<style>
</style>