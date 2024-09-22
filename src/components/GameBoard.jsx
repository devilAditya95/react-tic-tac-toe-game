
export default function GameBoard({onActiveBox, board}){
    // const [gameBoard, setGameBoard] = useState(initialGBoard);

    // // State that depends on objects or array should be updated in an immutable way means create a copy of that 
       // array or object

    // function handleButtonClick(rowIndex, columnIndex){
    //     setGameBoard((prevGBoard) => {
    //        // const updateGBoard = [...prevGBoard];
    //         const updateGBoard = [...prevGBoard.map(innerArray => [...innerArray])];
    //         updateGBoard[rowIndex][columnIndex] = activePlayerSymbol;
    //         console.log(updateGBoard);
    //         return updateGBoard;
         
    //     })
    //     console.log(initialGBoard)

    //     // lifting up state
    //     onActiveBox();
    // }
    
    return (
        <ol id="game-board">
            {board.map((row, rowIndex)=> 
            <li key={rowIndex} > 
                <ol>
                    {row.map((playerSymbol, columnIndex)=>
                        <li key={columnIndex}>
                            <button onClick={() => onActiveBox(rowIndex, columnIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button>
                        </li>
                    )}
                </ol>
            </li>
            )}
        </ol>
    );
}