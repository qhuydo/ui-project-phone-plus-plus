import allPhoneDetails from "features/phones/assets/details";

export const findPhoneByKeyword = (keyword) => {
  return new Promise((resolve) => {
    const trimmedKeyword = keyword.trim();
    resolve(
      allPhoneDetails.filter((phone) =>
        phone.name.toLowerCase().includes(trimmedKeyword)
      )
    );
  });
};

export const getPhoneById = (id) => {
  return new Promise((resolve) => {
    const trimmedId = id.trim();
    const phoneDetails = allPhoneDetails.find(
      (phone) => phone.id === trimmedId
    );
    if (!phoneDetails) {
      resolve(null);
      return;
    }
    resolve(phoneDetails);
  });
};

export const getRecommendedPhones = (fromPhoneId) => {
  return new Promise((resolve) => {
    const trimmedId = fromPhoneId.trim();

    const phoneDetails = allPhoneDetails.find(
      (phone) => phone.id === trimmedId
    );

    if (!phoneDetails.recommendations) {
      resolve([]);
      return;
    }

    const list = phoneDetails.recommendations
      .map((id) => {
        const recommendedItemDetails = allPhoneDetails.find(
          (phone) => phone.id === id
        );

        if (!recommendedItemDetails) return null;

        const pushSale = phoneDetails.pushSales.find(
          (pushSaleItem) => pushSaleItem.phoneId === id
        );

        return {
          phone: recommendedItemDetails,
          pushSale: pushSale ?? null,
        };
      })
      .filter((item) => item != null);

    console.log(list);
    resolve(list);
  });
};
