
import { getField, updateField } from 'vuex-map-fields';

export const state = () => ({
});

export const getters = {
  getField
};

export const mutations = {
  updateField
}

export const actions = {
  async handleSubmit({ rootState, commit, dispatch, rootGetters }) {
    const payloadProfile = rootGetters["form/getPayloadProfile"];
    const payloadPhoto = rootGetters["form/getPayloadPhoto"];
    const payloadEmploy = rootGetters["form/getPayloadEmployee"];
    const payloadEducation = rootGetters["form/getPayloadEducation"];
    const payloadSkill = rootGetters["form/getPayloadSkill"];

    try {
      console.log("*** rootGetters", rootGetters)
      const ressCreateProfile = await dispatch("form/postCreateProfile", payloadProfile);
      console.log("*** ressCreateProfile", ressCreateProfile)

      const { profileCode } = ressCreateProfile;
      if (profileCode && payloadPhoto.base64img) {
        console.log("*** payloadPhoto", payloadPhoto)
        const ressUpload = await dispatch("form/postPhotoUpload", {
          profileCode,
          payload: payloadPhoto
        });
        console.log("*** ressUpload", ressUpload)
      }

      const [ressCreateEmploy, ressCreateEducation, ressCreateSkill] = await Promise.all([
        dispatch("form/postCreateEmployee", {
          profileCode,
          payload: payloadEmploy
        }),
        dispatch("form/postCreateEducation", {
          profileCode,
          payload: payloadEducation
        }),
        dispatch("form/postCreateSkill", {
          profileCode,
          payload: payloadSkill
        })
      ]);
    } catch (error) {
      throw error;
    }
  }
}
