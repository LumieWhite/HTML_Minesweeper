import {get_popup, get_container, get_cells, get_root, get_random_bool, get_cell} from "./utils.js"
import {config, icons} from "./data.js";
import {chord_cell, reveal_cell, flag_cell} from "./logic.js";

function root_setup() {
	const root = get_root();
	root.style.setProperty("--cell-size", `${config.CELL_SIZE}px`);
	root.style.setProperty("--rows", `${config.ROWS}`);
	root.style.setProperty("--cols", `${config.COLS}`);
}

function cell_setup() {
	const popup = get_popup();
	popup.style.display = "none";
	config.GAME_STATE = "normal";

	const container = get_container();
	container.innerHTML = "";
	for (let row = 0; row < config.ROWS; row++) {
		for (let col = 0; col < config.COLS; col++) {
			const cell = document.createElement("div");
			cell.classList.add("cell");
			cell.dataset.value = "?";
			cell.dataset.is_flagged = false;
			cell.dataset.is_revealed = false;
			cell.dataset.row = row;
			cell.dataset.col = col;
			cell.addEventListener("click", () => {
				console.log("Cicked")
				if (config.GAME_STATE == "normal") reveal_cell(cell);
			});
			cell.addEventListener("contextmenu", (event) => {
				event.preventDefault();
				if (config.GAME_STATE == "normal") flag_cell(cell);
			});
			cell.addEventListener("mousedown", (event) => {
				if (event.button == 1) {
					event.preventDefault();
					if (config.GAME_STATE == "normal") chord_cell(cell);
				}
			});
			container.appendChild(cell);
		}
	}	
}

export function mine_setup(start_row, start_col) {
    const directions = [
        [-1, -1], [0, -1], [1, -1],
        [-1,  0], [0,  0], [1,  0],
        [-1,  1], [0,  1], [1,  1]
    ];

    const cells = get_cells(); // Flat list
    const grid = {};
    const safeZone = new Set();

    // Build a grid map: grid[row][col] = cell
    for (let cell of cells) {
        const r = Number(cell.dataset.row);
        const c = Number(cell.dataset.col);
        if (!grid[r]) grid[r] = {};
        grid[r][c] = cell;
    }

    // Mark 3x3 safe zone
    for (const [dx, dy] of directions) {
        const r = Number(start_row) + dy;
        const c = Number(start_col) + dx;
        safeZone.add(`${r},${c}`);
    }

    // Assign mines (except in the safe zone)
    for (let cell of cells) {
        const key = `${cell.dataset.row},${cell.dataset.col}`;
        if (safeZone.has(key)) {
            cell.dataset.has_mine = "false";
        } else {
            cell.dataset.has_mine = get_random_bool(config.MINE_RATE) ? "true" : "false";
        }
    }

    // Compute adjacent mine counts
    for (let r in grid) {
        for (let c in grid[r]) {
            const cell = grid[r][c];
            if (cell.dataset.has_mine === "true") {
                cell.dataset.value = icons["mine"];
                continue;
            }
            let count = 0;
            for (const [dx, dy] of directions) {
                const nr = Number(r) + dy;
                const nc = Number(c) + dx;
                if (grid[nr] && grid[nr][nc] && grid[nr][nc].dataset.has_mine === "true") {
                    count++;
                }
            }
            cell.dataset.value = count;
        }
    }
}


function docu_setup() {
	document.addEventListener("keydown", (event) => {
		if (event.key === " ") {
			console.log("Restarted")
			cell_setup();
		}
	});
}

export function game_setup() {
	docu_setup();
	root_setup();
	cell_setup();
}