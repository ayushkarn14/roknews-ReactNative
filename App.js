import LoginScreen from "./components/LoginScreen";
import SignUpScreen from "./components/SignUpScreen";
import { NavigationContainer } from "@react-navigation/native";
// import HomeScreen from "./screens/HomeScreen";
// import ParentScreen from "./screens/ParentScreen";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./components/Home";
import Parent from "./components/Parent";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator id="stack">
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        title: "Login",
                        headerStyle: {
                            backgroundColor: "#333333",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUpScreen}
                    options={{
                        title: "Sign Up",
                        headerStyle: {
                            backgroundColor: "#333333",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />
                <Stack.Screen
                    name="Parent"
                    component={Parent}
                    options={{
                        title: "Home",
                        headerStyle: {
                            backgroundColor: "#333333",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
