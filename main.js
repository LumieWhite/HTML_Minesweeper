import {game_setup} from "./setup.js";
import {get_cell, get_mines_left, get_cells_flagged, get_cells_revealed} from "./utils.js";
import {icons} from "./data.js"

game_setup();

function main_loop() {
	const info_window = document.querySelector(".info_window");
	const info_window_text = info_window.querySelector("p");
	if (get_cells_revealed() != 0) info_window_text.textContent = `${icons["flag"]}: ${get_mines_left() - get_cells_flagged()}`;
	else info_window_text.textContent = "Click anywhere to start";
	requestAnimationFrame(main_loop);
}
main_loop();