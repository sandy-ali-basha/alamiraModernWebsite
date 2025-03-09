import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#630661", // Main accent color
      red: "#441f3e",
      light: "#8b468a",
    },
    secondary: {
      main: "#36332F", // Supporting secondary color
    },
    background: {
      default: "#FDFDFC", // Default page background
      paper: "#FFF", // Card or container background
    },
    text: {
      primary: "#2E2E2E", // Main text color
      secondary: "#999999", // Muted text color
      disabled: "#d1d1d1", // Disabled text color
      white: "#FDFDFC",
    },
    grey: {
      100: "#F7F7F7",
      200: "#EFEFEF",
      300: "#d1d1d1",
      400: "#999999",
      800: "#3A3A3A",
    },
    error: {
      main: "#630661", // Accent color for errors
    },
    success: {
      main: "#4dc463", // Light blue to indicate success
    },
    info: {
      main: "#4A4A4A", // Swiper theme color for informational highlights
    },
    warning: {
      main: "#36332F", // Use a dark shade for warnings
    },
  },
  typography: {
    fontFamily: ["Mulish", "Beiruti", "sans-serif"].join(","),
    h1: {
      fontWeight: 600,
      color: "#2E2E2E", // Ensures headers match your design
    },
    h2: {
      fontWeight: 600,
      color: "#2E2E2E",
    },
    h3: {
      fontWeight: 600,
      color: "#2E2E2E",
    },
    body1: {
      color: "#2E2E2E",
    },
    body2: {
      color: "#999999",
    },
  },
  components: {
    MuiTabs: {
      styleOverrides: {
        root: {
          border: "0 !important",
          "&, & .MuiTabs-scroller": {
            boxSizing: "content-box",
            padding: "10px 10px 16px",
            margin: "-10px -10px -16px !important",
          },
          "& .MuiTabs-indicator": {
            display: "none",
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minWidth: 65,
          minHeight: 38,
          lineHeight: 1,

          "&:hover": {
            color: "primary.light",
          },
          "&.Mui-selected": {
            color: "#630661 !important",
            border: "1px solid #630661",
            "@media (max-width: 959px)": {
              border: "none", // Remove border on mobile
            },
          },
          "@media (min-width: 960px)": {
            minWidth: 130,
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "uppercase",
          color: "#2E2E2E",
          borderRadius: "0px",
          borderColor: "#2E2E2E",
          "&:hover": {
            color: "primary.main",
          },
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          "&.Mui-active": {
            color: "#630661", // Red color for active step
            fontWeight: "bold",
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          background: "none",
          borderBottom: "1px solid #630661",
          "&:focus": {
            boxShadow: "none",
            borderBottom: "1px solid #630661",
          },
        },
        input: {
          color: "#2E2E2E",
          "&::placeholder": {
            color: "#999999",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          background: "transparent",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "&.Mui-checked": {
            color: "primary.main",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#2E2E2E",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0, // Removes border radius for all outlined inputs
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 0, // Removes border radius for other types of inputs
        },
      },
    },

    MuiStepRoot: {
      styleOverrides: {
        label: {
          "&.Mui-active": {
            color: "primary.main", // Active step label color
            fontWeight: "bold", // Optional: Make it bold for emphasis
          },
        },
      },
    },
  },
});

export default theme;
