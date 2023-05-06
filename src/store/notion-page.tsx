import { createSlice } from "@reduxjs/toolkit";

export const notionSiteSlice = createSlice({
  name: "notionSite",
  initialState: {
    siteData: false,
  },
  reducers: {
    setSiteData: (state, action) => {
      state.siteData = action.payload;
    },
  },
});

export const { setSiteData } = notionSiteSlice.actions;
export const getNotionSlice = {
  siteData: (state: any) => state.notionSlice.siteData,
};
export default notionSiteSlice.reducer;
