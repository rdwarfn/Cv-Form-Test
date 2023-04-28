<template>
  <VSheet tag="section">
    <div class="text-h4">Education</div>
    <div class="text-body-1 text-wrap mb-4">
      A varied education on your resume sums up the value
      that your learnings and background will bring to job
    </div>

    <VExpansionPanels>
      <VExpansionPanel
        v-if="educationList && educationList.length"
        v-for="(item, i) of educationList"
        :key="i"
      >
        <VExpansionPanelHeader>
          <div class="text-h6 text-capitalize">
            {{ item.degree }} at {{ item.school }} - {{ item.city }} <br />
            <span class="text-body-2">{{ item.startDateFormat }} - {{ item.endDateFormat }}</span>
          </div>
        </VExpansionPanelHeader>

        <VExpansionPanelContent>
          <VRow no-gutters justify="space-around">
            <VCol>{{ item.description }}</VCol>

            <VDivider vertical class="mx-4" />

            <VCol cols="2" class="text-right">
              <VBtn icon color="primary lighten-2" @click.prevent="getEduId(item._id)">
                <VIcon>mdi-pencil</VIcon>
              </VBtn>
              <VBtn icon color="red lighten-3" @click.prevent="deleteEduListById(item._id)">
                <VIcon>mdi-delete</VIcon>
              </VBtn>
            </VCol>
          </VRow>
        </VExpansionPanelContent>
      </VExpansionPanel>
    </VExpansionPanels>

    <DialogActivator
      v-model="dialog"
      label-activator="Add one more education"
      class-btn="mt-5"
    >
      <template>
        <FormEducation :is-edited="isEdited">
          <template #actions="{props: actions}">
            <VSpacer />
            <VBtn text @click.prevent="actions.handleOnReset(dialogClose)"> Close </VBtn>
            <VBtn text @click.prevent="actions.handleOnSubmit(dialogClose)"> Save </VBtn>
          </template>
        </FormEducation>
      </template>
    </DialogActivator>
  </VSheet>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  data: () => ({
    dialog: false,
    isEdited: false,
  }),
  computed: {
    ...mapState("form", ["educationList"]),
    ...mapGetters("form", ["getEduListById"]),
  },
  methods: {
    ...mapMutations("form", ["updateField", "deleteEduListById"]),

    getEduId(_id) {
      this.isEdited = true;
      const value = Object.assign({}, this.getEduListById(_id));

      this.updateField({ path: "educationModel", value });
      this.dialog = true;
    },

    dialogClose () {
      this.isEdited = false;
      this.dialog = false;
    },
  }
}
</script>
