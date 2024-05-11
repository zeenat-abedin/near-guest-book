import { useEffect, useState } from 'react';

import { useStore } from '@/store';

export const Navigation = () => {
  const { signedAccountId, wallet, setRefetch } = useStore();
  const [action, setAction] = useState(() => {});
  const [label, setLabel] = useState('Loading...');

  useEffect(() => {
    if (!wallet) return;

    if (signedAccountId) {
      setAction(() => wallet.signOut);
      setLabel(`Logout ${signedAccountId}`);
      setRefetch(true);
    } else {
      setAction(() => wallet.signIn);
      setLabel('Login');
      setRefetch(true);
    }
  }, [signedAccountId, wallet]);

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">Near Ⓝ</a>
      </div>
      <div className="navbar-center hidden lg:flex"></div>
      <div className="navbar-end">
        <button
          className={`btn btn-outline ${
            signedAccountId ? 'btn-error' : 'btn-primary'
          }`}
          onClick={action}
        >
          {label}
        </button>
      </div>
    </div>
  );
};
