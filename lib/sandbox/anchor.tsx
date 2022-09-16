import { AnchorHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import { sanitizeUrl } from './sanitize-url';

interface Props extends DetailedHTMLProps<
AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement
> {
}

const Index: FC<Props> = ({ href, children, ...props }) => {

  return (
    <a href={sanitizeUrl(href)} {...props} >
      {children}
    </a>
  );
};

export default Index;
