import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    useState,
    ScrollView,
    Alert,
    ToastAndroid,
    TouchableNativeFeedback,
    ImageBackground,
    Switch,
} from "react-native";
import app from "../FirebaseConfig";
const db = getFirestore(app);
function SignUpScreen() {
    const [name, setName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [number, setNumber] = React.useState("");
    const [buttonColor, setColor] = React.useState("#333333");
    function pressed() {
        setColor("#A4A4A4");
        setTimeout(() => {
            setColor("#333333");
        }, 2000);
    }

    return (
        <View style={{ backgroundColor: "white", height: "100%" }}>
            <ScrollView style={{ paddingTop: "30%" }}>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={(text) => setName(text)}
                    placeholder="Name"
                    keyboardType="default"
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
                <View
                    style={{
                        justifyContent: "center",
                        flexDirection: "row",
                        margin: 15,
                        marginLeft: 60,
                        marginRight: 60,
                    }}
                ></View>
                <TouchableNativeFeedback
                    onPress={async () => {
                        pressed();
                        const querySnapshot = await getDocs(
                            collection(db, "users")
                        );
                        let found = false;
                        querySnapshot.forEach((documentSnapshot) => {
                            if (documentSnapshot.data().phone == number) {
                                found = true;
                            }
                        });
                        if (!found) {
                            await setDoc(doc(db, "users", number), {
                                bookmarks: [],
                                name: name,
                                password: password,
                                phone: number,
                            });
                            alert("Signed up successfully, go back to login");
                        } else
                            ToastAndroid.show(
                                "username taken",
                                ToastAndroid.SHORT
                            );
                    }}
                >
                    <View
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
                            SignUp
                        </Text>
                    </View>
                </TouchableNativeFeedback>
            </ScrollView>
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
        backgroundColor: "white",
    },
    address: {
        height: 100,
        margin: 15,
        marginLeft: 60,
        marginRight: 60,
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 20,
        padding: 10,
        borderColor: "grey",
        backgroundColor: "white",
    },
    text: {
        flex: 5,
        alignSelf: "center",
        fontSize: 20,
        marginLeft: 9,
        color: "gray",
    },
});
export default SignUpScreen;
