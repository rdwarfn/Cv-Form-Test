<template>
  <ValidationObserver ref="form">
    <VForm>
      <VCard>
        <VCardTitle>Education</VCardTitle>
        <VCardText>
          <VRow>
            <VCol cols="12" sm="6">
              <ValidationProvider
                name="Degree"
                rules="required"
                v-slot="{errors}"
              >
                <VTextField
                  v-model="degree"
                  filled
                  clearable
                  required
                  label="Degree"
                  :error-messages="errors"
                />
              </ValidationProvider>
            </VCol>

            <VCol cols="12" sm="6">
              <ValidationProvider
                name="School"
                rules="required"
                v-slot="{errors}"
              >
                <VTextField
                  v-model="school"
                  filled
                  clearable
                  required
                  label="School"
                  :error-messages="errors"
                />
              </ValidationProvider>
            </VCol>

            <VCol cols="12" sm="4">
              <ValidationProvider
                name="Start Date"
                rules=""
                v-slot="{errors}"
              >
                <DateFieldCustom
                  v-model="startDate"
                  label="Start Date"
                  :error-messages="errors"
                  />
              </ValidationProvider>
            </VCol>

            <VCol cols="12" sm="4">
              <ValidationProvider
                name="End Date"
                rules=""
                v-slot="{errors}"
              >
                <DateFieldCustom
                  v-model="endDate"
                  label="End Date"
                  :min="startDate && startDate"
                  :disabled="!startDate"
                  :error-messages="errors"
                />
              </ValidationProvider>
            </VCol>

            <VCol cols="12" sm="4">
              <ValidationProvider
                name="City"
                rules="required"
                v-slot="{errors}"
              >
                <VTextField
                  v-model="city"
                  filled
                  clearable
                  required
                  label="City"
                  :error-messages="errors"
                />
              </ValidationProvider>
            </VCol>
          </VRow>

          <VRow>
            <VCol cols="12">
              <ValidationProvider
                name="Description"
                rules="required"
                v-slot="{errors}"
              >
                <VTextarea
                  v-model="description"
                  label="Description"
                  clearable
                  filled
                  :error-messages="errors"
                />
              </ValidationProvider>
            </VCol>
          </VRow>
        </VCardText>

        <VCardActions>
          <slot name="actions" v-bind:props="{ handleOnSubmit, handleOnReset }">
            <VSpacer />
            <VBtn text type="reset"> Close </VBtn>
            <VBtn text type="submit"> Save </VBtn>
          </slot>
        </VCardActions>
      </VCard>
    </VForm>
  </ValidationObserver>
</template>

<script>
import { mapMutations } from "vuex";
import { mapFields } from "vuex-map-fields"

export default {
    props: ['isEdited'],
    data: () => ({}),
    computed: mapFields("form", [
      "educationModel",
      "educationModel.degree",
      "educationModel.school",
      "educationModel.startDate",
      "educationModel.endDate",
      "educationModel.city",
      "educationModel.description",
    ]),
    methods: {
      ...mapMutations("form", ["resetEduModel", "setEduList", "updateEduListById"]),

      handleOnSubmit(cb) {
        this.$refs.form.validate()
          .then(success => {
            if (!success) return;

            if (!this.isEdited) {
              this.setEduList(this.educationModel);
            } else {
              this.updateEduListById(this.educationModel);
            }
            console.log("Educations has been submitted!");
            this.$nextTick(() => {
              this.handleOnReset(cb);
                this.$refs.form.reset();
            });
          });
      },

      handleOnReset(cb) {
        this.resetEduModel();

        cb && cb();
      }
    },
}
</script>
