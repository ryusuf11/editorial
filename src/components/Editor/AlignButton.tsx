import { Button, Icon, Tooltip } from '@chakra-ui/react';
import { Transforms, Editor, Element as SlateElement } from 'slate';
import { useSlate } from 'slate-react';
import { IconType } from 'react-icons';
import { CustomEditor, CustomElement, ElementType } from './editorEntity';

type AlignButtonProps = {
  format: string;
  icon: IconType;
};

const ALIGNMENTS = ['left', 'center', 'right', 'justify'];

const toggleBlock = (editor: CustomEditor, format: string) => {
  const isActive = isBlockActive(
    editor,
    format,
    ALIGNMENTS.includes(format) ? 'align' : 'type',
  );

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      !ALIGNMENTS.includes(format),
    split: true,
  });

  let newProperties: Partial<SlateElement>;
  if (ALIGNMENTS.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: (isActive ? 'paragraph' : format) as ElementType,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive) {
    const block: CustomElement = {
      type: format as ElementType,
      children: [],
    };
    Transforms.wrapNodes(editor, block);
  }
};

const isBlockActive = (
  editor: CustomEditor,
  format: string,
  blockType: Partial<keyof CustomElement> = 'type',
) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    }),
  );

  return !!match;
};

const AlignButton = ({ format, icon }: AlignButtonProps) => {
  const editor = useSlate();

  return (
    <Tooltip label={format} placement="bottom">
      <Button
        isActive={isBlockActive(
          editor,
          format,
          ALIGNMENTS.includes(format) ? 'align' : 'type',
        )}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleBlock(editor, format);
        }}
      >
        <Icon as={icon} />
      </Button>
    </Tooltip>
  );
};

export default AlignButton;
