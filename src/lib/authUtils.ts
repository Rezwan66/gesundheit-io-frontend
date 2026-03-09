export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'DOCTOR' | 'PATIENT';

export const authRoutes = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
];

export const isAuthRoute = (pathname: string) => {
  //   return authRoutes.some(route => pathname.startsWith(route)); // partial match
  return authRoutes.some((route: string) => route === pathname); // exact match - better
};

export type RouteConfig = {
  exact: string[];
  pattern: RegExp[];
};

export const commonProtectedRoutes: RouteConfig = {
  exact: ['/my-profile', '/change-password'],
  pattern: [],
};

export const doctorProtectedRoutes: RouteConfig = {
  pattern: [/^\/doctor\/dashboard/], // Matches any path that starts with '/doctor/dashboard'
  exact: [],
};

export const adminProtectedRoutes: RouteConfig = {
  pattern: [/^\/admin\/dashboard/], // Matches any path that starts with '/admin/dashboard'
  exact: [],
};

// export const superAdminProtectedRoutes: RouteConfig = {
//   pattern: [/^\/admin\/dashboard/], // Matches any path that starts with '/admin/dashboard'
//   exact: [],
// };

export const patientProtectedRoutes: RouteConfig = {
  pattern: [/^\/dashboard/], // Matches any path that starts with '/dashboard'
  exact: ['/patient/success'],
};

export const isRouteMatches = (pathname: string, routes: RouteConfig) => {
  // Checks if the pathname matches any of the exact routes
  if (routes.exact.includes(pathname)) return true;
  // Checks if the pathname matches any of the pattern routes
  return routes.pattern.some((pattern: RegExp) => pattern.test(pathname));
};

export const getRouteOwner = (pathname: string): UserRole | 'COMMON' | null => {
  if (isRouteMatches(pathname, doctorProtectedRoutes)) return 'DOCTOR';
  //   if (isRouteMatches(pathname, superAdminProtectedRoutes)) return 'SUPER_ADMIN';
  if (isRouteMatches(pathname, adminProtectedRoutes)) return 'ADMIN';
  if (isRouteMatches(pathname, patientProtectedRoutes)) return 'PATIENT';
  if (isRouteMatches(pathname, commonProtectedRoutes)) return 'COMMON';
  return null; // public routes
};

export const getDefaultDashboardRoute = (role: UserRole): string => {
  if (role === 'ADMIN' || role === 'SUPER_ADMIN') return '/admin/dashboard';
  if (role === 'DOCTOR') return '/doctor/dashboard';
  if (role === 'PATIENT') return '/dashboard';
  return '/';
};

export const isValidRedirectForRole = (redirectPath: string, role: UserRole): boolean => {
  const unifySuperAdminAndAdminRole = role === 'SUPER_ADMIN' ? 'ADMIN' : role;
  role = unifySuperAdminAndAdminRole;

  const routeOwner = getRouteOwner(redirectPath);

  if (routeOwner === null || routeOwner === 'COMMON') return true;
  if (routeOwner === role) return true;
  return false;
};
