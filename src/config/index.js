import { lazy } from "react";
// import locales from './locales'
import routes from "./routes";
import themes from "./themes";

const config = {
  auth: {
    signInURL: "/signin",
  },
  locale: {
    locales: [],
  },
  routes,

  menu: {
    MenuContent: lazy(() => import("../components/Menu/MenuContent")),
  },
  theme: {
    themes,
    defaultThemeID: "default",
    defaultIsDarkMode: false,
  },
  pages: {
    LandingPage: lazy(() => import("../pages/LandingPage/LandingPage")),
    PageNotFound: lazy(() => import("../pages/PageNotFound/PageNotFound")),
  },
};

export default config;
