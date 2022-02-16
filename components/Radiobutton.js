import { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

/**
 * @param options Array containing displayed texts and values for radiobutton options
 * @param onPress Used to forward selected value to the component using this radiobutton component
 */

export default function Radiobutton({options, onPress, style}) {
    // State variable for value of radiobutton
    const [value, setValue] = useState(null);

    /**
     * Function for handling radiobutton selection. State variable is updated and selection is forwarded
     * the component that is using this Radiobutton component using onPress props.
     * @param selected Value of the radiobutton
     */
    function handlePress(selected) {
        setValue(selected);
        onPress(selected);
    }

    return (
        <>
            {
                options.map((item) => (/*Loop through options passed as props and render radiobuttons*/
                    <View key={item.value} style={[def_styles.buttonContainer, style]}>
                        <Text style={def_styles.label}>{item.label}</Text>{/*Display label for a radiobutton*/}
                        {/*"Circle" for the radiobutton is pressable, so user is able to change values.*/}
                        <Pressable style={def_styles.circle} onPress={() => handlePress(item.value)}>
                            {/*Display dot on radiobutton, if selected*/}
                            {value === item.value && <View style={def_styles.checkedCircle}/>}
                        </Pressable>
                    </View>
                ))
            }
        </>
    )
}

const def_styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "100%",
        marginBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        marginBottom: 30,            
    },
    label: {
        marginRight: 10,
    },
    circle: {
        height: 28,
        width: 28,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#000",
        alignItems: "center",
        justifyContent: "center",
    },
    checkedCircle: {
        width: 15,
        height: 15,
        borderRadius: 7,
        backgroundColor: "#000",
    },
})