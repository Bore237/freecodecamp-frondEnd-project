import React, { useReducer, useEffect } from "react";
import './Calculator.css'
import {keyboardValue, operatorList} from './data'

function Calculator()
{
  const stateInit = {
    divOperator: false,
    mulOperator: false,
    plusOperator: false,
    moinsOperator: false,
    stateEgale: false,
    stateNegation: false,
    boardValue: '',
    setError: false,
    buffer: '',
    saveBuffer:'',
    result: '',
  }

  /**
   * Traite les different action de notre state
   * @param {object contenant nos state } state 
   * @param {Les differents actions de nos state} action 
   * @returns 
   */
  function reducer(state, action)
  {
    switch(action.type)
    {
      case 'CLEAR_DISPLAY':
        return ({...state, boardValue: ''})
      case 'TAKE_DATA':
        return ({...state, boardValue: action.takeData })
      case 'TAKE_BUFFER':
        return ({...state, buffer: action.takeBuffer })
      case 'CLEAR_BUFFER':
        return ({...state, buffer: ''})
      case 'LIMIT_BUFFER':
        return ({...state, saveBuffer: state.buffer })
      case 'TAKE_OPERATOR':
        return ({...state, buffer: action.takeOperator })
      case 'MOINS_OPERATOR':
        return ({...state, moinsOperator: action.play})
      case 'PLUS_OPERATOR':
        return ({...state, plusOperator: action.play})
      case 'DIV_OPERATOR':
        return ({...state, divOperator: action.play})
      case 'MUL_OPERATOR':
        return ({...state, mulOperator: action.play})
      case 'ERROR':
        return ({...state, setError: action.error})
      case 'NEGATION':
        return ({...state, stateNegation: action.negative})
      case 'SET_EGAL':
        return ({...state, stateEgale: true })
      case 'RESET_EGAL':
        return ({...state, stateEgale: false })
      case 'STORE_RESULT':
        return ({...state, result: action.setResult })
      default:
        return {state}
    }
  }

  const [state, dispatch] = useReducer(reducer, stateInit)

  /**
   * Activer en cas de presence de signe
   * @param {Operateur a mettre en action} element 
   * @param {true or false} action 
   */
  function setOperation(element, action){
    
    switch(element){
      case '+':
        dispatch({type: 'PLUS_OPERATOR', play: action});
        break;
      case '-':
        dispatch({type: 'MOINS_OPERATOR', play: action});
        break;
      case '/':
        dispatch({type: 'DIV_OPERATOR', play: action});
        break;
      case '*':
        dispatch({type: 'MUL_OPERATOR', play: action});
        break;
      default :
        break
    }
  }

  /**
   * Verifier si une operation est en cours
   * @param {Operateur a checked} element 
   * @returns Etat de operation que on veut souhaitez
   */
  function checkOperation(element){

    switch(element){
      case '+':
        return  state.plusOperator; 
      case '-':
        return  state.moinsOperator;
      case '/':
        return  state.divOperator;
      case '*':
       return state.mulOperator;
      case 'all':
        return (state.plusOperator | state.moinsOperator |
                state.divOperator  | state.mulOperator);
      default:
        break
    }
  }

  /**
   * 
   * @param {*} element 
   */
  function handleOperator(element){
    //s'il ya une operation
    if(operatorList.indexOf(element) >= 0){
      setOperation(element, true);

    //gerer egaliter
    if(state.stateEgale){
      dispatch({type: 'RESET_EGAL'});
  
    }

      if((checkOperation('all'))){
        //verifier si le prochain terme est moins
        if((element === '-') && (state.stateNegation === false)){
          if(state.boardValue.slice(-1) !== '-'){
            dispatch({type: 'TAKE_DATA', takeData: state.boardValue + element})
            dispatch({type: 'TAKE_BUFFER', takeBuffer: element});
            dispatch({type: 'NEGATION', negative: true});
          }
        }
        else if((state.stateNegation)){
          dispatch({type: 'TAKE_DATA', takeData: state.boardValue.slice(0, -2) + element})
          dispatch({type: 'TAKE_BUFFER', takeBuffer: element});
          dispatch({type: 'NEGATION', negative: false})
        }
        else{
          dispatch({type: 'TAKE_DATA', takeData: state.boardValue.slice(0, -1) + element})
          dispatch({type: 'TAKE_BUFFER', takeBuffer: element});
        }
      }
      else{
        //gerer egaliter
        if(state.stateEgale){
          dispatch({type: 'CLEAR_DISPLAY'});
          dispatch({type: 'RESET_EGAL'});
          dispatch({type: 'TAKE_BUFFER', takeBuffer: element});
        }else{
          dispatch({type: 'TAKE_DATA', takeData: state.boardValue + element})
          dispatch({type: 'TAKE_BUFFER', takeBuffer: element});
          dispatch({type: 'LIMIT_BUFFER'});
        }
      }
    }
    //si c'est un bouton
    else{

      if(checkOperation('all')){
        operatorList.forEach((containt) =>{
          setOperation(containt, false);
        })

        //desactiver la negation
        dispatch({type: 'NEGATION', negative: false})
        dispatch({type: 'TAKE_BUFFER', takeBuffer: element});
      }
      else{
        //gerer egaliter
        if(state.stateEgale){
          dispatch({type: 'CLEAR_DISPLAY'});
          dispatch({type: 'RESET_EGAL'});
          dispatch({type: 'TAKE_BUFFER', takeBuffer: element});
        }else{
          dispatch({type: 'TAKE_BUFFER', takeBuffer: state.buffer + element});
        }
      }
      dispatch({type: 'TAKE_DATA', takeData: state.boardValue + element})
      dispatch({type: 'LIMIT_BUFFER'});
    }
  }

  /**
   * 
   * @param {*} element 
   */
  function handleClick (element) 
  {
      if(state.buffer.length > 22)
      {
        dispatch({type: 'TAKE_BUFFER', takeBuffer: 'DIGIT LIMIT MIT'})

        setTimeout(() =>{
          dispatch({type: 'CLEAR_BUFFER'})
          dispatch({type: 'TAKE_BUFFER', takeBuffer: state.saveBuffer})
        }, 1000)
      }                                                                                                                               
      else
      {
        //Traiter affichage en cas operation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        switch(element)
        {
          case 'AC':
            dispatch({type: 'CLEAR_DISPLAY'});
            dispatch({type: 'CLEAR_BUFFER'});
            break;
            case '=':
              if(state.stateEgale){
                dispatch({type: 'TAKE_DATA', takeData: state.boardValue});
                dispatch({type: 'TAKE_BUFFER', takeBuffer: state.result});
                dispatch({type: 'LIMIT_BUFFER'});
              }else{
                //tester si Operateur
                try {
                  dispatch({type: 'STORE_RESULT', setResult: (eval(state.boardValue))}) ;
                  dispatch({type: 'TAKE_DATA', takeData: state.boardValue + element});
                  dispatch({type: 'SET_EGAL'});
                } catch (error) {
                  dispatch({type: 'ERROR', error: true});
                }
              }
            break;
          default:
            handleOperator(element)
            break;
        }
      }
  }

  /**
   * gerer l'effet sut le changement de state de egaliter
   */
  useEffect(() =>{
    if(state.stateEgale){
      dispatch({type: 'TAKE_BUFFER', takeBuffer: state.result})
      dispatch({type: 'TAKE_DATA', takeData: state.boardValue + state.result})
    }
    else{
      if((checkOperation('all'))){
        dispatch({type: 'TAKE_DATA', takeData:  state.result + state.buffer})      
      }
      else{
        dispatch({type: 'TAKE_DATA', takeData:  state.buffer })
      }
    }
  },[state.stateEgale,state.result])

  useEffect(() =>{
    if(state.setError){
      dispatch({type: 'TAKE_DATA', takeData: state.boardValue});
      dispatch({type: 'TAKE_BUFFER', takeBuffer: 'NAN'})
      dispatch({type: 'ERROR', error: false});
    }
  },[state.setError])
  
  const handledecimal = (type) =>{
    if(type ===  'buffer'){
      dispatch({type: 'TAKE_BUFFER', takeBuffer: '0.'})
    }else{
      dispatch({type: 'TAKE_DATA', takeData: '0.'});
    }
    return '0.'
  }

  return (
      <div className="container">
        <div className="display">
          <div className="display-result">{state.boardValue.length === 0 ? '0': state.boardValue === '.'? handledecimal('scren'): state.boardValue}</div>
          <div className="display-input">{state.buffer.length === 0 ? '0': state.buffer === '.'? handledecimal('buffer') :state.buffer}</div>
        </div>
        <div className="keyboard">
          {keyboardValue.map((element, index) => (
            <button key={index} onClick={() => {handleClick(element)}} className={`keyboard-btn btn${index}`}>{element}</button>
          ))}
        </div>
      </div>
  )
}

export default Calculator