import { ThemeProvider } from "styled-components";
import { Main } from "./pages/Main";
import GlobalStyle from "./styles/GlobalStyle";
import { theme } from "./styles/theme";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </>
  );
};

export default App;
