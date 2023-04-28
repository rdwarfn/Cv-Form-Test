<template>
  <ValidationObserver ref="form">
    <VForm>
      <VRow align="end">
        <!-- wanted job title -->
        <VCol cols="12" sm="6">
          <ValidationProvider
            v-slot="{errors}"
            name="Wanted Job Title"
            rules="required"
          >
            <VTextField
              v-model="wantedJobTitle"
              label="Wanted Job Title"
              :error-messages="errors"
              filled
              clearable
            />
          </ValidationProvider>
        </VCol>

        <!-- avatar -->
        <VCol cols="12" sm="6">
          <FormPhoto />
        </VCol>

        <!-- first name -->
        <VCol cols="12" sm="6">
          <ValidationProvider
            v-slot="{errors}"
            name="First Name"
            rules="required"
          >
            <VTextField
              v-model.lazy="firstName"
              label="First Name"
              :error-messages="errors"
              filled
              clearable
            />
          </ValidationProvider>
        </VCol>

        <!-- last name -->
        <VCol cols="12" sm="6">
          <ValidationProvider
            v-slot="{errors}"
            name="Last Name"
            rules="required"
          >
            <VTextField
              v-model.lazy="lastName"
              label="Last Name"
              :error-messages="errors"
              filled
              clearable
            />
          </ValidationProvider>
        </VCol>

        <!-- email -->
        <VCol cols="12" sm="6">
          <ValidationProvider
            v-slot="{errors}"
            name="Email"
            rules="required|email"
          >
            <VTextField
              v-model.lazy="email"
              label="Email"
              :error-messages="errors"
              filled
              clearable
            />
          </ValidationProvider>
        </VCol>

        <!-- phone -->
        <VCol cols="12" sm="6">
          <ValidationProvider
            v-slot="{errors}"
            name="Phone"
            rules="required"
          >
            <VTextField
             v-model.lazy="phone"
              label="Phone"
              :error-messages="errors"
              filled
              clearable
            />
          </ValidationProvider>
        </VCol>

        <!-- country -->
        <VCol cols="12" sm="6">
          <ValidationProvider
            v-slot="{errors}"
            name="Country"
            rules="required"
          >
            <VTextField
              label="Country"
              v-model.lazy="country"
              :error-messages="errors"
              filled
              clearable
            />
          </ValidationProvider>
        </VCol>

        <!-- city -->
        <VCol cols="12" sm="6">
          <ValidationProvider
            v-slot="{errors}"
            name="City"
            rules="required"
          >
            <VTextField
              v-model.lazy="city"
              label="City"
              :error-messages="errors"
              filled
              clearable
            />
          </ValidationProvider>
        </VCol>

        <!-- address -->
        <VCol cols="12" sm="6">
          <ValidationProvider
            v-slot="{errors}"
            name="Address"
            rules="required"
          >
            <VTextField
              v-model.lazy="address"
              label="Address"
              :error-messages="errors"
              filled
              clearable
            />
          </ValidationProvider>
        </VCol>

        <!-- postalCode -->
        <VCol cols="12" sm="6">
          <ValidationProvider
            v-slot="{errors}"
            name="Postal Code"
            rules="required"
          >
            <VTextField
              v-model.lazy="postalCode"
              label="Postal Code"
              :error-messages="errors"
              filled
              clearable
            />
          </ValidationProvider>
        </VCol>

        <!-- drivingLicense -->
        <VCol cols="12" sm="6">
          <ValidationProvider
            v-slot="{errors}"
            name="Driver License"
            rules="required"
          >
            <VTextField
              v-model.lazy="drivingLicense"
              label="Driver License"
              :error-messages="errors"
              filled
              clearable
            />
          </ValidationProvider>
        </VCol>

        <!-- nationality -->
        <VCol cols="12" sm="6">
          <ValidationProvider
            v-slot="{errors}"
            name="Nationality"
            rules="required"
          >
            <VTextField
              v-model.lazy="nationality"
              label="Nationality"
              :error-messages="errors"
              filled
              clearable
            />
          </ValidationProvider>
        </VCol>

        <!-- place of birth -->
        <VCol cols="12" sm="6">
          <ValidationProvider
            v-slot="{errors}"
            name="Place Of Birth"
            rules="required"
          >
            <VTextField
              v-model.lazy="placeOfBirth"
              label="Place Of Birth"
              :error-messages="errors"
              filled
              clearable
            />
          </ValidationProvider>
        </VCol>

        <!-- date of birth -->
        <VCol cols="12" sm="6">
          <ValidationProvider
            v-slot="{errors}"
            name="Date Of Birth"
            rules="required"
          >
            <DateFieldCustom
              v-model.lazy="dateOfBirth"
              label="Date Of Birth"
              :error-messages="errors"
            />
          </ValidationProvider>
        </VCol>
      </VRow>
    </VForm>
  </ValidationObserver>
</template>

<script>
import { mapMutations } from "vuex";
import { mapFields } from "vuex-map-fields";
export default {
  computed: mapFields("form", [
    "personalModel",
    "personalModel.wantedJobTitle",
    "personalModel.firstName",
    "personalModel.lastName",
    "personalModel.email",
    "personalModel.phone",
    "personalModel.country",
    "personalModel.city",
    "personalModel.address",
    "personalModel.postalCode",
    "personalModel.drivingLicense",
    "personalModel.nationality",
    "personalModel.placeOfBirth",
    "personalModel.dateOfBirth",
    "personalModel.summary",
  ])
}
</script>
