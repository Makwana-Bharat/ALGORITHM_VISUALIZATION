import React, { useState, useEffect } from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Header from "../Componets/Header";
import ProgressiveImage from "../Componets/ProgressiveImage";
const OS = (props) => {
    const [loading, setloading] = useState(true);
    const [Data, setData] = useState();
    useEffect(() => {
        fetch("https://algorithmvisualization.000webhostapp.com/Project/API/OS.php")
            .then((Response) => Response.json())
            .then((Response) => setData(Response), setloading(false))
            .catch((Error) => console.error(Error));
    }, []);
    return loading ? (
        <ActivityIndicator />
    ) : (
        <View style={{ flex: 1, backgroundColor: "#F4DEC6" }}>
            <Header />
            <View style={{ marginTop: 15 }}>
                <Text
                    style={{
                        color: "#552E07",
                        fontWeight: "bold",
                        marginLeft: "2%",
                        fontSize: 20,
                    }}
                >
                    Sheduling Algorithms
                </Text>
                <View style={{ alignItems: "center", marginTop: 5 }}>
                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: "#853E17",
                            width: "95%",
                            opacity: 0.3,
                        }}
                    />
                </View>
            </View>
            <FlatList
                style={{ height: "73%" }}
                data={Data}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("PlayGround", { item })}
                    >
                        <View style={{ flexDirection: "row", margin: 15, marginBottom: 2 }}>
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
                                <Text style={{ marginTop: 6, color: "rgba(133,62,23,.76)" }}>
                                    #Sheduling #Algorithms
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
                keyExtractor={(item) => item.ID}
            />
        </View>
    );
};

export default OS;
