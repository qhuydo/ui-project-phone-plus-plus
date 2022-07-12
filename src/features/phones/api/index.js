import { phones } from "features/phones/assets";

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
