/*
Listen for messages from the page.
If the message was from the page script, show an alert.
*/

window.addEventListener("message", (event) => {
	var stat;
	if (event.source == window &&
		event.data) {

		var data = event.data;

		if (data.message === "init") {
			stat = browser.runtime.sendMessage(data)

			stat.then((bgResponse) => {
				// TODO
			}, (err) => {
				console.log("init error:", err)
			});
		}
		if (data.message === "save") {
			stat = browser.runtime.sendMessage(data)

			stat.then((bgResponse) => {
				// TODO
			}, (err) => {
				console.log("save error:", err)
			});
		}
		if (data.message === "save-to-sub") {
			stat = browser.runtime.sendMessage(data)

			stat.then((bgResponse) => {
				// TODO
			}, (err) => {
				console.log("save-to-sub error:", err)
			});
		}
	}
});
