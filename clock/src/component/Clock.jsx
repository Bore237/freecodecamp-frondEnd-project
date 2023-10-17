import { Icon } from '@iconify/react';
import { useReducer, useEffect } from 'react';
import { titleBtnData } from './datas'
import { Howl } from 'howler';
import './Clock.css'

function Clock(){
    const initialState = {
        seconde: 0,
        currentAction: 'Session',
        minute: 25,
        play: false,
        reset: false,
        breakValue: 5,
        sesionValue: 25
    }
    
    function reducer(state, action){
        switch(action.type){
            case 'INIT_BREAK':
                return{...state, breakValue: 5}
            case 'INIT_SESION':
                return{...state, sesionValue: 25};
            case 'INCREAS_BREAK':
                return{...state, breakValue: state.breakValue + 1}
            case 'INCREAS_SESION':
                return{...state, sesionValue: state.sesionValue + 1};
            case 'DECREAS_BREAK':
                return{...state, breakValue: state.breakValue - 1};
            case 'DECREAS_SESION':
                return{...state, sesionValue: state.sesionValue - 1};
            case 'PLAY_ON_OFF':
                return{...state, play: action.playPause};
            case 'SET_MINUTE':
                return{...state, minute: action.updateMin};
            case 'DECREAS_SECONDE':
                return{...state, seconde: state.seconde - 1};
            case 'SET_SECONDE':
                return{...state, seconde: action.updateSec};
            case 'SET_ACTION':
                return{...state, currentAction: action.updateAction};           
            default:
                break;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

     //Gerer activation de audio 
     const sound =new Howl({
        src: 'component/alarm.mp3',
        autoplay: false,
        loop: false,
        volume: 1,
        onplay: () => {
            console.log('Audio started playing');
        },
        onend: () => {
            console.log('Audio finished playing');
        },
    });
    

    const handleClickUp = (index) =>{
        if(state.play === false)
        {
            if (index === 0){
                if (state.breakValue < 60){
                    dispatch({type: 'INCREAS_BREAK'})
                }
            }else{
                if (state.sesionValue < 60){
                    dispatch({type: 'INCREAS_SESION'}) 
                }      
            }
        }
    }

    const handleClickDown = (index) =>{
        if(state.play === false)
        {
            if (index === 0){
                if (state.breakValue > 1){
                    dispatch({type: 'DECREAS_BREAK'})
                }
            }else{
                if (state.sesionValue > 1){
                    dispatch({type: 'DECREAS_SESION'}) 
                }      
            }
        }
    }
    
    const handleClickReload = () =>{
        dispatch({type:'PLAY_ON_OFF', playPause: false})
        dispatch({type:'SET_ACTION', updateAction: 'Session'})   
        dispatch({type:'SET_MINUTE', updateMin: state.sesionValue})
        dispatch({type:'SET_SECONDE', updateSec: 0})
        dispatch({type:'INIT_BREAK'})
        dispatch({type:'INIT_SESION'})  
    }

    function handleTime(){
        dispatch({type:'DECREAS_SECONDE'})
    }

    const handleClickPlay = () =>{
        dispatch({type:'PLAY_ON_OFF', playPause: (state.play ? false: true)})
    }

    useEffect(() => {
        let intervalId;
    
        if (state.play) {
          intervalId = setInterval(() => {
            handleTime();
          }, 300);
        }
    
        return () => {
          clearInterval(intervalId);
        };
      }, [state.play]);

    useEffect(() =>{
        if((state.seconde < 0) && (state.minute > 0) ){
            dispatch({type:'SET_MINUTE', updateMin: state.minute - 1})
            dispatch({type:'SET_SECONDE', updateSec: 59})
        }
        if((state.minute <= 0) && (state.seconde < 0)){
            if(state.currentAction === 'Session'){
                sound.play();
                dispatch({type:'SET_MINUTE', updateMin: state.breakValue})
                dispatch({type:'SET_SECONDE', updateSec: 0})
                dispatch({type:'SET_ACTION', updateAction: 'Break'})   
            }else{
                dispatch({type:'SET_ACTION', updateAction: 'Session'})   
            }
        }
    },[state.seconde])

    useEffect(() =>{
        if(state.currentAction === 'Session'){
            dispatch({type:'SET_MINUTE', updateMin: state.sesionValue})
            dispatch({type:'SET_SECONDE', updateSec: 0})
        }else{
            dispatch({type:'SET_MINUTE', updateMin: state.breakValue})
            dispatch({type:'SET_SECONDE', updateSec: 0})
        }
    },[state.sesionValue, state.breakValue, state.currentAction])

    return(
        <div className='clock-ctn'>
            <h1 className="title">25 + 5 Clock</h1>
            <div className="group-setbtn">
                {titleBtnData.map((element, index) =>(
                    <span key={element+index} className="btn-style">
                        <p className="name-btn">{ element + ' Length'}</p>
                        <div className="icon-group-btn">
                            <span className = '' onClick={() => {handleClickUp(index)}} >
                                <Icon className='icon-up-down' 
                                icon="fa:arrow-up" width="30" height="40"/>
                            </span>
                            <div className='value-btn'>{index === 0 ? state.breakValue : state.sesionValue}</div>
                            <span  onClick={() => {handleClickDown(index)}}>
                                <Icon  className='icon-up-down'  
                                icon="fa:arrow-down" width="30" height="40"/>
                            </span>
                        </div>
                    </span>
                ))}
            </div>

            <div className='screem' style={{color: state.minute >= 1 ?'white':'red'}} >
                <h2 className='header-screem'>{state.currentAction}</h2>
                <div className='containt-screem'>
                    {`${state.minute < 10? '0'+state.minute : state.minute}` +
                    ':' +
                    `${state.seconde < 10? '0'+state.seconde : state.seconde}`}
                </div>
            </div>
            <div className='group-runbtn'>
                <Icon onClick={handleClickPlay} icon="mdi:play-pause"  width="60" height="80"/>
                <Icon onClick={handleClickReload} icon="ci:arrows-reload-01"  width="60" height="80" />
            </div>
            <footer>
                <p className='authors'>Designed and Code by</p>
            </footer>
        </div>
    )
}

export default Clock;