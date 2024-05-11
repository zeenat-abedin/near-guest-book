import React, { useState } from 'react';
import { utils } from 'near-api-js';

import { useStore } from '@/store';
import { GuestbookNearContract } from '@/config';

const Form = () => {
  const { wallet, signedAccountId, setRefetch } = useStore();

  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    message: '',
    donation: '',
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    let deposit = 0;
    if (inputs.donation) {
      deposit = utils.format.parseNearAmount(inputs.donation);
    }

    setIsLoading(true);

    try {
      await wallet.callMethod({
        contractId: GuestbookNearContract,
        method: 'add_message',
        args: { message: inputs.message },
        deposit,
      });
      setRefetch(true);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-4 flex justify-center w-full">
      <form
        className="w-full sm:max-w-[40%] shadow-lg sm:w-[40%] p-4"
        onSubmit={onSubmit}
      >
        <h2 className="text-lg mb-2">Feedback</h2>
        <textarea
          className="textarea textarea-bordered w-full mb-2"
          placeholder="Write messages here..."
          rows={4}
          onChange={(e) => setInputs({ ...inputs, message: e.target.value })}
          value={inputs.message}
        ></textarea>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Donation (optional)"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setInputs({ ...inputs, donation: e.target.value })}
            value={inputs.donation}
          />
          <button
            className="btn btn-wide btn-primary"
            type="submit"
            disabled={!inputs.message || !signedAccountId || isLoading}
          >
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
        </div>
        {!signedAccountId && (
          <p className="text-xs font-thin text-red-400 mt-2">
            Please login first
          </p>
        )}
      </form>
    </div>
  );
};

export default Form;
