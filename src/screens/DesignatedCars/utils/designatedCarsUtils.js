export const getDesignatedCarKey = (item, index) => {
  return (
    `${item?.car?.id}-${item?.participant?.id}` ||
    item?.id?.toString() ||
    index.toString()
  );
};

