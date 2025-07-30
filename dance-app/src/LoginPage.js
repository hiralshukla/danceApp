import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("Successfully accessed account")
    })
    .catch((error) => {
        console.error("Login Error:", error); // full object
    }); 

    //If valid email and pw, log to console
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <fieldset className="fieldset bg-base-100 border border-base-300 rounded-box w-[600px] p-8 flex flex-col gap-4">
        <legend className="fieldset-legend text-xl font-bold">Login</legend>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              e.target.setCustomValidity("");
            }}
            required
            className="input input-bordered w-full"
            placeholder="Email"
          />

          <label className="label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input input-bordered w-full"
            placeholder="Password"
          />

          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </fieldset>
    </div>
  );
}
