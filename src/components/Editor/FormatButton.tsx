import { Button, Icon, Tooltip } from '@chakra-ui/react';
import { Editor } from 'slate';
import { IconType } from 'react-icons';
import { useSlate } from 'slate-react';
import { CustomEditor, MarkFormat } from './editorEntity';

type FormatButtonProps = {
  format: MarkFormat;
  icon: IconType;
  tooltip: string;
};

export const toggleMark = (editor: CustomEditor, format: MarkFormat) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isMarkActive = (editor: CustomEditor, format: MarkFormat) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const FormatButton = ({ format, icon, tooltip }: FormatButtonProps) => {
  const editor = useSlate();
  return (
    <Tooltip label={`${format} (${tooltip})`} placement="bottom">
      <Button
        isActive={isMarkActive(editor, format)}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark(editor, format);
        }}
      >
        <Icon as={icon} />
      </Button>
    </Tooltip>
  );
};

export default FormatButton;
