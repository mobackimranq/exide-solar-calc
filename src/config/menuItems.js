import React from "react";
import {
  Dashboard as DashboardIcon,
  GetApp,
  InfoOutlined,
  Language as LanguageIcon,
  SettingsApplications as SettingsIcon,
  Style as StyleIcon,
} from "@material-ui/icons";

import allLocales from "./locales";
import allThemes from "./themes";

const getMenuItems = (props) => {
  const { intl, updateLocale, locale, themeContext, a2HSContext } = props;

  const { themeID, setThemeID } = themeContext;

  const { isAppInstallable, isAppInstalled, deferredPrompt } = a2HSContext;

  const localeItems = allLocales.map((l) => {
    return {
      value: undefined,
      visible: true,
      primaryText: intl.formatMessage({ id: l.locale }),
      onClick: () => {
        updateLocale(l.locale);
      },
      leftIcon: <LanguageIcon />,
    };
  });

  const themeItems = allThemes.map((t) => {
    return {
      value: undefined,
      visible: true,
      primaryText: intl.formatMessage({ id: t.id }),
      onClick: () => {
        setThemeID(t.id);
      },
      leftIcon: <StyleIcon style={{ color: t.color }} />,
    };
  });

  return [
    {
      value: "/home",
      visible: true,
      primaryText: intl.formatMessage({ id: "home" }),
      leftIcon: <DashboardIcon />,
    },

    {
      value: "/about",
      visible: true,
      primaryText: intl.formatMessage({ id: "about" }),
      leftIcon: <InfoOutlined />,
    },
    { divider: true },
    {
      primaryText: intl.formatMessage({ id: "settings" }),
      primaryTogglesNestedList: true,
      leftIcon: <SettingsIcon />,
      nestedItems: [
        {
          primaryText: intl.formatMessage({ id: "theme" }),
          secondaryText: intl.formatMessage({ id: themeID }),
          primaryTogglesNestedList: true,
          leftIcon: <StyleIcon />,
          nestedItems: themeItems,
        },
        {
          primaryText: intl.formatMessage({ id: "language" }),
          secondaryText: intl.formatMessage({ id: locale }),
          primaryTogglesNestedList: true,
          leftIcon: <LanguageIcon />,
          nestedItems: localeItems,
        },
      ],
    },
    {
      value: null,
      visible: isAppInstallable && !isAppInstalled,
      onClick: () => {
        deferredPrompt.prompt();
      },
      primaryText: intl.formatMessage({
        id: "install",
        defaultMessage: "Install",
      }),
      leftIcon: <GetApp />,
    },
  ];
};
export default getMenuItems;
