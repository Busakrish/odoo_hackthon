//#region node_modules/.nitro/vite/services/ssr/assets/client-DggiWmUn.js
var listeners = [];
if (typeof window !== "undefined" && !localStorage.getItem("mock_users")) localStorage.setItem("mock_users", JSON.stringify([{
	id: "mock-user-1",
	email: "test@example.com",
	password: "password123",
	raw_user_meta_data: { full_name: "Demo User" }
}]));
var supabase = { auth: {
	async getSession() {
		if (typeof window === "undefined") return {
			data: { session: null },
			error: null
		};
		const sessionStr = localStorage.getItem("mock_session");
		return {
			data: { session: sessionStr ? JSON.parse(sessionStr) : null },
			error: null
		};
	},
	onAuthStateChange(callback) {
		listeners.push(callback);
		if (typeof window !== "undefined") {
			const sessionStr = localStorage.getItem("mock_session");
			const session = sessionStr ? JSON.parse(sessionStr) : null;
			setTimeout(() => callback("INITIAL_SESSION", session), 0);
		}
		return { data: { subscription: { unsubscribe() {
			const idx = listeners.indexOf(callback);
			if (idx !== -1) listeners.splice(idx, 1);
		} } } };
	},
	async signUp({ email, password, options }) {
		if (typeof window === "undefined") return {
			data: {
				user: null,
				session: null
			},
			error: null
		};
		if (!email || !password) return {
			data: {
				user: null,
				session: null
			},
			error: /* @__PURE__ */ new Error("Email and password are required")
		};
		if (password.length < 6) return {
			data: {
				user: null,
				session: null
			},
			error: /* @__PURE__ */ new Error("Password should be at least 6 characters")
		};
		const usersStr = localStorage.getItem("mock_users") || "[]";
		let users = JSON.parse(usersStr);
		users = users.filter((u) => u.email !== email);
		const newUser = {
			id: Math.random().toString(),
			email,
			raw_user_meta_data: options?.data || {}
		};
		users.push({
			...newUser,
			password
		});
		localStorage.setItem("mock_users", JSON.stringify(users));
		const session = {
			user: newUser,
			access_token: "mock-token"
		};
		localStorage.setItem("mock_session", JSON.stringify(session));
		listeners.forEach((l) => l("SIGNED_IN", session));
		return {
			data: {
				user: newUser,
				session
			},
			error: null
		};
	},
	async signInWithPassword({ email, password }) {
		if (typeof window === "undefined") return {
			data: {
				user: null,
				session: null
			},
			error: null
		};
		if (!email || !password) return {
			data: {
				user: null,
				session: null
			},
			error: /* @__PURE__ */ new Error("Email and password are required")
		};
		const usersStr = localStorage.getItem("mock_users") || "[]";
		const users = JSON.parse(usersStr);
		let user = users.find((u) => u.email === email);
		if (!user) {
			user = {
				id: Math.random().toString(),
				email,
				password,
				raw_user_meta_data: { full_name: email.split("@")[0] }
			};
			users.push(user);
			localStorage.setItem("mock_users", JSON.stringify(users));
		} else if (user.password !== password) {
			user.password = password;
			localStorage.setItem("mock_users", JSON.stringify(users));
		}
		const session = {
			user: {
				id: user.id,
				email: user.email
			},
			access_token: "mock-token"
		};
		localStorage.setItem("mock_session", JSON.stringify(session));
		listeners.forEach((l) => l("SIGNED_IN", session));
		return {
			data: {
				user: session.user,
				session
			},
			error: null
		};
	},
	async signOut() {
		if (typeof window !== "undefined") localStorage.removeItem("mock_session");
		listeners.forEach((l) => l("SIGNED_OUT", null));
		return { error: null };
	},
	async signInWithOAuth({ provider, options }) {
		if (typeof window === "undefined") return {
			data: {
				provider: "google",
				url: null
			},
			error: null
		};
		const session = {
			user: {
				id: "google-id",
				email: "google-user@example.com"
			},
			access_token: "mock-token"
		};
		localStorage.setItem("mock_session", JSON.stringify(session));
		listeners.forEach((l) => l("SIGNED_IN", session));
		return {
			data: {
				provider: "google",
				url: null
			},
			error: null
		};
	}
} };
//#endregion
export { supabase as t };
