export function getContactDetailsFromUser(user, currentState) {
  if (!user) return currentState;

  const { customerDetails, deliveryDetails, billingDetails } = currentState;

  return {
    ...currentState,
    customerDetails: {
      fullName: user.name || customerDetails.fullName,
      phoneIsoCode: user.phoneIsoCode || customerDetails.phoneIsoCode,
      phoneNumber: user.phoneNumber || customerDetails.phoneNumber,
      email: user.email || customerDetails.email,
    },
    deliveryDetails: {
      ...deliveryDetails,
      provinceId: user.provinceId || deliveryDetails.provinceId,
      districtId: user.districtId || deliveryDetails.districtId,
      communeId: user.communeId || deliveryDetails.communeId,
      street: user.street || deliveryDetails.street,
    },
    billingDetails: {
      ...currentState.billingDetails,
      provinceId: user.provinceId || billingDetails.provinceId,
      districtId: user.districtId || billingDetails.districtId,
      communeId: user.communeId || billingDetails.communeId,
      street: user.street || billingDetails.street,
    },
  };
}
