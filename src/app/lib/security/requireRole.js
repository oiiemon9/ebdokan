export function requireRole(sessionData, allowedRoles = []) {
  const session = sessionData?.session;
  if (!session?.user) {
    return {
      success: false,
      status: 401,
      message: 'Unauthorized',
    };
  }

  if (!allowedRoles.includes(session.user.role)) {
    return {
      success: false,
      status: 403,
      message: 'Forbidden: You do not have permission',
    };
  }

  return {
    success: true,
  };
}
