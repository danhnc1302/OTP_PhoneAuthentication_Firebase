import React from "react";
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ActivityIndicator
} from "react-native"
import Modal from "react-native-modal";

const Loader = ({title, message, visible, onBackPress = () => {}}) => {
    return(
        <SafeAreaView style={{
            ...StyleSheet.absoluteFillObject,
            flex: 1,
            zIndex: 10,
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Modal 
                isVisible={visible}
                onBackdropPress={()=> onBackPress(null)}
                backdropColor={0.5}
                animationIn={"pulse"}
                animationOut={'zoomOut'}
                animationInTiming={600}
                animationOutTiming={600}
            >
                <View style={{
                    width: "95%",
                    backgroundColor: "white",
                    alignSelf: "center",
                    borderRadius: 15,
                    overflow: "hidden"
                }}>
                    <View style={{
                        width: "95%",
                        alignSelf: "center",
                        marginVertical: 25,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <ActivityIndicator size={"large"} color="black" />
                        {
                            title !== "" && (
                                <Text style={{
                                    color: "rgba(67,68,70,1)",
                                    fontSize: 17,
                                    fontWeight: "600",
                                    textAlign: "center",
                                    marginTop: 10
                                }}>
                                    {title}
                                </Text>
                            )
                        }
                        {
                            message !== "" && (
                                <Text style={{
                                    color: "rgba(67,68,70,0.6)",
                                    fontSize: 13,
                                    fontWeight: "500",
                                    textAlign: "center",
                                    marginTop: 5,
                                    alignSelf: "center"
                                }}>
                                    {message}
                                </Text>
                            )
                        }
                    </View>
                </View>
            </Modal>
        
        </SafeAreaView>
    )
}

export default Loader;