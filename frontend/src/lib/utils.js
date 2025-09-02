// export function fromData(date) {
//   return (
//     date.toLocaleString("en-US"),
//     {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     }
//   );
// }

export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
