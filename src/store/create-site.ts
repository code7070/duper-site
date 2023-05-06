import { createSlice } from "@reduxjs/toolkit";

export const createSiteSlice = createSlice({
  name: "createSite",
  initialState: {
    step: 1,
    dataStep1: false,
    dataStep2: false,
    dataStep3: false,
  },
  reducers: {
    setStepCreate: (state, action) => {
      state.step = action.payload;
    },
    setCreateStep1: (state, action) => {
      state.dataStep1 = action.payload;
    },
    setCreateStep2: (state, action) => {
      state.dataStep2 = action.payload;
    },
    setCreateStep3: (state, action) => {
      state.dataStep3 = action.payload;
    },
  },
});

export const { setStepCreate, setCreateStep1, setCreateStep2, setCreateStep3 } =
  createSiteSlice.actions;
export const getCreateSite = {
  step: (state: any) => state.createSite.step,
  data1: (state: any) => state.createSite.dataStep1,
  data2: (state: any) => state.createSite.dataStep2,
  data3: (state: any) => state.createSite.dataStep3,
};
export default createSiteSlice.reducer;
