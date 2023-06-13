import Logo from "../assets/lad-logo.png";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function Login() {

  //temp way to login
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const handleLogin = () => {
    setSearchParams("");
    navigate("/Home");
  };
  //temp way to login

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  return (
    <>
      <section className="w-full p-5 bg-gray-50">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <img src={Logo} alt="logo" className="h-40 m-6" />
        </div>
        <form className="flex flex-col w-2/3 max-w-md gap-2 p-10 mx-auto mt-10 bg-white border-2 rounded-lg">
          <p className="mb-3 font-normal text-gray-500">
            Log into your Student Account
          </p>
          <p className="font-semibold">Student Email</p>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="p-2 rounded-sm ring-2 ring-gray-300"
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="text-sm font-medium">
            (i.e. xxxxxxx@sit.singaporetech.edu.sg)
          </p>
          <p className="font-semibold">Password</p>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="p-2 rounded-sm ring-2 ring-gray-300"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex flex-col items-center justify-between gap-5 my-3 md:flex-row md:gap-0">
            <label className="flex items-center">
              <input type="checkbox" className="mr-1" />
              Remember Me
            </label>

            <label className="flex items-center">
              <a
                className="mr-1 cursor-pointer hover:text-black/70"
                onClick={() => setShowModal(true)}
              >
                Forgot your password?
              </a>
            </label>
          </div>
          <button
            type="submit"
            className="px-5 py-2 text-white transition-colors duration-150 bg-black rounded-md hover:bg-black/70"
            onClick={handleLogin}
          >
            Log In
          </button>
        </form>
        <footer className="w-full py-8 text-sm text-center text-gray-400 bg-gray-50">
          <div className="flex flex-row justify-center gap-5 mb-2">
            <div>Lab Assistant Device</div>
          </div>
          <div>Copyright ©2023 Produced SIT Student Software Engineers</div>
        </footer>
        {showModal && (
          <>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
              <div className="relative min-w-[420px] max-w-xs mx-auto my-6">
                <div className="relative flex flex-col bg-white border-0 rounded-md shadow-lg outline-none w-fullm-12 focus:outline-none">
                  <div className="relative flex-auto px-5 py-6">
                    <div className="flex items-start justify-center">
                      <div className="flex flex-col gap-2.5">
                        <span className="text-xl font-bold leading-relaxed text-black ">
                          Recover your account
                        </span>
                        <div>
                          <p className="pb-6">
                            Please enter in your email address that is
                            associated with your account
                          </p>
                          <p className="py-1 text-sm font-semibold"> Email</p>
                          <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            className="w-full p-2 rounded-sm ring-2 ring-gray-300"
                            onChange={(e) => setRecoveryEmail(e.target.value)}
                          />
                          <p className="py-2 text-sm text-gray-400">
                            A recovery email will be sent if such an account
                            exists
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-3 px-6 pb-6">
                    <button
                      className="flex px-5 py-2 text-black transition-colors duration-150 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-200"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="flex h-full px-8 py-2 text-white transition-colors duration-150 bg-black rounded-md hover:bg-black/70"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Recover
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
          </>
        )}
      </section>
    </>
  );
}
