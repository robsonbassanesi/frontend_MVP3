import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup
} from 'firebase/auth';

import { auth } from '../Services/Firebase';
import { RiGithubLine, RiGoogleFill } from 'react-icons/ri';
import { useState } from 'react';
import DTDLogo from '../../assets/DTDLogo.png';

export function Login() {
  const [user, setUser] = useState({});

  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(result => {
        if (result.user.displayName === user.displayName) {
          alert('Usuário já logado');
        } else {
          setUser(result.user);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  function handleGithubLogin() {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then(result => {
        if (result.user.displayName === user.displayName) {
          alert('Usuário já logado');
        } else {
          setUser(result.user);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 sm:py-12">
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-bold text-7xl">CRM DTD</h1>
          <img className="w-80" src={DTDLogo} alt="" />
        </div>
        <div className="mx-auto xs:p-0 md:w-full md:max-w-md">
          <h1 className="mb-5 text-2xl font-bold text-center">
            Entre com sua conta
          </h1>
          <div className="w-full bg-white divide-y divide-gray-200 rounded-lg shadow">
            <div className="w-full p-5">
              <div className="flex flex-col items-center justify-center gap-5">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="flex items-center justify-center w-1/2 p-3 text-xl font-normal text-center text-gray-500 transition duration-200 border border-gray-200 rounded-lg shadow-sm hover:shadow-md"
                >
                  <RiGoogleFill size={30} />
                  <h1 className="ml-2">Google</h1>
                </button>
                <h1 className="flex items-center justify-center text-2xl">
                  Ou
                </h1>
                <button
                  type="button"
                  onClick={handleGithubLogin}
                  className="flex items-center justify-center w-1/2 p-3 text-xl font-normal text-center text-gray-500 transition duration-200 border border-gray-200 rounded-lg shadow-sm hover:shadow-md"
                >
                  <RiGithubLine size={30} />
                  <h1 className="ml-2">Github</h1>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
