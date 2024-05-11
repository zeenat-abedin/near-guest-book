import { GuestbookNearContract } from '@/config';
import React, { useEffect, useState } from 'react';
import { useStore } from '@/store';

const AllMessages = () => {
  const { wallet, isRefetch } = useStore();
  const [messages, setMessages] = useState([]);

  const getLast10Messages = async () => {
    if (!wallet) return [];
    return wallet.viewMethod({
      contractId: GuestbookNearContract,
      method: 'get_messages',
      args: { from_index: 0, limit: 10 },
    });
  };

  const initFunction = async () => {
    const messages = await getLast10Messages();
    console.log('messages', messages);
    setMessages(messages.reverse());
  };

  useEffect(() => {
    initFunction();
  }, [wallet, isRefetch]);

  return (
    <div className="flex-1 shadow-lg p-4">
      <h2 className="text-lg mb-4">Recent 10 Messages</h2>

      {messages.map((message, index) => (
        <div
          className="card w-full bg-primary text-primary-content rounded-sm mb-3"
          key={index}
        >
          <div className="card-body p-4 rounded-sm">
            <p>
              <span className="font-semibold">ID: </span>
              <span className="font-medium">{message.id}</span>
            </p>
            <p>
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
    </div>
  );
};

export default AllMessages;
