<template>
  <VSheet tag="section">
    <div class="text-h4">Skills</div>
    <div class="text-body-1 text-wrap mb-4">
      Choose 5 of the most important skills to show your talents!
      Make sure they match the keywords of the job listing if applying via online system
    </div>

    <VSwitch
      v-model="switchModel"
      inset
      label="Dont show experience level"
    />

    <VChipGroup
      v-model="listChipModel"
      multiple
      column
      color="primary"
      active-class="primary white--text"
      @change="onSkillSelect"
    >
      <VChip v-for="(item, i) of skillChoices" :key="i" label :value="item">
        {{ item }}
        <VIcon small right v-if="listChipModel.includes(item)">mdi-check</VIcon>
        <VIcon small right v-else>mdi-plus</VIcon>
      </VChip>
    </VChipGroup>

    <VExpansionPanels>
      <VExpansionPanel
        v-if="skillList.length"
        v-for="(item, i) of skillList"
        :key="i"
      >
        <VExpansionPanelHeader>
          <div class="text-h6 text-capitalize">
            {{ item.skill ? item.skill : 'Skill Name' }} <br />

            <span
              v-show="!switchModel"
              class="text-body-2"
            >
              {{ item.level ? item.level : 'Level' }}
            </span>
          </div>
        </VExpansionPanelHeader>

        <VExpansionPanelContent>
          <VRow>
            <VCol cols="12" sm="6">
              <label>Skill</label>
              <VTextField
                v-model="item.skill"
                filled
                clearable
              />

              <input hidden :value="item.level" @input="() => item.level = itemGroupModel && itemGroupModel.name" />
            </VCol>

            <VCol cols="12" sm="6">
              <label>
                Level -
                <span :class="`${itemGroupModel ? `${itemGroupModel.color}` : 'primary'}--text`">
                  {{ itemGroupModel && itemGroupModel.name }}
                </span>
              </label>

              <VItemGroup
                :value="itemGroupModel"
                @change="itemLevel => {
                  itemGroupModel = itemLevel;
                  item.level = itemLevel && itemLevel.name
                }"
                class="mt-3"
              >
                <VRow no-gutter>
                  <VCol
                    v-for="(level, i) of listLevelSkill"
                    :key="i"
                    class="pa-0"
                  >
                    <VItem :value="{id: item._id, ...level}" v-slot="{ active, toggle }">
                      <VCard
                        flat
                        :color="active ? `${level.color} darken-1` : (itemGroupModel ? `${itemGroupModel.color} lighten-3` :'grey lighten-3')"
                        class="d-flex align-center"
                        height="56"
                        @click="toggle"
                      />
                    </VItem>
                  </VCol>
                </VRow>
              </VItemGroup>
            </VCol>
          </VRow>
        </VExpansionPanelContent>
      </VExpansionPanel>
    </VExpansionPanels>

    <DialogActivator
      v-model="dialog"
      label-activator="Add more skill"
      width="500"
      class-btn="mt-5"
    >
      <template>
        <FormSkillChoices :close-dialog="() => {this.dialog = false}" />
      </template>
    </DialogActivator>
  </VSheet>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import { mapMultiRowFields, mapFields } from 'vuex-map-fields';
import { levelSkillColor } from "~/utils/utils";
export default {
  data: () => ({
    dialog: false,
    switchModel: false,
    itemGroupModel: [],
    listChipModel: [],
    listLevelSkill: levelSkillColor,
    levelColorActive: "gray",
  }),
  computed: {
    ...mapMultiRowFields("form", ["skillList"]),
    ...mapFields("form", ["skillChoices"])
  },
  methods: {
    onSkillSelect(values) {
      this.$store.commit("form/setSkillListDirty", values);
    }
  }
}
</script>
