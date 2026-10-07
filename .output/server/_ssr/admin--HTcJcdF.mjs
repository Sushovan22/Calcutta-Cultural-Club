import { n as __toESM } from "../_runtime.mjs";
import { a as readContactSubmissions, i as readCommunityPhotos } from "./local-community-store-BmH6CVT7.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-BchmMslU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin--HTcJcdF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AUTH_KEY = "cultural-club.admin-authorized";
var ADMIN_PASSWORD = "CulturalClubOwner2026";
function AdminDashboard() {
	const [authorized, setAuthorized] = (0, import_react.useState)(false);
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [contactSubmissions, setContactSubmissions] = (0, import_react.useState)(readContactSubmissions());
	const [contestPhotos, setContestPhotos] = (0, import_react.useState)(readCommunityPhotos());
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		const hasAccess = window.localStorage.getItem(AUTH_KEY) === "1";
		setAuthorized(hasAccess);
		if (hasAccess) {
			setContactSubmissions(readContactSubmissions());
			setContestPhotos(readCommunityPhotos());
		}
	}, []);
	function refreshData() {
		setContactSubmissions(readContactSubmissions());
		setContestPhotos(readCommunityPhotos());
	}
	function handleLogin(event) {
		event.preventDefault();
		if (typeof window === "undefined") return;
		if (password === ADMIN_PASSWORD) {
			window.localStorage.setItem(AUTH_KEY, "1");
			setAuthorized(true);
			setError("");
			refreshData();
			return;
		}
		setError("Incorrect owner password.");
	}
	function handleLogout() {
		if (typeof window === "undefined") return;
		window.localStorage.removeItem(AUTH_KEY);
		setAuthorized(false);
		setPassword("");
		setError("");
	}
	if (!authorized) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		style: {
			minHeight: "100vh",
			display: "grid",
			placeItems: "center",
			padding: "2rem",
			background: "#f7f1e8"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				maxWidth: "420px",
				width: "100%",
				background: "#fffdf9",
				borderRadius: "18px",
				padding: "2rem",
				boxShadow: "0 20px 45px rgba(36, 26, 18, 0.08)"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: {
						letterSpacing: "0.12em",
						textTransform: "uppercase",
						fontSize: "0.75rem",
						color: "#7a4f2b",
						marginBottom: "0.5rem"
					},
					children: "Owner access"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					style: {
						margin: "0 0 1rem",
						fontSize: "2rem",
						color: "#1d1a17"
					},
					children: "Admin dashboard"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleLogin,
					style: {
						display: "grid",
						gap: "1rem"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							style: {
								display: "grid",
								gap: "0.5rem",
								fontWeight: 600,
								color: "#1d1a17"
							},
							children: ["Password", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								value: password,
								onChange: (event) => setPassword(event.target.value),
								placeholder: "Enter owner password",
								style: {
									padding: "0.8rem 0.9rem",
									border: "1px solid #dcc7b7",
									borderRadius: "10px",
									fontSize: "1rem"
								}
							})]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "alert",
							style: {
								margin: 0,
								color: "#b42318",
								fontSize: "0.92rem"
							},
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							variant: "festival",
							children: "Open dashboard"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						marginTop: "1rem",
						fontSize: "0.85rem",
						color: "#655443"
					},
					children: "This dashboard is for the website owner only."
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		style: {
			minHeight: "100vh",
			background: "#f8efe6",
			padding: "2rem 1rem 4rem"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				maxWidth: "1200px",
				margin: "0 auto"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					gap: "1rem",
					marginBottom: "2rem",
					flexWrap: "wrap"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: {
						letterSpacing: "0.12em",
						textTransform: "uppercase",
						fontSize: "0.75rem",
						color: "#7a4f2b",
						margin: 0
					},
					children: "Owner panel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					style: {
						margin: "0.3rem 0 0",
						fontSize: "2.3rem",
						color: "#1d1a17"
					},
					children: "Contact and contest entries"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						gap: "0.75rem",
						flexWrap: "wrap"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						style: {
							color: "#1d1a17",
							textDecoration: "none",
							fontWeight: 600
						},
						children: "Back home"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "festiveOutline",
						onClick: handleLogout,
						children: "Log out"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
					gap: "1.5rem"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					style: {
						background: "#fffdf9",
						borderRadius: "18px",
						padding: "1.25rem",
						boxShadow: "0 18px 35px rgba(36, 26, 18, 0.06)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						style: {
							marginTop: 0,
							marginBottom: "1rem",
							fontSize: "1.5rem",
							color: "#1d1a17"
						},
						children: "Contact us submissions"
					}), contactSubmissions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							margin: 0,
							color: "#655443"
						},
						children: "No contact requests yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							display: "grid",
							gap: "1rem"
						},
						children: contactSubmissions.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							style: {
								border: "1px solid #e9d8c2",
								borderRadius: "12px",
								padding: "0.9rem",
								background: "#fffaf3"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									style: {
										margin: "0 0 0.35rem",
										fontWeight: 700,
										color: "#1d1a17"
									},
									children: entry.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									style: {
										margin: "0 0 0.25rem",
										color: "#3b312c"
									},
									children: entry.email
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									style: {
										margin: "0 0 0.25rem",
										color: "#3b312c"
									},
									children: entry.phone
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									style: {
										margin: "0 0 0.25rem",
										color: "#3b312c"
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Interest:" }),
										" ",
										entry.interest
									]
								}),
								entry.thought && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									style: {
										margin: "0.25rem 0 0",
										color: "#3b312c"
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Message:" }),
										" ",
										entry.thought
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									style: {
										margin: "0.35rem 0 0",
										fontSize: "0.75rem",
										color: "#7a4f2b"
									},
									children: new Date(entry.createdAt).toLocaleString()
								})
							]
						}, entry.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					style: {
						background: "#fffdf9",
						borderRadius: "18px",
						padding: "1.25rem",
						boxShadow: "0 18px 35px rgba(36, 26, 18, 0.06)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						style: {
							marginTop: 0,
							marginBottom: "1rem",
							fontSize: "1.5rem",
							color: "#1d1a17"
						},
						children: "Photo contest submissions"
					}), contestPhotos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							margin: 0,
							color: "#655443"
						},
						children: "No contest photos yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							display: "grid",
							gap: "1rem"
						},
						children: contestPhotos.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							style: {
								border: "1px solid #e9d8c2",
								borderRadius: "12px",
								padding: "0.75rem",
								background: "#fffaf3"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: entry.url,
									alt: entry.caption || "Contest photo",
									style: {
										width: "100%",
										maxHeight: "220px",
										objectFit: "cover",
										borderRadius: "10px",
										display: "block",
										marginBottom: "0.75rem"
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									style: {
										margin: "0 0 0.25rem",
										fontWeight: 700,
										color: "#1d1a17"
									},
									children: entry.handle
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									style: {
										margin: "0",
										color: "#3b312c"
									},
									children: entry.caption
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									style: {
										margin: "0.4rem 0 0",
										fontSize: "0.75rem",
										color: "#7a4f2b"
									},
									children: new Date(entry.createdAt).toLocaleString()
								})
							]
						}, entry.id))
					})]
				})]
			})]
		})
	});
}
//#endregion
export { AdminDashboard as component };
