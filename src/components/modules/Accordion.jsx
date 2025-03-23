import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Skeleton,
} from "@mui/material";
import { useQuery } from "react-query";
import { _Attributes } from "api/attributes/attributes";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "i18n";

export default function CAccordion({ data, handleCheked }) {
  const params = useParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    Number(params.attr_id)
  );
  const [selectedValueId, setSelectedValueId] = useState(
    Number(params.attr_value_id)
  );

  useEffect(() => {
    if (params.attr_id) {
      setSelectedCategoryId(Number(params.attr_id));
    }
    if (params.attr_value_id) {
      setSelectedValueId(Number(params.attr_value_id));
    }
  }, [params.attr_id, params.attr_value_id]);

  const { data: AttrValuesData, isLoading: AttrValuesLoading } = useQuery(
    ["_Attributes_values", selectedCategoryId],
    () =>
      _Attributes
        .getAttributeValues(selectedCategoryId)
        .then((res) => res?.data),
    { enabled: !!selectedCategoryId }
  );

  const handleAccordionChange = (id) => (event, isExpanded) => {
    if (isExpanded) {
      setSelectedCategoryId(id);
    } else {
      setSelectedCategoryId(null);
    }
  };

  const handleRadioChange = (event) => {
    setSelectedValueId(Number(event.target.value));
    handleCheked(selectedCategoryId, event.target.value);
  };

  const lang = localStorage.getItem("i18nextLng");

  return (
    <div>
      {data?.product_attributes?.map(
        (item, idx) =>
          item?.section === "Categories" && (
            <Accordion
              key={idx}
              expanded={selectedCategoryId === item.id}
              onChange={handleAccordionChange(item.id)}
              sx={{ boxShadow: "none", background: "transparent" }}
            >
              <AccordionSummary
                expandIcon={
                  <Typography variant="body1" color="initial">
                    {selectedCategoryId === item.id ? "-" : "+"}
                  </Typography>
                }
                aria-controls="panel-content"
                id={item.id.toString()}
              >
                {
                  item?.translations?.find((t) => t.locale === i18n.language)
                    ?.title
                }
              </AccordionSummary>
              {AttrValuesLoading ? (
                <AccordionDetails>
                  <Skeleton width={"80%"} />
                  <Skeleton width={"60%"} />
                </AccordionDetails>
              ) : (
                <AccordionDetails>
                  <RadioGroup
                    value={selectedValueId}
                    onChange={handleRadioChange}
                  >
                    {AttrValuesData?.product_attributes_values?.map(
                      (option, idx) => {
                        return (
                          <>
                            <FormControlLabel
                              sx={{
                                fontSize: 1,
                                borderTop: 1,
                                borderColor: "#e0e0e0",
                              }}
                              key={idx}
                              id={option.id}
                              control={
                                <Radio
                                  sx={{ fontSize: "0.9rem" }}
                                  value={option.id}
                                />
                              }
                              label={
                                <Typography sx={{ fontSize: "0.9rem" }}>
                                  {
                                    option.translations?.find(
                                      (t) => t.locale === lang
                                    )?.value
                                  }
                                </Typography>
                              }
                            />
                          </>
                        );
                      }
                    )}
                  </RadioGroup>
                </AccordionDetails>
              )}
            </Accordion>
          )
      )}
    </div>
  );
}
