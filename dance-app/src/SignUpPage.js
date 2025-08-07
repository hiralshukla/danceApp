import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from './firebase';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailInput = e.target.querySelector('input[type="email"]');

    //Use regex pattern of @ufl.edu email
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    //Check that email is valid
    if (!gmailPattern.test(email)) {
        emailInput.setCustomValidity("Please enter a valid gmail to sign in (####@gmail.com).");
        emailInput.reportValidity(); 
        return;
    } else {
        emailInput.setCustomValidity(""); //Clear error if valid
    }

    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }

    const name = firstname + " " + lastname;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return updateProfile(user, { displayName: name }).then(() => {
          console.log("Successfully added name");
          navigate("/login");
        });
      })
      .catch((error) => {
        console.error("Signup Error: ", error);
      });

    console.log("Email: ", email);
    console.log("Password: ", password);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <fieldset className="fieldset bg-base-100 border border-base-300 rounded-box w-[600px] p-8 flex flex-col gap-4">
        <legend className="fieldset-legend text-xl font-bold">Sign Up</legend>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="label">First Name</label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => {
              setFirstName(e.target.value);
              e.target.setCustomValidity("");
            }}
            required
            className="input input-bordered w-full"
            placeholder="First Name"
          />

          <label className="label">Last Name</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => {
              setLastName(e.target.value);
              e.target.setCustomValidity("");
            }}
            required
            className="input input-bordered w-full"
            placeholder="Last Name"
          />

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

          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
      </fieldset>
    </div>
  );
}
