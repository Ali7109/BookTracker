import { StatusBar } from "expo-status-bar";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

export default function Home({ navigation }: any) {
	return (
		<View style={styles.container}>
			<View style={styles.home}>
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
