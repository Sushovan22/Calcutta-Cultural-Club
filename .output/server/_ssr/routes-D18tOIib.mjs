import { n as __toESM } from "../_runtime.mjs";
import { r as readActivityPhotos } from "./local-community-store-BmH6CVT7.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as cn, t as Button } from "./button-BchmMslU.mjs";
import { U as isRedirect, b as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as interests, r as photoSchema, t as contactSchema } from "./community-schemas-D938laNC.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { n as submitContact, r as uploadPhoto, t as photosOptions } from "./routes-BWIP5cS8.mjs";
import { a as MessageCircle, c as ImagePlus, d as Flower2, f as Compass, g as ArrowDown, h as ArrowUpRight, i as Music2, l as Heart, m as Camera, n as Sparkles, o as LoaderCircle, p as CircleCheck, r as Send, s as Instagram, t as X, u as HandHeart } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D18tOIib.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-overlay data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
function ContactDialog({ open, onOpenChange, initialInterest }) {
	const [interest, setInterest] = (0, import_react.useState)(initialInterest || "Social work");
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [success, setSuccess] = (0, import_react.useState)(false);
	const submit = useServerFn(submitContact);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "contact-dialog",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "eyebrow",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 14 }), " Be part of the community"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Contact us" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Good things begin with a conversation." }),
				success ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "contact-success",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Thank you for reaching out." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Your request has been saved for the Cultural Club team." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "festival",
							onClick: () => onOpenChange(false),
							children: "Done"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "contact-form",
					onSubmit: async (event) => {
						event.preventDefault();
						setError("");
						const form = new FormData(event.currentTarget);
						const result = contactSchema.safeParse({
							name: form.get("name"),
							email: form.get("email"),
							phone: form.get("phone"),
							interest,
							thought: form.get("thought") || ""
						});
						if (!result.success) {
							setError(result.error.issues[0]?.message || "Please check your details.");
							return;
						}
						setBusy(true);
						try {
							await submit({ data: result.data });
							setSuccess(true);
						} catch (e) {
							setError(e instanceof Error ? e.message : "Your request could not be saved. Please try again.");
						} finally {
							setBusy(false);
						}
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "form-field",
							children: ["Your name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								name: "name",
								autoComplete: "name",
								placeholder: "Full name",
								maxLength: 100,
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "form-field",
							children: ["Email address", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								name: "email",
								type: "email",
								autoComplete: "email",
								placeholder: "you@example.com",
								maxLength: 255,
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "form-field",
							children: ["Phone number", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								name: "phone",
								type: "tel",
								autoComplete: "tel",
								placeholder: "+91 98765 43210",
								maxLength: 25,
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "form-field",
							children: ["Interested section", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								name: "interest",
								value: interest,
								onChange: (e) => setInterest(e.target.value),
								children: interests.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))
							})]
						}),
						interest === "Others" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "form-field",
							children: ["Your thought", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								name: "thought",
								placeholder: "Tell us what you have in mind…",
								rows: 3,
								maxLength: 1e3,
								required: true
							})]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "alert",
							className: "form-error",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "festival",
							type: "submit",
							disabled: busy,
							children: [
								busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {}),
								" ",
								busy ? "Sending…" : "Send request"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "form-hint",
							children: "Your details are stored on this device and only shared with the club team."
						})
					]
				})
			]
		})
	});
}
function PhotoUpload({ onUploaded }) {
	const [file, setFile] = (0, import_react.useState)(null);
	const [preview, setPreview] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [success, setSuccess] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [dragging, setDragging] = (0, import_react.useState)(false);
	const upload = useServerFn(uploadPhoto);
	(0, import_react.useEffect)(() => {
		if (!file) {
			setPreview("");
			return;
		}
		const url = URL.createObjectURL(file);
		setPreview(url);
		return () => URL.revokeObjectURL(url);
	}, [file]);
	function choose(next) {
		setSuccess(false);
		setError("");
		if (!next) return;
		if (![
			"image/jpeg",
			"image/png",
			"image/webp"
		].includes(next.type) || next.size > 10485760) {
			setError("Choose a JPG, PNG, or WebP photo smaller than 10 MB.");
			return;
		}
		setFile(next);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "upload-form",
		onSubmit: async (e) => {
			e.preventDefault();
			setError("");
			setSuccess(false);
			if (!file) {
				setError("Please choose your photo first.");
				return;
			}
			const formElement = e.currentTarget;
			const fields = new FormData(formElement);
			const parsed = photoSchema.safeParse({
				handle: fields.get("handle") || "",
				caption: fields.get("caption") || ""
			});
			if (!parsed.success) {
				setError("Please shorten your handle or caption.");
				return;
			}
			const data = new FormData();
			data.set("photo", file);
			data.set("handle", parsed.data.handle);
			data.set("caption", parsed.data.caption);
			setBusy(true);
			try {
				await upload({ data });
				await onUploaded();
				setFile(null);
				formElement.reset();
				setSuccess(true);
			} catch (e) {
				setError(e instanceof Error ? e.message : "Your photo could not be uploaded.");
			} finally {
				setBusy(false);
			}
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: `upload-zone ${dragging ? "dragging" : ""}`,
				onDragOver: (e) => {
					e.preventDefault();
					setDragging(true);
				},
				onDragLeave: () => setDragging(false),
				onDrop: (e) => {
					e.preventDefault();
					setDragging(false);
					choose(e.dataTransfer.files[0]);
				},
				children: [
					preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "upload-preview",
						src: preview,
						alt: "Selected photo preview"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: file ? file.name : "Drop your favourite moment here" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: file ? "Click to choose a different photo" : "or click to browse · JPG, PNG, WebP · up to 10 MB" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "file",
						"aria-label": "Your photo",
						accept: "image/jpeg,image/png,image/webp",
						onChange: (e) => choose(e.target.files?.[0]),
						disabled: busy
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "form-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "form-field",
					children: ["Instagram handle", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "handle",
						placeholder: "@yourhandle",
						maxLength: 100,
						required: true
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "form-field",
					children: ["A little about your moment", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "caption",
						placeholder: "Your photo's story",
						maxLength: 200,
						required: true
					})]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "form-error",
				role: "alert",
				children: error
			}),
			success && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "form-success",
				role: "status",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 16 }), " Your moment is now in the community gallery."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "submit",
				variant: "festival",
				disabled: busy,
				children: [
					busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, {}),
					" ",
					busy ? "Uploading…" : "Share your moment",
					" ",
					!busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						children: "↗"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "form-hint",
				children: "Please include your handle and a short caption so your contest entry is complete."
			})
		]
	});
}
var pujo_hero_default = "/assets/pujo-hero-BfgKMeoO.jpg";
var community_gathering_asset_default = {
	version: 1,
	asset_id: "29294097-a256-4141-9c9a-078bfa5362a8",
	project_id: "fd44ec3d-0405-4036-b1af-f19db9665a09",
	url: "/__l5e/assets-v1/29294097-a256-4141-9c9a-078bfa5362a8/community-gathering.jpeg",
	r2_key: "a/v1/fd44ec3d-0405-4036-b1af-f19db9665a09/29294097-a256-4141-9c9a-078bfa5362a8/community-gathering.jpeg",
	original_filename: "community-gathering.jpeg",
	size: 83113,
	content_type: "image/jpeg",
	created_at: "2026-10-03T20:49:01Z"
};
var activities = [
	{
		title: "Social work",
		subtitle: "A little care. A lasting impact.",
		icon: HandHeart,
		kind: "social"
	},
	{
		title: "Cultural activities",
		subtitle: "Our roots. Our rhythm.",
		icon: Music2,
		kind: "cultural"
	},
	{
		title: "Fun tourism",
		subtitle: "New places. Shared stories.",
		icon: Compass,
		kind: "tourism"
	},
	{
		title: "Others",
		subtitle: "Your idea belongs here.",
		icon: Sparkles,
		kind: "others"
	}
];
function Index() {
	const [contactOpen, setContactOpen] = (0, import_react.useState)(false);
	const [selected, setSelected] = (0, import_react.useState)("Social work");
	const [dialogKey, setDialogKey] = (0, import_react.useState)(0);
	const [activityPhotos, setActivityPhotos] = (0, import_react.useState)({
		"Social work": null,
		"Cultural activities": null,
		"Fun tourism": null,
		Others: null
	});
	const { data, refetch } = useSuspenseQuery(photosOptions);
	(0, import_react.useEffect)(() => {
		const sync = () => setActivityPhotos(readActivityPhotos());
		sync();
		window.addEventListener("storage", sync);
		window.addEventListener("activity-photos-updated", sync);
		return () => {
			window.removeEventListener("storage", sync);
			window.removeEventListener("activity-photos-updated", sync);
		};
	}, []);
	function contact(interest = "Social work") {
		setSelected(interest);
		setDialogKey((key) => key + 1);
		setContactOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "site-header",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "site-container header-inner",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					className: "brand",
					href: "#",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flower2, {
						className: "brand-symbol",
						strokeWidth: 1.1
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "brand-title",
						children: "Cultural Club"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "brand-subtitle",
						children: "Culture · Community · Connection"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "nav",
					"aria-label": "Main navigation",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#activities",
							children: "Our activities"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#gallery",
							children: "Photo contest"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "festiveOutline",
							onClick: () => contact(),
							children: ["Contact us ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {})]
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "hero",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "hero-image",
						src: pujo_hero_default,
						alt: "Durga idol surrounded by marigolds in a festive Kolkata pandal",
						width: 1920,
						height: 1024,
						fetchPriority: "high"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "site-container hero-inner",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "eyebrow",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flower2, { size: 15 }), " Sharodiya · A celebration of togetherness"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: ["Cultural Club", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Where we belong." })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "From the rhythm of the dhak to the joy of giving — celebrating our culture, our people, and the moments that bring us together." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hero-actions",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "festival",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: "#activities",
										children: ["Explore our activities ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {})]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "festiveOutline",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: "#gallery",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, {}), " Share a Pujo moment"]
									})
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hero-note",
						children: ["THE SPIRIT OF PUJO, ALL YEAR ROUND ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { size: 12 })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "alpona-divider",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "activities",
				id: "activities",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "site-container",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "section-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "eyebrow",
							children: "Different passions. One community."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Find your kind of together." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"Something to give. Something to celebrate.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Something new to discover."
						] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "activity-grid",
						children: activities.map((item) => {
							const media = activityPhotos[item.title];
							const mediaStyle = media?.url ? {
								backgroundImage: `linear-gradient(180deg, rgba(14, 24, 20, 0.2), rgba(14, 24, 20, 0.7)), url(${media.url})`,
								backgroundSize: "cover",
								backgroundPosition: "center",
								backgroundRepeat: "no-repeat"
							} : void 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "activity",
								"data-kind": item.kind,
								onClick: () => contact(item.title),
								style: mediaStyle,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "activity-icon" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "tile-arrow" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "activity-title",
										children: [item.title, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "activity-subtitle",
											children: item.subtitle
										})]
									})
								]
							}, item.title);
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "photo-section",
				id: "gallery",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "site-container",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "section-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "eyebrow",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { size: 14 }), " The Pujo photo contest"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Your lens. Our celebration." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"The lights, the laughter, the little moments.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Let us see Pujo through your eyes."
						] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "photo-layout",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "photo-story",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "photo-sparkle" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
									className: "photo-print",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: community_gathering_asset_default.url,
										alt: "A community gathering from the original Cultural Club gallery",
										loading: "lazy",
										width: 1280,
										height: 720
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", { children: "Better when we're together." })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
									className: "photo-print second",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: pujo_hero_default,
										alt: "A festive Durga Puja celebration",
										loading: "lazy",
										width: 1920,
										height: 1024
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", { children: "A little Pujo magic." })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "photo-story-note",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { size: 13 }), " Every picture has a story. What's yours?"]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoUpload, { onUploaded: refetch })]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "gallery",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "site-container",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "section-heading",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "eyebrow",
								children: "Through our community's eyes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Moments that bring us closer." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "form-hint",
								children: "Our community album"
							})]
						}),
						data.error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "alert",
							className: "form-error",
							children: data.error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "gallery-grid",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
								className: "gallery-item",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: community_gathering_asset_default.url,
									alt: "Members sharing a moment at a community gathering",
									loading: "lazy",
									width: 1280,
									height: 720
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Community, in every frame." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A moment from our original album." })] })]
							}), data.photos.map((photo) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
								className: "gallery-item",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: photo.url,
									alt: photo.caption || "A photo shared by our community",
									loading: "lazy"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: photo.handle || "From our community" }), photo.caption && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: photo.caption })] })]
							}, photo.id))]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "community-band",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "site-container",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "A shared passion starts something beautiful." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Have an idea, a helping hand, or a little curiosity? There's a place for you here." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "festiveOutline",
						onClick: () => contact(),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {}),
							" Let's connect ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {})
						]
					})]
				})
			})
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
			className: "site-footer",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "site-container",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Cultural Club · Made with love for our community." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "https://instagram.com/caltural.club",
					target: "_blank",
					rel: "noopener noreferrer",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { size: 14 }),
						" @caltural.club ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 12 })
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactDialog, {
			open: contactOpen,
			onOpenChange: setContactOpen,
			initialInterest: selected
		}, dialogKey)
	] });
}
//#endregion
export { Index as component };
