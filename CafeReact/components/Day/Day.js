import {
    View,
    Text,
    StyleSheet,
    SectionList,
    ActivityIndicator,
    TouchableOpacity,
    Dimensions,
    ImageBackground
} from "react-native";
import Icon from 'react-native-vector-icons/AntDesign'
import * as React from 'react';


export default class Day extends React.Component{
    constructor(props){
        super(props)
        let queriedDay = props.day === undefined ? new Date().getDay() : props.day;
        this.state = {
            isLoading: true,
            data: {},
            todayNum: queriedDay,
            todayLit: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][queriedDay],
            isQueried: !(props.day === undefined),
            nav: props.nav
        }
    }
    
    async componentDidMount(){
        try{
            const response = await fetch(`https://88a07c86.ngrok.io/cafeapi/food?day=${this.state.todayNum}`);
            const data = await response.json();
            this.setState({
                data: data,
                isLoading: false,
            });
        } catch (error){
            console.log(error);
            throw error
        }
    }

    noContent = ( section ) => {
        if(section.data == 0){
            return(
                <View>
                    <Text style={styles.header}>{ section.title }</Text>
                    <Text style={styles.item}>  •    There is no menu for this meal</Text>
                </View>
            );
        }
        
        return(
            <Text style={styles.header}>{ section.title }</Text>
        );
    }

    render(){
        if(this.state.isLoading){
            return(
                <ImageBackground style={styles.activityIndicator} source={require('../../images/background.jpg')}>
                    <ActivityIndicator style={styles.indicatorWheel}/>
                </ImageBackground>
            );
        }

        if(!this.state.isQueried){
            return(
                <ImageBackground style={styles.container} source={require('../../images/background.jpg')}>
                    <SectionList 
                        contentContainerStyle={styles.contentContainer}
                        style={styles.sectionList}
                        sections={this.state.data}
                        keyExtractor={(item, index) => item + index}
                        
                        renderItem={({ item }) => (
                            <Text style={styles.item}>  •    { item }</Text>
                        )}

                        renderSectionHeader={({ section }) => this.noContent(section)}

                        ListHeaderComponent={
                            <View style={styles.sectionListHeaderBox}>
                                <Text style={styles.day}>{this.state.todayLit} - Today</Text>
                            </View>
                        }
                        renderSectionFooter={() => <View style={styles.listFooter}></View>}
                    />
                </ImageBackground>
            );
        }

        return(
            <ImageBackground style={styles.container} source={require('../../images/background.jpg')}>
                <SectionList 
                    contentContainerStyle={styles.contentContainer}
                    style={styles.sectionList}
                    sections={this.state.data}
                    keyExtractor={(item, index) => item + index}

                    renderItem={({ item }) => (
                        <Text style={styles.item}>  •    { item }</Text>
                    )}

                    renderSectionHeader={({ section }) => this.noContent(section)}

                    ListHeaderComponent={
                        <View style={styles.sectionListHeaderBox}>
                            <Text style={styles.day}>{this.state.todayLit}</Text>
                            <TouchableOpacity style={styles.backButton}
                                onPress={() => this.state.nav.navigate('Details')}
                            >
                                <Icon style={styles.icon} name='left' size={(Dimensions.get("window").height) * .063}/>
                            </TouchableOpacity>
                        </View>
                    }
                    renderSectionFooter={() => <View style={styles.listFooter}></View>}
                />
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    day: {
        fontSize: (Dimensions.get("window").width) * .11,
        flex: 6,
        color: 'yellow',
    },
    header: {
        fontSize: (Dimensions.get("window").width) * .085,
        color: 'white',
    },
    item:{
        fontSize: (Dimensions.get("window").width) * .048,
        color: 'white',
    },
    sectionList: {
        paddingTop: 10,
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    contentContainer: {
        paddingBottom: 30,
    },
    activityIndicator: {
        alignItems: 'stretch',
        flex: 1,
    },
    backButton: {
        flex: 1
    },
    sectionListHeaderBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'yellow',
        borderBottomWidth: 2,
        paddingBottom: 5,
        marginBottom: 15,
    },
    listFooter: {
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
        borderTopColor: 'transparent',
        borderBottomColor: 'white',
        borderWidth: 1,
        paddingTop: 15,
        marginBottom: 15
    },
    icon: {
        color: 'yellow'
    },
    indicatorWheel: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    }
})
