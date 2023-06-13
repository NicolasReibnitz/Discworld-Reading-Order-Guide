import { LocalStorage } from 'quasar';

document.onkeydown = keyboardShortcuts;

const showDevBackgrounds1 = LocalStorage.getItem('showDevBackgrounds1');
const showDevBackgrounds2 = LocalStorage.getItem('showDevBackgrounds2');
if (showDevBackgrounds1) {
	document.body.classList.add('dev-backgrounds');
} else {
	LocalStorage.set('showDevBackgrounds1', false);
}

if (showDevBackgrounds2) {
	document.body.classList.add('dev-backgrounds-plus');
} else {
	LocalStorage.set('showDevBackgrounds2', false);
}

function keyboardShortcuts(event) {
	const key = event.code;
	const meta = event.metaKey;
	const alt = event.altKey;
	// console.log('key: ', key, meta, event);

	// toggle the left drawer
	if (key === 'Backquote') {
		const btn = document.getElementById('leftDrawerBtn');
		if (btn) {
			btn.click();
		}
	}

	// if (key === 'KeyH') {
	// 	const btn = document.getElementById('btn-home');
	// 	if (btn) {
	// 		btn.click();
	// 	}
	// }

	// if (key === 'ArrowRight') {
	// 	const btn = document.getElementById('btn-next');
	// 	if (btn) {
	// 		btn.click();
	// 	}
	// }

	// if (key === 'ArrowLeft') {
	// 	const btn = document.getElementById('btn-previous');
	// 	if (btn) {
	// 		btn.click();
	// 	}
	// }

	// clear the console
	if (key === 'KeyK' && meta) {
		console.clear();
	}

	// toggle dev backgrounds
	if (key === 'Digit1' && alt) {
		document.body.classList.toggle('dev-backgrounds');
		if (document.body.classList.contains('dev-backgrounds')) {
			LocalStorage.set('showDevBackgrounds1', true);
		} else {
			LocalStorage.set('showDevBackgrounds1', false);
		}
	}

	// toggle dev backgrounds
	if (key === 'Digit2' && alt) {
		document.body.classList.toggle('dev-backgrounds-plus');
		if (document.body.classList.contains('dev-backgrounds-plus')) {
			LocalStorage.set('showDevBackgrounds2', true);
		} else {
			LocalStorage.set('showDevBackgrounds2', false);
		}
	}
}
