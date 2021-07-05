import React from 'react';
import {ScoreBoard} from "./Components/ScoreBoard/ScoreBoard";
import MatchProvider from "./MatchContext";
import TicTacToeBoard from "./Components/TicTacToeBoard/TicTacToeBoard";

const App = () => {
    return (
        <MatchProvider>
            <TicTacToeBoard></TicTacToeBoard>
            <ScoreBoard></ScoreBoard>
        </MatchProvider>
    )
}

export default App;
