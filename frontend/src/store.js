import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rectangles: [{
        id: "1",
        x: 50,
        y: 50,
        width: 100,
        height: 200,
        color: "yellow"
      },
      {
        id: "2",
        x: 200,
        y: 100,
        width: 200,
        height: 100,
        color: "green"
      }
    ],
    selectedRectId: null
  },
  mutations: {
    selectedRectId(state, id) {
      state.selectedRectId = id;
    },
    deleteRect(state, id) {
      const deleteIndex = state.rectangles.findIndex(v => v.id === id);
      state.rectangles.splice(deleteIndex, 1);
    }
  },
  actions: {
    createRect() {

    },
    updateRect() {

    },
    async deleteRect({
      commit,
      state
    }) {
      const response = await axios.get("/api/rectangle/schema");
      commit("deleteRect", state.selectedRectId)
    }
  },
  getters: {
    selectedRectId: state => {
      return state.selectedRectId;
    },
    rectangles: state => {
      return state.rectangles;
    },
  }
});