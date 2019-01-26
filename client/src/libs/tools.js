function uuid(len) {
	let s = [];
	let hexDigits = "0123456789abcdefghijklmnopqrstuvwxyz";
	for (let i = 0; i < len; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 36), 1);
	}
	let uuid = s.join("");
	return uuid;
}

function shuffle(a) {
	let len = a.length;
	for (let i = 0; i < len; i++) {
		let end = len - 1;
		let index = (Math.random() * (end + 1)) >> 0;
		let t = a[end];
		a[end] = a[index];
		a[index] = t;
	}
	return a;
};