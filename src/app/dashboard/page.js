"use client";

import { DivideSquare } from "lucide-react";
import UserDetails from "../globalComponents/UserDetails";
import Favourites from "../globalComponents/UserFavourites";
import UserReviews from "../globalComponents/UserReviews";


export default function ViewDashboard() {
  return (
    <div className="min-h-screen py-10 px-6">
      

      <div className="grid grid-cols-2 gap-4">
        {/*  User Details */}
        <section className="grid col-span-2">
          <UserDetails />
        </section>
  
        {/*  Favourites Section */}
        <section className="mb-10">
          <Favourites />
        </section>
  
  
        {/*  Reviews Section */}
        <section>
          <UserReviews />
        </section>
      </div>

    </div>
  );
}
