export const timeToClient = (date) => {
  const tmpDate = new Date(date);
  const day = ('0' + tmpDate.getDate()).slice(-2);
  const month = ('0' + (tmpDate.getMonth() + 1)).slice(-2);
  const year = tmpDate.getFullYear();

  const hours = ('0' + tmpDate.getHours()).slice(-2);
  const mins = ('0' + tmpDate.getMinutes()).slice(-2);

  return `${day}/${month}/${year} ${hours}:${mins}`;
};
