export const getHotelKey = (item, index) => {
  return (
    item?.accommodation?.id?.toString() ||
    item?.id?.toString() ||
    index.toString()
  );
};
