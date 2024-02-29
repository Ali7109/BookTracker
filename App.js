import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/Home";
import BookShowcase from "./pages/BookShowcase";
import { Pressable, StyleSheet, Text } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={Home}
					options={{
						title: "Home",
						headerTransparent: true,
						headerTitleStyle: {
							color: "black",
						},
					}}
				/>
				<Stack.Screen
					name="BookShowcase"
					component={BookShowcase}
					options={({ navigation }) => ({
						title: "Book Showcase",
						headerTransparent: true,
						headerLeft: () => (
							<Pressable
								onPress={() => navigation.goBack()}
								style={styles.backbtn}
							>
								<Text style={styles.backbtnText}>Go back</Text>
							</Pressable>
						),
					})}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	backbtn: {
		backgroundColor: "black",
		padding: 10,
		borderRadius: 10,
	},
	backbtnText: {
		color: "#BBCEA8",
	},
});
