import { GlobalRouter } from "./routes";
import { HelmetProvider } from "react-helmet-async";
import { ThemeConfig } from "features/misc";
import { AuthProvider } from "features/auth";
import { CartContextProvider } from "features/cart/context/CartContext";

function App() {
  return (
    <AuthProvider>
      <HelmetProvider>
        <CartContextProvider>
          <ThemeConfig>
            <GlobalRouter />
          </ThemeConfig>
        </CartContextProvider>
      </HelmetProvider>
    </AuthProvider>
  );
}

export default App;
