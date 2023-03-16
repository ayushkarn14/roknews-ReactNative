import { React, useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    Alert,
    TouchableOpacity,
    RefreshControl,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { collection, getDocs } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Card from "./Card";
import Loader from "./Loader";
import { SafeAreaView } from "react-native-safe-area-context";
import { getFirestore } from "firebase/firestore";
import app from "../FirebaseConfig";
const db = getFirestore(app);

export default function Home({ route }) {
    const windowHeight = Dimensions.get("window").height;
    const category = route.params.category;
    const [article, setArticles] = useState([]);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);
    const updateNews = async () => {
        setLoading(true);
        const url = `https://inshorts.me/news/${category}?limit=100`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(parsedData.data.articles);
        setLoading(false);
    };
    const fetchBookmarked = async () => {
        setLoading(true);
        const value = await AsyncStorage.getItem("roknumber");
        const querySnapshot = await getDocs(collection(db, "users"));
        console.log(value);
        querySnapshot.forEach((doc) => {
            if (doc.data().phone == value) {
                const obj = doc.data().bookmarks;

                setArticles(obj);
                setLoading(false);
            }
        });
    };
    let greet = "";
    const getGreet = () => {
        var today = new Date();
        var curHr = today.getHours();
        if (curHr < 12) {
            greet = "Good morning";
        } else if (curHr < 18) {
            greet = "Good afternoon";
        } else {
            greet = "Good evening";
        }
    };
    const getName = async () => {
        const value = await AsyncStorage.getItem("roknumber");
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            if (doc.data().phone == value) {
                setName(doc.data().name);
            }
        });
    };
    getGreet();
    getName();
    function fun() {
        if (category != "bookmarked") updateNews();
        else fetchBookmarked();
    }
    useEffect(() => {
        fun();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {!loading && (
                <View
                    style={{
                        height: windowHeight,
                        position: "relative",
                        top: -40,
                    }}
                >
                    <ScrollView>
                        <View
                            style={{
                                width: "95%",
                                height: windowHeight / 8,
                                borderRadius: 10,
                                backgroundColor: "white",
                                marginTop: 20,
                                marginBottom: 10,
                                alignSelf: "center",
                            }}
                        >
                            <Text style={{ margin: 10, fontSize: 25 }}>
                                {greet}, {name}
                            </Text>
                            <TouchableOpacity
                                style={{
                                    position: "absolute",
                                    bottom: "6%",
                                    right: "4%",
                                }}
                                onPress={fun}
                            >
                                <Ionicons
                                    name="reload"
                                    size={30}
                                    color="black"
                                ></Ionicons>
                            </TouchableOpacity>
                        </View>
                        {article.map((element) => {
                            return (
                                <View key={element.sourceUrl}>
                                    <Card
                                        title={element.title}
                                        image_url={element.imageUrl}
                                        description={element.content}
                                        source_url={element.sourceUrl}
                                        author_name={element.authorName}
                                        source_name={element.sourceName}
                                    />
                                </View>
                            );
                        })}
                        <Card />
                    </ScrollView>
                </View>
            )}
            {loading && <Loader />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
        padding: 0,
        // backgroundColor: "orange",
    },
});
