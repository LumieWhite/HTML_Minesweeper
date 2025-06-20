import {audios} from "./data.js"
import {get_random} from "./utils.js"

export function play_audio(audio_name) {
	const audio = audios[audio_name];
	audio.currentTime = 0;
	audio.play();
}

export function play_audio_random(audio_names) {
	const audio_name = get_random(audio_names);
	play_audio(audio_name);
}