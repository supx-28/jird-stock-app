import StockTable from "./components/StockTable";

export default function App() {
  return (
    <div className="p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4">Jird's Stock | ระบบจัดการสต็อก</h1>
      <StockTable />
    </div>
  );
}
