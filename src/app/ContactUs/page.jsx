import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { _contact } from "api/contact/contact";
import * as yup from "yup";
import ButtonLoader from "components/customs/ButtonLoader";
import Swal from "sweetalert2";
import tiktok from "assets/images/icons/tiktok.svg";
import {
  Facebook,
  Instagram,
  Mail,
  WhatsApp,
} from "@mui/icons-material";
export default function ContactUs() {
  const { t } = useTranslation("index");
  const [loading, setLoading] = useState(false);
  let schema = yup.object().shape({
    first_name: yup.string().trim().required(t("first name is required")),
    last_name: yup.string().trim().required(t("last name is required")),
    email: yup.string().trim().email().required(t("email is required")),
    message: yup.string().trim().required(t("message is required")),
  });

  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const { mutate } = useMutation((data) => createPost(data));

  async function createPost(data) {
    setLoading(true);
    try {
      await _contact.post(data);
    } finally {
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      });
      setLoading(false);
    }
  }

  const hanldeCreate = (input) => {
    mutate(input);
    setLoading(true);
  };
  return (
    <Box sx={{ mx: 4 }}>
      <Box sx={{ width: { md: "50%" } }}>
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", my: 4 }}
          color="text.primary"
        >
          {t("We'd Love to Hear From You!")}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {t(
            "Whether you have a question about our products, need help with your order, or just want to say hello, our team is here to assist you!"
          )}
        </Typography>
      </Box>
      <Grid container spacing={4}>
        <Grid item md="6">
          <Box
            sx={{
              p: 2,
              mb: 4,
            }}
          >
            <Box component="form">
              <TextField
                sx={{ width: "-webkit-fill-available", mt: 2, mx: 1 }}
                label={t("First Name")}
                variant="outlined"
                type="text"
                name="first_name"
                {...register("first_name")}
                error={errors?.first_name}
                helperText={errors?.first_name?.message || ""}
              />
              <TextField
                sx={{ width: "-webkit-fill-available", mt: 2, mx: 1 }}
                label={t("Last Name")}
                variant="outlined"
                type="text"
                name="last_name"
                {...register("last_name")}
                error={errors?.last_name}
                helperText={errors?.last_name?.message || ""}
              />

              <TextField
                sx={{ width: "-webkit-fill-available", mt: 2, mx: 1 }}
                label={t("Email Address")}
                variant="outlined"
                type="email"
                name="email"
                {...register("email")}
                error={errors?.email}
                helperText={errors?.email?.message || ""}
              />
              <TextField
                sx={{ width: "-webkit-fill-available", mt: 2, mx: 1 }}
                label={t("Message")}
                variant="outlined"
                multiline
                rows={4}
                name="message" // Should match schema
                {...register("message")} // Should match schema
                error={errors?.message}
                helperText={errors?.message?.message || ""}
              />
              <Box sx={{ textAlign: "center", mt: 4, mx: 1 }}>
                {loading ? (
                  <ButtonLoader
                    variant="outlined"
                    sx={{ mx: "auto", width: "100%" }}
                    type="submit"
                    loading={true}
                    disabled={loading}
                  >
                    {t("Waiting..")}
                  </ButtonLoader>
                ) : (
                  <Button
                    variant="outlined"
                    sx={{ mx: "auto", width: "100%" }}
                    type="submit"
                    disabled={loading}
                    onClick={() => handleSubmit(hanldeCreate)()}
                  >
                    {t("SEND")}
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
          <Typography sx={{ mt: 3 }} variant="caption" color="text.secondary">
            {t("We typically get back to all requests within 24 hours.")}
          </Typography>
          <Typography sx={{ mt: 3, fontWeight: "500" }} variant="body1">
            {t("Our Contact Info")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              my: 2,
              gap: 1,
              color: "text.main",
            }}
          >
            <Facebook />
            <Link
              style={{ color: "initial", textDecoration: "none" }}
              href="https://www.facebook.com/profile.php?id=61552729317851"
              aria-label="facebook"
            >
              Facebook
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              my: 2,
              gap: 1,
              color: "text.main",
            }}
          >
            <Instagram />
            <Link
              style={{ color: "initial", textDecoration: "none" }}
              href="https://www.instagram.com/al_amira_modern?igsh=MXN4bmRuc3k0OGJ2dA=="
              aria-label="instagram"
            >
              Instagram
            </Link>
          </Box>
          
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              my: 2,
              gap: 1,
              color: "text.main",
            }}
          >
            <WhatsApp />
            <Link
              style={{ color: "initial", textDecoration: "none" }}
              href="https://wa.me/"
              aria-label="whatsapp"
              target="_blank" // Opens in a new tab
              rel="noopener noreferrer" // Enhances security when opening in a new tab
            >
              +90 553 808 0000
            </Link>{" "}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              my: 2,
              gap: 1,
              color: "text.main",
            }}
          >
            <img src={tiktok} style={{width:'20px'}} alt="tiktok" />
            <Link
              style={{ color: "initial", textDecoration: "none" }}
              href="https://www.tiktok.com/@alamira_moderne?_t=ZN-8uLQiUZtALW&_r=1"
              aria-label="whatsapp"
              target="_blank" // Opens in a new tab
              rel="noopener noreferrer" // Enhances security when opening in a new tab
            >
              TikTok
            </Link>{" "}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              my: 2,
              gap: 1,
              color: "text.main",
            }}
          >
            <Mail />
            <Link
              style={{ color: "initial", textDecoration: "none" }}
              href="mailto:online@ALAMIRAjewelry.com" // Correct mailto URL
              aria-label="Email"
            >
              info@alamira-moderne.com
            </Link>{" "}
          </Box>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            alignItems: "start",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
          item
          md="6"
        >
          <Box sx={{ width: { md: "100%", sm: "90vw" } }}>
        
            <iframe
              style={{
                border: "0",
                borderRadius: "0px",
                width: "100%",
                height: "70vh",
              }}
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11430001.697815737!2d13.166490820076874!3d45.62013327354295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd54a02933785731%3A0x6bfd3f96c747d9f7!2z2YHYsdmG2LPYpw!5e0!3m2!1sar!2seg!4v1741174875471!5m2!1sar!2seg"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>


            {/* <Typography variant="body1" color="initial">
              ALAMIRA <br />
              İnci Sokak, No:340, Yenibosna Merkez, Istanbul, Turkey
            </Typography> */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
