import { Box, Chip, Container, Typography } from "@mui/material";
import React from "react";

export default function PaymentMethods() {
  return (
    <>
      <Container sx={{ mt: 20, textAlign: "center" }}>
        <Chip
          sx={{ background: "rgba(194, 238, 252, 1)" }}
          label="Payment Methods"
        ></Chip>
        <Typography variant="h2" sx={{ fontWeight: "bold", mt: 3 }}>
          Payment Methods
        </Typography>
        <Typography variant="body1" color="initial" sx={{ mt: 3 }}>
          Read our terms below to learn more about your rights and
          responsibilities as a ALAMIRA user.
        </Typography>
        <Box sx={{ mt: 6, textAlign: "start" }}>
          UPDATED MAY 16, 2023 ALAMIRA Holdings Limited (the ALAMIRA jewelry
           ) is comprised of several companies, which together
          provide tools to help the world’s designers to create, develop and
          promote their talents (each a “Service” and collectively, the
          “Services”). The companies within the ALAMIRA Group each act as
          the data controller for personal data processed in respect of their
          Services (each a “Group Company” and together the “Group Companies”)
          and referred to as “our,” “we,” or “us” below. Our Group Companies
          operate the Services, which include websites, software, mobile
          services, and applications. This page explains the terms by which you
          may use our online and/or mobile services, website, and software
          provided on or in connection with the Services. These terms apply to
          all sites to which link to these terms, including, but not limited to,
          ALAMIRA.com, creativemarket.com, fontspring.com,
          fontsquirrel.com, and any subdomains thereof. By using the Services,
          creating an account and checking the "I agree" (or similar) box, or
          otherwise accessing or using the Services, you (1) agree that you have
          read, understood, and agree to be bound by the terms and conditions of
          these Terms of Service (these “Terms”), and (2) also that you have
          read and acknowledge the collection and use of your information as set
          forth in our privacy policy (the "Privacy Policy"), whether or not you
          are a registered user of the Services. Your use of certain Services or
          features of our Services may be subject to additional terms. For
          example, if you purchase a font or other Asset from Creative Market,
          purchase a font from Fontspring, or download a font from Font
          Squirrel, additional license terms for the font or Asset may apply
          (each, a “License”). Similarly, if you make a purchase through the
          Services, an applicable return policy may apply. If you sign up to be
          a seller or affiliate (e.g., on Shop and Partner terms on Creative
          Market or Foundry terms on Fontspring), your use of the Services in
          such a capacity may be subject to additional terms. If you engage in
          sharing content and interact with other users in our community (e.g.,
          posting or commenting on content at ALAMIRA), your conduct may
          be subject to Community Guidelines. We may offer promotions or
          contests through the Services from time to time, and your
          participation in these may also be subject to additional terms. To the
          extent additional terms affect your use of the Service, those terms
          (including, but not limited to, the licenses and Privacy Policy noted
          above) are hereby incorporated by reference into these Terms. These
          Terms apply to all visitors, users, buyers, sellers and others who
          access the Services ("User(s)," or "you," or "your"). If you open an
          account on the Services on behalf of an organization or other entity,
          then (i) "you" includes you and that entity, and (ii) you represent
          and warrant that you are an authorized representative of the entity
          with the authority to bind the entity to these Terms, and that you
          agree to these Terms on the entity’s behalf. PLEASE READ THESE TERMS
          CAREFULLY AND BE SURE YOU UNDERSTAND IT FULLY, BECAUSE IT EXPLAINS AND
          CONTROLS YOUR LEGAL RELATIONSHIP WITH US AND YOUR RIGHTS RELATED TO
          YOUR USE OF THE SERVICE. PLEASE NOTE: SECTION 19 CONTAINS A BINDING
          ARBITRATION CLAUSE AND CLASS ACTION WAIVER. IT AFFECTS YOUR RIGHTS
          ABOUT HOW TO RESOLVE ANY DISPUTE WITH US. PLEASE READ IT CAREFULLY. If
          you have any questions, please don’t hesitate to contact us using our
          Support Form Use of Our Service. The Services provides creative
          communities where Users can share and socialize around content,
          maintain portfolios, search jobs, or connect with job seekers. Our
          services also provide a marketplace where
        </Box>
      </Container>
    </>
  );
}
