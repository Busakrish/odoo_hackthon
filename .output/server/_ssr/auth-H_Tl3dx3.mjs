import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { t as Card } from "./card-DiItVyaY.mjs";
import { t as Label } from "./label-AutfcB-T.mjs";
import { t as Input } from "./input-NvmijQlt.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as supabase } from "./client-DggiWmUn.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-H_Tl3dx3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var assetflow = { auth: { signInWithOAuth: async (provider, opts) => {
	const redirectTo = opts?.redirect_uri ?? window.location.origin;
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider,
		options: {
			redirectTo,
			queryParams: { ...opts?.extraParams }
		}
	});
	if (error) return { error };
	return {
		redirected: Boolean(data?.url),
		url: data?.url
	};
} } };
function AuthPage() {
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) navigate({
				to: "/dashboard",
				replace: true
			});
		});
	}, [navigate]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("[Auth] Form submitted. Mode:", mode, {
			email,
			fullName
		});
		setLoading(true);
		try {
			console.log("[Auth] Calling Supabase...");
			if (mode === "signup") {
				console.log("[Auth] Executing signUp...");
				const { data, error } = await supabase.auth.signUp({
					email,
					password,
					options: {
						data: { full_name: fullName },
						emailRedirectTo: window.location.origin
					}
				});
				console.log("[Auth] signUp response:", {
					data,
					error
				});
				if (error) throw error;
				toast.success("Account created. You're signed in.");
				navigate({
					to: "/dashboard",
					replace: true
				});
			} else {
				console.log("[Auth] Executing signInWithPassword...");
				const { data, error } = await supabase.auth.signInWithPassword({
					email,
					password
				});
				console.log("[Auth] signIn response:", {
					data,
					error
				});
				if (error) throw error;
				navigate({
					to: "/dashboard",
					replace: true
				});
			}
		} catch (err) {
			console.error("[Auth] Exception caught in handleSubmit:", err);
			const msg = err instanceof Error ? err.message : "Something went wrong";
			toast.error(msg);
		} finally {
			console.log("[Auth] Setting loading to false");
			setLoading(false);
		}
	};
	const handleGoogle = async () => {
		setLoading(true);
		try {
			if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
				const { error } = await supabase.auth.signInWithOAuth({
					provider: "google",
					options: { redirectTo: window.location.origin }
				});
				if (error) throw error;
				navigate({
					to: "/dashboard",
					replace: true
				});
				return;
			}
			const result = await assetflow.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
			if (result.error) throw new Error(result.error.message ?? "Google sign-in failed");
			if (result.redirected) return;
			navigate({
				to: "/dashboard",
				replace: true
			});
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Google sign-in failed";
			toast.error(msg);
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center px-4 bg-[var(--gradient-primary)]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "w-full max-w-md p-8 shadow-[var(--shadow-elevated)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center mb-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mb-3",
							children: "AF"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-bold text-foreground",
							children: "AssetFlow"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mt-1",
							children: mode === "signin" ? "Sign in to your workspace" : "Create your employee account"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "space-y-4",
					children: [
						mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "name",
								children: "Full name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "name",
								required: true,
								value: fullName,
								onChange: (e) => setFullName(e.target.value),
								placeholder: "Priya Shah"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "email",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "email",
								type: "email",
								required: true,
								value: email,
								onChange: (e) => setEmail(e.target.value),
								placeholder: "name@company.com"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "password",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "password",
								type: "password",
								required: true,
								minLength: 6,
								value: password,
								onChange: (e) => setPassword(e.target.value),
								placeholder: "••••••••"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "w-full",
							disabled: loading,
							children: loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative my-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 flex items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full border-t border-border" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative flex justify-center text-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "bg-card px-2 text-muted-foreground",
							children: "or"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					className: "w-full",
					onClick: handleGoogle,
					disabled: loading,
					children: "Continue with Google"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 pt-5 border-t border-border text-center text-sm text-muted-foreground",
					children: mode === "signin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						"New here?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setMode("signup"),
							className: "text-primary font-medium hover:underline",
							children: "Create an account"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs",
							children: "Sign up creates an employee account. Admin roles are assigned later."
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						"Already have an account?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setMode("signin"),
							className: "text-primary font-medium hover:underline",
							children: "Sign in"
						})
					] })
				})
			]
		})
	});
}
//#endregion
export { AuthPage as component };
