<template>
  <vs-select :placeholder="placeholder" v-model="selectModel">
    <template v-if="error != ''" #message-danger>
      {{ error }}
    </template>
    <vs-option
      v-for="opt in options"
      :key="opt.value"
      :label="opt.label"
      :value="opt.value"
      >{{ opt.label }}</vs-option
    >
  </vs-select>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
      validator(opts) {
        return !opts.find((opt) => typeof opt !== "object");
      },
    },
    error: {
      type: String,
      required: false,
      default: "",
    },
  },
  computed: {
    selectModel: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>
<style>
</style>