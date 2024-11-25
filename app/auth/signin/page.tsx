"use client";
import React, { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const SignInContent = () => {
  const [providers, setProviders] = useState<any>(null);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  useEffect(() => {
    const setupProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setupProviders();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome to Aetheria</h1>
        <p className="text-gray-600">Please sign in to continue</p>
      </div>
      <div className="space-y-4">
        {providers &&
          Object.values(providers).map((provider: any) => (
            <button
              key={provider.name}
              onClick={() => signIn(provider.id, { callbackUrl })}
              className="flex items-center justify-center gap-2 px-6 py-3 text-lg font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
            >
              Sign in with {provider.name}
            </button>
          ))}
      </div>
    </div>
  );
};

export default function SignIn() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <SignInContent />
    </React.Suspense>
  );
}
