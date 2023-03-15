import * as React from "react";
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import ProgressiveImage from "../Componets/ProgressiveImage";

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true, search: "" };
        this.arrayholder = [];
    }
    async componentDidMount() {
        return await fetch(
            "https://algorithmvisualization.000webhostapp.com/Project/API/All_Algorithms.php"
        )
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState(
                    {
                        isLoading: false,
                        dataSource: responseJson,
                    },
                    function () {
                        this.arrayholder = responseJson;
                    }
                );
            })
            .catch((error) => {
                console.error(error);
            });
    }

    search = (text) => {
        console.log(text);
    };

    SearchFilterFunction(text) {
        //passing the inserted text in textinput
        const newData = this.arrayholder.filter(function (item) {
            //applying filter for the inserted text in search bar
            const itemData = item.NAME ? item.NAME.toUpperCase() : "".toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });

        this.setState({
            //setting the filtered newData on datasource
            //After setting the data it will automatically re-render the view
            dataSource: newData,
            search: text,
        });
    }

    SearchBar = () => {
        return (
            <View style={{ width: "100%", alignItems: "center" }}>
                <View style={Components.SearchBar}>
                    <TouchableOpacity
                        style={{
                            justifyContent: "center",
                            width: "15%",
                            alignItems: "center",
                        }}
                    >
                        <FontAwesome5 name="search" size={20} color="#552E07" />
                    </TouchableOpacity>
                    <TextInput
                        placeholder="Search.."
                        placeholderTextColor={"#552E07"}
                        onChangeText={(text) => this.SearchFilterFunction(text)}
                        value={this.state.search}
                        style={{
                            width: "70%",
                            height: "100%",
                            paddingLeft: 10,
                            borderRadius: 15,
                            color: "#986736",
                            fontWeight: "500",
                        }}
                    />
                    {this.state.search != "" ? (
                        <TouchableOpacity
                            style={{
                                justifyContent: "center",
                                width: "15%",
                                alignItems: "center",
                            }}
                            onPress={() => {
                                this.setState({
                                    search: "",
                                });
                            }}
                        >
                            <AntDesign name="close" size={20} color="#552E07" />
                        </TouchableOpacity>
                    ) : (
                        <></>
                    )}
                </View>
            </View>
        );
    };
    render() {
        return (
            <View style={styles.viewStyle}>
                <this.SearchBar />
                {this.state.isLoading ? (
                    <ActivityIndicator color={"red"} size={"large"} />
                ) : (
                    <FlatList
                        style={{ height: "73%" }}
                        data={this.state.dataSource}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() =>
                                    this.props.navigation.navigate("PlayGround", { item })
                                }
                            >
                                <View
                                    style={{ flexDirection: "row", margin: 15, marginBottom: 2 }}
                                >
                                    <View>
                                        <ProgressiveImage
                                            defaultImageSrc={{ uri: "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/0d8f5954284fa1865ff2a6d52454330a" }}
                                            actualImageSrc={{ uri: item.IMAGE }}
                                            style={{
                                                height: 95,
                                                width: 164,
                                                borderRadius: 15,
                                                backgroundColor: "#EAC498",
                                            }}
                                            resizeMode="cover"
                                        />
                                    </View>
                                    <View style={{ margin: 15 }}>
                                        <Text
                                            style={{
                                                fontSize: 22,
                                                fontWeight: "bold",
                                                color: "#853E17",
                                            }}
                                        >
                                            {item.NAME}
                                        </Text>
                                        <Text
                                            style={{ marginTop: 6, color: "rgba(133,62,23,.76)" }}
                                        >
                                            #{item.TYPE} #Algorithms
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ alignItems: "center", marginTop: 5 }}>
                                    <View
                                        style={{
                                            borderWidth: 0.5,
                                            borderColor: "#552E07",
                                            width: "95%",
                                            opacity: 0.1,
                                        }}
                                    />
                                </View>
                            </TouchableOpacity>
                        )}
                        enableEmptySections={true}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        backgroundColor: "#F4DEC6",
    },
});

const Components = StyleSheet.create({
    SearchBar: {
        width: "90%",
        height: 40,
        backgroundColor: "#EAC498",
        borderRadius: 18,
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        alignContent: "space-between",
        shadowColor: "#853E17",
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 15,
        elevation: 3,
    },
});
