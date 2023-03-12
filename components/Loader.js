import React from "react";
import cube from "../assets/loader.gif";
import { Image } from "react-native";
function Loader() {
    return (
        <Image
            source={cube}
            style={{ width: 100, height: 100, alignSelf: "center" }}
        />
    );
}

export default Loader;
