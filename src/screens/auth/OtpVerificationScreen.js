import React, { useState, useRef, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import OtpInput from '../../components/OtpInput';
import auth from '@react-native-firebase/auth';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../../components/Loader';

const OtpVerificationScreen = ({ route }) => {
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const { phoneNumber } = route?.params
  const otpInput = useRef(null)
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState({
    title: "",
    description: "",
    isVisible: false
  })

  const [otp, setOtp] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  })

  useEffect(() => {
    if (isFocused) {
      setTimeout(() => {
        showLoader(true, "Requesting an SMS...")
      }, 1000)
      setTimeout(() => {
        signInWithPhoneNumber(phoneNumber)
      }, 2000)
    }
  }, [isFocused]);

  async function signInWithPhoneNumber(phoneNumber) {
    await auth().signInWithPhoneNumber(phoneNumber).then(confirmation => {
      setConfirm(confirmation)
      setLoading(pre => ({
        ...pre,
        isVisible: false
      }))
    }).catch(error => {
      console.log("Error: ", error)
      setLoading(pre => ({
        ...pre,
        isVisible: false
      }))
    });

  }

  async function confirmCode(code) {
    try {
      
      setTimeout(() => {
        showLoader(true, "Verification Code", "Your credentials will be securely saved to your iCloud Keychain it enabled")
      }, 1000)
      setTimeout(async () => {
        await confirm.confirm(code);
        setLoading(pre => ({
          ...pre,
          isVisible: false
        }))
      console.log("Login successful!");
      }, 2000)

    } catch (error) {
      console.log('Invalid code: ', error);
      setLoading(pre => ({
        ...pre,
        isVisible: false
      }))
    }
  }

  function showLoader(status, title = "", message = "") {
    if (status) {
      setLoading(pre => ({
        ...pre,
        title: title,
        description: message,
        isVisible: status
      }))
    } else {
      setLoading(pre => ({
        ...pre,
        isVisible: false
      }))
    }
  }

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
      <OtpInput
        inputCount={6}
        ref={e => { otpInput = e }}
        handleTextChange={text => {
          if (text.length == 6) {
            confirmCode(text)
          }
        }}
        deactiveColor={"black"}
        activeColor={"#3CB371"}
        testInputStyle={styles.textStyle}
      />
      <Text style={[styles.shortDes, { color: "#0E7EF8", fontSize: 17 }]}>Didn't receive a verification code ?</Text>

      {
        loading.isVisible &&
        <Loader
          title={loading.title}
          message={loading.description}
          visible={loading.isVisible}
          onBackPress={() => { }}
        />
      }

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
  },
  textStyle: {
    color: "black",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "500"
  }
})
