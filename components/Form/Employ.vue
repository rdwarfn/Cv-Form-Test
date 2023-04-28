<template>
  <ValidationObserver ref="form">
    <VForm>
      <VCard>
        <VCardTitle>Employment</VCardTitle>
        <VCardText>
          <VRow>
            <VCol cols="12" sm="6">
              <ValidationProvider
                name="Job Title"
                rules="required"
                v-slot="{errors}"
              >
                <VTextField
                  v-model="jobTitle"
                  filled
                  clearable
                  required
                  label="Job Title"
                  :error-messages="errors"
                />
              </ValidationProvider>
            </VCol>

            <VCol cols="12" sm="6">
              <ValidationProvider
                name="Employer"
                rules="required"
                v-slot="{errors}"
              >
                <VTextField
                  v-model="employer"
                  filled
                  clearable
                  required
                  label="Employer"
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
    computed: {
        ...mapFields("form", [
            "employModel",
            "employModel.jobTitle",
            "employModel.employer",
            "employModel.startDate",
            "employModel.endDate",
            "employModel.city",
            "employModel.description",
        ])
    },
    methods: {
      ...mapMutations("form", ["resetEmployModel", "setEmployList", "updateEmployListById"]),

      handleOnSubmit(cb) {
        this.$refs.form.validate()
          .then(success => {
            if (!success) return;

            if (!this.isEdited) {
              this.setEmployList(this.employModel);
            } else {
              this.updateEmployListById(this.employModel);
            }
            console.log("Form Employements has been submitted!");
            // reset values
            this.$nextTick(() => {
              this.handleOnReset(cb);
                this.$refs.form.reset();
            });
          });
      },

      handleOnReset(cb) {
        // reset values
        this.resetEmployModel();

        cb && cb();
      }
    },
}
</script>
