export default function RestaurantDescription({ description }) {
  return (
    <div className="mt-6">
      <p>{description || "No description provided by the owner."}</p>
    </div>
  );
}
