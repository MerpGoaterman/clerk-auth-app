"use client"

import { useUser, useOrganization } from "@clerk/nextjs";
import { useMemo } from "react";

interface LowcoderAppWrapperProps {
  appId: string;
  baseUrl?: string;
}

function LowcoderAppWrapper(props: LowcoderAppWrapperProps) {
  const { appId, baseUrl = "https://tools.honeststok.co" } = props;
  const { user, isLoaded: userLoaded } = useUser();
  const { organization, membership, isLoaded: orgLoaded } = useOrganization();

  // Construct hash parameters with user and organization data
  const embedUrl = useMemo(() => {
    if (!userLoaded || !orgLoaded || !user) {
      return `${baseUrl}/apps/${appId}/view`;
    }
    
    const params = new URLSearchParams();
    
    // Add user data as hash parameters
    if (user.id) params.append("userId", user.id);
    if (user.primaryEmailAddress?.emailAddress) {
      params.append("email", user.primaryEmailAddress.emailAddress);
    }
    if (user.firstName) params.append("firstName", user.firstName);
    if (user.lastName) params.append("lastName", user.lastName);
    if (user.fullName) params.append("fullName", user.fullName);
    
    // Add organization data if user belongs to an organization
    if (organization) {
      params.append("orgId", organization.id);
      params.append("orgName", organization.name);
      if (organization.slug) params.append("orgSlug", organization.slug);
    }
    
    // Add user's role and permissions in the organization
    if (membership) {
      params.append("orgRole", membership.role);
      // Add permissions if available
      if (membership.permissions && membership.permissions.length > 0) {
        params.append("orgPermissions", membership.permissions.join(","));
      }
    }
    
    return `${baseUrl}/apps/${appId}/view#${params.toString()}`;
  }, [user, userLoaded, organization, membership, orgLoaded, appId, baseUrl]);

  // Show loading state while user data is being fetched
  if (!userLoaded || !orgLoaded) {
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
