import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ToastAndroid,
    Linking,
    Image,
    TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
    doc,
    collection,
    getDocs,
    updateDoc,
    getFirestore,
    arrayUnion,
    arrayRemove,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import app from "../FirebaseConfig";
function Card(props) {
    const check_bookmark = async () => {
        const value = await AsyncStorage.getItem("roknumber");
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            // if (doc.data().phone == value) alert("found");

            const obj = doc.data().bookmarks;
            // for (let i = 0; i < obj.length; i++) {
            //     if (obj[i].sourceUrl == props.source_url) setBookmark(true);
            //     else setBookmark(false);
            // }
        });
    };
    check_bookmark();
    const handeBookmark = async () => {
        setBookmark(!bookmarked);
        if (bookmarked) setIcon("bookmark");
        else setIcon("bookmark-outline");
        console.log(bookmarked);
        const value = await AsyncStorage.getItem("roknumber");
        const ref = doc(db, "users", value);
        if (bookmarked) {
            //add to bookmarks
            await updateDoc(ref, {
                bookmarks: arrayUnion({
                    authorName: props.author_name,
                    content: props.description,
                    createdAt: 1,
                    hashId: "null",
                    imageUrl: props.image_url,
                    sourceName: props.source_name,
                    sourceUrl: props.source_url,
                    title: props.title,
                }),
            });
            // alert("add");
            ToastAndroid.show("Added to bookmarks", ToastAndroid.SHORT);
        } else {
            //remove from bookmarks
            await updateDoc(ref, {
                bookmarks: arrayRemove({
                    authorName: props.author_name,
                    content: props.description,
                    createdAt: 1,
                    hashId: "null",
                    imageUrl: props.image_url,
                    sourceName: props.source_name,
                    sourceUrl: props.source_url,
                    title: props.title,
                }),
            });
            // alert("rem");
            ToastAndroid.show("Removed from bookmarks", ToastAndroid.SHORT);
        }
    };
    const [icon, setIcon] = React.useState("bookmark-outline");
    const [bookmarked, setBookmark] = React.useState(false);
    let ScreenHeight = Dimensions.get("window").height;
    let ScreenWidth = Dimensions.get("window").width;
    const db = getFirestore(app);
    return (
        <View
            style={{
                backgroundColor: "white",
                width: "95%",
                height: (ScreenHeight * 3) / 4,
                borderRadius: 10,
                alignSelf: "center",
                margin: "1.5%",
            }}
        >
            <Image
                source={{ uri: props.image_url }}
                style={{
                    width: (ScreenWidth * 95) / 100,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    height: "40%",
                }}
            />
            <TouchableOpacity onPress={() => Linking.openURL(props.source_url)}>
                <Text
                    style={{
                        fontSize: 20,
                        marginTop: 10,
                        marginBottom: 5,
                        marginLeft: 10,
                        marginRight: 10,
                    }}
                >
                    {props.title}
                </Text>
            </TouchableOpacity>
            <Text
                style={{
                    fontSize: 16,
                    marginLeft: 10,
                    marginRight: 10,
                    color: "grey",
                }}
            >
                {props.description}
            </Text>
            <Text
                style={{
                    fontSize: 12,
                    margin: 10,
                    marginBottom: 0,
                    color: "grey",
                    position: "absolute", //Here is the trick
                    bottom: "4.5%",
                }}
            >
                by {props.author_name}
            </Text>
            <Text
                style={{
                    fontSize: 12,
                    marginLeft: 10,
                    color: "grey",
                    position: "absolute", //Here is the trick
                    bottom: "2%",
                }}
            >
                from {props.source_name}
            </Text>
            <TouchableOpacity
                onPress={handeBookmark}
                style={{
                    position: "absolute",
                    bottom: "2%",
                    right: "2%",
                }}
            >
                <Ionicons name={icon} size={30} color="black" />
            </TouchableOpacity>
        </View>
    );
}

export default Card;
