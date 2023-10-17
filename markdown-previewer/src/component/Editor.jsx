import React from "react";
import './Editor.css';
import {Icon} from '@iconify/react';
import { useState } from "react";
import { textCode } from "./data";
export  let markdownText = " "

function Editor({iconTitle, titleName, moveIcon}){
    const [input, setInput] = useState(textCode);
    markdownText = textCode

    const handleChange = (event) => {
        setInput(event.target.value)
        markdownText = input;
        console.log(input)
    }

    return(
        <div className="textEdit">
            <div className="textEdit__header">
                <Icon icon = {iconTitle} className = "textEdit__header--title"/>
                <span className = "textEdit__header--title">{titleName}</span>
                <Icon icon = {moveIcon} className = "textEdit__header--title"/>
            </div>
            
            <textarea 
                value = {input} 
                onChange={handleChange}
                className="textEdit__textarea"
                caption ="Editors"
            /> 
        </div>
    )
}

export default Editor;