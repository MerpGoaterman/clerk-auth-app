"use client"

import { useAuth } from "@clerk/nextjs";
import { useEffect, useMemo, useState } from "react";

interface LowcoderAppWrapperProps {
  appId: string;
  baseUrl?: string;
}

function LowcoderAppWrapper(props: LowcoderAppWrapperProps) {
  const { appId, baseUrl = "https://tools.honeststok.co" } = props;
  const { getToken, isLoaded } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  // Fetch the JWT token when the component mounts
  useEffect(() => {
    async function fetchToken() {
      if (isLoaded) {
        try {
          // Get the Hasura-compatible JWT token
          const sessionToken = await getToken({ template: "hasura" });
          setToken(sessionToken);
        } catch (error) {
          console.error("Error fetching token:", error);
        }
      }
    }
    
    fetchToken();
  }, [isLoaded, getToken]);

  // Construct URL with JWT token as hash parameter
  const embedUrl = useMemo(() => {
    if (!token) {
      return `${baseUrl}/apps/${appId}/view`;
    }
    
    // Pass the JWT token as a hash parameter
    const params = new URLSearchParams();
    params.append("token", token);
    
    return `${baseUrl}/apps/${appId}/view#${params.toString()}`;
  }, [token, appId, baseUrl]);

  // Show loading state while token is being fetched
  if (!isLoaded || !token) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading app...</p>
        </div>
      </div>
    );
  }

  return (
    <iframe
      src={embedUrl}
      style={{
        width: "100%",
        height: "100%",
        border: "none",
      }}
      title="HonestStok Tools"
      sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
      allow="clipboard-read; clipboard-write"
    />
  );
}

export default LowcoderAppWrapper;
