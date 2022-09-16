import { FC } from 'react';
import sanitizeHtml from 'sanitize-html';

interface Props {
  className?: string;
  content: string;
}

const Index: FC<Props> = ({ className, content }) => {
  const sanitized = sanitizeHtml(content, {
    disallowedTagsMode: 'escape',
    allowedSchemes: ['http', 'https'],
    allowedTags: [
      'b', 'strong', 'i', 'em', 's', 'a', 'u', 'span', 'img',
      'p', 'blockquote', 'pre', 'code',
    ],
    allowedIframeHostnames: ['www.youtube.com'],
    allowedClasses: {
      'code': [ 'language-*', 'lang-*' ],
    },
  });

  return (
    // eslint-disable-next-line react/no-danger
    <div className={className} dangerouslySetInnerHTML={{ __html: sanitized }}/>
  );
};

export default Index;
