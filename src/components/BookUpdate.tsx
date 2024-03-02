import React, { useEffect, useState } from "react";
import {
	Alert,
	Modal,
	StyleSheet,
	Text,
	Pressable,
	View,
	TextInput,
} from "react-native";
import { BookUpdateProps } from "../Types/BookType";
import { Picker } from "@react-native-picker/picker";

export const BookUpdate = ({
	book,
	books,
	visible,
	setBooks,
	setvisible,
}: BookUpdateProps) => {
	const [updatePage, setUpdatePage] = useState<number>(book.pageSaved);

	const handleClose = () => {
		if (updatePage !== book.pageSaved) {
			Alert.alert("Closing without save", " Your change wont be saved!", [
				{
					text: "OK",
					onPress: () => setvisible(false),
				},
				{
					text: "Cancel",
					onPress: () => {},
				},
			]);
		} else {
			setvisible(false);
		}
	};

	const handleSave = () => {
		const newBooks = [...books];
		const index = newBooks.findIndex((b) => b.title === book.title);
		newBooks[index].pageSaved = updatePage;
		setBooks(newBooks);
		setvisible(false);
	};

	return (
		<View style={styles.centeredView}>
			<Modal animationType="slide" transparent={true} visible={visible}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Pressable
							style={styles.close}
							onPress={() => handleClose()}
						>
							<Text style={styles.cross}>X</Text>
						</Pressable>
						<View style={styles.header}>
							<Text style={styles.updating}>Updating</Text>
						</View>
						<Text style={styles.modalTitle}>{book.title}</Text>
						<View style={styles.info}>
							<View style={styles.infoCont}>
								<View style={styles.infoLabel}>
									<Text>Current page</Text>
								</View>
								<TextInput
									keyboardType="numeric"
									onChangeText={(text) => {
										// Convert text to number
										const number = parseInt(text);
										if (text == "") return;
										// Check if the number is within the range
										if (
											!isNaN(number) &&
											number >= 0 &&
											number <= book.totalPages
										) {
											setUpdatePage(number); // Update state
										} else {
											if (number > book.totalPages) {
												Alert.alert(
													"Your book doesn't have that many pages."
												);
											}
											setUpdatePage(0); // Reset state
										}
									}}
									style={styles.pageUpdate}
									value={updatePage.toString()}
									placeholderTextColor={"white"}
								/>
							</View>
						</View>
						<Pressable
							style={styles.save}
							onPress={() => handleSave()}
						>
							<Text style={styles.saveText}>Save</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	save: {
		backgroundColor: "#BBCEA8",
		borderRadius: 20,
		padding: 10,
		paddingHorizontal: 20,
	},
	saveText: {
		color: "black",
		fontSize: 20,
		textAlign: "center",
	},
	pageUpdate: {
		marginTop: 20,
		textAlign: "center",
		borderRadius: 20,
		height: "80%",
		paddingHorizontal: 20,
		backgroundColor: "black",
		color: "white",
		width: "80%",
		fontSize: 40,
	},
	header: {
		backgroundColor: "red",
		borderRadius: 20,
		padding: 10,
		paddingHorizontal: 20,
	},
	updating: {
		color: "white",
		fontSize: 20,
	},
	centeredView: {
		backgroundColor: "rgba(0, 0, 0, 0.2)",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	close: {
		position: "absolute",
		top: 0,
		right: 0,
		backgroundColor: "black",
		borderRadius: 90,
		padding: 10,
	},
	cross: {
		color: "white",
		fontSize: 30,
		fontWeight: "bold",
		borderRadius: 10,
		padding: 10,
	},
	picker: {
		backgroundColor: "black",
		color: "white",
	},
	info: {
		width: "80%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
	},
	infoCont: {
		backgroundColor: "white",
		borderRadius: 20,
		padding: 10,
		height: "70%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
	},
	infoLabel: {
		position: "absolute",
		top: -10,
		backgroundColor: "#BBCEA8",
		borderRadius: 20,
		padding: 10,
		paddingHorizontal: 20,
	},
	infoText: {
		color: "black",
		fontSize: 30,
		textAlign: "center",
	},
	modalView: {
		margin: 20,
		opacity: 1,
		backgroundColor: "black",
		borderRadius: 20,
		padding: 35,
		paddingHorizontal: 20,
		height: 500,
		width: "80%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "center",
		shadowColor: "black",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.5,
		shadowRadius: 4,
		elevation: 5,
	},
	modalTitle: {
		color: "white",
		maxWidth: "100%",
		overflow: "scroll",
		textAlign: "center",
		fontSize: 20,
	},
});
