"use client";

import UserDetails from "../globalComponents/UserDetails";
import Favourites from "../globalComponents/UserFavourites";
import UserReviews from "../globalComponents/UserReviews";
import UserWishlist from "../globalComponents/UserWishlist";

export default function ViewDashboard() {
  return (
    <div className="min-h-screen bg-blue-100 py-10 px-6">
      <h1 className="text-3xl font-bold mb-8">Your Dashboard</h1>

      {/*  User Details */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Your Details</h2>
        <UserDetails />
      </section>

      {/*  Wishlists Section */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Your Wishlists</h2>
        <UserReviews />
      </section>

      {/*  Favourites Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Your Favourites</h2>
        <Favourites />
      </section>


      {/*  Reviews Section */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Your Reviews</h2>
        <UserReviews />
      </section>

    </div>
  );
}
