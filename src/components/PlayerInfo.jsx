import { useState } from "react";

export default function PlayerInfo(props){
    const [playerName, setPlayerName] = useState(props.initialName);
    const [isEditing, setIsEditing] = useState(false);
    //console.log(isEditing);
    function handleClick(){
        // In React when updating your state bases on the previous value of that state
        // we should pass a function to that state updating function
        
        // if your new state depends on your previous state value you should not update like this 
        // setIsEditing(isEditing ? false : true);  or setIsEditing(!isEditing);  - it schedule a state update to true initially
        setIsEditing((editing) => !editing);
        //console.log("Pre", isEditing)
        if(isEditing){
            props.onChangeName(props.symbol, playerName);
        }
        
    }

    // other option defaultValue prop set in input to change but it will not be saved
    function handleChange(event){
        console.log(event)
        setPlayerName(event.target.value);
    }
    
    return (
    <li className={props.isActive ? 'active' : null}>
        <span className="player">
          {isEditing ? 
          (<input type="text" required value={playerName} onChange={handleChange}/>) : 
          (<span className="player-name">{playerName}</span>) 
          }
          <span className="player-symbol">{props.symbol}</span>
        </span>
        <button onClick={handleClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
    );
}