import { StyleSheet, Text, View, Button } from 'react-native';
import {useFonts} from "expo-font";
import { useEffect, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import Radiobutton from "./components/Radiobutton";

export default function App() {
  const [loaded] = useFonts({
    LatoRegular: require("./assets/fonts/Lato/Lato-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  const [screenOrientation, setScreenOrientation] = useState("portrait");
  const [portrait, setPortrait] = useState(true);

  useEffect(() => {
    const subscription = ScreenOrientation.addOrientationChangeListener((value) => {
      if (value.orientationInfo.orientation === ScreenOrientation.Orientation.PORTRAIT_UP) {
        setScreenOrientation("portrait");
        setPortrait(true);
      } else if (value.orientationInfo.orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT) {
        setScreenOrientation("landscape");
        setPortrait(false);
      }
    });

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  const lockToPortrait = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }

  /*State variable for displaying radiobutton value.*/
  const [test, setTest] = useState("No radiobutton selection.");

  /*Define options for radiobuttons.*/
  const options = [
    {
      label: "Option 1",
      value: 1
    },
    {
      label: "Option 2",
      value: 2
    }
  ]

  return (
    <View style={[styles.container, portrait ? styles.portrait : styles.landscape]}>
      <Text style={styles.heading}>Lato Regular</Text>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>{screenOrientation}</Text>

      {(function() {
        if ( portrait === true) {
          return <Text>This content is only for portrait.</Text>
        } else {
          return <Text>This content is only for landscape.</Text>
        }
      })()} 
      <Button title="Lock to portrait" onPress={lockToPortrait}/>

      {/*Pass options and onPress as props to define radiobuttons and receive selected value.*/}
      <Radiobutton options={options} onPress={(value) => {setTest(value)}} style={{backgroundColor: "red"}}/>
      <Text>Radiobutton value is {test}.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontFamily: "LatoRegular",
    fontSize: 20
  },
  portrait: {
    backgroundColor: "#ccc",
  },
  landscape: {
    backgroundColor: "#999",
  },
});
