import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Header from "../Componets/Header";
import ProgressiveImage from "../Componets/ProgressiveImage";
// import DFS_OS_Skeleton from "../Componants/SkeletonEffect/DFS_OS_Skeleton";
export default function DS(props) {
    const [loading, setloading] = useState(true);
    const [Type, setType] = useState();
    const [Data, setData] = useState();
    const [Title, setTitle] = useState("Sorting");
    useEffect(() => {
        fetch(
            "https://algorithmvisualization.000webhostapp.com/Project/API/Type.php"
        )
            .then((Response) => Response.json())
            .then((Response) => setType(Response))
            .catch((error) => console.error(error));
        fetch(
            "https://algorithmvisualization.000webhostapp.com/Project/API/DFS.php"
        )
            .then((Response) => Response.json())
            .then((Response) => setData(Response), setloading(false))
            .catch((error) => console.error(error));
    }, []);
    return loading ? (
        <ActivityIndicator />
    ) : (
        <View
            style={{
                backgroundColor: "#F4DEC6",
                flex: 1,
            }}
        >
            <Header />
            <View style={{ marginTop: 25, marginBottom: 10, marginHorizontal: "2%" }}>
                <FlatList
                    horizontal={true}
                    data={Type}
                    renderItem={({ item }) =>
                        item.TYPE == "DFS" ? (
                            <TouchableOpacity
                                onPress={() => {
                                    setTitle(item.NAME);
                                }}
                            >
                                <View
                                    style={{
                                        height: 34,
                                        marginHorizontal: 5,
                                        marginVertical: 5,
                                        paddingHorizontal: 22,
                                        paddingVertical: 5,
                                        backgroundColor: Title == item.NAME ? "#59300E" : "#853E17",
                                        borderRadius: 12,
                                    }}
                                >
                                    <Text style={{ color: "#F4DEC6", fontWeight: "600" }}>
                                        {item.NAME}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ) : (
                            <></>
                        )
                    }
                    keyExtractor={(item) => item.ID}
                />
            </View>

            <View style={{ marginTop: 15 }}>
                <Text
                    style={{
                        color: "#552E07",
                        fontWeight: "bold",
                        marginLeft: "2%",
                        fontSize: 20,
                    }}
                >
                    {Title} Algorithms
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
                renderItem={({ item }) =>
                    item.TYPE == Title ? (
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate("PlayGround", { item })}
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
                                    <Text style={{ marginTop: 6, color: "rgba(133,62,23,.76)" }}>
                                        #{Title} #Algorithms
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
                    ) : (
                        <></>
                    )
                }
                keyExtractor={(item) => item.ID}
            />
        </View>
    );
}
