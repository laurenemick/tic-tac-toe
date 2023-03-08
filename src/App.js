import "./App.css";
import { useEffect, useState } from "react";

function Square({ value, onClick }) {
  return <button className="square" onClick={onClick}>{value}</button>
}

function isWinner(board, setWinner) {
  const lines = [
      [0, 1, 2], 
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
  ];

  lines.forEach(currLine => {
    let [first, second, third] = currLine
    if (board[first] && board[first] === board[second] && board[first] === board[third]) {
      setWinner(board[first])
    } 
  })

}

function App() {
  const [boards, setBoards] = useState(Array(9).fill(Array(9).fill("")))
  const [player, setPlayer] = useState("X")
  const [winner, setWinner] = useState("")
  const [currBoardsIdx, setCurrBoardsIdx] = useState(0)
  const isAgainstComputer = false // didn't have enough time :/
  let status = 'Next player: ' + player

  const handleClick = (squareIdx, boardIdx) => {
    if (player === "O" && isAgainstComputer) {

    }

    setCurrBoardsIdx(boardIdx)

    const newBoards = [...boards]
    newBoards[boardIdx] = (boards[boardIdx]).map((val, idx) => {
      return idx === squareIdx && val === "" ? player : val
    })
    setBoards(newBoards)

    player === "X" ? setPlayer("O") : setPlayer("X")
  }

  useEffect(() => {
    isWinner(boards[currBoardsIdx], setWinner)
  }, [boards])

  useEffect(() => {
      if (winner === "") return 

      const newBoards = [...boards]
      newBoards[currBoardsIdx] = Array(9).fill(winner)
      setBoards(newBoards)
  }, [winner])

  return (
    <div className="App">
      <h2>{status}</h2>
      {/* <button onClick={() => isAgainstComputer(true)}>Play against computer</button> */}

      <div className="games">
        {[0, 9, 18, 27, 36, 45, 54, 63, 72].map((val, i) => (
          <div className="game" key={i}>
            <div className="board">
              <div className="row">
                <Square value={boards[i][0]} onClick={() => handleClick(0, i)} />
                <Square value={boards[i][1]} onClick={() => handleClick(1, i)} />
                <Square value={boards[i][2]} onClick={() => handleClick(2, i)} />
              </div>
              <div className="row">
                <Square value={boards[i][3]} onClick={() => handleClick(3, i)} />
                <Square value={boards[i][4]} onClick={() => handleClick(4, i)} />
                <Square value={boards[i][5]} onClick={() => handleClick(5, i)} />
              </div>
              <div className="row">
                <Square value={boards[i][6]} onClick={() => handleClick(6, i)} />
                <Square value={boards[i][7]} onClick={() => handleClick(7, i)} />
                <Square value={boards[i][8]} onClick={() => handleClick(8, i)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;
