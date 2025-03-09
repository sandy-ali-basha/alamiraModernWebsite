

// ** MUI Imports
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// ** Icon Imports
import Icon from "components/modules/icon";
import { Avatar, Chip } from "@mui/material";
import { Link } from "react-router-dom";

// ** Custom Components Imports

// Styled Box component
const StyledBox1 = styled(Box)(({ theme }) => ({
  display: "flex",
  borderRadius: "0px",
  alignItems: "center",
  flexDirection: "column",
  padding: theme.spacing(6),
  backgroundColor: theme.palette.action.hover,
}));

// Styled Box component
const StyledBox2 = styled(Box)(({ theme }) => ({
  display: "flex",
  borderRadius: "0px",
  alignItems: "center",
  flexDirection: "column",
  padding: theme.spacing(6),
  backgroundColor: theme.palette.action.hover,
}));

const FaqFooter = () => {
  return (
    <Box sx={{ mt: 13, textAlign: "center" }}>
      <Chip
        rounded
        size="small"
        skin="light"
        color="primary"
        label="Question"
      />
      <Typography variant="h4" sx={{ my: 2 }}>
        You still have a question?
      </Typography>
      <Typography sx={{ mb: 6, color: "text.secondary" }}>
        If you cannot find a question in our FAQ, you can always contact us. We
        will answer to you shortly!
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <StyledBox1>
            <Avatar
              skin="light"
              variant="rounded"
              sx={{ mb: 2.5, height: 38, width: 38 }}
            >
              <Icon fontSize="1.75rem" icon="tabler:phone" />
            </Avatar>
            <Typography
              href="/"
              variant="h4"
              component={Link}
              onClick={(e) => e.preventDefault()}
              sx={{
                mb: 2.5,
                textDecoration: "none",
                "&:hover": { color: "primary.main" },
              }}
            >
              + (810) 2548 2568
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              We are always happy to help!
            </Typography>
          </StyledBox1>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledBox2>
            <Avatar
              skin="light"
              variant="rounded"
              sx={{ mb: 2.5, height: 38, width: 38 }}
            >
              <Icon fontSize="1.75rem" icon="tabler:mail" />
            </Avatar>
            <Typography
              href="/"
              variant="h4"
              component={Link}
              onClick={(e) => e.preventDefault()}
              sx={{
                mb: 2.5,
                textDecoration: "none",
                "&:hover": { color: "primary.main" },
              }}
            >
              hello@help.com
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Best way to get answer faster!
            </Typography>
          </StyledBox2>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FaqFooter;
