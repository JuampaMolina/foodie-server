export default function (string) {
  if (!string) {
    return;
  }
  let words = string.split(" ");
  return words
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(" ");
}
