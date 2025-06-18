//used to check if star rating in broswer
"use client";
import ReactStars from "react-stars";

export default function TestStars() {
  return (
    <div className="p-10">
      <h1 className="text-xl mb-4">Star Rating Test</h1>
      <ReactStars
        count={5}
        value={1}
        size={40}
        color2={"#ffd700"}
        edit={false}
      />
    </div>
  );
}
