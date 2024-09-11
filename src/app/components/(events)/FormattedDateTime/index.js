const formattedDateTime = (prop, propType) => {
  const propDateTime = prop[`${propType}_date_time`];
  const dateObject = new Date(propDateTime);
  const optionsDate = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const optionsTime = { hour: "2-digit", minute: "2-digit" };
  const date = dateObject.toLocaleDateString("en-US", optionsDate);
  const time = dateObject.toLocaleTimeString(undefined, optionsTime);

  return { date, time };
};

export default formattedDateTime;
