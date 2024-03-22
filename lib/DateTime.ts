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

export function formatDateTime(date: any): string {
  const day = new Date(date).getDate().toString().padStart(2, "0");
  const month = (new Date(date).getMonth() + 1).toString().padStart(2, "0");
  const year = new Date(date).getFullYear();
  const hours = new Date(date).getHours().toString().padStart(2, "0");
  const minutes = new Date(date).getMinutes().toString().padStart(2, "0");
  const seconds = new Date(date).getSeconds().toString().padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export const calculateMinutes = (createAt: Date): number => {
  const currentTime = new Date();
  const timeDifference = currentTime.getTime() - createAt.getTime();
  const minutes = Math.floor(timeDifference / (1000 * 60));
  return minutes;
};
