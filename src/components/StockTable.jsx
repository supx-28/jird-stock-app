import { useEffect, useState } from "react";
import { fetchStockData, updateStock } from "../api";
import '../styles/StockTable.css'

export default function StockTable() {
  const [items, setItems] = useState([]);
  const [loadingId, setLoadingId] = useState(null); // Track which item is being updated

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await fetchStockData();
    setItems(data);
  };

  const handleChange = async (id, delta) => {
    setLoadingId(id); // Set loading for the current item
    const updated = await updateStock(id, delta);
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, stock: updated.stock } : item
      )
    );
    setLoadingId(null); // Reset loading state
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 font-sans">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(item => (
          <div
            key={item.id}
            className="bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition"
          >
            <div className="text-lg font-semibold mb-2">{item.name}</div>
            <div className="text-sm text-gray-400 mb-1">ขนาด: {item.size}</div>
            <div className="text-white text-xl font-bold mb-4">
              คงเหลือ: {item.stock}
            </div>
            <div className="flex gap-2">
              <button
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
                onClick={() => handleChange(item.id, 1)}
                disabled={loadingId === item.id} // Disable button when loading
              >
                {loadingId === item.id ? (
                  <div className="spinner"></div>
                ) : (
                  "＋ เพิ่ม"
                )}
              </button>
              <button
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
                onClick={() => handleChange(item.id, -1)}
                disabled={loadingId === item.id} // Disable button when loading
              >
                {loadingId === item.id ? (
                  <div className="spinner"></div>
                ) : (
                  "－ ลด"
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
