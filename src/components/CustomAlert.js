import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, Pressable } from 'react-native'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Modal from "react-native-modal"

const CustomAlert = ({
    title,
    message,
    messageStyles,
    buttons,
    visible,
    onBackPress = () => { }
}) => {

    function onBackdropPress() {
        onBackPress()
    }

    return (
        <SafeAreaView style={{
            ...StyleSheet.absoluteFillObject,
            flex: 1,
            zIndex: 10,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Modal
                visible={visible}
                onBackdropPress={() => onBackdropPress()}
                backdropOpacity={0.7}
                animationIn={"pulse"}
                animationOut={"zoomOut"}
                animationInTiming={600}
                animationOutTiming={600}
            >
                <View style={{
                    width: "90%",
                    backgroundColor: "white",
                    alignSelf: "center",
                    borderRadius: 15,
                    overflow: "hidden"
                }}>
                    <View style={{
                        width: "92%",
                        alignSelf: "center",
                        marginVertical: 15,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Text style={{
                            color: "black",
                            fontSize: 17,
                            fontWeight: "600",
                            textAlign: "center",
                        }}>{title}</Text>
                        <Text style={[{
                            color: "black",
                            fontSize: 13,
                            fontWeight: "500",
                            textAlign: "center",
                            marginTop: 5,
                        }, messageStyles]}>{message}</Text>
                    </View>
                    <View style={{
                        flexDirection: buttons?.length >= 3 ? 'column' : 'row',
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        justifyContent: "space-between",
                        paddingTop: buttons?.length >= 3 ? 0 : 0.8,
                        width: "100%"
                    }}>
                        {
                            buttons?.map((item, index) => {
                                return (
                                    <Pressable
                                        key={index}
                                        onPress={() => {
                                            onBackdropPress()
                                            item?.onPress()
                                        }
                                        }
                                        activeOpacity={0.7}
                                        style={[{
                                            width: buttons?.length === 2 ? "49.8%" : "100%",
                                            height: 45,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginTop: buttons?.length >= 3 ? 0.75 : 0,
                                            backgroundColor: "white"
                                        }, item?.textStyle]}
                                    >
                                        <Text style={[{
                                            color: 'rgb(90,120,210)',
                                            fontSize: 16,
                                            fontWeight: "600",
                                        }, item?.textStyle]}>{item.title}</Text>
                                    </Pressable>
                                )
                            })
                        }
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    )
}

export default CustomAlert

const styles = StyleSheet.create({})