import React from "react";
import { Share, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
const ShareOption = () => {
    const onShare = async () => {
        try {
            const result = await Share.share({
                uri: "https://expo.dev/artifacts/8cbd6ec6-64d9-455e-a7f8-fc70f71c7f07",
                message: "Algorithm Visulization ",
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <TouchableOpacity
            onPress={onShare}
        >
            <FontAwesome name="share-alt" size={26} color="#552E07" />
        </TouchableOpacity>
    );
};

export default ShareOption;
