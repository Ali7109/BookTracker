import {
	ActivityIndicator,
	Alert,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import Book from "../src/components/Book";
import React, { useEffect, useState } from "react";
import { BOOKS_MOCK } from "../src/mockData/booksData";
import { BookCreate } from "../src/components/BookCreate";
import { BookType } from "../src/Types/BookType";

export default function BookShowcase() {
	const [books, setBooks] = useState([] as BookType[]);
	const [createModal, setCreateModal] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [loading, setLoading] = useState(true);

	const fetchBooks = async () => {
		try {
			const res = await fetch("http://10.45.9.133:8000/api/books");
			if (!res.ok) {
				throw new Error("Failed to fetch books");
			}
			const data = await res.json();
			return data;
		} catch (error: any) {
			console.error("Error fetching books:", error.message);
			return [];
		}
	};

	useEffect(() => {
		fetchBooks().then((data) => {
			setBooks(data);
			setLoading(false);
		});
	}, [refresh]);

	return (
		<View style={styles.container}>
			<View style={styles.booksShowcase}>
				{loading ? (
					<ActivityIndicator size="large" color="#000000" />
				) : (
					<>
						<ScrollView
							automaticallyAdjustContentInsets
							style={styles.scroll}
						>
							{books.map((book, index) => (
								<React.Fragment key={index}>
									<Book
										refresh={refresh}
										setRefresh={setRefresh}
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
						<BookCreate
							refresh={refresh}
							setRefresh={setRefresh}
							visible={createModal}
							setvisible={setCreateModal}
						/>
					</>
				)}
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
