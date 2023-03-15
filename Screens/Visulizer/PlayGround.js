import React from "react";
import { View, TouchableOpacity, Text, Dimensions } from "react-native";
const Height = Dimensions.get("window").height;
const Width = Dimensions.get("window").width;
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import ShareOption from "../../Componets/ShareOption";
const PlayGround = (props) => {
    let Algorithm = props.route.params.item;
    return (
        <View
            style={{
                backgroundColor: "#F4DEC6",
                flex: 1,
                flexDirection: Height > Width ? "column" : "row",
            }}
        >
            <View
                style={{
                    backgroundColor: "transparent",
                    width: Height > Width ? "100%" : "80%",
                    height: Height > Width ? "65%" : "100%",
                    padding: 10,
                    justifyContent: "center",
                    alignItems: "flex-end",
                    flexDirection: "row",
                }}
            >
                {/* {bar} */}
            </View>
            <View
                style={{
                    backgroundColor: "#EAC498",
                    width: Height > Width ? "100%" : "20%",
                    height: Height > Width ? "35%" : "100%",
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                }}
            >
                <View
                    style={{
                        padding: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <TouchableOpacity
                    //onPress={this.Start} disabled={this.state.PlayBotton == "play" ? false : true} 
                    >
                        <View
                            style={{
                                backgroundColor: "#552E07",
                                width: 95,
                                height: 50,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 25,
                            }}
                        >
                            <FontAwesome
                                // name={this.state.PlayBotton}
                                name="play"
                                size={20}
                                color="#F4DEC6"
                            />
                        </View>
                    </TouchableOpacity>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                            width: "40%",
                        }}
                    >
                        <TouchableOpacity //onPress={this.generateElements}
                        >
                            <MaterialIcons
                                name="stacked-bar-chart"
                                size={26}
                                color={"#552E07"}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                        //    onPress={() => this.Like("INS_DEL")}
                        >
                            <FontAwesome name="heart" size={26} color={'red'} //color={this.state.Liked}
                            />
                        </TouchableOpacity>
                        <ShareOption />

                    </View>
                </View>
                <View style={{ marginLeft: "3%" }}>
                    <Text
                        style={{ fontSize: 22, fontWeight: "bold", marginBottom: "2%" }}
                    >
                        {Algorithm.NAME}
                    </Text>
                    <Text style={{ fontStyle: "italic" }}>
                        {Algorithm.Description}
                    </Text>
                </View>
            </View>
        </View>
    );
}

export default PlayGround;