// src/components/SignupForm.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("citizen");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const user = cred.user;
      // store profile in Firestore users collection
      await setDoc(doc(db, "users", user.uid), { name, email, role });
      // redirect by role
      if (role === "scientist") navigate("/scientist");
      else if (role === "researcher") navigate("/researcher");
      else if (role === "policymaker") navigate("/policymaker");
      else navigate("/citizen");
    } catch (err) {
      console.error(err);
      alert("Signup failed: " + (err.message || err));
    }
  }

  return (
    <form onSubmit={submit} className="p-4 bg-white rounded shadow">
      <h3 className="font-semibold mb-2">Signup</h3>
      <input
        className="w-full mb-2 p-2 border"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full name"
        required
      />
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
      <select
        className="w-full mb-2 p-2 border"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="citizen">Citizen</option>
        <option value="scientist">Scientist</option>
        <option value="researcher">Researcher</option>
        <option value="policymaker">Policymaker</option>
      </select>
      <button className="px-4 py-2 bg-green-600 text-white rounded">Signup</button>
    </form>
  );
}
