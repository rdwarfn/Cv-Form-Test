<template>
  <ValidationObserver ref="form" v-slot="{ handleSubmit, reset }">
    <form @submit.prevent="handleSubmit(handleOnSubmit)" @reset.prevent="handleOnReset(reset)">
      <VCard>
        <VCardTitle>Skill</VCardTitle>
        <VCardText>
          <ValidationProvider
            name="Skill name"
            rules="required"
            v-slot="{errors}"
          >
            <VTextField
              v-model="skillChoiceModel"
              filled
              clearable
              label="Skill Name"
              :error-messages="errors"
            />
          </ValidationProvider>
        </VCardText>

        <VCardActions>
          <VSpacer />
          <VBtn text type="reset"> Close </VBtn>
          <VBtn text type="submit"> Save </VBtn>
        </VCardActions>
      </VCard>
    </form>
  </ValidationObserver>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { mapMutations } from "vuex";

export default {
  props: ["closeDialog"],
  computed: mapFields("form", ["skillChoiceModel"]),
  methods: {

    handleOnSubmit() {
      console.log("*** submited")
      console.log("*** skillChoiceModel", this.skillChoiceModel)

      this.$store.commit("form/setSkillChoices", this.skillChoiceModel);

      this.handleOnReset(this.$refs.form.reset);
    },
    handleOnReset(cb) {
      this.skillChoiceModel = null;

      cb && cb();
      this.closeDialog();
    }
  },
}
</script>
