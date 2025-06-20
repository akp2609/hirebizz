export default function StatCard({ title, value }) {
  return (
    <div className="bg-white shadow rounded-2xl p-4 border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-600">{title}</h2>
      <p className="text-3xl font-bold mt-2 text-gray-800">{value}</p>
    </div>
  );
}