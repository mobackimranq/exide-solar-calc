import React from "react";
import { Divider, List } from "@material-ui/core";
import {
  DeviceHub,
  House,
  Kitchen,
  LocalCafe,
  Toys,
  Tv,
  WbIncandescent,
} from "@material-ui/icons";
import CustomAccordian from "../components/Accordion/CustomAccordion";
import appliances from "../raw-data/appliances.json";
import CustomAccordionListItem from "components/ListItem/CustomAccordionListItem";

class Appliances extends React.Component {
  state = { loadObject: {} };
  render() {
    const { loadObject } = this.state;

    const keys = Object.keys(appliances);

    return keys.map((key, i) => {
      const handleLoadChange = (item) => {
        if (!item.load) {
          if (loadObject[key]) {
            delete loadObject[key][item.name];
            if (!Object.keys(loadObject[key]).length) {
              delete loadObject[key];
            }
          }
        } else {
          if (!loadObject[key]) {
            loadObject[key] = {};
          }
          loadObject[key][item.name] = item;
        }
        this.props.onUpdate(loadObject);
        this.setState({ loadObject });
      };

      return (
        <CustomAccordian
          key={i}
          startIcon={(() => {
            const props = { className: "mx-2", color: "primary" };
            switch (key) {
              case "Lights":
                return <WbIncandescent {...props} />;
              case "Fans":
                return <Toys {...props} />;
              case "Refrigeration":
                return <Kitchen {...props} />;
              case "Kitchen Appliances":
                return <LocalCafe {...props} />;
              case "Electronic Gadgets":
                return <Tv {...props} />;
              case "Household Appliances":
                return <House {...props} />;
              default:
                return <DeviceHub {...props} />;
            }
          })()}
          summary={key}
        >
          <List style={{ width: "100%" }}>
            {appliances[key].map(({ name, oPower }, index) => {
              //get item state from object as being unmounted at "accordion close"
              const applianceTypeObj = loadObject[key];
              const itemObj =
                (applianceTypeObj && applianceTypeObj[name]) || {};
              return (
                <React.Fragment key={index}>
                  <CustomAccordionListItem
                    onChange={handleLoadChange}
                    itemObject={{ name, oPower, ...itemObj }}
                  />

                  <Divider />
                </React.Fragment>
              );
            })}
          </List>
        </CustomAccordian>
      );
    });
  }
}

export default Appliances;
