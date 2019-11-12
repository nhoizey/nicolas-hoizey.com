module.exports = function ordinal(value) {
  const dateObject = new Date(value);
  const dayNumber = dateObject.getDate();

  let ordinal = '';
  switch (dayNumber) {
    case 1:
    case 21:
    case 31:
      ordinal = `${dayNumber}st`;
      break;
    case 2:
    case 22:
      ordinal = `${dayNumber}nd`;
      break;
    case 3:
    case 23:
      ordinal = `${dayNumber}rd`;
      break;
    default:
      ordinal = `${dayNumber}th`;
  }

  return ordinal;
};
