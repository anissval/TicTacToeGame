import React, {useContext, useEffect, useState} from 'react';
import {Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MatchContext} from "../../MatchContext";

const TicTacToeBoard = () => {
    const {validateGame, gameMovements, addMovement, endGame, winnerLine, resetGame} = useContext(MatchContext);
    const [title, setTitle] = useState('TIC TAC TOE GAME');

    useEffect(() => {
        validateGame();
    }, gameMovements)

    const handleOnclickTile = (id) => {
        const square = gameMovements.filter((entry) => (entry.id === id))[0];
        if ((winnerLine.length === 0) && (square.content === 'none')) {
            addMovement(id);
        }
    }

    const reset = () => {
        resetGame();
    }

    const item = ({item, index}) => {
        let backgroundColor = '';
        if (winnerLine.length > 0) {
            if ((item.id === winnerLine[0] || item.id === winnerLine[1] || item.id == winnerLine[2])) {
                backgroundColor = '#e6ee9c';
            } else {
                backgroundColor = '#e0e0e0';
            }
        } else {
            if (item.id === 1 || item.id === 3 || item.id === 5 || item.id === 7 || item.id === 9) {
                backgroundColor = '#e6ee9c';
            } else {
                backgroundColor = '#e0e0e0';
            }
        }
        let tileImage = '';
        if (item.content === 'cross') {
            tileImage = require('../../assets/cross.png');
        } else if (item.content === 'circle') {
            tileImage = require('../../assets/circle.png');
        }
        return (
            <View>
                <TouchableOpacity onPress={() => handleOnclickTile(item.id)}>
                    <Image
                        style={{
                            width: 100, height: 100, backgroundColor: backgroundColor,
                            position: 'relative'
                        }}
                        source={tileImage}/>
                </TouchableOpacity>
            </View>
        )
    }

    return (<View>
            <View style={boardStyle.title}><Text>{title}</Text></View>
            <View style={boardStyle.flatList}>
                <FlatList data={gameMovements} numColumns={3} renderItem={item} keyExtractor={item => item.id} />
            </View>
            <View>
                <Button style={{margin: 5}} onPress={() => reset()} title='Reset Game'></Button>
            </View>
        </View>
    )
};

const boardStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },

    item: {
        backgroundColor: 'orange',
        width: 'deviceWidth / 2',
        height: 'deviceWidth / 2'
    },
    image: {
        width: '1rem',
        height: '1rem'
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: '#b0bec5',
        margin: '20'
    },
    flatList: {
        textAlign: 'center',
        alignItems: 'center',
    },
    title: {
        margin: 20,
        alignItems: 'center',
        textAlign: 'center',
    },
    reset: {
        margin: '2%',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    }
})

export default TicTacToeBoard;
