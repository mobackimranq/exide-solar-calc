import React from "react";
import {
  AccountBox as AccountBoxIcon,
  Dashboard as DashboardIcon,
  ExitToApp as ExitToAppIcon,
  GetApp,
  InfoOutlined,
  Lock as LockIcon,
  PowerInput,
  SettingsApplications as SettingsIcon,
  Style as StyleIcon,
} from "@material-ui/icons";
import Description from "@material-ui/icons/Description";
import allThemes from "./themes";
import { store } from "../store/store";

function clearUserData() {
  store.dispatch({ type: "CLEAR" });
}

function getMenuItems(props) {
  const { menuContext, themeContext, a2HSContext, auth: authData } = props;

  const { isAuthMenuOpen } = menuContext;
  const { themeID, setThemeID } = themeContext;

  const { auth, setAuth } = authData;
  const { isAppInstallable, isAppInstalled, deferredPrompt } = a2HSContext;

  const isAuthorised = auth.isAuthenticated || false;
  const { userType } = auth;

  const themeItems = allThemes.map((t) => {
    return {
      value: undefined,
      visible: true,
      primaryText: t.name,
      onClick: () => {
        setThemeID(t.id);
      },
      leftIcon: <StyleIcon style={{ color: t.color }} />,
    };
  });

  if (isAuthMenuOpen || !isAuthorised) {
    return [
      {
        value: "/my_account",
        primaryText: "My Account",
        visible: isAuthorised && userType !== "admin",
        leftIcon: <AccountBoxIcon />,
      },
      {
        value: "/signin",
        onClick: isAuthorised
          ? () => {
              setAuth({ isAuthenticated: false });
              clearUserData();
            }
          : () => {},
        visible:
          isAuthorised && userType === "customer"
            ? true
            : !isAuthorised
            ? true
            : false,
        primaryText: isAuthorised ? "Sign Out" : "User Sign In",
        leftIcon: isAuthorised ? <ExitToAppIcon /> : <LockIcon />,
      },
      {
        value: "/adminsignin",
        visible:
          isAuthorised && userType === "admin"
            ? true
            : !isAuthorised
            ? true
            : false,
        leftIcon: isAuthorised ? <ExitToAppIcon /> : <LockIcon />,
        primaryText: isAuthorised ? "Admin Sign Out" : "Admin Sign In",

        onClick: isAuthorised
          ? () => {
              setAuth({ isAuthenticated: false });
              clearUserData();
            }
          : () => {},
      },
    ];
  }
  return [
    {
      value: "/home",
      visible: isAuthorised,
      primaryText: "Home",
      leftIcon: <DashboardIcon />,
    },
    {
      value: "/estimation_tool",
      visible: isAuthorised,
      primaryText: "Estimation Tool",
      leftIcon: <PowerInput />,
    },
    {
      value: "/consumer_data",
      visible: userType === "admin",
      primaryText: "Consumer's Data",
      leftIcon: <Description />,
    },
    {
      value: "/about",
      visible: true,
      primaryText: "About",
      leftIcon: <InfoOutlined />,
    },
    { divider: true },
    {
      primaryText: "Settings",
      primaryTogglesNestedList: true,
      leftIcon: <SettingsIcon />,
      nestedItems: [
        {
          primaryText: "Themes",
          secondaryText: themeID,
          primaryTogglesNestedList: true,
          leftIcon: <StyleIcon />,
          nestedItems: themeItems,
        },
      ],
    },
    {
      value: null,
      visible: isAppInstallable && !isAppInstalled,
      onClick: () => {
        deferredPrompt.prompt();
      },
      primaryText: "Install",

      leftIcon: <GetApp />,
    },
  ];
}
export default getMenuItems;
