import { Pressable, StyleSheet, Text } from "react-native";
import { BookProps } from "../Types/BookType";
import { useState } from "react";
import { BookInfo } from "./BookInfo";
import { BookUpdate } from "./BookUpdate";

export default function Book({ book }: BookProps) {
	const [modalVisible, setModalVisible] = useState(false);
	const [updateVisible, setUpdateVisible] = useState(false);

	return (
		<>
			<Pressable
				onPress={() => {
					setModalVisible(true);
				}}
				style={styles.book}
			>
				<Text style={styles.displayTitle}>{book.title}</Text>
				<Pressable
					onPress={() => {
						setUpdateVisible(true);
					}}
					style={styles.editbtn}
				>
					<Text style={styles.editTxt}>Update</Text>
				</Pressable>
			</Pressable>
			<BookInfo
				book={book}
				visible={modalVisible}
				setvisible={setModalVisible}
			/>
			<BookUpdate
				book={book}
				visible={updateVisible}
				setvisible={setUpdateVisible}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	book: {
		margin: 10,
		minHeight: 120,
		maxHeight: 130,
		backgroundColor: "white",
		borderRadius: 50,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "black",
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.3,
		position: "relative",
	},
	editbtn: {
		position: "absolute",
		bottom: 0,
		backgroundColor: "black",
		padding: 5,
		paddingHorizontal: 15,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	editTxt: {
		color: "white",
		fontSize: 17,
	},
	displayTitle: {
		fontSize: 15,
		fontWeight: "bold",
	},
});
