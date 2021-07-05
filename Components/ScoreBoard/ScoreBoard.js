import React, {useContext, useState} from "react";
import {MatchContext} from "../../MatchContext";
import {Image, Text, View, StyleSheet, FlatList, Button} from "react-native";

export const ScoreBoard = () => {
    const {gameResults,resetResults} = useContext(MatchContext);
    const [title, setTitle] = useState('SCORE TABLE')

    const resetScore = ()=> {
        resetResults();
    }

    const ScoreHeader = () => {
        return (
            <View style={scoreBoard.board}>
                <View key={'cross'}>
                    <Image
                        style={{
                            width: 20, height: 20,
                            position: 'relative'
                        }}
                        source={require('../../assets/cross.png')}/>
                </View>
                <View key={'circle'}>
                    <Image
                        style={{
                            width: 20, height: 20,
                            position: 'relative'
                        }}
                        source={require('../../assets/circle.png')}/>
                </View>
            </View>)

    }

    const item = ({item}) => {
        if (gameResults.length > 0) {
            return (
                <View style={scoreBoard.results}>
                    <View>
                        <Text> {(item === 'cross') ? 'winner' : ''}</Text>
                    </View>
                    <View>
                        <Text>{(item === 'circle') ? 'winner' : ''}</Text>
                    </View>
                </View>
            )
        }
    }

    return (
        <View style={{backgroundColor: '#e1bee7'}}>
            <View style={scoreBoard.title}><Text>{title}</Text></View>
            <ScoreHeader></ScoreHeader>
            <FlatList data={gameResults} numColumns={1} renderItem={item}>
            </FlatList>
            {(gameResults.length > 0) && <Button style={{margin: 5}} onPress={()=>{resetScore()}} title={'Reset Score'}></Button>}
        </View>
    )
};

const scoreBoard = StyleSheet.create({
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
        width: '60',
        height: '60',
    },
    title: {
        margin: 10,
        alignItems: 'center',
        textAlign: 'center',
    },
    board: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        textAlign: 'center',
    },
    results: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        //listStyle: 'none',
        textAlign: 'center',
        backgroundColor: '#e0e0e0'
    }
});

export default ScoreBoard;
