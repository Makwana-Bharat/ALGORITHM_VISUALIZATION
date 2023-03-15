import { StyleSheet } from "react-native";
export const Styles = StyleSheet.create({
    header: {
        height: 80,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerText: {
        fontSize: 20,
        height: 40,
        marginTop: 25,
        padding: 5,
        color: "#59300E",
        // fontFamily: "Sancreek_400Regular",
    },
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

