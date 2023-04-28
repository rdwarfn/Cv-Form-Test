<template>
  <VContainer>
    <SectionPersonalDetails />
    <SectionProfessionalSummary />
    <SectionEmploymentHistory />
    <SectionEducation />
    <SectionSkills />

    <VCardActions>
      <VSpacer />
      <VBtn text @click.prevent="handleSubmit">Submit</VBtn>
    </VCardActions>
  </VContainer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  methods: {
    ...mapActions(["handleSubmit"]),
  }
}
</script>

<style lang="scss">
section {
  padding: 1.25rem 0;

  +:not(:first-child) {
    margin-top: 2.5rem;
  }
}
</style>
