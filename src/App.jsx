import { useState } from "react";
import GameBoard from "./components/GameBoard";
import PlayerInfo from "./components/PlayerInfo";
import Log from "./components/Log";
import Gameover from "./components/Gameover";
import { WINNING_COMBINATIONS  } from "./winning-combinations";

const DEFAULT_PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2'
};
const INITIAL_GBOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function derivedActivePlayer(gameTurns){
  let currentPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function derivedGameboard(gameTurns){
  let gameBoard = [...INITIAL_GBOARD.map((array) => [...array])];  // Deep copy of an array or object

  for(const turn of gameTurns){
      const {square, player} = turn;
      const {row, col} = square;

      gameBoard[row][col] = player;
  }

  return gameBoard;
}

function derivedWinner(gameBoard, playerName){
  let winner; 

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    

    if(firstSquareSymbol && 
      firstSquareSymbol === secondSquareSymbol && 
      firstSquareSymbol === thirdSquareSymbol){
        winner = playerName[firstSquareSymbol];
        //console.log('win', winner)
    }
  }
  return winner;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerName, setPlayerName] = useState(DEFAULT_PLAYERS);
 // const [activePlayer, setActivePlayer] = useState('X');
 // const [hasWinner, setHasWinner] = useState(false);
  const activePlayer = derivedActivePlayer(gameTurns);
  const gameBoard = derivedGameboard(gameTurns);

  const winner = derivedWinner(gameBoard, playerName);
    
  let draw = false;
  // For match draw
  if(gameTurns.length === 9 && !winner){
    draw = true;
  }

  function handleSelectBox(rowIndex, columnIndex){
   // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X' );

   // State that depends on objects or array should be updated in an immutable way 
   // && donot merge different states in one update state function
    setGameTurns((prevTurns) => {

      const currentPlayer = derivedActivePlayer(prevTurns);
      const updTurns = [
        {square : {row : rowIndex, col : columnIndex }, player: currentPlayer}, 
        ...prevTurns
      ]
      console.log('prev', prevTurns );
      console.log('curr', updTurns);
      return updTurns;
    });
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayerName((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName
      }
    });
    //console.log('previous', playerName)
  }
  //console.log('current', playerName['X']);

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <PlayerInfo initialName={DEFAULT_PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} />
          <PlayerInfo initialName={DEFAULT_PLAYERS['O']} symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
        </ol>
        {winner ? <Gameover winner={winner} rematch={handleRestart}/> : (draw && <Gameover rematch={handleRestart} />) }
        
        <GameBoard onActiveBox={handleSelectBox} board={gameBoard} />
      </div>
     <Log selectPlayerTurns={gameTurns}/>
    </main>
  )
}

export default App
