export async function getDisplayedFieldsFromPhoneDetails(phoneDetails) {
  if (!phoneDetails || !phoneDetails?.length) {
    return [];
  }

  const sections = phoneDetails[0].specs.reduce((map, spec) => {
    map[spec.section] = {};
    return map;
  }, {});
  // console.log(sections)

  for (const phone of phoneDetails) {
    for (const spec of phone.specs) {
      sections[spec.section] = {
        ...sections[spec.section],
        ...Object.entries(spec.data).reduce((map, [key]) => {
          map[key] = true;
          return map;
        }, {}),
      };
    }
  }

  return sections;
}

export async function getDisplayedDataFromPhoneDetails(
  phoneDetails,
  displayedFields
) {
  if (!phoneDetails || !phoneDetails?.length) return {};
  if (!displayedFields) return {};

  const displayedSpecs = Object.entries(displayedFields).reduce(
    (map, [sectionName, sectionSpec]) => {
      map[sectionName] = Object.keys(sectionSpec).reduce(
        (sectionMap, specName) => {
          sectionMap[specName] = [];
          return sectionMap;
        },
        {}
      );
      return map;
    },
    {}
  );

  // console.log(displayedSpecs);

  for (const phone of phoneDetails) {
    const sections = phone.specs.reduce((map, spec) => {
      map[spec.section] = spec.data;
      return map;
    }, {});

    for (const [sectionName, sectionSpec] of Object.entries(displayedFields)) {
      for (const [specName, visible] of Object.entries(sectionSpec)) {
        if (!visible) continue;

        displayedSpecs[sectionName]?.[specName]?.push(
          sections[sectionName]?.[specName] ?? ""
        );
      }
    }
  }
  // console.log(displayedSpecs);
  return displayedSpecs;
}
