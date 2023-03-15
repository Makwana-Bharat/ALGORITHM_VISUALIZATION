import React from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from "react-native"
import { FontAwesome5 } from '@expo/vector-icons';
const SearchBar = (props) => {
    return (
        <View style={{ width: '100%', alignItems: 'center' }} >
            <View style={Components.SearchBar}>
                <TextInput
                    onFocus={() => props.props.navigation.navigate("Search")}
                    placeholder='Search..'
                    placeholderTextColor={'#552E07'}
                    focusable={false}
                    style={{
                        width: '85%',
                        height: '100%',
                        paddingLeft: 30,
                        borderRadius: 15,
                        color: '#986736',
                        fontWeight: '500',
                    }} />
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        width: '15%',
                        alignItems: 'center'
                    }}>
                    <FontAwesome5 name="search" size={20} color="#552E07" /></TouchableOpacity>
            </View>
        </View>
    );
}
const Components = StyleSheet.create({
    SearchBar:
    {
        width: '90%',
        height: 40,
        backgroundColor: '#EAC498',
        borderRadius: 18,
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'space-between',
        shadowColor: '#853E17', shadowOffset: { width: 3, height: 3 }, shadowOpacity: .8, shadowRadius: 15, elevation: 3,
    }
});
export default SearchBar;