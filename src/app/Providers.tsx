"use client";

import { AuthProvider } from "@/context/AuthContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="w-full">{children}</div>
    </AuthProvider>
  );
}
