export default function RestaurantDescription({ description }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Feature Tags</h2>
      <p>{description || "No description provided by the owner."}</p>
    </div>
  );
}
