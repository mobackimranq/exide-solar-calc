import Page from "material-ui-shell/lib/containers/Page";
import React, { useState } from "react";
import Scrollbar from "material-ui-shell/lib/components/Scrollbar/Scrollbar";
import { useIntl } from "react-intl";
import { Container } from "@material-ui/core";
import MainInputForm from "slide-screens/MainInputForm";
import CustomSlide from "components/Transition/CustomSlide";
import CalculationResults from "slide-screens/CalculationResults";
import EstimationTool from "slide-screens/EstimationTool";
import "./style.css";

const HomePage = () => {
  const intl = useIntl();
  const [showForm, setShowForm] = useState(true);
  const [pressedButton, setPressedButton] = useState("");
  const [showCalculation, setShowCalculation] = useState(false);
  const [showLoadEstimation, setShowLoadEstimation] = useState(false);

  function handleCalculate() {
    setShowForm(false);
    setPressedButton("calculate");
  }

  function handleOnExited() {
    switch (pressedButton) {
      case "calculate":
        setShowCalculation(true);
        break;
      case "open-estimation-tool":
        setShowLoadEstimation(true);
        break;
      default:
        return;
    }
  }

  function onOpenEstTool() {
    setShowForm(false);
    setPressedButton("open-estimation-tool");
  }

  return (
    <Page pageTitle={intl.formatMessage({ id: "home" })}>
      <Scrollbar className="scrollbar flex-grow-1">
        <Container
          maxWidth="sm"
          className="d-flex flex-column h-100 pt-2"
          id="container"
        >
          <CustomSlide
            direction="right"
            show={showForm}
            onExited={handleOnExited}
            component={
              <MainInputForm
                onCalculate={handleCalculate}
                onOpenEstTool={onOpenEstTool}
              />
            }
          />
          <CustomSlide
            show={showCalculation}
            onExited={() => {
              setShowForm(true);
            }}
            component={
              <CalculationResults onReturn={() => setShowCalculation(false)} />
            }
          />
          <CustomSlide
            show={showLoadEstimation}
            onExited={() => {
              setShowForm(true);
            }}
            component={
              <EstimationTool onReturn={() => setShowLoadEstimation(false)} />
            }
          />
        </Container>
      </Scrollbar>
    </Page>
  );
};
export default HomePage;
