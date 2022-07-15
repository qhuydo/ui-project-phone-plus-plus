import { phones } from "features/phones/assets";
import allPhoneDetails from "features/phones/assets/details";

export const findPhoneByKeyword = (keyword) => {
  return new Promise((resolve) => {
    const trimmedKeyword = keyword.trim();
    resolve(
      phones.filter((phone) =>
        phone.name.toLowerCase().includes(trimmedKeyword)
      )
    );
  });
};

export const getPhoneById = (id) => {
  return new Promise((resolve) => {
    const trimmedId = id.trim();
    const phone = phones.find((phone) => phone.id === trimmedId);
    if (!phone) {
      resolve(null);
      return;
    }

    const phoneDetails = allPhoneDetails.find(
      (phone) => phone.id === trimmedId
    );
    if (!phoneDetails) {
      resolve(null);
      return;
    }
    resolve({
      ...phone,
      ...phoneDetails,
    });
  });
};
