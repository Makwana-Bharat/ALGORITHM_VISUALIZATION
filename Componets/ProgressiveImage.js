import React, { Component } from "react";
import { View, Animated, StyleSheet } from "react-native";
class ProgressiveImage extends Component {
    defaultImage = new Animated.Value(0);
    actualImage = new Animated.Value(0);
    handleDefaultImageLoad = () => {
        Animated.timing(this.defaultImage, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };
    handleActualtImageLoad = () => {
        Animated.timing(this.actualImage, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };
    constructor(props) {
        super(props);
    }
    state = {};
    render() {
        const { defaultImageSrc, actualImageSrc, style, ...props } = this.props;
        return (
            <View>
                <Animated.Image
                    source={defaultImageSrc}
                    {...props}
                    style={[
                        style,
                        { opacity: this.defaultImage, backgroundColor: "#EAC498" },
                    ]}
                    onLoad={this.handleDefaultImageLoad}
                    blurRadius={1}
                />
                <Animated.Image
                    source={actualImageSrc}
                    {...props}
                    style={[
                        style,
                        { opacity: this.actualImage, backgroundColor: "transparent" },
                        styles.imageoverlay,
                    ]}
                    onLoad={this.handleActualtImageLoad}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    imageoverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        resizeMode: "cover",
    },
});
export default ProgressiveImage;
