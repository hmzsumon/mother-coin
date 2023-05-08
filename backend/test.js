function generateUniqueId() {
	const timestamp = new Date().getTime().toString();
	const random = Math.floor(Math.random() * 100000000)
		.toString()
		.padStart(8, '0');
	return timestamp + random;
}

const id = generateUniqueId().substring(0, 12);
console.log(id);
console.log(id.length);
