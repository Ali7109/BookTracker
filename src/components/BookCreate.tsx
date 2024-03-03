import React, { useEffect, useState } from "react";
import {
	Alert,
	Modal,
	StyleSheet,
	Text,
	Pressable,
	View,
	TextInput,
	Keyboard,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { BookCreateProps } from "../Types/BookType";

export const BookCreate = ({
	refresh,
	setRefresh,
	visible,
	setvisible,
}: BookCreateProps) => {
	const [title, setTitle] = useState<string>("");
	const [startPage, setStartPage] = useState<number>(0);
	const [totalPages, setTotalPages] = useState<number>(0);

	const handleClose = () => {
		if (title !== "" || startPage !== 0 || totalPages !== 0) {
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
			return;
		}
		setvisible(false);
	};

	const handleInputChange = (text: string, stateChange: any) => {
		const number = parseInt(text);
		if (text == "") return;
		// Check if the number is within the range
		if (!isNaN(number) && number >= 0 && number <= 30000) {
			stateChange(number);
		} else {
			if (number > 30000) {
				Alert.alert("Too many pages.");
			}
			stateChange(0);
		}
	};

	const createBook = async () => {
		try {
			const url = "http://10.45.9.133:8000/api/create";
			const body = JSON.stringify({
				title: title,
				page_saved: startPage,
				total_pages: totalPages,
			});

			const res = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: body,
			});

			if (res.ok) {
				console.log("Book created successfully");
			} else {
				console.error("Error creating book", res.statusText);
			}
		} catch (error: any) {
			console.error("Error creating book:", error.message);
		}
	};

	const handleSave = () => {
		try {
			if (title === "" || totalPages === 0) {
				Alert.alert("Please fill all the fields");
				return;
			} else {
				if (totalPages < startPage) {
					Alert.alert(
						"The current page is larger than the book pages."
					);
					setStartPage(totalPages);
					return;
				}
			}
			createBook().then(() => {
				setRefresh(!refresh);
				setvisible(false);
				setTitle("");
				setStartPage(0);
				setTotalPages(0);
			});
		} catch (error: any) {
			console.error("Error creating book", error.message);
		}
	};

	return (
		<Modal
			style={styles.centeredView}
			animationType="slide"
			transparent={true}
			visible={visible}
		>
			<TouchableWithoutFeedback
				onPress={Keyboard.dismiss}
				accessible={false}
			>
				<View style={styles.centeredView}>
					<KeyboardAvoidingView
						style={styles.avoidingView}
						behavior={Platform.OS == "ios" ? "padding" : "height"}
					>
						<View style={styles.modalView}>
							<Pressable
								style={styles.close}
								onPress={() => handleClose()}
							>
								<Text style={styles.cross}>x</Text>
							</Pressable>
							<View style={styles.header}>
								<Text style={styles.adding}>Adding book</Text>
							</View>
							<View style={styles.info}>
								<View style={styles.titleCont}>
									<View style={styles.title}>
										<Text style={styles.inputTitle}>
											Title
										</Text>
									</View>
									<TextInput
										placeholder="Enter title"
										style={styles.textInput}
										onChangeText={(text) => setTitle(text)}
										value={title}
										placeholderTextColor={"white"}
									/>
								</View>

								<View style={styles.infoCont}>
									<View style={styles.infoLabel}>
										<Text style={styles.inputTitle}>
											Current Page
										</Text>
									</View>
									<TextInput
										keyboardType="numeric"
										onChangeText={(text) =>
											handleInputChange(
												text,
												setStartPage
											)
										}
										style={styles.numInput}
										value={startPage.toString()}
										placeholderTextColor={"white"}
									/>
								</View>
								<View style={styles.infoCont}>
									<View style={styles.infoLabel}>
										<Text style={styles.inputTitle}>
											Total Pages
										</Text>
									</View>
									<TextInput
										keyboardType="numeric"
										onChangeText={(text) =>
											handleInputChange(
												text,
												setTotalPages
											)
										}
										style={styles.numInput}
										value={totalPages.toString()}
										placeholderTextColor={"white"}
									/>
								</View>
							</View>
							<Pressable style={styles.save} onPress={handleSave}>
								<Text style={styles.saveText}>Save</Text>
							</Pressable>
						</View>
					</KeyboardAvoidingView>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

const styles = StyleSheet.create({
	titleCont: {
		backgroundColor: "white",
		borderRadius: 20,
		padding: 10,
		marginBottom: 25,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
	},
	title: {
		position: "absolute",
		top: -10,
		backgroundColor: "#BBCEA8",
		borderRadius: 20,
		padding: 10,
		paddingHorizontal: 20,
	},
	textInput: {
		backgroundColor: "black",
		color: "white",
		borderRadius: 15,
		marginTop: 30,
		paddingHorizontal: 20,
		fontSize: 20,
		height: 50,
		width: "95%",
	},
	numInput: {
		marginTop: 40,
		textAlign: "center",
		borderRadius: 20,
		paddingHorizontal: 20,
		backgroundColor: "black",
		color: "white",
		height: 80,
		width: "95%",
		fontSize: 30,
	},
	header: {
		backgroundColor: "#BBCEA8",
		borderRadius: 10,
		padding: 10,
		paddingHorizontal: 50,
	},
	adding: {
		color: "green",
		fontSize: 20,
		fontWeight: "bold",
	},
	centeredView: {
		backgroundColor: "rgba(0, 0, 0, 0.2)",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		width: "100%",
		height: "100%",
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
		color: "rgba(255, 255, 255, 0.5)",
		fontSize: 30,
		fontWeight: "bold",
		borderRadius: 10,
		padding: 10,
	},
	save: {
		backgroundColor: "#BBCEA8",
		borderRadius: 15,
		padding: 10,
		width: 220,
	},
	saveText: {
		fontSize: 20,
		textAlign: "center",
		color: "green",
	},
	info: {
		width: "80%",
		height: "60%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
	},
	infoCont: {
		backgroundColor: "white",
		borderRadius: 20,
		padding: 10,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
		marginBottom: 25,
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
	inputTitle: {
		fontWeight: "bold",
		fontSize: 18,
	},
	modalView: {
		opacity: 1,
		backgroundColor: "black",
		borderRadius: 20,
		padding: 20,
		paddingHorizontal: 20,
		height: 720,
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
