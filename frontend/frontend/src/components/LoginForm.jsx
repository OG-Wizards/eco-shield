// src/components/LoginForm.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const user = cred.user;
      // read role from Firestore 'users' collection
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const role = userDoc.exists() ? userDoc.data().role : "citizen";
      // simple routing by role
      if (role === "scientist") navigate("/scientist");
      else if (role === "researcher") navigate("/researcher");
      else if (role === "policymaker") navigate("/policymaker");
      else navigate("/citizen");
    } catch (err) {
      console.error(err);
      alert("Login failed: " + (err.message || err));
    }
  }

  return (
    <form onSubmit={submit} className="p-4 bg-white rounded shadow">
      <h3 className="font-semibold mb-2">Login</h3>
      <input
        className="w-full mb-2 p-2 border"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        required
      />
      <input
        className="w-full mb-2 p-2 border"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        required
      />
      <button className="px-4 py-2 bg-blue-600 text-white rounded">Login</button>
    </form>
  );
}
