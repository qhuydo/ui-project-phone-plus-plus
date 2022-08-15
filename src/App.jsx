import { AuthProvider } from "features/auth";
import { CartContextProvider } from "features/cart/context/CartContext";
import { ThemeConfig } from "features/misc";
import ErrorFallback from "features/misc/components/ErrorFallback";
import { PaymentContextProvider } from "features/payment/context";
import { GlobalListProvider } from "features/phones/context/GlobalPhoneListContext";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { GlobalRouter } from "./routes";

function App() {
  return (
    <HelmetProvider>
      <ThemeConfig>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <AuthProvider>
            <GlobalListProvider>
              <CartContextProvider>
                <PaymentContextProvider>
                  <GlobalRouter />
                </PaymentContextProvider>
              </CartContextProvider>
            </GlobalListProvider>
          </AuthProvider>
        </ErrorBoundary>
      </ThemeConfig>
    </HelmetProvider>
  );
}

export default App;
