import type { NextPage } from 'next';
import { useState } from 'react';
import Editor from '../editor';

const Home: NextPage = () => {
  const [value, setValue] = useState<string>('');

  return (
    <div className="flex items-start justify-center w-full min-h-full pt-24">
      <Editor autofocus value={value} onChange={setValue} />
    </div>
  );
};

export default Home;
