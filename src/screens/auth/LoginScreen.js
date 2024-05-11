import React, { useState, useRef } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import RNPhoneInput from "react-native-phone-number-input";
import { theme } from '../../../theme';

const LoginScreen = () => {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [countryCode, setCountryCode] = useState({ name: "VietNam", callingCode: "+84" })
    const phoneRef = useRef(null);
    const [borderColor, setBorderColor] = useState("white");
    const onChangeText = (value) => {
        setPhoneNumber(value)
    }
    const onChangeCountry = (value) => {
        setCountryCode(value)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Enter Your Number Phone</Text>
                <Text style={styles.done}>Done</Text>
            </View>
            <Text style={styles.description}>{"Danh's App will need to verify your phone number (carrier charges may apply)."}</Text>
            <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.touch}>
                    <Text style={styles.countryName}>
                        {countryCode.name}
                    </Text>
                    <Icon name="right" size={20} color="#C6C3C7" />
                </TouchableOpacity>
                <View style={styles.divider} />
                <RNPhoneInput
                    ref={phoneRef}
                    onChangeText={onChangeText}
                    value={phoneNumber}
                    defaultCode={"VN"}
                    onChangeCountry={onChangeCountry}
                    containerStyle={[
                        styles.containerStyle,
                    ]}

                    textInputProps={{
                        selectionColor: theme["color-success-300"],
                        dataDetectorTypes: "phoneNumber",
                        onFocus(e) {
                        },
                        onBlur(e) {
                            setBorderColor("white");
                            if (
                                !(phoneRef).current?.isValidNumber(phoneNumber) &&
                                phoneNumber !== ""
                            ) {
                                setBorderColor(theme["color-danger-500"]);
                            }
                        },
                        style: styles.textInputStyle,
                    }}
                    layout="second"
                    textContainerStyle={[styles.textContainer, {
                        borderColor: borderColor,
                    }]}
                />
            </View>
            <View style={styles.term}>
                <Text style={styles.subTitle}>
                    You must be
                    {
                        <Text style={{
                            color: "#0E7EF8"
                        }}>
                            {" at least 16 years old "}
                        </Text>
                    } to register, Learn how Danh' App works with the
                    {
                        <Text style={{
                            color: "#0E7EF8"
                        }}>
                            {" CD Technologies"}
                        </Text>
                    }
                </Text>

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
    done: {
        color: "#C6C3C7",
        fontSize: 17,
        fontWeight: "600",
        position: "absolute",
        right: 15
    },
    subTitle: {
        textAlign: "center",
        color: "#C6C3C7",
        fontSize: 14,
    },
    term: {
        width: "90%",
        alignSelf: "center"
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
        marginVertical: 20,
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
        fontWeight: "600",
        letterSpacing: 1
    },
    divider: {
        marginVertical: 5,
        width: "100%",
        height: 1,
        backgroundColor: "#C6C3C7"
    },
    containerStyle: {
        height: 40,
        backgroundColor: "white",
        width: "100%"
    },
    textInputStyle: {
        height: 40,
        fontSize: 15,
    },
    textContainer: {
        backgroundColor: "white",
        borderWidth: 1
    },
    errorText: { color: theme["color-danger-500"] },
})