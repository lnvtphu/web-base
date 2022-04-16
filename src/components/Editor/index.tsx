import React, { useEffect, useState } from 'react';
import './suneditor.min.css'; // Import Sun Editor's CSS File
import SunEditor from 'suneditor-react';
import axios from 'axios';

const defaultFonts = [
  'Arial',
  'Comic Sans MS',
  'Courier New',
  'Impact',
  'Georgia',
  'Tahoma',
  'Trebuchet MS',
  'Verdana',
];

const handleImageUploadBefore = (files, info, uploadHandler) => {
  // const resultFile = await axios.post("https://v2.convertapi.com/upload", data, {
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  // });
  // console.log(files);
  const data = new FormData();
  data.append('file', files[0]);
  axios
    .post('https://v2.convertapi.com/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(function (response) {
      const { data: { FileId = '', FileName } = {} } = response;
      console.log(response);
      const rs = {
        result: [
          {
            url: `https://v2.convertapi.com/d/${FileId}`,
            name: FileName,
            size: files[0].size,
          },
        ],
      };

      try {
        uploadHandler(rs);
      } catch (error) {
        return undefined;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

const Editor: React.FC<EditorProps> = (props: EditorProps) => {
  const [content, setContent] = useState<any>('');
  const { minHeight = 150, onChange, value = '' } = props;

  useEffect(() => {
    setContent(value);
  }, [value]);
  const sortedFontOptions = [
    'Logical',
    'Salesforce Sans',
    'Garamond',
    'Sans-Serif',
    'Serif',
    'Times New Roman',
    'Helvetica',
    ...defaultFonts,
  ].sort();
  return (
    <SunEditor
      setContents={content}
      onChange={onChange}
      onImageUploadBefore={handleImageUploadBefore}
      setOptions={{
        buttonList: [
          ['undo', 'redo'],
          ['font', 'fontSize'],
          // ['paragraphStyle', 'blockquote'],
          ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
          ['fontColor', 'hiliteColor'],
          ['align', 'list', 'lineHeight'],
          ['outdent', 'indent'],

          ['table', 'horizontalRule', 'link', 'image', 'video'],
          // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
          // ['imageGallery'], // You must add the "imageGalleryUrl".
          // ["fullScreen", "showBlocks", "codeView"],
          ['preview', 'print'],
          ['removeFormat'],

          // ['save', 'template'],
          // '/', Line break
        ], // Or Array of button list, eg. [['font', 'align'], ['image']]
        defaultTag: 'div',
        minHeight,
        showPathLabel: false,
        font: sortedFontOptions,
      }}
    />
  );
};

export default Editor;
