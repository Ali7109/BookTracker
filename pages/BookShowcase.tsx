import { StyleSheet, Text, View } from "react-native";

export default function BookShowcase() {
	const books = [
		{
			title: "The Great Gatsby",
			pageSaved: 45,
			lastOpened: "2024-02-28",
		},
		{
			title: "The Catcher in the Rye",
			pageSaved: 100,
			lastOpened: "2024-02-28",
		},
		{
			title: "To Kill a Mockingbird",
			pageSaved: 200,
			lastOpened: "2024-02-28",
		},
	];
	return (
		<View style={styles.container}>
			<View style={styles.booksShowcase}>
				<Text>Books Showcase</Text>
			</View>
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
	booksShowcase: {
		margin: 10,
		width: "100%",
		height: "100%",
		backgroundColor: "#BBCEA8",
		borderRadius: 50,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
});
