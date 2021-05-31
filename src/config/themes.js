import red from "@material-ui/core/colors/red";
import pink from "@material-ui/core/colors/pink";
import green from "@material-ui/core/colors/green";
import purple from "@material-ui/core/colors/deepPurple";
import orange from "@material-ui/core/colors/deepOrange";
import grey from "@material-ui/core/colors/grey";

const themes = [
  {
    id: "default",
    name: "Default",
  },
  {
    id: "red",
    name: "Red",

    color: red[500],
    source: {
      palette: {
        primary: red,
        secondary: purple,
        error: red,
      },
    },
  },
  {
    id: "green",
    name: "Green",

    color: green[500],
    source: {
      palette: {
        primary: green,
        secondary: red,
        error: red,
      },
    },
  },
  {
    id: "purple",
    name: "Purple",

    color: purple[500],
    source: {
      palette: {
        primary: purple,
        secondary: orange,
        error: red,
      },
    },
  },
  {
    id: "orange",
    name: "Orange",

    color: orange[500],
    source: {
      palette: {
        primary: orange,
        secondary: red,
        error: red,
      },
    },
  },
  {
    id: "grey",
    name: "Grey",

    color: grey[500],
    source: {
      palette: {
        primary: grey,
        secondary: pink,
        error: red,
      },
    },
  },
];

export default themes;
