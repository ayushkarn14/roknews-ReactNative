import Home from "./Home";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from "./LoginScreen";
const Drawer = createDrawerNavigator();

export default function Parent() {
    return (
        <NavigationContainer independent={true}>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen
                    name="Home"
                    component={Home}
                    initialParams={{ category: "all" }}
                />
                <Drawer.Screen
                    name="Bookmarked"
                    component={Home}
                    initialParams={{ category: "bookmarked" }}
                />
                <Drawer.Screen
                    name="Tech"
                    component={Home}
                    initialParams={{ category: "topics/technology" }}
                />
                <Drawer.Screen
                    name="Business"
                    component={Home}
                    initialParams={{ category: "topics/business" }}
                />
                <Drawer.Screen
                    name="National"
                    component={Home}
                    initialParams={{ category: "topics/national" }}
                />
                <Drawer.Screen
                    name="Sports"
                    component={Home}
                    initialParams={{ category: "topics/sports" }}
                />
                <Drawer.Screen
                    name="World"
                    component={Home}
                    initialParams={{ category: "topics/world" }}
                />
                <Drawer.Screen
                    name="Politics"
                    component={Home}
                    initialParams={{ category: "topics/politics" }}
                />
                <Drawer.Screen
                    name="Startup"
                    component={Home}
                    initialParams={{ category: "topics/startup" }}
                />
                <Drawer.Screen
                    name="Science"
                    component={Home}
                    initialParams={{ category: "topics/science" }}
                />
                <Drawer.Screen
                    name="Automobile"
                    component={Home}
                    initialParams={{ category: "topics/automobile" }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
