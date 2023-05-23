import { useState } from "react";

type square = {
  value:string;
  onSquareClicked:()=>void
}
function Square({ value, onSquareClicked }:square) {
  return (
      <button className="square" onClick={onSquareClicked}>
        {value}
      </button>
  );
}

export default function Board() {
  const [xIsNext,setXIsNext] = useState<boolean>(true)
  const [squares, setSquares] = useState<string[]>(Array(9).fill(null));
  const handleClick = (index:number) => {
    if(squares[index]||calculateWinner(squares))
      return
    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext?"x":"o";
    //here update the original squares, so if above makes sense
    setSquares(nextSquares);
    setXIsNext(pre=>!pre)
  };

  const winner = calculateWinner(squares)
  let result = ""
  if(winner){
    result="the winner is "+winner
  }else{
    result="next player is "+ (xIsNext?"x":"o")
  }

  return (
      <>
        <div>{result}</div>
        <div className="board-row">
          <Square value={squares[0]} onSquareClicked={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClicked={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClicked={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClicked={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClicked={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClicked={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClicked={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClicked={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClicked={() => handleClick(8)} />
        </div>
      </>
  );
}

function calculateWinner(squares:string[]){
  const winList = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  for(let i=0;i<winList.length;i++){
    const [a,b,c] = winList[i];
    if(squares[a]&&squares[a]===squares[b]&&squares[a]===squares[c]){
      return squares[a]
    }
  }
  return null


}
