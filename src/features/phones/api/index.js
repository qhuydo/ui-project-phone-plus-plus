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
