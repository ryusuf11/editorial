import { CSSProperties } from 'react';
import { RenderElementProps } from 'slate-react';

const ElementEditor = ({
  attributes,
  children,
  element,
}: RenderElementProps) => {
  const style = { textAlign: element.align as CSSProperties['textAlign'] };
  return (
    <p style={style} {...attributes}>
      {children}
    </p>
  );
};

export default ElementEditor;
