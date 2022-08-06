import { AuthProvider } from "features/auth";
import { CartContextProvider } from "features/cart/context/CartContext";
import { ThemeConfig } from "features/misc";
import { PaymentContextProvider } from "features/payment/context";
import { GlobalListProvider } from "features/phones/context/GlobalPhoneListContext";
import { HelmetProvider } from "react-helmet-async";
import { GlobalRouter } from "./routes";

function App() {
  return (
    <AuthProvider>
      <HelmetProvider>
        <CartContextProvider>
          <PaymentContextProvider>
            <GlobalListProvider>
              <ThemeConfig>
                <GlobalRouter />
              </ThemeConfig>
            </GlobalListProvider>
          </PaymentContextProvider>
        </CartContextProvider>
      </HelmetProvider>
    </AuthProvider>
  );
}

export default App;
