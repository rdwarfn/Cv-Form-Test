<template>
  <VRow no-gutters align="end">
    {{ base64img }}
    <VCol cols="3" class="pb-0">
      <VImg
        v-if="base64img"
        :lazy-src="base64img"
        :src="base64img"
        height="100"
        width="100"
        aspect-ratio="16/9"
        cover
      />
      <VImg
        v-else
        lazy-src="/default-avatar.jpg"
        src="/default-avatar.jpg"
        height="100"
        width="100"
        aspect-ratio="16/9"
        cover
      />
    </VCol>

    <VCol>
      <ValidationProvider
        v-slot="{errors}"
        name="Upload Photo"
        rules="required"
      >
        <VFileInput
          v-model.lazy="image"
          label="Upload Photo"
          :error-messages="errors"
          @change="handleUpload"
          accept="image/*"
          prepend-icon="mdi-camera"
          show-size
          filled
          clearable
        />
      </ValidationProvider>
    </VCol>
  </VRow>
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
  data: () => ({
  }),
  computed: mapFields("form", ["photoModel.image","photoModel.base64img"]),
  methods: {
    handleUpload (file) {
      if (!file) return this.base64img = null;
      this.createBase64Image(file);
    },

    createBase64Image (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.base64img = e.target.result;
      };
    },
  }
}
</script>
