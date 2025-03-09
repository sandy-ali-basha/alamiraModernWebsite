import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Tab,
  Box,
  Grid,
  Typography,
  CircularProgress,
  Card,
  Container,
  useMediaQuery,
  styled,
} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import MuiTabList from "@mui/lab/TabList";
import TabAccount from "./TabAccount";
import TabBilling from "./TabBilling";
import TabSecurity from "./TabSecurity";
import TabOrders from "./TabOrders";
import TabAddresses from "./TabAddresses";
import { useTranslation } from "react-i18next";

const AccountSettings = ({ tab, apiPricingPlanData }) => {
  const [activeTab, setActiveTab] = useState(tab);
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const navigate = useNavigate();
  const hideText = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const { t } = useTranslation("index");
  const handleChange = (event, value) => {
    setIsLoading(true);
    navigate(`/profile/${value.toLowerCase()}`);
  };

  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [tab, setActiveTab, activeTab]);

  useEffect(() => {
    if (isLoading) {
      setIsLoading(false);
    }
    setIsClient(true);
  }, [activeTab, isLoading]);

  if (!isClient) {
    return null;
  }

  const tabContentList = {
    account: <TabAccount />,
    security: <TabSecurity />,
    billing: <TabBilling apiPricingPlanData={apiPricingPlanData} />,
    orders: <TabOrders />,
    addresses: <TabAddresses />,
  };

  return (
    <Container sx={{ mt: [1, 2, 4] }}>
      <Grid container spacing={[1, 2, 4]}>
        <Grid item xs={12}>
          <TabContext value={activeTab}>
            <Grid container spacing={[1, 2, 4]}>
              <Grid item xs={12}>
                <MuiTabList
                  variant="scrollable"
                  scrollButtons="auto"
                  onChange={handleChange}
                  sx={{display:['none','none','block']}}
                >
                  <Tab
                    value="account"
                    label={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          ...(!hideText && { "& svg": { mr: 1 } }),
                        }}
                      >
                        {!hideText && t("Account")}
                      </Box>
                    }
                  />
                  <Tab
                    value="security"
                    label={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          ...(!hideText && { "& svg": { mr: 1 } }),
                        }}
                      >
                        {!hideText && t("Security")}
                      </Box>
                    }
                  />
                  <Tab
                    value="billing"
                    label={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          ...(!hideText && { "& svg": { mr: 1 } }),
                        }}
                      >
                        {!hideText && t("Billing")}
                      </Box>
                    }
                  />
                  <Tab
                    value="orders"
                    label={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          ...(!hideText && { "& svg": { mr: 1 } }),
                        }}
                      >
                        {!hideText && t("Orders")}
                      </Box>
                    }
                  />
                  <Tab
                    value="addresses"
                    label={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          ...(!hideText && { "& svg": { mr: 1 } }),
                        }}
                      >
                        {!hideText && t("Addresses")}
                      </Box>
                    }
                  />
                </MuiTabList>
              </Grid>
              <Grid item xs={12}>
                {isLoading ? (
                  <Card
                    sx={{
                      mt: 6,
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      height: "50vh",
                      justifyContent: "center",
                      boxShadow: "none",
                    }}
                  >
                    <CircularProgress sx={{ mb: 4 }} />
                    <Typography>{t("Loading...")}</Typography>
                  </Card>
                ) : (
                  <TabPanel sx={{ p: 0, mb: 2 }} value={activeTab}>
                    {tabContentList[activeTab]}
                  </TabPanel>
                )}
              </Grid>
            </Grid>
          </TabContext>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AccountSettings;
