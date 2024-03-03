export interface BookType {
	title: string;
	pageSaved: number;
	lastOpened: string;
	totalPages: number,
}

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
	refresh: boolean;
	setvisible: (visible: boolean) => void;
	setRefresh: (refresh: boolean) => void;
}

export interface BookProps {
	book: BookType;
	refresh: boolean;
	setRefresh: (refresh: boolean) => void;
}

export interface BookCreateProps {
	visible: boolean;
	refresh: boolean;
	setRefresh: (refresh: boolean) => void;
	setvisible: (visible: boolean) => void;
}