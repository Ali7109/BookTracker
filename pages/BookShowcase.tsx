import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Book from "../src/components/Book";
import React, { useState } from "react";
import { BOOKS_MOCK } from "../src/mockData/booksData";
import { BookCreate } from "../src/components/BookCreate";

export default function BookShowcase() {
	const [books, setBooks] = useState(BOOKS_MOCK);
	const [createModal, setCreateModal] = useState(false);

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
				<Pressable
					onPress={() => setCreateModal(true)}
					style={styles.addView}
				>
					<Text style={styles.addBtn}>
						Add <Text style={styles.sp}>Book</Text>
					</Text>
				</Pressable>
				<BookCreate visible={createModal} setvisible={setCreateModal} />
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
	addView: {
		borderRadius: 50,
		backgroundColor: "black",
		width: 200,
		height: 50,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	addBtn: {
		color: "white",
		fontSize: 20,
		fontWeight: "bold",
	},
	sp: {
		color: "#BBCEA8",
	},
	scroll: {
		minHeight: 400,
		maxHeight: 600,
		width: "70%",
	},
	booksShowcase: {
		margin: 10,
		paddingTop: 80,
		width: "100%",
		height: "100%",
		backgroundColor: "#BBCEA8",
		borderRadius: 50,
		display: "flex",
		justifyContent: "space-around",
		alignItems: "center",
	},
});
