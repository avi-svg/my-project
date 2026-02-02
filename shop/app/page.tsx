'use client'

import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refresh } from "./login/services/api";
import { setAuthenticated, setUnauthenticated } from "./features/auth/authSlice";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await refresh();
        dispatch(setAuthenticated());
      } catch {
        dispatch(setUnauthenticated());
      }
    };

    checkAuth();
  }, []);

  redirect("/products");
}
