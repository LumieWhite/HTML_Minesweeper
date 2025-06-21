export const config = {
	ROWS: 15,
	COLS: 15,
	CELL_SIZE: 30,
	MINE_RATE: 0.2,
	GAME_STATE: "normal"
};

export const icons = {
	"mine": "💣",
	"flag": "🚩"
}

export const audios = {
	"game_start": new Audio("game_start.mp3"),
	"win": new Audio("win.mp3"),
	"dig": new Audio("dig.mp3"),
	"fail": new Audio("fail.mp3"),
	"flag": new Audio("flag.mp3"),
	"expand": new Audio("expand.mp3")
}