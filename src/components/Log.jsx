export default function Log({selectPlayerTurns}){

    return (
        <ol id="log">
           {
           selectPlayerTurns.map((turn, index)=>
            // template literals `${}`
            <li key={`${turn.square.row}${turn.square.col}`}> { 
                turn.player+ " selected "+turn.square.row+", "+turn.square.col
                } 
            </li> 
            )}
        </ol>
    );
}