"use client";


import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refresh } from "./login/services/api";
import {
  setAuthenticated,
  setUnauthenticated,
} from "./features/auth/authSlice";
import { useRouter } from "next/navigation";

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

  const router = useRouter();
  useEffect(() => {
    router.push("/products");
  }, []);
}
