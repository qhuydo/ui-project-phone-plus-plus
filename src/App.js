import { GlobalRouter } from "./routes";
import { HelmetProvider } from "react-helmet-async";
import { ThemeConfig } from "./features/misc";

function App() {
  return (
    <HelmetProvider>
      <ThemeConfig>
        <GlobalRouter />
      </ThemeConfig>
    </HelmetProvider>
  );
}

export default App;
