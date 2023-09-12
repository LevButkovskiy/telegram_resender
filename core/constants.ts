export const SELECTORS = {
	auth: {
		passwordInput: 'input[type="password"]:not(.stealthy)',
		submitButton: {
			a: 'button[type="submit"]',
			k: ".input-wrapper .btn-primary",
		},
		qrCode: {
			svg: ".qr-container svg",
			image: ".auth-image",
		},
	},
	chats: {
		folders: ".ChatFolders",
		search: {
			input: "input#telegram-search-input",
			result: ".search-result",
		},
		messages: {
			group: ".message-date-group",
			list: ".Message",
			content: ".text-content",
		},
	},
}

export const TIMEOUTS = {
	checkLogin: 5000,
}
