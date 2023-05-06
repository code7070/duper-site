import { configureStore } from "@reduxjs/toolkit";
import siteSlice from "./sites";
import createSiteSlice from "./create-site";
import notionSlice from "./notion-page";

export const store = configureStore({
  reducer: {
    sites: siteSlice,
    createSite: createSiteSlice,
    notionSlice,
  },
});
