import { StatusBar } from "expo-status-bar";
import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Home({ navigation }: any) {
	return (
		<View style={styles.container}>
			<View style={styles.home}>
				<Image
					source={require("../assets/theKeeper.jpeg")}
					style={styles.logo}
				/>
				<View style={styles.appTitle}>
					<Text style={styles.titleText}>QuillQuest</Text>
				</View>
				<Pressable
					style={styles.showcaseButton}
					onPress={() =>
						navigation.navigate("BookShowcase", { name: "Jane" })
					}
				>
					<Text style={styles.buttonText}>View Books</Text>
				</Pressable>
			</View>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	appTitle: {
		fontSize: 30,
		margin: 20,
	},
	titleText: {
		fontSize: 30,
		fontWeight: "bold",
		color: "black",
	},
	logo: {
		width: 200,
		height: 200,
		borderRadius: 100,
		shadowColor: "black",
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.3,
	},
	container: {
		flex: 1,
		backgroundColor: "black",
		alignItems: "center",
		justifyContent: "center",
	},
	home: {
		margin: 10,
		width: "100%",
		height: "100%",
		backgroundColor: "#BBCEA8",
		borderRadius: 50,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	showcaseButton: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 10,
		elevation: 3,
		backgroundColor: "black",
		shadowColor: "black",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
	},
	buttonText: {
		fontSize: 20,
		lineHeight: 21,
		fontWeight: "bold",
		letterSpacing: 0.25,
		color: "#BBCEA8",
	},
});
