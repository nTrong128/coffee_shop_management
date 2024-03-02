export default function formatDate(date: any): string {
  const day = new Date(date).getDate().toString().padStart(2, "0");
  const month = (new Date(date).getMonth() + 1).toString().padStart(2, "0");
  const year = new Date(date).getFullYear();
  return `${day}/${month}/${year}`;
}
