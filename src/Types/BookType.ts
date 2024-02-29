export interface BookInfoProps {
	book: BookType;
	visible: boolean;
	setvisible: (visible: boolean) => void;
}
export interface BookButtonProps{
	book: BookType;
	setvisible: (visible: boolean) => void;
}
export interface BookUpdateProps {
	book: BookType;
	visible: boolean;
	setvisible: (visible: boolean) => void;
}
export interface BookType {
		title: string;
		pageSaved: number;
		lastOpened: string;
		totalPages: number,
}

export interface BookProps {
	book: BookType;
}