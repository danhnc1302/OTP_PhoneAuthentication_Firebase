import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { theme } from '../../../theme';
import { useNavigation } from '@react-navigation/native';
import { CountryPicker, CountryButton } from "react-native-country-codes-picker";
import { TextInput } from 'react-native-gesture-handler';
import parsePhoneNumber from 'libphonenumber-js';
import CustomAlert from '../../components/CustomAlert';
import Toast from '../../utils/Toast';

const LoginScreen = () => {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [show, setShow] = useState(false);
    const [countryDetails, setCountryDetails] = useState({
        name: "Viet Nam",
        shortName: "VN"
    });
    const [countryCode, setCountryCode] = useState("+84");
    const [showAlert, setShowAlert] = useState(false);

    const navigation = useNavigation()

    const onChangeText = (value) => {
        setPhoneNumber(value)
    }

    function ListHeaderComponent({ countries, lang, onPress }) {
        return (
            <View
                style={{
                    paddingBottom: 20,
                }}
            >
                <Text>
                    Popular countries
                </Text>
                {countries?.map((country, index) => {
                    return (
                        <CountryButton key={index} item={country} name={country?.name?.[lang || 'en']} onPress={() => onPress(country)} />
                    )
                })}
            </View>
        )
    }

    function isValidPhoneNumber(country_code, number) {
        try {
            const phone = parsePhoneNumber(number, country_code)
            if (phone && phone.isValid()) {
                setShowAlert(true)
            } else if (phone == undefined) {
                console.log("Enter your phone number")

            } else {
                Toast("Not a valid number")
            }
        } catch (error) {
            console.log("")
            Toast("Invalid phone number format")
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Enter Your Number Phone</Text>
                <Text style={[styles.done, { color: phoneNumber.length >= 9 ? "#0E7EF8" : "#C6C3C7" }]} onPress={() => {
                    isValidPhoneNumber(countryDetails.shortName, phoneNumber)
                }}>Done</Text>
            </View>
            <Text style={styles.description}>{"Danh's App will need to verify your phone number (carrier charges may apply)."}</Text>
            <View style={styles.inputContainer}>
                <TouchableOpacity onPress={() => setShow(true)} style={styles.touch}>
                    <Text style={styles.countryName}>
                        {countryDetails.name}
                    </Text>
                    <Icon name="right" size={20} color="#C6C3C7" />
                </TouchableOpacity>
                <View style={styles.divider} />
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                }}>
                    <Text style={{
                        marginHorizontal: 10,
                        color: "black",
                        fontWeight: "500",
                        // width: "22%",
                        fontSize: 18,
                        textAlign: "center",
                    }}>
                        {countryCode}
                    </Text>
                    <TextInput
                        value={phoneNumber}
                        onChangeText={onChangeText}
                        placeholder='Your Phone Number'
                        keyboardType='numeric'
                        style={styles.input}
                        maxLength={14}
                    />
                </View>
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
            <CountryPicker
                show={show}
                // when picker button press you will get the country object with dial code
                ListHeaderComponent={ListHeaderComponent}
                pickerButtonOnPress={(item) => {
                    (item);
                    setCountryCode(item.dial_code)
                    setCountryDetails({
                        name: item.name.en,
                        shortName: item.code
                    })
                    setShow(false);
                }}
                popularCountries={["VN", "US", "GB"]}
                onBackdropPress={() => setShow(false)}
                style={{
                    // Styles for whole modal [View]
                    modal: {
                        height: 500,
                    },
                    line: {
                        marginVertical: 10
                    },
                    countryName: {
                        color: "black"
                    },
                    dialCode: {
                        color: "black"
                    },
                }}
            />
            {
                showAlert ? <CustomAlert
                    title={`NUMBER INFORMATION:\n\n ${countryCode} ${phoneNumber}\n`}
                    message="Is your phone number above correct?"
                    messageStyles={{
                        color: "black"
                    }}
                    buttons={[
                        {
                            title: "Edit",
                            style: {},
                            onPress: () => {
                                console.log("Edit")
                            },
                            textStyle: {
                                color: "#0E7EF8",
                            }
                        },
                        {
                            title: "Yes",
                            style: {},
                            onPress: () => {
                                navigation.navigate("OtpVerification", { phoneNumber: countryCode + phoneNumber })
                            },
                            textStyle: {
                                color: "#0E7EF8",
                            }
                        }
                    ]}
                    visible={showAlert}
                    onBackPress={() => {
                        setTimeout(() =>
                            setShowAlert(false)
                            , 500)
                    }}
                /> : null
            }
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
    input: {
        flex: 1,
        height: "100%",
        fontSize: 16,
        fontWeight: "400",
    }
})