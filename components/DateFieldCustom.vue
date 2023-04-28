<template>
  <VMenu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <VTextField
        v-model="dateFormatted"
        :label="label"
        :prepend-icon="prependIcon"
        filled
        clearable
        readonly
        :disabled="disabled"
        v-bind="attrs"
        v-on="on"
        :error-messages="errorMessages"
      />
    </template>
    <VDatePicker
      :value="value"
      @input="onInput"
      :max="max"
      :min="min"
    />
  </VMenu>
</template>

<script>
import { formatDate, maxDateField, replaceCtx } from '~/utils/utils';

export default {
  props: {
    label: String,
    value: String,
    errorMessages: [String, Array],
    max: {
      type: String,
      default: maxDateField
    },
    min: String,
    disabled: {
      type: Boolean,
      default: false
    },
    prependIcon: String
  },
  data: () => ({
    menu: false
  }),
  methods: {
    onInput (e) {
      this.$emit("input", e);
      this.menu = false
    }
  },
  computed: {
    dateFormatted: {
      get() {
        if (!this.value) return null;
        return replaceCtx(formatDate(new Date(this.value)), /\//g, "-");
      },

      set(v) {
        this.$emit('input', v);
      }
    }
  }
}
</script>
