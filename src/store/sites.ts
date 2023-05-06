import { createSlice } from "@reduxjs/toolkit";

export const siteSlice = createSlice({
  name: "sites",
  initialState: false,
  reducers: {
    setSites: (state, action) => {
      state = action.payload;
    },
  },
});

export const { setSites } = siteSlice.actions;
export const getSites = {
  list: (state: any) => state.sites.data,
};
export default siteSlice.reducer;
