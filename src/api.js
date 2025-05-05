const API = import.meta.env.VITE_API_URL;

export async function fetchStockData() {
  const res = await fetch(API);
  return await res.json();
}

export async function updateStock(id, delta) {
  const res = await fetch(API,
    {
      redirect: "follow",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, delta }),
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    }
  );

  const result = await res.json();
  return result;
}
