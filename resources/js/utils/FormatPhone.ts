export const FormatPhone = (phone: string): string => {
  if (!phone) return "";

  let number = phone.replace(/\s|-/g, "");
  if (number.startsWith("+62")) {
    number = "0" + number.slice(3);
  }

  return number.replace(/(\d{4})(\d{4})(\d+)/, "$1-$2-$3");
};
