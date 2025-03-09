import { Box, Chip, Container, Typography } from "@mui/material";
import { _terms } from "api/terms/terms";
import React from "react";
import { LoaderIcon } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export default function Terms() {
  const params = useParams();
  const { data, isLoading } = useQuery(["terms", params.id], () =>
    _terms.getTerm(params.id).then((res) => res?.data)
  );
  const { t } = useTranslation("index");
  return (
    <Container sx={{ mt: 20, textAlign: "center", my: 3 }}>
      {isLoading ? (
        <Box
          sx={{
            minHeight: "60vh",
            width: "100%",
            py: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoaderIcon style={{ width: "5vw", height: "5vw" }} />
        </Box>
      ) : (
        <Box sx={{ mt: 15 }}>
          <Chip
            sx={{ background: "rgba(194, 238, 252, 1)" }}
            label={data?.name}
          ></Chip>
          <Typography variant="h2" sx={{ fontWeight: "bold", mt: 3 }}>
            {data?.name}
          </Typography>
          <Typography variant="body1" color="initial" sx={{ mt: 3 }}>
            {t(
              "Read our terms below to learn more about your rights as a ALAMIRA user."
            )}
          </Typography>
          <Box sx={{ mt: 6, textAlign: "start" }}>
            <Typography
              variant="body1"
              color="initial"
              sx={{ mt: 3 }}
              dangerouslySetInnerHTML={{ __html: data?.text }}
            ></Typography>
          </Box>
        </Box>
      )}
    </Container>
  );
}
