import React, { useState, useRef } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import { theme } from '../../../theme';
import { useNavigation } from '@react-navigation/native';
import OtpInput from '../../components/OtpInput';

const OtpVerificationScreen = ({ route }) => {

  const navigation = useNavigation()
  const { phoneNumber } = route?.params

  const [otp, setOtp] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  })

  console.log(otp.otp1)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
          <Icon name="left" size={20} color="#0E7EF8" />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Number {phoneNumber}</Text>
      </View>

      <Text style={styles.shortDes}>We have sent you an SMS with a code to the number above</Text>
      <Text style={styles.shortDes}>To complete your phone number verification, please enter the 6-digit activation code</Text>
        {/* <TextInput
          value={otp.otp1}
          onChangeText={(pin) => {
            setOtp(v => (
              {
                ...v,
                otp1: pin
              }
            ))
          }}
          maxLength={1}
          style={[styles.otpInput, { borderBottomWidth: otp.otp1 == "" ? 1 : 0 }]}
        />
        <TextInput
          value={otp.otp2}
          onChangeText={(pin) => {
            setOtp(v => (
              {
                ...v,
                otp2: pin
              }
            ))
          }}
          maxLength={1}
          style={[styles.otpInput, { borderBottomWidth: otp.otp2 == "" ? 1 : 0 }]}
        />
        <TextInput
          value={otp.otp3}
          onChangeText={(pin) => {
            setOtp(v => (
              {
                ...v,
                otp3: pin
              }
            ))
          }}
          maxLength={1}
          style={[styles.otpInput, { borderBottomWidth: otp.otp3 == "" ? 1 : 0 }]}
        />
        <TextInput
          value={otp.otp4}
          onChangeText={(pin) => {
            setOtp(v => (
              {
                ...v,
                otp4: pin
              }
            ))
          }}
          maxLength={1}
          style={[styles.otpInput, { borderBottomWidth: otp.otp4 == "" ? 1 : 0 }]}
        />
        <TextInput
          value={otp.otp5}
          onChangeText={(pin) => {
            setOtp(v => (
              {
                ...v,
                otp5: pin
              }
            ))
          }}
          maxLength={1}
          style={[styles.otpInput, { borderBottomWidth: otp.otp5 == "" ? 1 : 0 }]}
        />
        <TextInput
          value={otp.otp6}
          onChangeText={(pin) => {
            setOtp(v => (
              {
                ...v,
                otp6: pin
              }
            ))
          }}
          maxLength={1}
          style={[styles.otpInput, { borderBottomWidth: otp.otp6 == "" ? 1 : 0 }]}
        /> */}

        <OtpInput />
      

      <Text style={[styles.shortDes, { color: "#0E7EF8", fontSize: 17 }]}>Didn't receive a verification code ?</Text>

    </View>
  )
}

export default OtpVerificationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#F4F2FA"
  },
  header: {
    flexDirection: "row",
    width: "100%",
    height: 60,
    alignItems: "center"
  },
  title: {
    color: "#000000",
    fontSize: 17,
    fontWeight: "600"
  },
  backIcon: {
    marginRight: 20,
    width: 30,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  shortDes: {
    fontSize: 15,
    marginBottom: 18,
    textAlign: "center",
    marginTop: 12,
    width: "95%"
  },
  otpInputContainer: {
    backgroundColor: "orange",
    flexDirection: "row",
    height: 45,
    marginTop: 15,
    width: "80%",
    alignSelf: "center",
  },
  otpInput: {
    width: "8%",
    height: "100%",
    borderBottomColor: "black",
    marginHorizontal: 10,
    fontSize: 24,
    alignSelf: "center",
  }
})
