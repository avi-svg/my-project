"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { refresh } from "./login/services/api";
import {
  setAuthenticated,
  setUnauthenticated,
} from "./features/auth/authSlice";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        await refresh();
        dispatch(setAuthenticated());
      } catch {
        dispatch(setUnauthenticated());
      } finally {
        router.push("/products");
      }
    };

    checkAuthAndRedirect();
  }, [dispatch, router]);

  return null; 
}
