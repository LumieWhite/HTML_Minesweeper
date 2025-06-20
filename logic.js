import {config, icons} from "./data.js"
import {play_audio, play_audio_random} from "./utils_media.js"
import {game_setup, mine_setup} from "./setup.js"
import {get_cells_revealed, get_mines_left, get_cell, get_popup, get_cells} from "./utils.js"

function show_popup(message) {
	const popup = get_popup();
	const popup_text = document.getElementById("popup_text");
	popup.style.display = "flex";
	popup_text.textContent = message;
	popup.addEventListener("click", () => {
		game_setup();
	});
}

function handle_fail() {
	config.GAME_STATE = "Failed";
	play_audio("fail");
	show_popup("You failed");
}

function handle_win() {
	config.GAME_STATE = "Won";
	play_audio("win");
	show_popup("You won !!!");
}

function check_win() {
	return (get_cells_revealed() - config.ROWS*config.COLS + get_mines_left()) == 0;
}

export function reveal_cell(cell) {

	if (cell.dataset.is_revealed == "true") return;
	if (cell.dataset.value == "?") {
		mine_setup(cell.dataset.row, cell.dataset.col);
		play_audio("game_start");
	}
	if (cell.dataset.is_flagged == "false") {
		play_audio("dig");
		cell.textContent = cell.dataset.value;
		cell.dataset.is_revealed = true;
		if (cell.dataset.has_mine == "false") {
			cell.classList.add("revealed")
		} else {
			handle_fail();
			return;
		}
		if (cell.dataset.value == "0") {
			play_audio("expand");
			cell.textContent = "";
			chord_cell(cell);
		}
	}
	if (check_win()) handle_win();

}

export function flag_cell(cell) {
	if (cell.dataset.is_revealed == "true") return;
	if (cell.dataset.is_flagged == "false") {
		cell.textContent = icons["flag"];
		cell.dataset.is_flagged = true;
		play_audio("flag");
	} else {
		cell.textContent = "";

		cell.dataset.is_flagged = false;
	}
}

export function chord_cell(cell) {
	if (cell.dataset.is_revealed == "false") return;
	if (cell.dataset.is_flagged == "true") return;
	const directions = [
		[-1, -1], [0, -1], [1, -1],
		[-1,  0], [0,  0], [1,  0],
		[-1,  1], [0,  1], [1,  1]
	];
	for (const [dx, dy] of directions) {
		const r = dy + Number(cell.dataset.row);
		const c = dx + Number(cell.dataset.col);
		const neighbor = get_cell(r, c);
		if (neighbor) reveal_cell(neighbor);
	}
}