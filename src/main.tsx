import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";              // ← Mantine-Styles laden
import App from "./App";

const theme = createTheme({ primaryColor: "lime", defaultRadius: "md" });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>
);
