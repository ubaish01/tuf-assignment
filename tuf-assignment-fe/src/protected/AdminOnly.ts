import { ReactNode } from "react";

export const AdminRoute = ({ children }: { children: ReactNode }) => {
  const login = true;
  return login ? (
    <Navigate to="/instructor/dashboard/analytics" />
  ) : (
    <Navigate to="/" />
  );
};
