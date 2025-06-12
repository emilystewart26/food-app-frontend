"use client";

import { useUser } from "@clerk/nextjs";

export default function UserDetails() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <p><strong>Name:</strong> {user.fullName}</p>
      <p><strong>Email:</strong> {user.primaryEmailAddress.emailAddress}</p>
    </div>
  );
}
