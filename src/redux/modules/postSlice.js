import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getDataDB = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:5000/post");
      dispatch(setData(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addDataDB = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:5000/post", data);
      console.log(response.data)
      dispatch(addData(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const removeDataDB = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`http://localhost:5000/post/${id}`);
      dispatch(removeData(id));
    } catch (err) {
      console.log(err);
    }
  }
}

export const modifyDataDB = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(`http://localhost:5000/post/${id}`, data);
      dispatch(modifyData({id, data}));
    } catch (err) {
      console.log(err);
    }
  }
}

//Reducer
const postSlice = createSlice({
  name: "post",
  initialState: {
    list: []
  },
  reducers: {
    setData: (state, action) => {
      state.list = action.payload;
    },
    addData: (state, action) => {
      state.list.push(action.payload);
    },
    removeData: (state, action) => {
      state.list = state.list.filter(
        (post) => {
          if (post.id === action.payload) {
            // action.payload => id
            return false;
          } else {
            return true;
          }
        }
      )
    },
    modifyData: (state, action) => {
      state.list = state.list.map(
        (post) => {
          if (post.id === action.payload.id) {
            return {
              ...post, 
              subject: action.payload.data.subject,
              content: action.payload.data.content
            }
          } else {
            return post;
          }
        }
      );
    }
  },
});

export const { setData, addData, removeData, modifyData } = postSlice.actions;
export default postSlice.reducer;
