import { ScrollView, StyleSheet, Text, View } from "react-native";
import Book from "../src/components/Book";
import React from "react";

export default function BookShowcase() {
	const books = [
		{
			title: "The Great Gatsby",
			pageSaved: 45,
			totalPages: 180,
			lastOpened: "2024-02-28",
		},
		{
			title: "The Catcher in the Rye",
			pageSaved: 100,
			totalPages: 200,
			lastOpened: "2024-02-28",
		},
		{
			title: "To Kill a Mockingbird",
			pageSaved: 200,
			totalPages: 300,
			lastOpened: "2024-02-28",
		},
	];

	return (
		<View style={styles.container}>
			<View style={styles.booksShowcase}>
				<ScrollView
					automaticallyAdjustContentInsets
					style={styles.scroll}
				>
					{books.map((book, index) => (
						<React.Fragment key={index}>
							<Book book={book} />
						</React.Fragment>
					))}
				</ScrollView>
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
	scroll: {
		minHeight: 400,
		maxHeight: 600,
		width: "60%",
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
