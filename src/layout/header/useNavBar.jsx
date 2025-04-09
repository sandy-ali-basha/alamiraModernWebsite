import { _axios } from "interceptor/http-config";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const useNavBar = () => {
  const { t } = useTranslation("navbar");

  const navigate = useNavigate();

  const settings = [
    {
      id: 2,
      label: t("My account"),
      onClick: () => navigate("/profile/account"),
    },
    {
      id: 3,
      label: t("Change Password"),
      onClick: () => navigate("/profile/security"),
    },
   {
      id: 6,
      label: t("My Orders"),
      onClick: () => navigate("/profile/orders"),
    },
    {
      id: 5,
      label: t("My Addresses"),
      onClick: () => navigate("/profile/addresses"),
    },
    // {
    //   id: 5,
    //   label: t("My Points"),
    //   onClick: () => navigate("/profile/points"),
    // },
    {
      id: 5,
      label: t("Log out"),
      onClick: () => {
        localStorage.clear();
        window.location.reload();
      },
    },
  ];

  const pages = [
    { id: "0", onClick: () => navigate("/"), label: t("Home") },
    {
      id: "1",
      onClick: () => navigate("/store"),
      label: t("Products"),
    },
    { id: "2", onClick: () => navigate("/about"), label: t("About Us") },

    { id: "5", onClick: () => navigate("/contact-us"), label: t("Contact Us") },
  ];
  const [nav, setNav] = useState([]);
  useMemo(() => {
    _axios.get(`/navbar`).then((res) => {
      setNav(res?.data);
    });
  }, []);
  return {
    settings,
    pages,
    navigate,
    t,
    nav,
  };
};
