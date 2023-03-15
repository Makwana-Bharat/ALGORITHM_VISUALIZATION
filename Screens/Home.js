import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Header from '../Componets/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from '../Componets/SearchBar';
import { FontAwesome5 } from "@expo/vector-icons";
import ProgressiveImage from '../Componets/ProgressiveImage';

const Height = Dimensions.get("window").height;

const Home = (props) => {


    /* ================ Hooks ================*/

    const [Type, setType] = useState();
    const [Data, setData] = useState();
    const [Mview, setMview] = useState();
    const [User, setUser] = useState('');
    const [Rview, setRview] = useState([]);
    const [loading, setloading] = useState(true);

    /**=== GET DATA === */
    const GetData = async () => {

        /** === ALGORITHM TYPES === */
        await fetch(
            "https://algorithmvisualization.000webhostapp.com/Project/API/Type.php"
        )
            .then((Response) => Response.json())
            .then((Response) => setType(Response))
            .catch((error) => console.error(error));

        /** === MOST VIEWED  */
        await fetch(
            "https://algorithmvisualization.000webhostapp.com/Project/API/MostView.php"
        )
            .then((Response) => Response.json())
            .then((Response) => setMview(Response));


        /** === RECENT VIEWED  */
        await fetch(
            "https://algorithmvisualization.000webhostapp.com/Project/API/RecentView.php",
            {
                method: "post",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    UID: 41,
                })
            }
        )
            .then((Response) => Response.json())
            .then((Response) => setRview(Response))
            .catch((error) => console.error(error));
        await fetch(
            "https://algorithmvisualization.000webhostapp.com/Project/API/DFS.php"
        )
            .then((Response) => Response.json())
            .then((Response) => setData(Response), setloading(false))
            .catch((error) => console.error(error));
    }

    useEffect(() => {
        const UserExists = async () => {
            let UserData = await AsyncStorage.getItem('User');
            try {
                setUser(JSON.parse(UserData));
            } catch (error) {
                console.log(error)
            }
        }
        UserExists();
        GetData();
    }, [])


    return ( //loading ? (
        //<Home_Skeleton />
        //) : (
        <View style={{ flex: 1, backgroundColor: "#F4DEC6" }}>
            <Header />
            <ScrollView>
                <View style={{ marginTop: 30, marginHorizontal: "3%" }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text
                            style={{
                                fontSize: 28,
                                fontWeight: "700",
                                marginRight: 10,
                                color: "#986736",
                            }}
                        >
                            Hi,
                        </Text>
                        <Text style={{ fontSize: 28, fontWeight: "700", color: "#341100" }}>
                            {User.USERNAME}
                        </Text>
                    </View>
                    <Text style={{ color: "#552E07", fontWeight: "500", marginTop: 5 }}>
                        what do you wan't to learn today ?
                    </Text>
                </View>
                <SearchBar props={props} />
                <View
                    style={{ marginTop: 25, marginBottom: 10, marginHorizontal: ".5%" }}
                >
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        data={Type}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => props.navigation.navigate("DS", { item })}
                            >
                                <View
                                    style={{
                                        height: 34,
                                        marginHorizontal: 5,
                                        marginVertical: 2,
                                        paddingHorizontal: 22,
                                        paddingVertical: 5,
                                        backgroundColor: "#853E17",
                                        borderRadius: 12,
                                    }}
                                >
                                    <Text style={{ color: "#F4DEC6", fontWeight: "600" }}>
                                        {item.NAME}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.ID}
                    />
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("MostView")}
                        style={{
                            flexDirection: "row",
                            marginTop: 8,
                            marginHorizontal: "3%",
                            marginRight: 5,
                        }}
                    >
                        <Text
                            style={{
                                color: "#552E07",
                                fontWeight: "bold",
                                fontSize: 18,
                            }}
                        >
                            Most Viewed
                        </Text>
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                position: "absolute",
                                right: "2%",
                            }}
                        >
                            <FontAwesome5 name="angle-right" size={24} color="#552E07" />
                        </View>
                    </TouchableOpacity>
                    <View style={{ alignItems: "center", marginTop: 5 }}>
                        <View
                            style={{ borderWidth: 0.6, borderColor: "#552E07", width: "95%" }}
                        />
                    </View>
                    <FlatList
                        style={{ padding: 14, marginHorizontal: ".5%" }}
                        horizontal={true}
                        data={Mview}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() =>
                                    props.navigation.navigate("PlayGround", { item })
                                }
                            >
                                <ProgressiveImage
                                    defaultImageSrc={{ uri: "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/0d8f5954284fa1865ff2a6d52454330a" }}
                                    actualImageSrc={{ uri: item.IMAGE }}
                                    style={{
                                        height: Height / 5,
                                        width: (Height / 5) * 1.7,
                                        marginRight: 10,
                                        borderRadius: 20,
                                    }}
                                    resizeMode="cover"
                                />
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.ID}
                    />
                </View>
                {/*......Recent Viewed Algorithms......*/}
                {Rview.ID == "0" ? (
                    <></>
                ) : (
                    <View>
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate("RecentView")}
                            style={{
                                flexDirection: "row",
                                marginTop: 5,
                                marginHorizontal: "3%",
                                marginRight: 5,
                            }}
                        >
                            <Text
                                style={{
                                    color: "#552E07",
                                    fontWeight: "bold",
                                    fontSize: 18,
                                }}
                            >
                                Recent Viewed
                            </Text>
                            <View
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    position: "absolute",
                                    right: "2%",
                                }}
                            >
                                <FontAwesome5 name="angle-right" size={24} color="#552E07" />
                            </View>
                        </TouchableOpacity>
                        <View style={{ alignItems: "center", marginTop: 5 }}>
                            <View
                                style={{
                                    borderWidth: 0.6,
                                    borderColor: "#552E07",
                                    width: "95%",
                                }}
                            />
                        </View>
                        <FlatList
                            style={{ padding: 14, marginHorizontal: "1%" }}
                            horizontal={true}
                            data={Rview}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() =>
                                        props.navigation.navigate("PlayGround", { item })
                                    }
                                >
                                    <ProgressiveImage
                                        defaultImageSrc={{ uri: "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/0d8f5954284fa1865ff2a6d52454330a" }}
                                        actualImageSrc={{ uri: item.IMAGE }}
                                        style={{
                                            height: Height / 6,
                                            width: (Height / 6) * 1.7,
                                            marginRight: 10,
                                            borderRadius: 20,
                                        }}
                                        resizeMode="cover"
                                    />
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.ID}
                        />
                    </View>
                )}

                {/*......DS Algorithms......*/}

                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 5,
                            marginHorizontal: "3%",
                            marginRight: 5,
                        }}
                    >
                        <Text
                            style={{
                                color: "#552E07",
                                fontWeight: "bold",
                                fontSize: 18,
                            }}
                        >
                            DS
                        </Text>
                        <TouchableOpacity
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                position: "absolute",
                                right: "2%",
                            }}
                            onPress={() => props.navigation.navigate("DS")}
                        >
                            <FontAwesome5 name="angle-right" size={24} color="#552E07" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: "center", marginTop: 5 }}>
                        <View
                            style={{ borderWidth: 0.6, borderColor: "#552E07", width: "95%" }}
                        />
                    </View>
                    <FlatList
                        style={{ padding: 14, marginHorizontal: "1%" }}
                        horizontal={true}
                        data={Data}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() =>
                                    props.navigation.navigate("PlayGround", { item })
                                }
                            >
                                <ProgressiveImage
                                    defaultImageSrc={{ uri: "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/0d8f5954284fa1865ff2a6d52454330a" }}
                                    actualImageSrc={{ uri: item.IMAGE }}
                                    style={{
                                        height: Height / 6,
                                        width: (Height / 6) * 1.7,
                                        marginRight: 10,
                                        borderRadius: 20,
                                    }}
                                    resizeMode="cover"
                                />
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.ID}
                    />
                </View>
            </ScrollView>
        </View>
    );
}
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



// return (
//     <View>
//         <Text>Home Screen</Text>
//         <Button
//             title="Go to Details"
//             onPress={() => navigation.navigate('OS')}
//         />
//     </View>
//);
//};

export default Home;
