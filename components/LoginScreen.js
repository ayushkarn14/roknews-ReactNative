import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, getDocs } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { getFirestore } from "firebase/firestore";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    useState,
    ToastAndroid,
    Alert,
    TouchableNativeFeedback,
    ImageBackground,
    ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import app from "../FirebaseConfig";
const db = getFirestore(app);
async function storeData(data) {
    try {
        await AsyncStorage.setItem("roknumber", data);
    } catch (error) {
        console.log(data);
    }
}
function LoginScreen(props) {
    const navigation = useNavigation();
    async function getNumber() {
        // AsyncStorage.removeItem("roknumber");
        const value = await AsyncStorage.getItem("roknumber");
        console.log(value);
        if (value != null) {
            navigation.replace("Parent");
        }
    }
    getNumber();
    function onSignUp() {
        navigation.navigate("SignUp");
    }
    const [number, setNumber] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [buttonColor, setColor] = React.useState("#333333");

    function pressed() {
        setColor("#A4A4A4");
        setTimeout(() => {
            setColor("#333333");
        }, 2000);
    }

    return (
        <View style={{ backgroundColor: "white", height: "100%" }}>
            <SafeAreaView>
                <Image
                    source={require("../assets/logo_white.png")}
                    style={{
                        alignSelf: "center",
                        width: 100,
                        height: 100,
                        marginTop: "30%",
                        marginBottom: 20,
                    }}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setNumber(text)}
                    value={number}
                    placeholder="username"
                    keyboardType="default"
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    placeholder="Password"
                    keyboardType="default"
                />
                <TouchableNativeFeedback
                    style={{ borderRadius: 10 }}
                    onPress={async () => {
                        pressed();
                        // const condition = new RegExp(pattern, "g");
                        // return condition.test(value);
                        let numFound = false;
                        const querySnapshot = await getDocs(
                            collection(db, "users")
                        );
                        querySnapshot.forEach((doc) => {
                            if (doc.data().phone == number) {
                                numFound = true;
                                if (doc.data().password == password) {
                                    ToastAndroid.show(
                                        "Logged in",
                                        ToastAndroid.SHORT
                                    );
                                    storeData(number);
                                    navigation.replace("Parent");
                                } else
                                    ToastAndroid.show(
                                        "Incorrect password",
                                        ToastAndroid.SHORT
                                    );
                            }
                        });
                        if (!numFound)
                            ToastAndroid.show(
                                "user not found",
                                ToastAndroid.SHORT
                            );
                    }}
                >
                    <View
                        // style={styles.button}
                        style={{
                            backgroundColor: buttonColor,
                            borderRadius: 10,
                            height: 50,
                            margin: 15,
                            marginLeft: 60,
                            marginRight: 60,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ fontSize: 20, color: "white" }}>
                            Login
                        </Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={onSignUp}>
                    <Text
                        style={{
                            alignSelf: "center",
                            color: "#737373",
                            fontSize: 15,
                        }}
                    >
                        Don't have an account? Sign up
                    </Text>
                </TouchableNativeFeedback>
            </SafeAreaView>
        </View>
    );
}
const styles = StyleSheet.create({
    input: {
        height: 50,
        margin: 15,
        marginLeft: 60,
        marginRight: 60,
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 20,
        padding: 10,
        borderColor: "grey",
    },
});
export default LoginScreen;
