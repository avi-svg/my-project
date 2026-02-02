'use client'

import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../login/services/api";
import { setAuthenticated } from "../features/auth/authSlice";




export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password);
      // הצלחה → redirect / update state
      
      dispatch(setAuthenticated());
    } catch {
      setError("אימייל או סיסמה שגויים");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Register!</button>

      {error && <p>{error}</p>}
    </form>
  );
}
