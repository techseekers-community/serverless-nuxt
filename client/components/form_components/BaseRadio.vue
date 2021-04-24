<template >
  <div>
    <p class="label margin-bottom">{{ label }}</p>
    <vs-row class="margin-bottom" justify="space-around" align="center">
      <vs-radio
        v-for="opt in options"
        :key="opt"
        v-model="radioModel"
        :val="opt"
      >
        {{ opt }}
      </vs-radio>
    </vs-row>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: false,
      default: "",
    },
    options: {
      type: Array,
      required: true,
      validator(opts) {
        return !opts.find((opt) => typeof opt !== "string");
      },
    },
    error: {
      type: String,
      required: false,
      default: "",
    },
  },
  computed: {
    radioModel: {
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
<style scoped>
</style>