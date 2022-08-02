import type { NextPage } from 'next';
import { useState } from 'react';
import Editor from '../editor';

const Home: NextPage = () => {
  const [value, setValue] = useState<any>({});

  return (
    <div className="flex items-center justify-center w-full min-h-full">
      <Editor autofocus value={value} onChange={setValue} />
    </div>
  );
};

export default Home;
