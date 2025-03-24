import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Routes, Route, Outlet } from "react-router-dom";
import "./assets/css/style.scss";
import Home from "app/page.jsx";

import LoginPage from "./app/(authentication)/Login/page.jsx";
import About from "./app/about/page.jsx";
import ContactUs from "./app/ContactUs/page.jsx";
import StoreCategoryPage from "./app/store/categories/[category]/page.jsx";
import StoreCheckoutPage from "./app/store/checkout/page.jsx";
import StoreOffersPage from "./app/store/offers/page.jsx";
import StoreProductPage from "./app/store/product/[id]/page.jsx";
import TermsPage from "./app/Terms/page.jsx";
import SignUp from "app/(authentication)/signUp/page.jsx";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";
import ThemeProviderWrapper from "./ThemeProviderWrapper";
import Layout from "layout/Layout";
import Profile from "app/profile/Profile";
import ForgetPassword from "app/(authentication)/forgetPassword/ForgetPassword";
import ResetPassword from "app/(authentication)/forgetPassword/ResetPassword";
import ShouldNotBeLogged from "middlewares/ShouldNotBeLogged";
import NotFound from "components/NotFound";
import ShouldBeLogged from "middlewares/ShouldBeLogged";
import GoogleCallback from "app/(authentication)/Login/GoogleCallback";
import CookieConsent from "components/CookieConsent";
import Categories from "./app/store/categories/page.jsx";

function App() {
  const lang = localStorage.getItem("i18nextLng");
  useEffect(() => {
    HttpRequestInterceptor();
    window.scrollTo(0, 0);
    if (!lang) localStorage.setItem("i18nextLng", "ar");
  }, [lang]);

  return (
    <ThemeProviderWrapper>
      <Helmet>
        <title>AL AMIRA</title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <meta property="og:title" content="" />
        <meta property="og:description" content="" />
        <meta property="og:image" content="URL_of_featured_image" />
        <meta property="og:url" content="https://ALAMIRA.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="" />
        <meta name="twitter:description" content="" />
      </Helmet>
      <CookieConsent />
      <Routes>
        <Route
          path="/profile/:tab"
          element={
            <ShouldBeLogged>
              <Layout>
                <Profile />
              </Layout>
            </ShouldBeLogged>
          }
        />

        <Route path="/auth/google" element={<GoogleCallback />}></Route>

        <Route
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route
            path="/signup"
            element={
              <ShouldNotBeLogged>
                <SignUp />
              </ShouldNotBeLogged>
            }
          />
          <Route
            path="/login"
            element={
              <ShouldNotBeLogged>
                <LoginPage />
              </ShouldNotBeLogged>
            }
          />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/" exact element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/blog" exact element={<BlogPage />} /> */}
          {/* <Route path="/blog/:id" element={<BlogPost />} /> */}
          <Route path="/contact-us" element={<ContactUs />} />
          {/* <Route path="/faq" element={<FAQ />} /> */}
          <Route path="/store" element={<Categories />} />
          {/* <Route path="/store/categories/brand/:id" exact element={<Brand />} /> */}
          <Route
            path="/store/:attr_id/:attr_value_id"
            element={<StoreCategoryPage />}
          />
          <Route path="/store/checkout" element={<StoreCheckoutPage />} />
          <Route path="/store/offers" element={<StoreOffersPage />} />
          <Route
            path="/store/product/:id/:name"
            element={<StoreProductPage />}
          />
          <Route path="/terms/:id" element={<TermsPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProviderWrapper>
  );
}

export default App;
