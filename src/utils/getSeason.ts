export function getSeason() {
  const currentMonth = new Date().getMonth();

  switch (true) {
    case currentMonth >= 2 && currentMonth <= 4:
      return "spring"; // Maret hingga Mei
    case currentMonth >= 5 && currentMonth <= 7:
      return "summer"; // Juni hingga Agustus
    case currentMonth >= 8 && currentMonth <= 10:
      return "fall"; // September hingga November
    default:
      return "winter"; // Desember hingga Februari
  }
}
