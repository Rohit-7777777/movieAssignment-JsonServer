import api from "../api/movieData";
import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
const dataSlice = createSlice({
  name: "list",
  initialState: { items: [], toggle: true },
  reducers: {
    preserveList(state, action) {
      state.items = action.payload || [];
    },
    addData(state, action) {
      const movieData = action.payload;
      state.items.push(movieData);
    },
    removeData(state, action) {
      const dataId = action.payload;
      state.items = state.items.filter((ele) => {
        return dataId !== ele.id;
      });
    },
    manipulateToggle(state, action) {
      state.toggle = action.payload;
    },
    editData(state, action) {
      state.items = action.payload;
    },
  },
});
const store = configureStore({
  reducer: dataSlice.reducer,
});

//fetching data from json-server
export const fetchingData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await api.get("/movieData");

      dispatch(dataActions.preserveList(response.data));
    };
    try {
      await fetchData();
    } catch (error) {
      console.log(error);
    }
  };
};

//Sending data to json-server
export const sendData = (data) => {
  return async () => {
    const response = await api.post("./movieData", data);
    return response;
  };
};
//Deleting data from json server
export const deleteData = (id) => {
  return async () => {
    const response = await api.delete(`./movieData/${id}`);
    return response;
  };
};
//updating data in json-server
export const updateData = (data) => {
  return async () => {
    const response = await api.put(`./movieData/${data.id}`, { ...data, data });
    return response;
  };
};

export const dataActions = dataSlice.actions;

export default store;
