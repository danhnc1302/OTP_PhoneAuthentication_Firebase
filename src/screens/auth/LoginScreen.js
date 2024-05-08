import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'


const LoginScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Enter Your Number Phone</Text>
                <Text style={styles.subTitle}>Done</Text>
            </View>
            <Text style={styles.description}>{"Danh's App will need to verify your phone number (carrier charges may apply)."}</Text>
            <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.touch}>
                    <Text style={styles.countryName}>
                        VietNam
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F2FA"
    },
    header: {
        width: "100%",
        height: 60,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        color: "#000000",
        fontSize: 17,
        fontWeight: "600"
    },
    subTitle: {
        color: "#C6C3C7",
        fontSize: 17,
        fontWeight: "600",
        position: "absolute",
        right: 15
    },
    description: {
        color: "#858380",
        fontSize: 16,
        fontWeight: "400",
        width: "90%",
        alignSelf: "center",
        marginTop: 20
    },
    inputContainer: {
        width: "90%",
        backgroundColor: "#ffffff",
        height: 100,
        marginTop: 20,
        alignSelf: "center",
        borderRadius: 10,
        shadowColor: "#817E82",
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.85,
        shadowRadius: 10,
        elevation: 4,
        paddingHorizontal: 15
    },
    touch: {
        height: 40,
        flexDirection: 'row',
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center"
    },
    countryName: {
        color: "#0E7EF8",
        fontSize: 17,
        fontWeight: "600"
    }
})