import { GlobalRouter } from "./routes";
import { HelmetProvider } from "react-helmet-async";
import { ThemeConfig } from "features/misc";
import { AuthProvider } from "features/auth";
import { CartContextProvider } from "features/cart/context/CartContext";
import { GlobalListProvider } from "features/phones/context/GlobalPhoneListContext";

function App() {
  return (
    <AuthProvider>
      <HelmetProvider>
        <CartContextProvider>
          <GlobalListProvider>
            <ThemeConfig>
              <GlobalRouter />
            </ThemeConfig>
          </GlobalListProvider>
        </CartContextProvider>
      </HelmetProvider>
    </AuthProvider>
  );
}

export default App;
