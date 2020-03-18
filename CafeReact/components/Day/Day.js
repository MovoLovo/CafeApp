import { View, Text, StyleSheet, SectionList, ActivityIndicator, SafeAreaView, ScrollView } from "react-native";
import * as React from 'react';


export default class Day extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            data: {},
            todayNum: new Date().getDay(),
            todayLit: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][new Date().getDay()]
        }
    }
    
    async componentDidMount(){
        try{
            const response = await fetch(`https://b8ce0c62.ngrok.io/cafeapi/food?day=${this.state.todayNum}`);
            const data = await response.json();
            this.setState({
                data: data,
                isLoading: false,
            });
        } catch (err){
            console.log(error);
            throw error
        }
    }

    render(){

        if(this.state.isLoading){
            return(
                <View style={styles.activityIndicator}>
                    <ActivityIndicator />
                </View>
            );
        }
        
        console.log(this.state.data)
        return(
            <SafeAreaView style={styles.container}>
                <SectionList 
                    contentContainerStyle={styles.contentContainer}
                    style={styles.sectionList}
                    sections={this.state.data}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => (
                    <Text style={styles.item}>{ item }</Text>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.header}>{ title }</Text>
                    )}
                    ListHeaderComponent={
                        <Text style={styles.day}>Wed</Text>
                    }
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    day: {
        fontSize: 40,
        fontWeight: "700",
    },
    header: {
        fontSize: 32,
    },
    item:{
        fontSize: 20
    },
    sectionList: {
        paddingTop: 10,
        paddingHorizontal: 20,
        flex: 1,
    },
    contentContainer: {
        paddingBottom: 30,
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
