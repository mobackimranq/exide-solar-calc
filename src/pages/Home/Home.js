import React, { useState } from "react";
import Scrollbar from "material-ui-shell/lib/components/Scrollbar/Scrollbar";
import { Container } from "@material-ui/core";
import MainInputForm from "pages/Home/slide-screens/MainInputForm";
import CustomSlide from "components/Transition/CustomSlide";
import CalculationResults from "pages/Home/slide-screens/CalculationResults";
import "../../style.css";
import { useHistory } from "react-router-dom";
import CustomPageWithLogo from "components/Page/CustomPageWithLogo";

const HomePage = () => {
  const [showForm, setShowForm] = useState(true);
  const [pressedButton, setPressedButton] = useState("");
  const [showCalculation, setShowCalculation] = useState(false);
  const history = useHistory();

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
        history.push("/estimation_tool");
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
    <CustomPageWithLogo>
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
        </Container>
      </Scrollbar>
    </CustomPageWithLogo>
  );
};
export default HomePage;
