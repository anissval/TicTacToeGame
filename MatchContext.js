import React, {createContext, useState} from "react";
import {movementsData} from "./mocks/movementsData";


export const MatchContext = createContext();

const MatchProvider = (props) => {
    const cross = 'cross';
    const circle = 'circle';
    const [gameMovements, setGameMovements] = useState(movementsData);
    const [player, setPlayer] = useState(cross);
    const [winnerLine, setWinnerLine] = useState([]);
    const [gameResults, setGameResults] = useState(['cross', 'circle', 'cross']);

    const addMovement = (id) => {
        const newEntry = {img: (player + '.png'), content: player, id: id, winner: 0};
        const gameFiltered = gameMovements.filter((move) => move.id !== id);
        const newGameMovements = [...gameFiltered, newEntry].sort((a, b) =>
            (a.id > b.id) ? 1 : -1);
        setGameMovements(newGameMovements);
        // switch player turn
        if (player === circle) {
            setPlayer(cross)
        } else {
            setPlayer(circle)
        }
    }

    const endGame = () => {
        const modifyWinnerValues = () => {
            const gameFiltered = gameMovements.filter((move) => move.id !== winnerLine[0] || move.id !== winnerLine[1] || move.id !== winnerLine[2]);
            gameMovements.map((move) => {
                if (move.id === winnerLine[0] || move.id === winnerLine[1] || move.id === winnerLine[2]) {
                    const newEntry = {img: move.img, content: move.content, id: move.id, winner: 1};
                    setGameMovements([...gameFiltered, newEntry]);
                }
            })
        }
    }

    const validateGame = () => {
        if ((gameMovements[0].content === gameMovements[1].content) && (gameMovements[0].content === gameMovements[2].content) && gameMovements[0].content !== 'none') {
            const newWinner = [...winnerLine, 1, 2, 3]
            setWinnerLine(newWinner);
            const result = gameMovements[0].content;
            setGameResults([...gameResults, result]);
        } else if ((gameMovements[3].content === gameMovements[4].content) && (gameMovements[3].content === gameMovements[5].content) && gameMovements[3].content !== 'none') {
            setWinnerLine([...winnerLine, 4, 5, 6]);
            const result = gameMovements[3].content;
            setGameResults([...gameResults, result]);
        } else if ((gameMovements[6].content === gameMovements[7].content) && (gameMovements[6].content === gameMovements[8].content) && gameMovements[6].content !== 'none') {
            setWinnerLine([...winnerLine, 7, 8, 9]);
            const result = gameMovements[6].content;
            setGameResults([...gameResults, result]);
        } else if ((gameMovements[0].content === gameMovements[3].content) && (gameMovements[6].content === gameMovements[0].content) && gameMovements[0].content !== 'none') {
            setWinnerLine([...winnerLine, 1, 4, 7]);
            const result = gameMovements[0].content;
            setGameResults([...gameResults, result]);
        } else if ((gameMovements[1].content === gameMovements[4].content) && (gameMovements[7].content === gameMovements[1].content) && gameMovements[1].content !== 'none') {
            setWinnerLine([...winnerLine, 2, 5, 8]);
            const result = gameMovements[1].content;
            setGameResults([...gameResults, result]);
        } else if ((gameMovements[2].content === gameMovements[5].content) && (gameMovements[2].content === gameMovements[8].content) && gameMovements[2].content !== 'none') {
            setWinnerLine([...winnerLine, 3, 6, 9]);
            const result = gameMovements[2].content;
            setGameResults([...gameResults, result]);
        } else if ((gameMovements[0].content === gameMovements[4].content) && (gameMovements[0].content === gameMovements[8].content) && gameMovements[0].content !== 'none') {
            setWinnerLine([...winnerLine, 1, 5, 9]);
            const result = gameMovements[0].content;
            setGameResults([...gameResults, result]);
        } else if ((gameMovements[2].content === gameMovements[4].content) && (gameMovements[2].content === gameMovements[6].content) && gameMovements[2].content !== 'none') {
            setWinnerLine([...winnerLine, 3, 5, 7]);
            const result = gameMovements[2].content;
            addResult(result);
        }
        if (winnerLine.length > 0) {
            endGame();
        }
    }

    const resetGame = () => {
        setGameMovements(movementsData);
        setWinnerLine([])
    }

    const addResult = (result) => {
        if (gameResults.length < 10) {
            setGameResults([...gameResults, result]);
        }
    }
    const resetResults = () => {
        setGameResults([]);
    }
    return (
        <MatchContext.Provider
            value={{
                gameMovements,
                addMovement,
                validateGame,
                endGame,
                winnerLine,
                gameResults,
                resetGame,
                resetResults
            }}>{props.children}</MatchContext.Provider>
    )
}

export default MatchProvider;
