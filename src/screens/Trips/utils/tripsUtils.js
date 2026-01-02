export const getTripKey = (item, index) => {
  return (
    `${item?.trip?.id}-${item?.participant?.id}` ||
    item?.id?.toString() ||
    index.toString()
  );
};
