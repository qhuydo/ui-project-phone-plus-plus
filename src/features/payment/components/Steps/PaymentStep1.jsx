import { PaymentCheckoutSection } from "features/payment/components";
import {
  PaymentContainerGrid,
  InfoGrid,
  CheckoutSectionGrid,
} from "features/payment/components/PaymentGrids";
import { Step1InfoSection } from "features/payment/components/Step1";
import { usePaymentContext } from "features/payment/context";

const PaymentStep1 = () => {
  const {
    state: { cartItems },
  } = usePaymentContext();

  return (
    <PaymentContainerGrid>
      <InfoGrid>
        <Step1InfoSection />
      </InfoGrid>

      <CheckoutSectionGrid>
        <PaymentCheckoutSection cartItems={cartItems} />
      </CheckoutSectionGrid>
    </PaymentContainerGrid>
  );
};

export default PaymentStep1;
