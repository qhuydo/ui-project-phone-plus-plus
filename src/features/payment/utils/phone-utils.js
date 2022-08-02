export function getEmojiCodePointFromCountryCode(countryCode) {
  // The 127397 comes from the Regional Indicator Symbol 🇦's HTML code, 127462,
  // minus the rune value of A, 65. 127462 - 65 = 127397
  return countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
}

export function getEmojiFlagFromCountryCode(countryCode) {
  return String.fromCodePoint(...getEmojiCodePointFromCountryCode(countryCode));
}

export function getHexCodePointFromCountryCode(countryCode) {
  return getEmojiCodePointFromCountryCode(countryCode)
    .map((v) => v.toString(16))
    .join("-");
}
