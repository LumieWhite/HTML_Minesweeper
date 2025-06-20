export function get_cells() {
	return document.querySelectorAll(".container .cell");
}

export function get_cell(row, col) {
	return Array.from(get_cells()).find(cell => {
		return cell.dataset.row == row && cell.dataset.col == col;
	});
}

export function get_container() {
	return document.querySelector(".container");
}

export function get_root() {
	return document.documentElement;
}

export function get_random_bool(rate) {
	return Math.random() < rate;
}

export function get_popup() {
	return document.querySelector(".popup");
}

export function get_mines_left() {
	return Array.from(get_cells()).filter(cell=>{
		return cell.dataset.has_mine == "true";
	}).length;
}

export function get_cells_revealed() {
	return Array.from(get_cells()).filter(cell=>{
		return cell.dataset.is_revealed == "true";
	}).length;
}

export function get_cells_flagged() {
	return Array.from(get_cells()).filter(cell=> {
		return cell.dataset.is_flagged == "true";
	}).length;
}

export function get_random(array) {
	const index = Math.floor(Math.random() * array.length)
	return array[index];
}