import React, { useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import LinkTool from "@editorjs/link";
import Delimiter from "@editorjs/delimiter";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import Raw from "@editorjs/raw";
import Underline from "@editorjs/underline";
import Table from "@editorjs/table";
import { Form, Input, Button } from "antd";
const EditorComponent = () => {
  const editorInstance = useRef(null);
  const { TextArea } = Input;
  // Инициализация EditorJS
  const initializeEditor = () => {
    editorInstance.current = new EditorJS({
      holder: "editor-container",
      tools: {
        list: List,
        header: Header,
        paragraph: Paragraph,
        linkTool: LinkTool,
        delimiter: Delimiter,

        quote: Quote,
        marker: Marker,
        raw: Raw,
        underline: Underline,
        table: Table,
      },
      // Дополнительные настройки EditorJS
    });
  };

  // Вызывается при отправке формы
  const handleFormSubmit = async (values) => {
    const content = await editorInstance.current.save();
    values.content = content;
    console.log("Form values with content:", values);
  };

  return (
    //
    <div>
      <div id="editor-container"></div>
      <button onClick={initializeEditor}>
        <TextArea />
      </button>
    </div>
  );
};

export default EditorComponent;
