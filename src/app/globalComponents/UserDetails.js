"use client";

import { useUser } from "@clerk/nextjs";

export default function UserDetails() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="bg-white p-4 rounded shadow mb-6 text-slate-700">
      <h1 className="text-3xl font-bold mb-8">{user.username}'s Dashboard</h1>
      <h2 className="text-xl font-semibold mb-2">Account Info</h2>
      <p><strong>Email:</strong> {user.primaryEmailAddress.emailAddress}</p>
    </div>
  );
}
