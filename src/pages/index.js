import React from 'react';

import AllMessages from '@/components/AllMessages';
import MyMessages from '@/components/MyMessages';
import Form from '@/components/Form';

const HomePage = () => {
  return (
    <main>
      <h1 className="text-center text-2xl mb-4">
        This Guest feedback lives with NEAR blockchain! Assignment
      </h1>
      <Form />
      <div className="flex p-4 gap-5 flex-wrap">
        <AllMessages />
        <MyMessages />
      </div>
    </main>
  );
};

export default HomePage;
