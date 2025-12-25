"use client"

import { LowcoderAppView } from "lowcoder-sdk";
import "lowcoder-sdk/dist/style.css";
import { useUser } from "@clerk/nextjs";
import { useMemo } from "react";

interface LowcoderAppWrapperProps {
  appId: string;
  baseUrl?: string;
}

function LowcoderAppWrapper(props: LowcoderAppWrapperProps) {
  const { appId, baseUrl = "https://tools.honeststok.co" } = props;
  const { user, isLoaded } = useUser();

  // Construct hash parameters with user data
  const hashParams = useMemo(() => {
    if (!isLoaded || !user) return "";
    
    const params = new URLSearchParams();
    
    // Add user data as hash parameters
    if (user.id) params.append("userId", user.id);
    if (user.primaryEmailAddress?.emailAddress) {
      params.append("email", user.primaryEmailAddress.emailAddress);
    }
    if (user.firstName) params.append("firstName", user.firstName);
    if (user.lastName) params.append("lastName", user.lastName);
    if (user.fullName) params.append("fullName", user.fullName);
    
    return params.toString();
  }, [user, isLoaded]);

  // Show loading state while user data is being fetched
  if (!isLoaded) {
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
    <section style={{ height: "100%", width: "100%" }}>
      <LowcoderAppView
        appId={appId}
        baseUrl={baseUrl}
      />
      {/* Hidden iframe to pass hash parameters - Lowcoder SDK limitation workaround */}
      {hashParams && (
        <iframe
          src={`${baseUrl}/apps/${appId}/view#${hashParams}`}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          title="Lowcoder App"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      )}
    </section>
  );
}

export default LowcoderAppWrapper;
