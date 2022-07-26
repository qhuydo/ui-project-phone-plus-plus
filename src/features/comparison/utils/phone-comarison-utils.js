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
  if (!phoneDetails || !phoneDetails?.length) return [];
  if (!displayedFields) return [];

  return phoneDetails.map((phone) => {
    const sections = phone.specs.reduce((map, spec) => {
      map[spec.section] = spec.data;
      return map;
    }, {});

    // console.log(sections);

    const displayedSpecs = [];
    for (const [sectionName, sectionSpec] of Object.entries(displayedFields)) {
      const specSection = {
        spec: sectionName,
        data: Object.entries(sectionSpec).reduce((map, [specName, visible]) => {
          if (!visible) return map;

          map[specName] = sections[sectionName]?.[specName] ?? "";
          return map;
        }, {}),
      };
      displayedSpecs.push(specSection);
    }
    return displayedSpecs;
  });
}
