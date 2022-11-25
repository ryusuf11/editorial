import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';

export type ElementType = 'paragraph';
export type CustomEditor = ReactEditor | BaseEditor;
export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};
export type CustomElement = {
  type: ElementType;
  align?: string;
  children: CustomText[];
};
export type MarkFormat = keyof Omit<CustomText, 'text'>;
