export default function RestaurantDetails({ restaurant }) {
  return (
    <div>
      <h1 className="text-2xl font-bold">{restaurant.name}</h1>
      {restaurant.imageUrl?.length > 0 && (
        <img
          src={restaurant.imageUrl[0]}
          alt={restaurant.name}
          className="my-4 rounded w-full max-h-[400px] object-cover"
        />
      )}
      <p><strong>Address:</strong> {restaurant.address}, {restaurant.city}, {restaurant.country}</p>
      {restaurant.telephone && <p><strong>Phone:</strong> {restaurant.telephone}</p>}
      {restaurant.website && (
        <p>
          <strong>Website:</strong>{" "}
          <a href={restaurant.website} className="text-blue-600 underline" target="_blank">
            Visit Site
          </a>
        </p>
      )}
    </div>
  );
}
