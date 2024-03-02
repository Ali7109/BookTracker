import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { BookInfoProps } from "../Types/BookType";

export const BookInfo = ({ book, visible, setvisible }: BookInfoProps) => {
	return (
		<View
			style={styles.centeredView}
			onTouchEnd={() => setvisible(!visible)}
		>
			<Modal animationType="slide" transparent={true} visible={visible}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalTitle}>{book.title}</Text>
						<View style={styles.info}>
							<View style={styles.infoCont}>
								<View style={styles.infoLabel}>
									<Text>Current page</Text>
								</View>
								<Text style={styles.infoText}>
									{book.pageSaved}
								</Text>
							</View>
							<View style={styles.infoCont}>
								<View style={styles.infoLabel}>
									<Text>Total pages</Text>
								</View>
								<Text style={styles.infoText}>
									{book.totalPages}
								</Text>
							</View>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	centeredView: {
		backgroundColor: "rgba(0, 0, 0, 0.2)",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	info: {
		width: "80%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
	},
	infoCont: {
		backgroundColor: "white",
		borderRadius: 20,
		padding: 10,
		margin: 10,
		height: 100,
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
