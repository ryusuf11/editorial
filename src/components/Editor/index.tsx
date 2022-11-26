import React, { useCallback, useMemo } from 'react';
import {
  Editable,
  withReact,
  Slate,
  RenderLeafProps,
  RenderElementProps,
} from 'slate-react';
import { createEditor, Descendant } from 'slate';
import { withHistory } from 'slate-history';
import { Box, VStack } from '@chakra-ui/react';
import {
  FaAlignJustify,
  FaAlignRight,
  FaAlignCenter,
  FaAlignLeft,
  FaUnderline,
  FaItalic,
  FaBold,
} from 'react-icons/fa';
import {
  CustomEditor,
  CustomElement,
  CustomText,
  MarkFormat,
} from './editorEntity';
import AlignButton from './AlignButton';
import FormatButton, { toggleMark } from './FormatButton';
import ElementEditor from './ElementEditor';
import LeafEditor from './LeafEditor';

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const hotkey: Record<string, string> = {
  b: 'bold',
  i: 'italic',
  u: 'underline',
};

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'Your text goes here ...' }],
  },
];

const RichTextExample = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const renderElement = useCallback(
    (props: RenderElementProps) => <ElementEditor {...props} />,
    [],
  );

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <LeafEditor {...props} />,
    [],
  );

  return (
    <Slate editor={editor} value={initialValue}>
      <VStack alignItems="flex-start">
        <Box w="100%">
          <FormatButton format="bold" icon={FaBold} tooltip="Ctrl + B" />
          <FormatButton format="italic" icon={FaItalic} tooltip="Ctrl + I" />
          <FormatButton
            format="underline"
            icon={FaUnderline}
            tooltip="Ctrl + U"
          />
          <AlignButton format="left" icon={FaAlignLeft} />
          <AlignButton format="center" icon={FaAlignCenter} />
          <AlignButton format="right" icon={FaAlignRight} />
          <AlignButton format="justify" icon={FaAlignJustify} />
        </Box>
        <Box py={4} px={2} border="1px solid" borderColor="gray.200" w="100%">
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            spellCheck
            autoFocus
            onKeyDown={(event) => {
              if (!event.ctrlKey) {
                return;
              }

              if (event.key in hotkey) {
                toggleMark(editor, hotkey[event.key] as MarkFormat);
              }
            }}
          />
        </Box>
      </VStack>
    </Slate>
  );
};

export default RichTextExample;
