"use strict";

var path = {};

function getOsInfo(cb) {
	browser.runtime.getPlatformInfo().then((info) => {
		cb(info);
	})
};

getOsInfo((info) => {
	if (info.os === "win") {
		path.sep = "\\";
	} else {
		path.sep = "/";
	}
});

//
//
// Background main() listener!!
//
//
browser.runtime.onMessage.addListener(handleMessages);

// should be straight forward and simple.
// uses the following  construction to respond back to the contentScript:
// https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/onMessage#Sending_an_asynchronous_response_using_a_Promise
async function handleMessages(data, sender, sendResponse) {
	// Standard save message from contentScript
	if (data.message === "save") {
		return handleSave(data, "");
	}

	// Standard save-to-sub message from contentScript
	if (data.message === "init") {
		return handleSave(data, "", true);
	}

	// Standard save-to-sub message from contentScript
	if (data.message === "save-to-sub") {
		let dir = "subdir" + path.sep;
		return handleSave(data, dir);
	}

	return "error"; // error
}

async function handleSave(message, subdir, init) {
	let test,
		itemId,
		results,
		response;

	// needed, for a roundtrip, to set up the right save directory.
	itemId = await browser.downloads.download({
		url: URL.createObjectURL(new Blob(["<!DOCTYPE html>\n<html>" + message.txt + "</html>\n"], {type: "text/plain"})),
		filename: subdir + "quine.html",
		conflictAction: "overwrite"
	});

	if (itemId) {
		results = await browser.downloads.search({id: itemId});
	}

	if (init || (results && subdir)) {
		// Create a backup
		console.log("save result: ", results[0]);
		return prepareAndOpenNewTab(results[0].filename);
	}
}

function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function prepareAndOpenNewTab(fName) {
	//TDOO remove this hack!!!
	await timeout(1000);

	browser.tabs.create({
		active: true,
		url: fName
	});
}
