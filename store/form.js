import { getField, updateField } from 'vuex-map-fields';
import { genFilename, initSkillChoices, pickObj } from '~/utils/utils';

export const state = () => ({
  personalModel: {
    wantedJobTitle: "Designer",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com",
    phone: "08888888",
    country: "DKI Jakarta",
    city: "Jakarta Selatan",
    address: "Jl. Damai Raya, RT.1/RW.1, Pd. Labu, Kec. Cilandak",
    postalCode: 12450,
    drivingLicense: "123456789",
    nationality: "Indonesia",
    placeOfBirth: "Surabaya",
    dateOfBirth: "1988-12-07",
    summary: "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quis eveniet voluptas alias facere nesciunt repudiandae. Magni, architecto provident? Omnis voluptatem aliquam mollitia animi suscipit ipsa in sunt, ipsum non.</p>",
  },

  photoModel: {
    image: null,
    base64img: null
  },

  employList: [],
  employModel: {
    _id: null,
    jobTitle: "CEO",
    employer: "Toko Lapak",
    startDate: null,
    endDate: null,
    city: "Jakarta",
    description: "CEO",
  },

  educationList: [],
  educationModel: {
    _id: null,
    degree: "21",
    school: "ITB",
    startDate: null,
    endDate: null,
    city: "Bandung",
    description: "ITB",
  },

  skillList: [],
  skillChoices: initSkillChoices,
  skillChoiceModel: null,
});

export const getters = {
  getField,
  /** photo */
  getPayloadPhoto(state) {
    const values = pickObj({ ...state.photoModel }, ["base64img"]);
    return values;
  },

  /** profile */
  getPayloadProfile(state) {
    const values = pickObj({ ...state.personalModel }, [
      "wantedJobTitle",
      "firstName",
      "lastName",
      "email",
      "phone",
      "country",
      "city",
      "address",
      "postalCode",
      "drivingLicense",
      "nationality",
      "placeOfBirth",
      "dateOfBirth"
    ]);
    return values;
  },

  /** employe */
  getEmployeListById: (state) => (_id) => {
    return state.employList.find(item => item._id == _id);
  },
  getPayloadEmployee(state) {
    const values = [...state.employList].map(item => {
      return pickObj(item, [
        "jobTitle",
        "employer",
        "startDate",
        "endDate",
        "city",
        "description",
      ]);
    });
    console.log("*** getPayloadEmploy - values", values)
    return values;
  },

  /** education */
  getEduListById: (state) => (_id) => {
    return state.educationList.find(item => item._id === _id)
  },
  getPayloadEducation(state) {
    const values = [...state.educationList].map(item => {
      return pickObj(item, [
        "degree",
        "school",
        "startDate",
        "endDate",
        "city",
        "description",
      ]);
    });
    console.log("*** getPayloadEducation - values", values)
    return values;
  },

  /** skill */
  getPayloadSkill(state) {
    const values = [...state.skillList].map(item => {
      return pickObj(item, [
        "skill",
        "level"
      ]);
    });
    console.log("*** getPayloadSkill - values", values)
    return values;
  }
};

export const mutations = {
  updateField,
  /** profile */
  resetPersonalModel(state) {
    const personal = state.personalModel;
    for (const [k, v] of Object.entries(personal)) {
      personal[k] = null
    }
  },

  /** employ */
  resetEmployModel(state) {
    const employ = state.employModel;
    employ._id =
    employ.jobTitle =
    employ.employer =
    employ.startDate =
    employ.endDate =
    employ.city =
    employ.description = null
  },
  setEmployList(state, payload) {
    state.employList.push({
      ...payload,
      _id: genFilename()
    });
  },
  updateEmployListById(state, payload) {
    const equalId = (item) => item._id == payload._id;
    const _index = state.employList.findIndex(equalId);
    if (_index !== -1) {
      state.employList[_index] = Object.assign({}, payload);
    }
  },
  deleteEmloyListById(state, _id) {
    const equalId = (item) => item._id == _id;
    const _index = state.employList.findIndex(equalId);
    if (_index !== -1) {
      state.employList.splice(_index, 1);
    }
  },

  /** education */
  resetEduModel(state) {
    const edu = state.educationModel;
    edu._id =
    edu.degree =
    edu.school =
    edu.startDate =
    edu.endDate =
    edu.city =
    edu.description = null
  },
  setEduList(state, payload) {
    console.log("*** payload", payload)
    state.educationList.push({
      ...payload,
      _id: genFilename()
    });
  },
  updateEduListById(state, payload) {
    const equalId = (item) => item._id == payload._id;
    const _index = state.educationList.findIndex(equalId);
    if (_index !== -1) {
      state.educationList[_index] = Object.assign({}, payload);
    }
  },
  deleteEduListById(state, _id) {
    const equalId = (item) => item._id == _id;
    const _index = state.educationList.findIndex(equalId);
    if (_index !== -1) {
      state.educationList.splice(_index, 1);
    }
  },

  /** skill */
  setSkillListDirty(state, payload) {
    if (!payload || !payload.length) {
      state.skillList = [];
      return;
    }

    state.skillList = [];
    for (let item of payload) {
      if (!item) continue;
      state.skillList.push({
        _id: genFilename(),
        skill: item,
        level: null
      });
    }
  },
  setSkillChoices(state, payload) {
    console.log("*** payload", payload)
    state.skillChoices.push(payload);
  }
};

export const actions = {
  /** photo */
  async postPhotoUpload(_, { profileCode, payload }) {
    const response = await this.$http.$post(
      `/api/photo/create/${profileCode}`,
      payload
    );
    return response;
  },

  /** profile */
  async postCreateProfile(_, payload) {
    const response = await this.$http.$post(
      '/api/profile/create',
      payload
    );
    return response;
  },

  async postUpdateProfile(_, { profileCode, payload }) {
    const response = await this.$http.$post(
      `/api/profile/update/${profileCode}`,
      payload
    );
    return response;
  },

  /** employ */
  async postCreateEmployee(_, { profileCode, payload }) {
    const response = await this.$http.$post(
      `/api/employment/create/${profileCode}`,
      payload
    );
    return response;
  },

  /** education */
  async postCreateEducation (_, { profileCode, payload }) {
    const response = await this.$http.$post(
      `/api/education/create/${profileCode}`,
      payload
    );
    return response;
  },

  /** skill */
  async postCreateSkill(_, { profileCode, payload }) {
    const response = await this.$http.$post(
      `/api/skill/create/${profileCode}`,
      payload
    );
    return response;
  }
}
