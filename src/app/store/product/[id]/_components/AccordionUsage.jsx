import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Loader from "components/modules/Loader";
import { Skeleton } from "@mui/material";

export default function AccordionUsage({ data, isLoading }) {
  return (
    <>
      {isLoading && (
        <>
          <Skeleton width="100%" height={40} />{" "}
          <Skeleton width="80%" height={20} />{" "}
          <Skeleton width="70%" height={20} />{" "}
          <Skeleton width="80%" height={20} />{" "}
        </>
      )}
      {data?.data?.accordions &&
        data?.data?.accordions.map((item, idx) => (
          <Accordion
            style={{ borderRadius: "0px", BoxShadow: "none" }}
            sx={{
              borderRadius: 0,
              my: 1,
              border: 1,
              // "&::before": {
              //   background: "none",
              // },
              BoxShadow: "none",
            }}
            key={idx}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${idx}`}
              id={`panel${idx}`}
              sx={{ borderRadius: 0, BoxShadow: "none" }}
            >
              {item.title}
            </AccordionSummary>
            <AccordionDetails
              sx={{ borderRadius: 0, BoxShadow: "none" }}
              dangerouslySetInnerHTML={{ __html: item.description }}
            ></AccordionDetails>
          </Accordion>
        ))}
    </>
  );
}
