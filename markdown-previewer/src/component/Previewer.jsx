import React from "react";
import './Previewer.css';
import {Icon} from '@iconify/react';
import { marked } from 'marked';
import { textCode } from "./data";

function Previewer({iconTitle, titleName, moveIcon, markdownText}){
    const convertedhtml = marked(textCode)

    return(
        <div className="printText">
            <div className="printText__header">
                <Icon icon = {iconTitle} className = "printText__header--title"/>
                <span className = "printText__header--title">{titleName}</span>
                <Icon icon = {moveIcon} className = "printText__header--title move"/>
            </div>
            <div className="printText__textarea" dangerouslySetInnerHTML={{ __html: convertedhtml }}>
            </div>
       
        </div>
    )
}

export default Previewer;