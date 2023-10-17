import React, {useEffect, useReducer } from 'react';
import './Quote.css'
import {Colors} from './data'
import { Icon } from '@iconify/react';

function Quote(){
    const URL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

    const initialState = {
        data: [],
        random: 0,
        countColor: 0,
        dataQuote: '',
        dataAuthor: '',
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'LOAD_DATA':
                return { ...state, data: action.payload };
            case 'RANDOM':
                return { ...state, random:  action.payload};
            case 'SET_COLOR':
                return { ...state, countColor: state.countColor + 1};
            case 'INIT_COLOR':
                return { ...state, countColor: 0};
            case 'SET_QUOTE':
                return { ...state, dataQuote: action.payload };
            case 'SET_AUTHOR':
                return { ...state, dataAuthor: action.payload };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

  // Utilisation de state.count et state.message dans le reste du composant
    
    //set data
    function  setData (data, position){
        const {quote, author} = data[position]
        dispatch({type: 'SET_QUOTE', payload: quote})
        dispatch({type: 'SET_AUTHOR', payload: author})
    }

    useEffect(() =>{
        const fetchData = async (url) => {
            try{
                const response = await fetch(url);
                const jsonResponse = await response.json();
                const {quotes} = jsonResponse
                dispatch({ type: 'LOAD_DATA', payload: quotes })
                setData(quotes, Math.floor(Math.random() * (quotes.length)))
            }
            catch(error){
                console.error('Une erreur s\'est produite lors de la récupération des données:', error);
            }
        }
        fetchData(URL);
    },[])

    //Changer de citation 
    const clickQuote = () =>{
        //Generer le nombre aleatoire
        dispatch({type: 'RANDOM', payload:Math.floor(Math.random() * (state.data.length))});

        //Extraire le message
        setData(state.data, state.random);
        
        //set Colors
        (state.countColor < Colors.length? dispatch({type: 'SET_COLOR'}) : dispatch({type: 'INIT_COLOR'}));
        console.log(state.countColor+1)
    }


    return (
        <div style={{ backgroundColor: Colors[state.countColor]}} className='containt_all' > 
          <div className = 'containt'> 
            <h1 style={{ color: Colors[state.countColor]}}className = 'quote-h1'><Icon icon="fa:quote-left" width="30"/> {state.dataQuote}</h1>
            <h3 style={{ color: Colors[state.countColor]}} className = 'authors-h2'>{state.dataAuthor }</h3> 
            <div className='containt_btn-div'>
                <a 
                    style={{ backgroundColor: Colors[state.countColor]}}
                    className = 'containt_btn-div-button twiter' 
                    href={'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
                     encodeURIComponent('"' + state.dataQuote + '" ' + state.dataAuthor)}
                ><Icon icon="fa:twitter" color="white" width='40' height='40'/></a>
                <a 
                    style={{ backgroundColor: Colors[state.countColor]}}
                    className = 'containt_btn-div-button Btn1' 
                    href={'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
                    encodeURIComponent( state.dataAuthor) + '&content=' + encodeURIComponent(state.dataQuote) +
                    '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'}
                ><Icon icon="entypo-social:tumblr" color="white" width='40' height='40'/></a>
                <button 
                    style={{ backgroundColor: Colors[state.countColor]}}
                    className = 'containt_btn-div-button Btn' 
                    onClick={clickQuote}>
                New Quote</button>
            </div>
            </div>
            <h4 style={{ color: 'white'}}>By Borel</h4>
        </div>
    );
}

export default Quote;

