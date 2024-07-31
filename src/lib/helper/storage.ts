export function getDataStorage(key: string) {
  const data = JSON.parse(localStorage.getItem(key) || '[]');
  return data;
}
