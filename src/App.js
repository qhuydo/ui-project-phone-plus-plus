import { GlobalRouter } from "./routes";
import { HelmetProvider } from "react-helmet-async";
import { ThemeConfig } from "features/misc";
import { AuthProvider } from "features/auth";

function App() {
  return (
    <AuthProvider>
      <HelmetProvider>
        <ThemeConfig>
          <GlobalRouter />
        </ThemeConfig>
      </HelmetProvider>
    </AuthProvider>
  );
}

export default App;
