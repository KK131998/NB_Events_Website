import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "./styles/index.css";
import App from "./App";

const theme = createTheme({
  primaryColor: "orange",
  defaultRadius: "lg",
  fontFamily: "Outfit, system-ui, sans-serif",
  headings: {
    fontFamily: "Outfit, system-ui, sans-serif",
    fontWeight: "700",
  },
  colors: {
    dark: [
      "#E7E5E0",
      "#C9C4BC",
      "#A8A29A",
      "#78716C",
      "#57534E",
      "#3F3A36",
      "#2A2622",
      "#1A1714",
      "#141210",
      "#0C0A09",
    ],
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>,
);
