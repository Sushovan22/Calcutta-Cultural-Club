import { Buffer } from "node:buffer";
//#region node_modules/.nitro/vite/services/ssr/assets/local-community-store-BmH6CVT7.js
var activityKinds = [
	"Social work",
	"Cultural activities",
	"Fun tourism",
	"Others"
];
var CONTACT_KEY = "cultural-club.contact-submissions";
var PHOTOS_KEY = "cultural-club.community-photos";
var ACTIVITY_PHOTOS_KEY = "cultural-club.activity-photos";
var memoryStore = {
	contacts: [],
	photos: []
};
function getStorage() {
	if (typeof window !== "undefined" && window.localStorage) return window.localStorage;
}
function readJson(key, fallback) {
	const storage = getStorage();
	if (storage) try {
		const raw = storage.getItem(key);
		if (raw) return JSON.parse(raw);
	} catch (error) {
		console.warn(`[local-store] Unable to read ${key}`, error);
	}
	return fallback;
}
function writeJson(key, value) {
	const storage = getStorage();
	if (storage) try {
		storage.setItem(key, JSON.stringify(value));
	} catch (error) {
		console.warn(`[local-store] Unable to write ${key}`, error);
	}
}
function readContactSubmissions() {
	const records = readJson(CONTACT_KEY, memoryStore.contacts);
	memoryStore.contacts = records;
	return [...records];
}
function saveContactSubmission(input) {
	const record = {
		...input,
		id: globalThis.crypto?.randomUUID?.() || `contact-${Date.now()}-${Math.random().toString(16).slice(2)}`,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	const next = [record, ...readContactSubmissions()];
	memoryStore.contacts = next;
	writeJson(CONTACT_KEY, next);
	return record;
}
function readCommunityPhotos() {
	const records = readJson(PHOTOS_KEY, memoryStore.photos);
	memoryStore.photos = records;
	return [...records];
}
function addCommunityPhoto(input) {
	const record = {
		...input,
		id: globalThis.crypto?.randomUUID?.() || `photo-${Date.now()}-${Math.random().toString(16).slice(2)}`,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	const next = [record, ...readCommunityPhotos()];
	memoryStore.photos = next;
	writeJson(PHOTOS_KEY, next);
	return record;
}
async function fileToDataUrl(file) {
	const bytes = new Uint8Array(await file.arrayBuffer());
	let base64;
	if (typeof btoa === "function") {
		const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
		base64 = btoa(binary);
	} else if (typeof Buffer !== "undefined") base64 = Buffer.from(bytes).toString("base64");
	else throw new Error("The selected photo could not be processed.");
	return `data:${file.type || "image/png"};base64,${base64}`;
}
function readActivityPhotos() {
	const stored = readJson(ACTIVITY_PHOTOS_KEY, {});
	const output = {
		"Social work": null,
		"Cultural activities": null,
		"Fun tourism": null,
		Others: null
	};
	for (const kind of activityKinds) output[kind] = stored[kind] ?? null;
	return output;
}
//#endregion
export { readContactSubmissions as a, readCommunityPhotos as i, fileToDataUrl as n, saveContactSubmission as o, readActivityPhotos as r, addCommunityPhoto as t };
