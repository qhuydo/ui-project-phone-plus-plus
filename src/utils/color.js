export function adjust(color, amount) {
  return `#${color.replace(/^#/, "").replace(/../g, function (color) {
    const colorStr =
      "0" +
      Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16);
    return colorStr.substring(colorStr.length - 2);
  })}`;
}

export function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }

  return color;
}
