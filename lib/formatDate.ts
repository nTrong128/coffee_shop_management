export function formatDate(date: any): string {
  const day = new Date(date).getDate().toString().padStart(2, "0");
  const month = (new Date(date).getMonth() + 1).toString().padStart(2, "0");
  const year = new Date(date).getFullYear();
  return `${day}/${month}/${year}`;
}
export function formatDateISO(date: any) {
  // Check if 'date' is a Date object and convert to ISO string, otherwise return an empty string
  return date instanceof Date ? date.toISOString().split("T")[0] : "";
}
// <input type="date" value={formatDateISO(selected?.user_birth)} />;
