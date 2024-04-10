// import React, { useEffect, useRef } from 'react';
// import ReactQuill, { Quill } from 'react-quill';
// import QuillBetterTable from 'quill-better-table';
// import 'react-quill/dist/quill.snow.css';

// const Draft = () => {
//   const editorRef = useRef(null);

//   useEffect(() => {
//     Quill.register({ 'modules/better-table': QuillBetterTable }, true);

//     const quill = new Quill('#editor', {
//       theme: 'snow',
//       modules: {
//         table: false,
//         'better-table': {
//           operationMenu: {
//             items: {
//               unmergeCells: {
//                 text: 'Another unmerge cells name'
//               }
//             },
//             color: {
//               colors: ['green', 'red', 'yellow', 'blue', 'white'],
//               text: 'Background Colors:'
//             }
//           }
//         },
//         // keyboard: {
//         //   bindings: QuillBetterTable.keyboardBindings
//         // }
//       }
//     });

//     let tableModule = quill.getModule('better-table');
//     document.body.querySelector('#insert-table').onclick = () => {
//       tableModule.insertTable(3, 3);
//     };

//     document.body.querySelector('#get-table').onclick = () => {
//       console.log(tableModule.getTable());
//     };

//     document.body.querySelector('#get-contents').onclick = () => {
//       updateDeltaView(quill);
//     };
//   }, []); // Пустой массив зависимостей, чтобы код запускался только при монтировании компонента

//   const updateDeltaView = (quill) => {
//     document.body.querySelector('#delta-view').innerHTML = JSON.stringify(
//       quill.getContents()
//     );
//   };

//   return (
//     <div>
//       <div className="btn-group">
//         <button id="insert-table">Insert table</button>
//         <button id="get-table">Get table</button>
//         <button id="get-contents">Get contents</button>
//       </div>
//       <div className="text-editor">
//         <ReactQuill id="editor" ref={editorRef} placeholder="Write something here..." theme="snow" />
//       </div>
//       <div id="delta-view"></div>
//     </div>
//   );
// };

// export default Draft;

import { useState } from  "react";
import  ReactQuill  from  "react-quill";
import  "react-quill/dist/quill.snow.css";

const  modules  = {
    toolbar: [
      [{ 'font': [] }],
        [{size: []}],
        [{  table: true}],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script:  "sub" }, { script:  "super" }],
        ["blockquote", "code-block"],
        [{ list:  "ordered" }, { list:  "bullet" }],
        ["link", "image", "video"],
        ["clean"],

    ],
};

const Draft = ({ onTextChange ,value}) => {
    const [text, setText] = useState('');
  
    const handleChange = (e) => {
      setText(e);
      // Вызовите функцию обратного вызова для передачи текста в родительский компонент
      if (onTextChange) {
        onTextChange(e);
      }
    };



    return <div className="bg-light"> <ReactQuill  modules={modules} theme="snow" onChange={handleChange} placeholder="Содержание начинается здесь..." /></div>;
};

export  default  Draft;
