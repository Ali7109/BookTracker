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

export const BookUpdate = ({
	book,
	refresh,
	setRefresh,
	visible,
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

	const updateBook = async () => {
		try {
			const url = "http://10.45.9.133:8000/api/update";
			const body = JSON.stringify({
				title: book.title,
				page_saved: updatePage,
			});

			const res = await fetch(url, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: body,
			});

			if (res.ok) {
				console.log("Book updated successfully");
			} else {
				console.error("Error updating book", res.statusText);
			}
		} catch (error: any) {
			console.error("Error updating book:", error.message);
		}
	};

	const handleSave = () => {
		try {
			if (updatePage !== book.pageSaved) {
				if (updatePage > book.totalPages) {
					Alert.alert("Your book doesn't have that many pages.");
					return;
				} else if (updatePage < 0) {
					Alert.alert("Enter a valid input.");
					return;
				} else {
					updateBook().then(() => {
						setvisible(false);
						setRefresh(!refresh);
					});
					return;
				}
			}
			setvisible(false);
		} catch (error: any) {
			Alert.alert("Save error");
		}
	};

	const handleInputChange = (text: string, stateChange: any) => {
		const number = parseInt(text);
		if (text == "") return;
		// Check if the number is within the range
		if (!isNaN(number) && number >= 0 && number <= book.totalPages) {
			stateChange(number);
		} else {
			if (number > book.totalPages) {
				Alert.alert("Your book doesn't have that many pages.");
			}
			stateChange(0);
		}
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
									onChangeText={(text) =>
										handleInputChange(text, setUpdatePage)
									}
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
