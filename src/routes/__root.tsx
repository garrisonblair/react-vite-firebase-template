import { createRootRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { app } from "../firebase";
import { useGetUserInfo, useStoreUserInfo } from "../services/db/users";
import { useUserStore } from "../services/zustand/user.hooks";
import { PATHS } from "../types/paths/paths";
import { createPath } from "../types/paths/urlBuilder";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const login = useUserStore((state) => state.login);
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();

  const storeUserInfo = useStoreUserInfo();
  const getUserInfo = useGetUserInfo();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(app), async (user) => {
      if (user) {
        let existingUserInfo = await getUserInfo(user.uid);
        if (!existingUserInfo) {
          existingUserInfo = await storeUserInfo(user);
        }
        login({ ...user, ...existingUserInfo });
      } else {
        if (location.pathname !== createPath(PATHS.LOGIN, null)) {
          logout();
          navigate({ to: "/login", search: { redirect: location.href } });
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [getUserInfo, login, logout, navigate, storeUserInfo]);

  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};
