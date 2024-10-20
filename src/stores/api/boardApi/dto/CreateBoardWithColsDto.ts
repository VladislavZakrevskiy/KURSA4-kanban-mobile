export interface Column {
	title: string;
	description: string;
}

export interface CreateBoardWithColsDto {
	title: string;
	description: string;
	columns: Column[];
}