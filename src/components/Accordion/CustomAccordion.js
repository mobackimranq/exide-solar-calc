import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function CustomAccordion({ children, summary, startIcon }) {
  return (
    <div>
      <Accordion elevation={3} className="form-card my-2">
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div className="d-flex align-items-center">
            {startIcon}
            <Typography variant="h6">{summary}</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </div>
  );
}
