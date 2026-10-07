import { a as TSS_SERVER_FUNCTION, l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { t as contactSchema } from "./community-schemas-D938laNC.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver--bBrwUqz.mjs";
import { t as queryOptions } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BWIP5cS8.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var submitContact = createServerFn({ method: "POST" }).inputValidator((input) => contactSchema.parse(input)).handler(createSsrRpc("fa363fe6cd9737698a1483a9f1c97acc7153bcfd0aa4feb704be9f1e0829ec79"));
var getPhotos = createServerFn({ method: "GET" }).handler(createSsrRpc("fe916ea507e5519748ccd6d3b21d6b6646e20581038c40783118b0a8e96f6e63"));
var uploadPhoto = createServerFn({ method: "POST" }).inputValidator((input) => {
	if (!(input instanceof FormData)) throw new Error("Please select a photo.");
	return input;
}).handler(createSsrRpc("c65ccd79b89379bebe4b0a66668266b1089888955a2188ddf43ac24aab8490fd"));
var photosOptions = queryOptions({
	queryKey: ["community-photos"],
	queryFn: () => getPhotos(),
	staleTime: 12e4
});
//#endregion
export { submitContact as n, uploadPhoto as r, photosOptions as t };
