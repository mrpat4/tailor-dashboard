export const truncateString = (str: string): string => {
  if (str.length <= 10) {
    return str; // No need to truncate if the string is too short
  }
  const firstThree = str.slice(0, 3);
  const lastThree = str.slice(-3);
  return `${firstThree}...${lastThree}`;
};

export const convertBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return "0 Bytes";
  const kb = 1024;
  const correctDecimals = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(kb));

  return parseFloat((bytes / Math.pow(kb, i)).toFixed(correctDecimals)) + " " + sizes[i];
};

export const getInitials = (email: string) => {
  const namePart = email.split("@")[0];
  const nameParts = namePart.split(/[\._]/);
  if (nameParts.length === 1) {
    const firstLetter = nameParts[0][0].toUpperCase();
    const lastLetter = nameParts[0][nameParts[0].length - 1].toUpperCase();
    return `${firstLetter}${lastLetter}`;
  }
  const firstLetter = nameParts[0][0].toUpperCase();
  const lastLetter =
    nameParts[nameParts.length - 1][nameParts[nameParts.length - 1].length - 1].toUpperCase();
  return `${firstLetter}${lastLetter}`;
};
