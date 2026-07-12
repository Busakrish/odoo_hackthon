globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"17-ZZkCVrbr4BSdjt/K43J0tq8+Qq4\"",
		"mtime": "2026-07-12T06:58:28.146Z",
		"size": 23,
		"path": "../public/robots.txt"
	},
	"/assets/allocation-BpDv_Om2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"38ff-KLM0IpcGK0EC2lBQK3nLP/AHNXQ\"",
		"mtime": "2026-07-12T10:34:02.631Z",
		"size": 14591,
		"path": "../public/assets/allocation-BpDv_Om2.js"
	},
	"/assets/arrow-left-right-ycGAn20J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f8-nV/fPvz505uUwtAR75p8F46MdrQ\"",
		"mtime": "2026-07-12T10:34:02.635Z",
		"size": 248,
		"path": "../public/assets/arrow-left-right-ycGAn20J.js"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-07-12T06:58:28.115Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/audit-DTJ_C6x0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"221f-yYR/p6Z3xd1wgX/MUPPahqTCL2E\"",
		"mtime": "2026-07-12T10:34:02.637Z",
		"size": 8735,
		"path": "../public/assets/audit-DTJ_C6x0.js"
	},
	"/assets/assets-CPW4C3EX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"555d-xQdsPMTl3gcM+sfWdT+gOZO5hoU\"",
		"mtime": "2026-07-12T10:34:02.635Z",
		"size": 21853,
		"path": "../public/assets/assets-CPW4C3EX.js"
	},
	"/assets/auth-iDQ7rFd0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13a7-ZZYPN+sW4vu0I03BDpIaezPu62w\"",
		"mtime": "2026-07-12T10:34:02.637Z",
		"size": 5031,
		"path": "../public/assets/auth-iDQ7rFd0.js"
	},
	"/assets/bell-BSIaj4e6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-PRpqrUd2C4R3thGVl8gAEDSiz58\"",
		"mtime": "2026-07-12T10:34:02.639Z",
		"size": 290,
		"path": "../public/assets/bell-BSIaj4e6.js"
	},
	"/assets/badge-BvRPta7M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"300-yBTzjTrlsRZ6j2kuWc/pGqwkh94\"",
		"mtime": "2026-07-12T10:34:02.639Z",
		"size": 768,
		"path": "../public/assets/badge-BvRPta7M.js"
	},
	"/assets/booking-OxN5jqYU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c23-gK9veGIiWqYpJTuFPDlXr3ikRTQ\"",
		"mtime": "2026-07-12T10:34:02.643Z",
		"size": 11299,
		"path": "../public/assets/booking-OxN5jqYU.js"
	},
	"/assets/boxes-HTkNshuX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"353-qURanx3a/9ZWsl+i9r/nMAt7KDA\"",
		"mtime": "2026-07-12T10:34:02.645Z",
		"size": 851,
		"path": "../public/assets/boxes-HTkNshuX.js"
	},
	"/assets/building-2-EK96p9_J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17f-3Xiv+2vWN9viDNrv9D3IfH712is\"",
		"mtime": "2026-07-12T10:34:02.645Z",
		"size": 383,
		"path": "../public/assets/building-2-EK96p9_J.js"
	},
	"/assets/calendar-clock-CeBqd71u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17a-bGa1RV7QR5kXByZGP5VPwjsfs2o\"",
		"mtime": "2026-07-12T10:34:02.647Z",
		"size": 378,
		"path": "../public/assets/calendar-clock-CeBqd71u.js"
	},
	"/assets/calendar-days-DIYvRZpV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-4xQYlnB3jSUDuoH+yY1ieyTRcC8\"",
		"mtime": "2026-07-12T10:34:02.647Z",
		"size": 494,
		"path": "../public/assets/calendar-days-DIYvRZpV.js"
	},
	"/assets/card-DYY9R_Bk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"408-1cQ+354qaWQO98bOGme2zUehp+Q\"",
		"mtime": "2026-07-12T10:34:02.647Z",
		"size": 1032,
		"path": "../public/assets/card-DYY9R_Bk.js"
	},
	"/assets/clock-BQ4xIXhd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-aTbEkRRhJXWNX9cyjSFL4fx4pIM\"",
		"mtime": "2026-07-12T10:34:02.649Z",
		"size": 169,
		"path": "../public/assets/clock-BQ4xIXhd.js"
	},
	"/assets/client-C3QDCO3g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b50-/6n1ZLp65Nj+2X9ANk9TgvhWk5U\"",
		"mtime": "2026-07-12T10:34:02.649Z",
		"size": 2896,
		"path": "../public/assets/client-C3QDCO3g.js"
	},
	"/assets/createLucideIcon-D1l_1SOF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ab-F3EQxRYJYuc1MrD8S4TW53NhOFY\"",
		"mtime": "2026-07-12T10:34:02.649Z",
		"size": 1195,
		"path": "../public/assets/createLucideIcon-D1l_1SOF.js"
	},
	"/assets/button-BPIvKN3s.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7b2b-ESZ57lm/YGvLzRYWeQQqNCsQ4og\"",
		"mtime": "2026-07-12T10:34:02.645Z",
		"size": 31531,
		"path": "../public/assets/button-BPIvKN3s.js"
	},
	"/assets/dashboard-DXJSNbOc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3bd7-mFwNQ9Q0iNnuoVzfnH/yAGRBesI\"",
		"mtime": "2026-07-12T10:34:02.649Z",
		"size": 15319,
		"path": "../public/assets/dashboard-DXJSNbOc.js"
	},
	"/assets/dist-zIxRRVIj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"256-+MaQIe7deQwdZE9uBe4yt7TWD7w\"",
		"mtime": "2026-07-12T10:34:02.651Z",
		"size": 598,
		"path": "../public/assets/dist-zIxRRVIj.js"
	},
	"/assets/download-CFLYpaLV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e8-dYrJeiLw9htU5RINDLILy8wnumE\"",
		"mtime": "2026-07-12T10:34:02.651Z",
		"size": 232,
		"path": "../public/assets/download-CFLYpaLV.js"
	},
	"/assets/input-C5dJIr4Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26e-A22a8PcE4TBDuHtFOp6FDcjb5q4\"",
		"mtime": "2026-07-12T10:34:02.651Z",
		"size": 622,
		"path": "../public/assets/input-C5dJIr4Y.js"
	},
	"/assets/index-DY7_Sy4x.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"48d35-3DcGp0lzChIs+IJfM7ItCI7pHaQ\"",
		"mtime": "2026-07-12T10:34:02.631Z",
		"size": 298293,
		"path": "../public/assets/index-DY7_Sy4x.js"
	},
	"/assets/jsx-runtime-n5LQ9ujS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2157-x+FjD3p74bnIvIhkIVLOQLFM4M0\"",
		"mtime": "2026-07-12T10:34:02.653Z",
		"size": 8535,
		"path": "../public/assets/jsx-runtime-n5LQ9ujS.js"
	},
	"/assets/label-CWNWQD6O.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"272-FrYXFlUaihQLckUICTGB/J0TVIg\"",
		"mtime": "2026-07-12T10:34:02.653Z",
		"size": 626,
		"path": "../public/assets/label-CWNWQD6O.js"
	},
	"/assets/maintenance-BnCEMPk_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2234-GxnT6xYHL0vligOqxX0KZYwrr6c\"",
		"mtime": "2026-07-12T10:34:02.653Z",
		"size": 8756,
		"path": "../public/assets/maintenance-BnCEMPk_.js"
	},
	"/assets/Match-Du1Cc6sD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11c20-1o8tyCEzvSF6wLzNRRHTYgJtOPs\"",
		"mtime": "2026-07-12T10:34:02.631Z",
		"size": 72736,
		"path": "../public/assets/Match-Du1Cc6sD.js"
	},
	"/assets/mock-db-D5nEchMj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"34c4-UemV4pEajSuUK2/LqFVri/p2D/0\"",
		"mtime": "2026-07-12T10:34:02.653Z",
		"size": 13508,
		"path": "../public/assets/mock-db-D5nEchMj.js"
	},
	"/assets/notifications-BqUrJlB0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f02-i6AkQpuMJJ1JpFSeoxQ8S9uvuO0\"",
		"mtime": "2026-07-12T10:34:02.655Z",
		"size": 7938,
		"path": "../public/assets/notifications-BqUrJlB0.js"
	},
	"/assets/organization-CATP5a6T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f1f-RJrFs39rFg7FOmayqP8HGFIyZ74\"",
		"mtime": "2026-07-12T10:34:02.655Z",
		"size": 12063,
		"path": "../public/assets/organization-CATP5a6T.js"
	},
	"/assets/react-dom-CQmWuZA8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dda-+IRX1VEQ+614FViNS2l9Mg3wio8\"",
		"mtime": "2026-07-12T10:34:02.661Z",
		"size": 3546,
		"path": "../public/assets/react-dom-CQmWuZA8.js"
	},
	"/assets/plus-BCxKnURr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-QVLGw2vzLdoZNQwEm9ZtIVouxGs\"",
		"mtime": "2026-07-12T10:34:02.660Z",
		"size": 153,
		"path": "../public/assets/plus-BCxKnURr.js"
	},
	"/assets/routes-CfK6LRCV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e9-Tv56KbfxINjKAOxfIepBeC6oFHA\"",
		"mtime": "2026-07-12T10:34:02.686Z",
		"size": 489,
		"path": "../public/assets/routes-CfK6LRCV.js"
	},
	"/assets/route-Nh3jisuh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15148-qU4AjP4CT8QAUh7MVyR8fXeCG7Q\"",
		"mtime": "2026-07-12T10:34:02.668Z",
		"size": 86344,
		"path": "../public/assets/route-Nh3jisuh.js"
	},
	"/assets/reports--GPXrNPH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"65459-dvvHpTPUjURur/O8iSAdp6m1i6M\"",
		"mtime": "2026-07-12T10:34:02.662Z",
		"size": 414809,
		"path": "../public/assets/reports--GPXrNPH.js"
	},
	"/assets/search-Ci8TbkAa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-9RKcyeJBsA4isLhebqQbXZpE8z0\"",
		"mtime": "2026-07-12T10:34:02.686Z",
		"size": 174,
		"path": "../public/assets/search-Ci8TbkAa.js"
	},
	"/assets/triangle-alert-Detd_dQ9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"186-sURyw8IEtMl1kClivFB2YbOJyHc\"",
		"mtime": "2026-07-12T10:34:02.690Z",
		"size": 390,
		"path": "../public/assets/triangle-alert-Detd_dQ9.js"
	},
	"/assets/styles-CDRXMFb0.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"15e6f-c5PrSxPYHXkYHH70/Ozt8THUL0U\"",
		"mtime": "2026-07-12T10:34:02.695Z",
		"size": 89711,
		"path": "../public/assets/styles-CDRXMFb0.css"
	},
	"/assets/user-BdoWc4K7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-M4+hj3u3KwnMhJJFeaLFdYH2Lwo\"",
		"mtime": "2026-07-12T10:34:02.693Z",
		"size": 196,
		"path": "../public/assets/user-BdoWc4K7.js"
	},
	"/assets/users-B1tjSHdZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17f-EpIt5KeglJ+7fSZQ0BdC6kA+h98\"",
		"mtime": "2026-07-12T10:34:02.693Z",
		"size": 383,
		"path": "../public/assets/users-B1tjSHdZ.js"
	},
	"/assets/wrench-BJQdKgLG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12f-bgtkrQCOnchrJFVAe/iIAVdReC8\"",
		"mtime": "2026-07-12T10:34:02.694Z",
		"size": 303,
		"path": "../public/assets/wrench-BJQdKgLG.js"
	},
	"/assets/x-BtLDotfK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-gI6fcieiNWtKGZ1Cjgdw4Y1hjSY\"",
		"mtime": "2026-07-12T10:34:02.694Z",
		"size": 154,
		"path": "../public/assets/x-BtLDotfK.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_egm1qR = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_egm1qR
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
