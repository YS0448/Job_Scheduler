function trimArrayValues(arr) {
  if (!Array.isArray(arr)) return arr; // Safety check

  return arr.map(item => {
    if (Array.isArray(item)) {
      // Recursively trim nested arrays
      return trimArrayValues(item);
    } else if (typeof item === "string") {
      // Trim strings
      return item.trim();
    }
    // Leave other types unchanged (numbers, objects, etc.)
    return item;
  });
}

module.exports = { trimArrayValues };
