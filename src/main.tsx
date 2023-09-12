import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import GlobalStyle from "./styles/GlobalStyle";
import { theme } from "./styles/theme";
import { ThemeProvider } from "styled-components";
import { HttpClientImpl } from "./httpClient/httpClient.ts";
import { API_BASE_URL } from "./constants/api.ts";
import { RegionServiceImpl } from "./services/regionService.ts";
import { RegionProvider } from "./contexts/regionContext.tsx";

if (import.meta.env.DEV === true) {
  const { worker } = await import("./mocks/worker.ts");
  worker.start();
}

const httpClient = new HttpClientImpl(API_BASE_URL);
const regionService = new RegionServiceImpl(httpClient);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <RegionProvider regionService={regionService}>
        <App />
      </RegionProvider>
    </ThemeProvider>
  </React.StrictMode>
);
