import { JSONResponse } from "~~/iam/misc/types";

// Composable to make authentication tasks easier
export default function useIam() {
  return {
    login,
    logout,
    isAuthenticated,
  };
}

/**
 * @desc Attempt to log user in
 * @email User's email
 * @password User's password
 * @param clientPlatform? What platform client is on, whether 'app', 'browser' (production), or 'browser-dev' (development)
 * @returns {Promise<boolean>}
 */
async function login(
  email: string,
  password: string,
  clientPlatform?: "app" | "browser" | "browser-dev"
): Promise<JSONResponse> {
  // Client platform defaults to browser production
  if (!clientPlatform) {
    clientPlatform = "browser";
  }
  // Attempt login
  const response = await $fetch("/api/iam/authn/login", {
    method: "POST",
    headers: {
      "client-platform": clientPlatform,
    },
    body: {
      email: email,
      password: password,
    },
  });

  return response;
}

/**
 * @desc Attempt to log user out
 * @param clientPlatform? What platform client is on, whether 'app', 'browser' (production), or 'browser-dev' (development)
 * @returns {Promise<boolean>}
 */
async function logout(
  clientPlatform?: "app" | "browser" | "browser-dev"
): Promise<JSONResponse> {
  // Client platform defaults to browser (production)
  if (!clientPlatform) {
    clientPlatform = "browser";
  }
  // Attempt logout
  const response = await $fetch("/api/iam/authn/logout", {
    method: "POST",
    headers: {
      "client-platform": clientPlatform,
    },
  });

  return response;
}

/**
 * @desc Returns true/false depending on whether the user is logged in or not
 * @param clientPlatform? What platform client is on, whether 'app', 'browser' (production), or 'browser-dev' (development)
 * @returns {Promise<boolean>}
 */
async function isAuthenticated(
  clientPlatform?: "app" | "browser" | "browser-dev"
): Promise<boolean> {
  let isAuthenticated = false;

  // Client platform defaults to browser production
  if (!clientPlatform) {
    clientPlatform = "browser";
  }

  // Api response always has status, data, or error
  const { status, error } = await $fetch("/api/iam/authn/isauthenticated", {
    method: "POST",
    headers: {
      "client-platform": clientPlatform,
    },
  });

  // If status is 'fail', not authenticated
  if (status === "fail") {
    if (error) console.log("error: ", error);
    isAuthenticated = false;
  }

  // If status is 'success', not authenticated
  if (status === "success") {
    isAuthenticated = true;
  }

  return isAuthenticated;
}
