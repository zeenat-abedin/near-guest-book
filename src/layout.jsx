import { Navigation } from './components/Navigation';

import { Wallet } from '@/wallets/near-wallet';
import { NetworkId, GuestbookNearContract } from '@/config';

import { useStore } from './store';
import { useEffect } from 'react';

export default function RootLayout({ children }) {
  const { setWallet, setSignedAccountId } = useStore();

  useEffect(() => {
    const wallet = new Wallet({
      createAccessKeyFor: GuestbookNearContract,
      networkId: NetworkId,
    });
    wallet.startUp(setSignedAccountId);
    setWallet(wallet);
    console.log('wallet created');
  }, []);

  return (
    <>
      <Navigation />
      {children}
    </>
  );
}
