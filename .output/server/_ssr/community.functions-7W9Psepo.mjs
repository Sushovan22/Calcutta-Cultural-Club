import { i as readCommunityPhotos, n as fileToDataUrl, o as saveContactSubmission, t as addCommunityPhoto } from "./local-community-store-BmH6CVT7.mjs";
import { a as TSS_SERVER_FUNCTION, l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { r as photoSchema, t as contactSchema } from "./community-schemas-D938laNC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/community.functions-7W9Psepo.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var submitContact_createServerFn_handler = createServerRpc({
	id: "fa363fe6cd9737698a1483a9f1c97acc7153bcfd0aa4feb704be9f1e0829ec79",
	name: "submitContact",
	filename: "src/lib/community.functions.ts"
}, (opts) => submitContact.__executeServer(opts));
var submitContact = createServerFn({ method: "POST" }).inputValidator((input) => contactSchema.parse(input)).handler(submitContact_createServerFn_handler, async ({ data }) => {
	return {
		id: saveContactSubmission({
			name: data.name,
			email: data.email,
			phone: data.phone,
			interest: data.interest,
			thought: data.interest === "Others" ? data.thought : ""
		}).id,
		success: true
	};
});
var getPhotos_createServerFn_handler = createServerRpc({
	id: "fe916ea507e5519748ccd6d3b21d6b6646e20581038c40783118b0a8e96f6e63",
	name: "getPhotos",
	filename: "src/lib/community.functions.ts"
}, (opts) => getPhotos.__executeServer(opts));
var getPhotos = createServerFn({ method: "GET" }).handler(getPhotos_createServerFn_handler, async () => {
	return {
		photos: readCommunityPhotos().slice(0, 12).map((photo) => ({
			id: photo.id,
			handle: photo.handle,
			caption: photo.caption,
			url: photo.url
		})),
		error: null
	};
});
var uploadPhoto_createServerFn_handler = createServerRpc({
	id: "c65ccd79b89379bebe4b0a66668266b1089888955a2188ddf43ac24aab8490fd",
	name: "uploadPhoto",
	filename: "src/lib/community.functions.ts"
}, (opts) => uploadPhoto.__executeServer(opts));
var uploadPhoto = createServerFn({ method: "POST" }).inputValidator((input) => {
	if (!(input instanceof FormData)) throw new Error("Please select a photo.");
	return input;
}).handler(uploadPhoto_createServerFn_handler, async ({ data }) => {
	const file = data.get("photo");
	const meta = photoSchema.parse({
		handle: data.get("handle") || "",
		caption: data.get("caption") || ""
	});
	if (!(file instanceof File) || !file.size || file.size > 10485760) throw new Error("Choose a photo smaller than 10 MB.");
	if (![
		"image/jpeg",
		"image/png",
		"image/webp"
	].includes(file.type)) throw new Error("Choose a JPG, PNG, or WebP photo.");
	const url = await fileToDataUrl(file);
	const path = `gallery/${globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`}.png`;
	addCommunityPhoto({
		path,
		handle: meta.handle || "@community",
		caption: meta.caption,
		url
	});
	return { success: true };
});
//#endregion
export { getPhotos_createServerFn_handler, submitContact_createServerFn_handler, uploadPhoto_createServerFn_handler };
