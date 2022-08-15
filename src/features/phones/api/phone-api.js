import allPhoneDetails from "features/phones/assets/details";
import { getAvgRatings } from "../utils";

export const findPhoneByKeyword = (keyword) => {
  return new Promise((resolve) => {
    const trimmedKeyword = keyword.trim().toLowerCase();
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

export const getRecommendedPhones = async (fromPhoneId) => {
  const trimmedId = fromPhoneId.trim();

  const phoneDetails = allPhoneDetails.find((phone) => phone.id === trimmedId);

  if (!phoneDetails.recommendations) {
    return [];
  }

  return phoneDetails.recommendations
    .map((id) => {
      const recommendedItemDetails = allPhoneDetails.find(
        (phone) => phone.id === id
      );

      if (!recommendedItemDetails) return null;

      const pushSale = phoneDetails.pushSales
        ? phoneDetails.pushSales.find(
            (pushSaleItem) => pushSaleItem.phoneId === id
          )
        : null;

      return {
        phone: recommendedItemDetails,
        pushSale: pushSale ?? null,
      };
    })
    .filter((item) => item != null);
};

export const findPhoneByFilterBrand = (phoneList, filterOptions) => {
  let result = [];
  filterOptions.forEach((option) => {
    phoneList.forEach((phone) => {
      if (phone.category === option) {
        result.push(phone);
      }
    });
  });

  return result;
};

function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i] === obj) {
      return true;
    }
  }
  return false;
}

export const findPhoneByFilterMemory = (phoneList, filterOptions) => {
  let result = [];
  filterOptions.forEach((option) => {
    if (option === "below4gb") {
      phoneList.forEach((phone) => {
        phone.memory.forEach((phoneMemory) => {
          if (phoneMemory <= 4) {
            if (!containsObject(phone, result)) {
              result.push(phone);
            }
          }
        });
      });
    } else if (option === "from128gb") {
      phoneList.forEach((phone) => {
        phone.memory.forEach((phoneMemory) => {
          if (phoneMemory === 128) {
            if (!containsObject(phone, result)) {
              result.push(phone);
            }
          }
        });
      });
    } else if (option === "from16gb") {
      phoneList.forEach((phone) => {
        phone.memory.forEach((phoneMemory) => {
          if (phoneMemory === 16) {
            if (!containsObject(phone, result)) {
              result.push(phone);
            }
          }
        });
      });
    } else if (option === "from256gb") {
      phoneList.forEach((phone) => {
        phone.memory.forEach((phoneMemory) => {
          if (phoneMemory === 256) {
            if (!containsObject(phone, result)) {
              result.push(phone);
            }
          }
        });
      });
    } else if (option === "from32gb") {
      phoneList.forEach((phone) => {
        phone.memory.forEach((phoneMemory) => {
          if (phoneMemory === 32) {
            if (!containsObject(phone, result)) {
              result.push(phone);
            }
          }
        });
      });
    } else if (option === "from512gbOrAbove") {
      phoneList.forEach((phone) => {
        phone.memory.forEach((phoneMemory) => {
          if (phoneMemory >= 512) {
            if (!containsObject(phone, result)) {
              result.push(phone);
            }
          }
        });
      });
    } else if (option === "from8gb") {
      phoneList.forEach((phone) => {
        phone.memory.forEach((phoneMemory) => {
          if (phoneMemory === 8) {
            if (!containsObject(phone, result)) {
              result.push(phone);
            }
          }
        });
      });
    }
  });
  return result;
};

