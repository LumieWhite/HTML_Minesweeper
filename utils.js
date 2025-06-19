export function get_cells() {
	const cells = document.querySelectorAll(".container .cell");
	return cells;
}

export function get_cell(row, col) {
	const cells = get_cells();
}

export function get_container() {
	return document.querySelector(".container");
}

export function get_root() {
	return document.documentElement;
}