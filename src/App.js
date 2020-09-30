import React, { useEffect, useState } from 'react';
import AceEditor from "react-ace";
import "ace-builds";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-css";
import styled from "styled-components";
import {transform} from "@babel/standalone"
// import logo from './logo.svg';
import './App.css';
// import { Ace } from 'ace-builds';
import {getSrcDoc} from './html';
const initialCode=`

function Main(){
  return(
    <div>
    <h1>Welcome shit</h1>
    </div>
    );
}
ReactDOM.render(
  <Main/>,
  document.querySelector('#car')
);
`;
const initialCss= `
.main{
  color:blue;
}
`;

function App() {
  const[code, setCode]=useState(initialCode);
  const [css, setCss]=useState(initialCss);
  const [output, SetOutput]=useState("");
  const [error,setError]=useState("");
useEffect(() => {
  const babelOutput=transform(code,{presets:['env','react']}).code;
  SetOutput(getSrcDoc({babelOutput,error:null,css}))
 
}, [])
function handleCodeChange(value){
setCode(value);
}
function handleCssChangeValue(value){
setCss(value);
}
function runCode(){
  try {
    const babelOutput=transform(code,{presets:['env','react']}).code;
  
    SetOutput(getSrcDoc({babelOutput,error:null,css}))
  } catch (error) {
    SetOutput(getSrcDoc({babelOutput:"",error:error,css}))
  }
}
  return (
    <div className="Container">
      <div className="ControlPanel">
<button className="Button" onClick={runCode}>
  Run
</button>
      </div>
     <div style={{height:"100%",width:"54%"}}>
       <AceEditor
       value={code}
       height="50%"
       width="100%"
       mode="javascript"
       theme="monokai"
       onChange={handleCodeChange}
       name="code editor"
       setOptions={
         {
           fontSize:19,useWorker: false
         }
       }
       />
        <AceEditor
       value={css}
       height="50%"
       width="100%"
       mode="css"
       theme="monokai"
       onChange={handleCssChangeValue}
       name="css   editor"
       setOptions={
         {
           fontSize:19,useWorker: false
         }
       }
       />

     </div>
     <iframe title="output" className="Iframe" srcDoc={output}/>
    </div>
  );
}

export default App;

