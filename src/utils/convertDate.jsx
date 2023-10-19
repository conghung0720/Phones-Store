export const convertDate = (date) => {
  const createdAt = new Date(date);
  const formattedDate = createdAt.toLocaleString("vi-VN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  return formattedDate;
};