import React, { useEffect, useState } from 'react';

import { useStore } from '@/store';
import { GuestbookNearContract } from '@/config';

const MyMessages = () => {
  const { wallet, isRefetch, signedAccountId } = useStore();
  const [messages, setMessages] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const getMyMessages = async () => {
    if (!wallet) return [];
    return wallet.callMethod({
      contractId: GuestbookNearContract,
      method: 'messages_by_signed_in_user',
    });
  };

  console.log('myLog isFetching', isFetching);

  const initFunction = async () => {
    setIsFetching(true);
    try {
      let messages = await getMyMessages();
      setIsFetching(false);
      console.log('MyMessages', messages);
      setMessages(messages.reverse());
    } catch (error) {
      console.log('myLog myError', error.message);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    setMessages([]);
    initFunction();
  }, [wallet, isRefetch]);

  return (
    <div className="flex-1 shadow-lg p-4">
      <h2 className="text-lg mb-4">My Messages</h2>
      {!signedAccountId && (
        <div className="alert alert-error !py-2">
          You need to login to see your messages
        </div>
      )}
      <div className="list">
        {isFetching ? (
          <>
            <div className="skeleton w-full h-32 mb-2" />
            <div className="skeleton w-full h-32 mb-2" />
            <div className="skeleton w-full h-32" />
          </>
        ) : (
          <>
            {messages.map((message, index) => (
              <div
                className="card w-full bg-neutral text-primary-content rounded-sm mb-3"
                key={index}
              >
                <div className="card-body p-4 rounded-sm">
                  <p className="text-white">
                    <span className="font-semibold">ID: </span>
                    <span className="font-medium">{message.id}</span>
                  </p>
                  <p className="text-white">
                    <span className="font-semibold">Message: </span>
                    <span className="font-medium">{message.message}</span>
                  </p>
                  <div className="flex justify-end">
                    <span className="badge badge-accent !text-xs">
                      {message.premium_attached || 0} N
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default MyMessages;
