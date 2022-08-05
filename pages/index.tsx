import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const Editor = dynamic(() => import('../editor'), { ssr: false });

const Home: NextPage = () => {
  const [html, setHtml] = useState<string>('');
  const [json, setJson] = useState<any>({});
  return (
    <div className="flex flex-col items-center justify-start w-full min-h-full py-16">
      <Editor autofocus html={html} onChangeHtml={setHtml} onChangeJson={setJson} />
      <pre className="w-[680px] mt-4 border-primary rounded-lg p-4 bg-content overflow-x-auto">
        <code>
          {html.replaceAll('>', '>\n  ').replaceAll('<', '\n<')}
        </code>
      </pre>
      <pre className="text-sm w-[680px] mt-4 border-primary rounded-lg p-4 bg-content overflow-x-auto">
        <code>
          {JSON.stringify(json, null, 2)}
        </code>
      </pre>
    </div>
  );
};

export default Home;