export const findPhoneByFilterRam = (phoneList, filterOptions) => {
  let result = [];
  filterOptions.forEach((option) => {
    if (option === "above16gb") {
      phoneList.forEach((phone) => {
        phone.ram.forEach((phoneRam) => {
          if (phoneRam >= 16) {
            if (!containsObject(phone, result)) {
              result.push(phone);
            }
          }
        });
      });
    } else if (option === "below1gb") {
      phoneList.forEach((phone) => {
        phone.ram.forEach((phoneRam) => {
          if (phoneRam <= 1) {
            if (!containsObject(phone, result)) {
              result.push(phone);
            }
          }
        });
      });
    } else if (option === "from12gbTo16gb") {
      phoneList.forEach((phone) => {
        phone.ram.forEach((phoneRam) => {
          if (phoneRam >= 12 && phoneRam < 16) {
            if (!containsObject(phone, result)) {
              result.push(phone);
            }
          }
        });
      });
    } else if (option === "from1gbTo2gb") {
      phoneList.forEach((phone) => {
        phone.ram.forEach((phoneRam) => {
          if (phoneRam >= 1 && phoneRam < 2) {
            if (!containsObject(phone, result)) {
              result.push(phone);
            }
          }
        });
      });
    } else if (option === "from2gbTo4gb") {
      phoneList.forEach((phone) => {
        phone.ram.forEach((phoneRam) => {
          if (phoneRam >= 2 && phoneRam < 4) {
            if (!containsObject(phone, result)) {
              result.push(phone);
            }
          }
        });
      });
    } else if (option === "from4gbTo6gb") {
      phoneList.forEach((phone) => {
        phone.ram.forEach((phoneRam) => {
          if (phoneRam >= 4 && phoneRam < 6) {
            if (!containsObject(phone, result)) {
              result.push(phone);
            }
          }
        });
      });
    } else if (option === "from8gbTo12gb") {
      phoneList.forEach((phone) => {
        phone.ram.forEach((phoneRam) => {
          if (phoneRam >= 8 && phoneRam < 12) {
            if (!containsObject(phone, result)) {
              result.push(phone);
            }
          }
        });
      });
    }
  });
  return result;
};

export const findPhoneByFilterRatings = (phoneList, filterOptions) => {
  let result = [];
  filterOptions.forEach((option) => {
    if (option === "from3Stars") {
      phoneList.forEach((phone) => {
        if (getAvgRatings(phone.comments) >= 3) {
          if (!containsObject(phone, result)) {
            result.push(phone);
          }
        }
      });
    } else if (option === "from4Stars") {
      phoneList.forEach((phone) => {
        if (getAvgRatings(phone.comments) >= 4) {
          if (!containsObject(phone, result)) {
            result.push(phone);
          }
        }
      });
    } else if (option === "from5Stars") {
      phoneList.forEach((phone) => {
        if (getAvgRatings(phone.comments) >= 5) {
          if (!containsObject(phone, result)) {
            result.push(phone);
          }
        }
      });
    }
  });
  return result;
};

export const findPhoneByFilterScreenSize = (phoneList, filterOptions) => {
  let result = [];
  filterOptions.forEach((option) => {
    if (option === "above7") {
      phoneList.forEach((phone) => {
        phone.screenSize.forEach((phoneScreenSize) => {
          if (phoneScreenSize >= 7) {
            if (!containsObject(phone, result)) {
              result.push(phone);
            }
          }
        });
      });
    } else if (option === "below4") {
      phoneList.forEach((phone) => {
        phone.screenSize.forEach((phoneScreenSize) => {
          if (phoneScreenSize < 4) {
            if (!containsObject(phone, result)) {
              result.push(phone);
            }
          }
        });
      });
    } else if (option === "from4To49") {
      phoneList.forEach((phone) => {
        phone.screenSize.forEach((phoneScreenSize) => {
          if (phoneScreenSize >= 4 && phoneScreenSize < 5) {
            if (!containsObject(phone, result)) {
              result.push(phone);
            }
          }
        });
      });
    } else if (option === "from5To59") {
      phoneList.forEach((phone) => {
        phone.screenSize.forEach((phoneScreenSize) => {
          if (phoneScreenSize >= 5 && phoneScreenSize < 6) {
            if (!containsObject(phone, result)) {
              result.push(phone);
            }
          }
        });
      });
    } else if (option === "from6To69") {
      phoneList.forEach((phone) => {
        phone.screenSize.forEach((phoneScreenSize) => {
          if (phoneScreenSize >= 6 && phoneScreenSize < 7) {
            if (!containsObject(phone, result)) {
              result.push(phone);
            }
          }
        });
      });
    }
  });
  return result;
};

