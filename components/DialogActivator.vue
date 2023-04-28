<template>
  <VDialog :value="value" @input="$emit('input', $event)" :width="width" persistent>
    <template v-slot:activator="{ on, attrs }">
      <VBtn text v-bind="attrs" v-on="on" :class="classBtn">
        <VIcon v-text="'mdi-plus'" class="mr-2" /> {{ labelActivator }}
      </VBtn>
    </template>

    <slot>Slot Default</slot>
  </VDialog>
</template>

<script>
export default {
  props: ["value", "labelActivator", "width", "classBtn"]
}
</script>
