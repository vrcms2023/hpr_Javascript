import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClientServiceApi } from "../../util/axiosUtil";

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axiosClientServiceApi.post(
        `/api/user/login`,
        { email, password },
        config,
      );

      // store user's token in local storage
      localStorage.setItem("userToken", data.userToken);

      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    { userName, email, password, confirmPassword },
    { rejectWithValue },
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axiosClientServiceApi.post(
        `/api/user/register`,
        { userName, email, password, confirmPassword },
        config,
      );
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
