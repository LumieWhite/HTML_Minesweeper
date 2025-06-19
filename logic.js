import {get_container, get_cells, get_root} from "./utils.js"
import {config} from "./data.js";

function root_setup() {
	const container = get_container();
	const root = get_root();
	root.style.setProperty("--cell-size", `${config.CELL_SIZE}px`);
	root.style.setProperty("--rows", `${config.ROWS}`);
	root.style.setProperty("--cols", `${config.COLS}`);
	console.log(root);
}

export function game_setup() {
	root_setup();
}