import { i as ZodIssueCode, n as objectType, r as stringType, t as enumType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/community-schemas-D938laNC.js
var interests = [
	"Social work",
	"Cultural activities",
	"Fun tourism",
	"Others"
];
var contactSchema = objectType({
	name: stringType().trim().min(1, "Please enter your name.").max(100),
	email: stringType().trim().email("Please enter a valid email address.").max(255),
	phone: stringType().trim().regex(/^\+?[0-9 ()-]{7,25}$/, "Please enter a valid phone number.").refine((v) => v.replace(/\D/g, "").length >= 7, "Please enter a valid phone number."),
	interest: enumType(interests),
	thought: stringType().trim().max(1e3).default("")
}).superRefine((value, ctx) => {
	if (value.interest === "Others" && !value.thought) ctx.addIssue({
		code: ZodIssueCode.custom,
		path: ["thought"],
		message: "Please tell us your thought."
	});
});
var photoSchema = objectType({
	handle: stringType().trim().min(1, "Please enter your Instagram handle.").max(100),
	caption: stringType().trim().min(1, "Please tell us a little about your moment.").max(200)
});
//#endregion
export { interests as n, photoSchema as r, contactSchema as t };
