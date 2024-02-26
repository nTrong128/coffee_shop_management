/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication.
 * @type {string[]}
 */

export const publicRoutes = ["/", "/login"];

/**
 * An array of routes that are accessible to authenticated users.
 * These routes will redirect to the login page if the user is not authenticated.
 * @type {string[]}
 */
export const authRoutes = ["/login", "/register"];
/**
 * the prefix for  API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
