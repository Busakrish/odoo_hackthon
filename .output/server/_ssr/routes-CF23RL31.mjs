import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as supabase } from "./client-DggiWmUn.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CF23RL31.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Index() {
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			navigate({
				to: data.session ? "/dashboard" : "/auth",
				replace: true
			});
		});
	}, [navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm text-muted-foreground",
			children: "Loading AssetFlow…"
		})
	});
}
//#endregion
export { Index as component };
