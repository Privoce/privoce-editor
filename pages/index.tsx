import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Button from '../lib/form/button';
import SanitizeHtml from '../lib/sandbox/sanitize-html';

const Editor = dynamic(() => import('../editor'), { ssr: false });

const Home: NextPage = () => {
  const [html, setHtml] = useState<string>('');
  const [json, setJson] = useState<any>({});
  const [mode, setMode] = useState<'preview' | 'html' | 'json'>('preview');

  return (
    <div className="flex w-full divide-x divide-color-primary h-full bg-content">
      <div className="relative flex-1 h-full overflow-y-auto">
        <Editor autofocus html={html} onChangeHtml={setHtml} onChangeJson={setJson} />
      </div>
      <div className="relative flex-1 h-full overflow-y-auto">
        <div className="border-b-primary sticky top-0 bg-content">
          <div className="h-13 px-4 flex items-center space-x-3">
            <div className="text-color-primary flex-1">Debug View</div>
            <Button
              type="button"
              variant={mode === 'preview' ? 'contained' : 'outlined'}
              onClick={() => setMode('preview')}
            >
              Preview
            </Button>
            <Button
              type="button"
              variant={mode === 'html' ? 'contained' : 'outlined'}
              onClick={() => setMode('html')}
            >
              HTML
            </Button>
            <Button
              type="button"
              variant={mode === 'json' ? 'contained' : 'outlined'}
              onClick={() => setMode('json')}
            >
              JSON
            </Button>
          </div>
        </div>
        {mode === 'preview' && (
          <div className="p-4">
            <SanitizeHtml className="editor-body" content={html} />
          </div>
        )}
        {mode === 'html' && (
          <div>
            <pre className="w-full p-4 overflow-x-auto text-sm">
              <code>
                {html.replaceAll('>', '>\n  ').replaceAll('<', '\n<')}
              </code>
            </pre>
          </div>
        )}
        {mode === 'json' && (
          <div>
            <pre className="w-full p-4 overflow-x-auto text-sm">
              <code>
                {JSON.stringify(json, null, 2)}
              </code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
