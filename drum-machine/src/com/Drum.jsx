import React, { useReducer, useEffect}  from "react";
import './Drum.css'
import { Icon } from '@iconify/react';
import {DataSound}  from './data'
import { Howl} from 'howler';

function Drump(){

    const stateInit = {
        message: '',
        son: '',
        localPos: 0,
        volume: 40,
        power: true,
        bank: false,
        valueBank: 'heater',
        classBtn: ''
    }

    const reducer = (state, action) =>{
        switch (action.type){
            case 'POWER_ON':
                return({...state, power: true});
            case 'POWER_OFF':
                return({...state, power: false});
            case 'BANK_ON':
                return({...state, bank: true});
            case 'BANK_OFF':
                return({...state, bank: false});
            case 'MSG_BANK_ON':
                return({...state, message: 'Smouth Piano Kit'});
            case 'MSG_BANK_OFF':
                return({...state, message: 'Heater Kit'});
            case 'VOLUME':
                return({...state, volume: action.payload});
            case 'MSG_VOLUME':
                    return({...state, message: `Volume: ${state.volume}`}); 
            case 'SET_MSG':
                return({...state, message: DataSound[state.localPos].name[state.valueBank]});
            case 'SET_INDEX':
                return({...state, localPos: action.setIndex}); 
            case 'CLEAR_MSG':
                return({...state, message: ''});
            case 'SET_STATE_BANK':
                return({...state, valueBank:'heater'}); 
            case 'RESET_STATE_BANK':
                return({...state, valueBank:'smooth'});  
            case 'SET_CLASS':
                return({...state, classBtn:'orange'}); 
            case 'RESET_CLASS':
                return({...state, classBtn:''}); 
            default:
                return {...state}
        }
    }
    const [state, dispatch] = useReducer(reducer, stateInit)

    //Gere alumage et extension 
    const handleClickPower = () =>{
        if(state.power){
            dispatch({type: 'CLEAR_MSG'});
            dispatch({type: 'POWER_OFF'});
        }else{
            dispatch({type: 'POWER_ON'});
        }
    }

    //Gerer le type de son
    const handleClickBank = () =>{
        if(state.power){
            if(state.bank){
                dispatch({type: 'BANK_OFF'});
                dispatch({type: 'MSG_BANK_OFF'}); 
                dispatch({type: 'SET_STATE_BANK'}); 
            }else{
                dispatch({type: 'BANK_ON'});
                dispatch({type: 'MSG_BANK_ON'});
                dispatch({type: 'RESET_STATE_BANK'}); 
            }
        }
        console.log(state.valueBank)
    }

    //Gere le volume 
    const handleVolumeChange = (event) =>{
        dispatch({type: 'VOLUME', payload: event.target.value})
        dispatch({type: 'MSG_VOLUME'});
        setTimeout(()=> {
            dispatch({type: 'CLEAR_MSG'});
        }, 2000)
    }

    //Gerer activation de audio
    const sound = new Howl({
        src: [DataSound[state.localPos].value[state.valueBank]],
        autoplay: false,
        loop: false,
        volume: state.volume / 100,
        onplay: () => {
          console.log('Audio started playing');
        },
        onend: () => {
          console.log('Audio finished playing');
        },
    });

    //Gerer le bouton qui genere audio
    function handleClickBtn (index){
        if(state.power){
            dispatch({type: 'SET_INDEX', setIndex: index});
            dispatch({type: 'SET_MSG'});
            dispatch({type: 'SET_CLASS'})
            sound.play();
            setTimeout(() => {
                dispatch({type: 'RESET_CLASS'})
            }, 200)
        }
    }

    //Gere les racourcies
    useEffect(() => {
        const handleKeyDown = (event) => {
            switch(event.keyCode){
                case 81: //Code Q
                    handleClickBtn(0);
                break;  
                case 87: //Code W
                    handleClickBtn(1);
                break;
                case 69: //Code E
                    handleClickBtn(2);
                break;
                case 65: //Code A
                    handleClickBtn (3);
                break;
                case 83: //Code S
                    handleClickBtn(4);
                break;
                case 68: //Code D
                    handleClickBtn(5);
                break;
                case 90: //Code Z
                    handleClickBtn(6);
                break;
                case 88: //Code X
                    handleClickBtn(7);
                break;
                case 67: 
                    handleClickBtn(8);
                break;
                default: //
                    
                break;
            }
        };
        
        document.addEventListener('keydown', handleKeyDown);
    
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, );

    return(
        <div className="ctn-div" >
            <div className="logo">
                <div className="inner-logo ">FCC&nbsp;(<Icon icon="fa:fire"/>)</div>
            </div>
            <div className="ctn_input-div">
                {DataSound.map((element, index) => (
                    <button onClick={() => handleClickBtn(index)} 
                            key={element.id} 
                            className= 'btn_imput'
                            style = {{ backgroundColor : state.localPos === index?  state.classBtn : 'grey'}}
                    >{element.id}
                    </button>
                ))}
                
            </div>
            <div className="ctn_output-div">
                <div className="select-state_Btn">
                    <h3 className="select-title">Power</h3>
                    <div onClick={handleClickPower}  className='select-div'>
                        <div  className= {`select-div-btn ${state.power? 'moved':''}`}></div>
                    </div>
                </div>
                <div className="ctn_output-scream">{state.message}</div>

                <input
                    type="range"
                    min="0"
                    max="100"
                    value={state.volume}
                    onChange={handleVolumeChange}
                    className="select_volume"
                />

                <div className="select-state_Btn">
                    <h3>Bank</h3>
                    <div onClick={handleClickBank} className='select-div'>
                        <div  className={`select-div-btn ${state.bank? 'moved':''}`}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Drump;