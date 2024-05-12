import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    TextInput,
    Keyboard,
} from "react-native";
import PropTypes from "prop-types"

const OtpInput = props => {

    const TextInputs = []
    const inputs = []
    const [focusedInput, setFocusedInput] = useState(0)
    const [keyboardStatus, setKeyboardStatus] = useState(false)

    function getOtpText(inputCount, inputCellLength, text) {
        let matches = text.match(new RegExp('.{1,' + inputCellLength + '}', 'g')) || []

        return matches.slice(0, inputCount)
    }

    useEffect(() => {
        const isShow = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardStatus(true)
        })

        const isHide = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardStatus(false)
        })

        return () => {
            isShow.remove()
            isHide.remove()
        }
    },[])

    const [otp, setOtp] = useState(
        getOtpText(
            props?.inputCount || 4,
            props?.inputCellLength,
            props?.defaultValue
        )
    )

    function onInputFocusEvent(i) {
        const pre = i - 1
        if (pre > -1 && !otp[pre]) {
            inputs[pre].focus()
            return
        }
        setFocusedInput(i)
    }

    function isValid(text) {
        const _text = /^[0-9a-zA-Z]+$/
        return text.match(_text)
    }

    function onChangeTextEvent(text, i) {
        if (text && !isValid(text)) {
            return
        }
        let temp = [...otp]
        temp[i] = text
        setOtp(temp)
        props?.handleCellTextChange && props?.handleCellTextChange(text, i)
        if (text.length === props?.inputCellLength && i !== props?.inputCount - 1) {
            inputs[i + 1].focus()
        }
        props?.handleTextChange(temp.join(""))
    }

    function onKeyPress(e, i) {
        const val = otp[i] || ""
        if(e.nativeEvent.key !== "Backspace" && val && i!== props?.inputCount -1) {
            inputs[i+1].focus()
            return
        }

        if(e.nativeEvent.key === "Backspace" && i !== 0 ) {
            if(!val.length && otp[i-1].length === props?.inputCellLength) {
                let temp = [...otp]
                temp[i-1] = otp[i-1].split("").splice(0, otp[i-1].length -1).join("")
                setOtp(temp)
                props?.handleTextChange(otp.join(""))
                inputs[i-1].focus()

            }
        }
    }

    for (let i = 0; i < props?.inputCount; i++) {
        const inputStyle = [
            {
                height: "100%",
                width: "10%",
                marginHorizontal: 2,
                fontSize: 14,
                fontWeight: "600",
                color: "black",
                alignSelf: "center"
            }
        ]

        if(focusedInput === i) {
            inputStyle.push({
                borderColor: props?.activeColor
            })
        }

        TextInputs.push(
            <TextInput
                ref={e => {
                    if (e) {
                        inputs[i] = e
                    }
                }}
                key={i}
                autoCorrect={false}
                keyboardType={props?.keyboardType}
                autoFocus={props.autoFocus && i == 0}
                style={[inputStyle, props.testInputStyle]}
                placeholder={"\u23E4"}
                maxLength={props?.inputCellLength}
                onFocus={() => onInputFocusEvent(i)}
                multiline={false}
                selectionColor={props?.activeColor}
                onChangeText={(text) => onChangeTextEvent(text, i)}
                onKeyPress={(key) => onKeyPress(key, i)}
                placeholderTextColor={
                    focusedInput === i && keyboardStatus ? props?.activeColor : props?.deactiveColor
                }
            />
        )
    }

    return (
        <View style={{
            flexDirection: "row",
            height: 60,
            marginTop: 15,
            width: "80%",
            alignSelf: "center",
            justifyContent: "space-between"
        }}>
            {TextInputs}
        </View>
    )
}

export default OtpInput;

OtpInput.protoType = {
    inputCount: PropTypes.number,
    defaultValue: PropTypes.string,
    activeColor: PropTypes.string,
    deactiveColor: PropTypes.string,
    inputCellLength: PropTypes.number,
    containerStyle: PropTypes.object,
    testInputStyle: PropTypes.object,
    handleTextChange: PropTypes.func,
    keyboardType: PropTypes.string,
    autoFocus: PropTypes.bool,
    handleCellTextChange: PropTypes.func
}

OtpInput.defaultProps = {
    defaultValue: "",
    inputCount: 4,
    activeColor: "#3CB371",
    deactiveColor: "#DCDCDC",
    keyboardType: "numeric",
    inputCellLength: 1,
    handleTextChange: () => { }
}