//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver--bBrwUqz.js
var manifest = {
	"c65ccd79b89379bebe4b0a66668266b1089888955a2188ddf43ac24aab8490fd": {
		functionName: "uploadPhoto_createServerFn_handler",
		importer: () => import("./_ssr/community.functions-7W9Psepo.mjs")
	},
	"fa363fe6cd9737698a1483a9f1c97acc7153bcfd0aa4feb704be9f1e0829ec79": {
		functionName: "submitContact_createServerFn_handler",
		importer: () => import("./_ssr/community.functions-7W9Psepo.mjs")
	},
	"fe916ea507e5519748ccd6d3b21d6b6646e20581038c40783118b0a8e96f6e63": {
		functionName: "getPhotos_createServerFn_handler",
		importer: () => import("./_ssr/community.functions-7W9Psepo.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ??= await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
