export function getRefundInfoDetailsFromUser(user, currentState) {
  if (!user) return currentState;

  const {
    fullName,
    email,
    phoneIsoCode,
    phoneNumber,
    provinceId,
    districtId,
    communeId,
    street,
  } = currentState;

  return {
    ...currentState,
    fullName: user.name || fullName,
    email: user.email || email,
    phoneIsoCode: user.phoneIsoCode || phoneIsoCode,
    phoneNumber: user.phoneNumber || phoneNumber,
    provinceId: user.provinceId || provinceId,
    districtId: user.districtId || districtId,
    communeId: user.communeId || communeId,
    street: user.street || street,
  };
}