export const findPhoneByPriceRange = (phoneList, priceRange) => {
  let result = [];
  phoneList.forEach((phone) => {
    //get phone's lowest price
    var lowestPrice = phone.versions[0].salePrice;
    phone.versions.forEach((ver) => {
      if (ver.salePrice < lowestPrice) {
        lowestPrice = ver.salePrice;
      }
    });

    if (lowestPrice >= priceRange[0] && lowestPrice <= priceRange[1]) {
      if (!containsObject(phone, result)) {
        result.push(phone);
      }
    }
  });

  return result;
};

function compareName(phone1, phone2) {
  if (phone1.name.toLowerCase() < phone2.name.toLowerCase()) {
    return -1;
  }
  if (phone1.name.toLowerCase() > phone2.name.toLowerCase()) {
    return 1;
  }
  return 0;
}

function comparePrice(phone1, phone2) {
  //get phone1's lowest price
  var lowestPrice1 = phone1.versions[0].salePrice;
  phone1.versions.forEach((ver) => {
    if (ver.salePrice < lowestPrice1) {
      lowestPrice1 = ver.salePrice;
    }
  });

  //get phone2's lowest price
  var lowestPrice2 = phone2.versions[0].salePrice;
  phone2.versions.forEach((ver) => {
    if (ver.salePrice < lowestPrice2) {
      lowestPrice2 = ver.salePrice;
    }
  });
  if (lowestPrice1 > lowestPrice2) {
    return -1;
  }
  if (lowestPrice1 < lowestPrice2) {
    return 1;
  }
  return 0;
}

export const findPhoneAndFilter = async (keyword, filterOptions, sortBy) => {
  // console.log(sortBy);

  await new Promise((resolve) => setTimeout(resolve, 900));

  //search
  let result = await findPhoneByKeyword(keyword);

  //filter
  const brandFilterOptions = Object.entries(filterOptions.brand)
    .filter(([, value]) => value)
    .map(([key]) => key);
  const memoryFilterOptions = Object.entries(filterOptions.memory)
    .filter(([, value]) => value)
    .map(([key]) => key);
  const ramFilterOptions = Object.entries(filterOptions.ram)
    .filter(([, value]) => value)
    .map(([key]) => key);
  const ratingsFilterOptions = Object.entries(filterOptions.ratings)
    .filter(([, value]) => value)
    .map(([key]) => key);
  const screenSizeFilterOptions = Object.entries(filterOptions.screenSize)
    .filter(([, value]) => value)
    .map(([key]) => key);

  if (brandFilterOptions.length > 0) {
    result = findPhoneByFilterBrand(result, brandFilterOptions);
  }
  if (memoryFilterOptions.length > 0) {
    result = findPhoneByFilterMemory(result, memoryFilterOptions);
  }
  if (ramFilterOptions.length > 0) {
    result = findPhoneByFilterRam(result, ramFilterOptions);
  }
  if (ratingsFilterOptions.length > 0) {
    result = findPhoneByFilterRatings(result, ratingsFilterOptions);
  }
  if (screenSizeFilterOptions.length > 0) {
    result = findPhoneByFilterScreenSize(result, screenSizeFilterOptions);
  }
  result = findPhoneByPriceRange(result, filterOptions.priceRange);

  //sort
  if (sortBy === "NAME_ASC") {
    result.sort(compareName);
  } else if (sortBy === "NAME_DESC") {
    result.sort(compareName);
    result = result.reverse();
  } else if (sortBy === "PRICE_DESC") {
    result.sort(comparePrice);
  } else if (sortBy === "PRICE_ASC") {
    result.sort(comparePrice);
    result = result.reverse();
  }

  return result;
};
