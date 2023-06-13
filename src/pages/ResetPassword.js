import Logo from "../assets/lad-logo.png";
import { useState, useEffect } from "react"
import Footer from "../components/Footer";

export default function ResetPassword() {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault()

  }

  return (
    <>
      <section className="p-5  bg-gray-50">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
        <img src={Logo} alt="logo" className="h-40 m-6" />
        </div>
        <form
          className="flex flex-col w-2/3 max-w-md gap-5 p-10 mx-auto mt-10 bg-white border-2 rounded-lg"
          onSubmit={handleFormSubmit}
        >
          <p className="font-bold text-lg">Reset your password</p>
          <div className="flex flex-col gap-2">
            <p className="font-semibold ">New Password</p>
            <input
              id="password"
              type="password"
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 rounded-sm ring-2 ring-gray-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold ">Confirm Password</p>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-2 rounded-sm ring-2 ring-gray-300"
            />
          </div>
          <div className="flex flex-col items-center justify-between gap-5 md:flex-row md:gap-0">
            <label className="flex items-center">
              <p className="p-0 text-sm font-normal text-red-600">
                {error}
              </p>
            </label>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="submit"
              className="px-5 py-2 text-white transition-colors duration-150 bg-black rounded-md hover:bg-black/70"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
}