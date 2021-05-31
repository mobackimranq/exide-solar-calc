import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const LandingPage = () => {
  const history = useHistory();
  useEffect(() => {
    history.replace("/home");
  }, [history]);
  return null;
};
export default LandingPage;
