export const convertToEnglish = (arabicNumber) => {
  const arabicDigits = "٠١٢٣٤٥٦٧٨٩";
  const englishDigits = "0123456789";

  let convertedNumber = "";
  for (const char of arabicNumber) {
    const index = arabicDigits.indexOf(char);
    if (index !== -1) {
      convertedNumber += englishDigits[index];
    } else {
      convertedNumber += char;
    }
  }
  return convertedNumber;
};
