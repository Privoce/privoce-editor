import type { NextPage } from 'next';
import { useState } from 'react';
import Editor from '../src/editor';

const Home: NextPage = () => {
  const [value, setValue] = useState<string>('<p xmlns="http://www.w3.org/1999/xhtml">123456</p>');

  return (
    <div className="flex items-center justify-center w-full min-h-full">
      <Editor autofocus value={value} onChange={setValue} />
    </div>
  );
};

export default Home;
