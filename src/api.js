const API = import.meta.env.VITE_API_URL;

export async function fetchStockData() {
  const res = await fetch(API);
  return await res.json();
}

export async function updateStock(id, delta) {
  const res = await fetch(API, {
    method: "POST",
    body: JSON.stringify({ id, delta }),
    headers: { "Content-Type": "application/json" },
  });
  return await res.json();
}
