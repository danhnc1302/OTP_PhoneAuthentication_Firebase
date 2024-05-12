import React, { memo } from 'react';
import Snackbar from 'react-native-snackbar';

const Toast = (message) => {
    return (
        Snackbar.show({
            text: message,
            duration: Snackbar.LENGTH_SHORT,
        })
    )
}

export default Toast