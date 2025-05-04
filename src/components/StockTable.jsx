import { useEffect, useState } from "react";
import { fetchStockData, updateStock } from "../api";

export default function StockTable() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await fetchStockData();
    setItems(data);
  };

  const handleChange = async (id, delta) => {
    const updated = await updateStock(id, delta);
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, stock: updated.stock } : item
      )
    );
  };

  return (
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2">ชื่อสินค้า</th>
          <th className="p-2">ขนาด</th>
          <th className="p-2">สต็อก</th>
          <th className="p-2">จัดการ</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.id} className="text-center border-t">
            <td className="p-2">{item.name}</td>
            <td className="p-2">{item.size}</td>
            <td className="p-2">{item.stock}</td>
            <td className="p-2">
              <button
                className="px-2 bg-green-500 text-white rounded"
                onClick={() => handleChange(item.id, 1)}
              >
                ＋
              </button>
              <button
                className="px-2 ml-2 bg-red-500 text-white rounded"
                onClick={() => handleChange(item.id, -1)}
              >
                －
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
