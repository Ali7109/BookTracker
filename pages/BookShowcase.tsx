import { ScrollView, StyleSheet, Text, View } from "react-native";
import Book from "../src/components/Book";
import React, { useState } from "react";
import { BOOKS_MOCK } from "../src/mockData/booksData";

export default function BookShowcase() {
	const [books, setBooks] = useState(BOOKS_MOCK);

	return (
		<View style={styles.container}>
			<View style={styles.booksShowcase}>
				<ScrollView
					automaticallyAdjustContentInsets
					style={styles.scroll}
				>
					{books.map((book, index) => (
						<React.Fragment key={index}>
							<Book
								books={books}
								setBooks={setBooks}
								book={book}
							/>
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
