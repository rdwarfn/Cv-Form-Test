<template>
  <VSheet tag="section">
    <div class="text-h4">Employment History</div>
    <div class="text-body-1 text-wrap mb-4">
      Show you relevant experience (last 10 years). Use bullet points to note your achivements, if possible - use number/facts
      (Achieved X, measured by Y, by doing Z).
    </div>

    <VExpansionPanels>
      <VExpansionPanel
        v-if="employList.length"
        v-for="(item, i) of employList"
        :key="i"
      >
        <VExpansionPanelHeader>
          <div class="text-h6 text-capitalize">
            {{ item.jobTitle }} at {{ item.employer }} - {{ item.city }} <br />
            <span class="text-body-2">{{ item.startDateFormat }} - {{ item.endDateFormat }}</span>
          </div>
        </VExpansionPanelHeader>

        <VExpansionPanelContent>
          <VRow no-gutters justify="space-around">
            <VCol>{{ item.description }}</VCol>

            <VDivider vertical class="mx-4" />

            <VCol cols="2" class="text-right">
              <VBtn icon color="primary lighten-2" @click.prevent="getEmployId(item._id)">
                <VIcon>mdi-pencil</VIcon>
              </VBtn>
              <VBtn icon color="red lighten-3" @click.prevent="deleteEmloyListById(item._id)">
                <VIcon>mdi-delete</VIcon>
              </VBtn>
            </VCol>
          </VRow>
        </VExpansionPanelContent>
      </VExpansionPanel>
    </VExpansionPanels>

    <DialogActivator v-model="dialog" label-activator="Add one more employment">
      <template>
        <FormEmploy :is-edited="isEdited">
          <template #actions="{props: actions}">
            <VSpacer />
            <VBtn text @click.prevent="actions.handleOnReset(dialogClose)"> Close </VBtn>
            <VBtn text @click.prevent="actions.handleOnSubmit(dialogClose)"> Save </VBtn>
          </template>
        </FormEmploy>
      </template>
    </DialogActivator>
  </VSheet>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  data: () => ({
    dialog: false,
    isEdited: false
  }),
  computed: {
    ...mapState("form", ["employList"]),
    ...mapGetters("form", ["getEmployeListById"]),
  },
  methods: {
    ...mapMutations("form", ["updateField", "deleteEmloyListById"]),

    getEmployId(_id) {
      this.isEdited = true;
      const value = Object.assign({}, this.getEmployeListById(_id));
      console.log("*** getEmployeListById", employ);

      this.updateField({path: "employModel", value });
      this.dialog = true;
    },

    dialogClose () {
      this.isEdited = false;
      this.dialog = false;
    }
  }
}
</script>
