import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { Editor, EditorProvider, useCurrentEditor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button, Upload, UploadFile } from "antd";
import React, { useEffect } from "react";
import {
  BoldOutlined,
  CodeOutlined,
  EnterOutlined,
  FontColorsOutlined,
  ItalicOutlined,
  OrderedListOutlined,
  RedoOutlined,
  StrikethroughOutlined,
  UndoOutlined,
  UnorderedListOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

const MenuBar = ({
  onUpload,
}: {
  onUpload: (file: UploadFile) => Promise<string>;
}) => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="mb-3">
      <div className="flex flex-wrap gap-1">
        <Button
          size="small"
          htmlType="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <BoldOutlined />
        </Button>
        <Button
          size="small"
          htmlType="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <ItalicOutlined />
        </Button>
        <Button
          size="small"
          htmlType="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          <StrikethroughOutlined />
        </Button>
        <Button
          size="small"
          htmlType="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "is-active" : ""}
        >
          {">_"}
        </Button>

        <Button
          size="small"
          htmlType="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          {"<p>"}
        </Button>
        <Button
          size="small"
          htmlType="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          H1
        </Button>
        <Button
          size="small"
          htmlType="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          H2
        </Button>
        <Button
          size="small"
          htmlType="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          H3
        </Button>
        <Button
          size="small"
          htmlType="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive("heading", { level: 4 }) ? "is-active" : ""
          }
        >
          H4
        </Button>
        <Button
          size="small"
          htmlType="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive("heading", { level: 5 }) ? "is-active" : ""
          }
        >
          H5
        </Button>
        <Button
          size="small"
          htmlType="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor.isActive("heading", { level: 6 }) ? "is-active" : ""
          }
        >
          H6
        </Button>
        <Button
          size="small"
          htmlType="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <UnorderedListOutlined />
        </Button>
        <Button
          size="small"
          htmlType="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <OrderedListOutlined />
        </Button>
        <Button
          size="small"
          htmlType="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          <CodeOutlined />
        </Button>
        <Button
          size="small"
          htmlType="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          Blockquote
        </Button>
        <Button
          size="small"
          htmlType="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          Horizontal rule
        </Button>
        <Button
          size="small"
          htmlType="button"
          onClick={() => editor.chain().focus().setHardBreak().run()}
        >
          <EnterOutlined />
        </Button>
        <Button
          size="small"
          htmlType="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <UndoOutlined />
        </Button>
        <Button
          size="small"
          htmlType="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <RedoOutlined />
        </Button>
        <Button
          size="small"
          htmlType="button"
          onClick={() => editor.chain().focus().setColor("red").run()}
          className={
            editor.isActive("textStyle", { color: "red" }) ? "is-active" : ""
          }
        >
          <FontColorsOutlined style={{ color: "red" }} />
        </Button>
        <Upload
          accept="image/*"
          multiple={false}
          showUploadList={false}
          customRequest={async ({ file }) => {
            const url = await onUpload(file as any);
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
        >
          <Button size="small" icon={<UploadOutlined />} />
        </Upload>
        <Button
          size="small"
          htmlType="button"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          Clear marks
        </Button>
        <Button
          size="small"
          htmlType="button"
          onClick={() => editor.chain().focus().clearNodes().run()}
        >
          Clear nodes
        </Button>
      </div>
    </div>
  );
};

const extensions = [
  Document,
  Paragraph,
  Text,
  Image,
  Dropcursor,
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

export default ({
  handleUpload,
  content,
  onUpdate,
}: {
  handleUpload: (file: UploadFile) => Promise<string>;
  content?: string;
  onUpdate?: (value: string) => void;
}) => {
  const [editor, setEditor] = React.useState<Editor | null>(null);
  useEffect(() => {
    if (editor && content !== undefined && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="prose app-editor">
      <EditorProvider
        slotBefore={<MenuBar onUpload={handleUpload} />}
        extensions={extensions}
        content={content}
        onUpdate={({ editor }) => onUpdate?.(editor.getHTML())}
        onCreate={({ editor }) => setEditor(editor)}
      />
    </div>
  );
};
