import React, { Component } from "react";
import BaseShellApp from "base-shell/lib";
import MUIConfig from "material-ui-shell/lib";
import merge from "base-shell/lib/utils/config";
import _config from "./config";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./App.css";
import { SnackbarProvider } from "notistack";

const config = merge(MUIConfig, _config);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SnackbarProvider autoHideDuration={100}>
          <BaseShellApp config={config} />
        </SnackbarProvider>
      </Provider>
    );
  }
}
