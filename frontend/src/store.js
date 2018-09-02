import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import {
  stat
} from "fs";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rectangles: [],
    selectedRectId: null,
    mode: "normal", // "normal" || "create" || "dnd"
  },
  mutations: {
    setRectangles(state, value) {
      state.rectangles = value;
    },
    goToFront(state, id) {
      const rect = state.rectangles.find(v => v.id === id);
      if (rect) {
        const deleteIndex = state.rectangles.findIndex(v => v.id === id);
        state.rectangles.splice(deleteIndex, 1);
        state.rectangles.push(rect);
      }
    },
    selectedRectId(state, id) {
      state.selectedRectId = id;
    },
    deleteRect(state, id) {
      const deleteIndex = state.rectangles.findIndex(v => v.id === id);
      state.rectangles.splice(deleteIndex, 1);
    },
    mode(state, value) {
      state.mode = value;
    },
    addRectangle(state, rect) {
      state.rectangles.push(rect)
    },
    updateRectCoordinates(state, payload) {
      const rect = state.rectangles.find(v => v.id === payload.id);
      if (rect) {
        rect.x = payload.x;
        rect.y = payload.y;
      }
    }
  },
  actions: {
    async loadRects({
      commit,
      state
    }) {
      const response = await axios.post("/api/rectangle/list");
      if (response.data.responseCode == 0) {
        const rectanlesFromServer = response.data.docs.map((rect) => {
          rect.id = rect._id;
          return rect
        });
        commit("setRectangles", rectanlesFromServer)
      }
    },
    async createRect({
      commit,
      state
    }, rect) {
      const response = await axios.post("/api/rectangle", {
        data: rect
      });
      if (response.data.responseCode === 0) {
        let newRect = JSON.parse(JSON.stringify(rect));
        newRect.id = response.data.doc._id;
        commit("addRectangle", newRect);
      }
    },
    updateRect() {

    },
    async deleteRect({
      commit,
      state
    }) {
      if (!state.selectedRectId) return;
      const response = await axios.delete(`/api/rectangle/${state.selectedRectId}`, {
        "data": {
          "params": {
            "hardDelete": true
          }
        }
      });
      commit("deleteRect", state.selectedRectId);
      commit("selectedRectId", null)
    },
    async updateRectCoordinatesOnServer({
      commit,
      state
    }) {
      const rect = state.rectangles.find(v => v.id === state.selectedRectId);
      if (rect) {
        const response = await axios.put(`/api/rectangle/${state.selectedRectId}`, {
          "data": {
            x: rect.x,
            y: rect.y
          }
        });
      }
    }
  },
  getters: {
    selectedRectId: state => {
      return state.selectedRectId;
    },
    rectangles: state => {
      return state.rectangles;
    },
    mode: state => {
      return state.mode;
    }
  }
});