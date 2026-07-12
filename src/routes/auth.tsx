import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Sign in — AssetFlow" },
      { name: "description", content: "Sign in to AssetFlow to manage enterprise assets, bookings, and audits." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/dashboard", replace: true });
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[Auth] Form submitted. Mode:", mode, { email, fullName });
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
            emailRedirectTo: window.location.origin,
          },
        });
        console.log("[Auth] signUp response:", { data, error });
        if (error) throw error;
        toast.success("Account created. You're signed in.");
        navigate({ to: "/dashboard", replace: true });
      } else {
        console.log("[Auth] Executing signInWithPassword...");
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        console.log("[Auth] signIn response:", { data, error });
        if (error) throw error;
        navigate({ to: "/dashboard", replace: true });
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
      const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
      if (isLocal) {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        navigate({ to: "/dashboard", replace: true });
        return;
      }

      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) throw new Error(result.error.message ?? "Google sign-in failed");
      if (result.redirected) return;
      navigate({ to: "/dashboard", replace: true });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Google sign-in failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--gradient-primary)]">
      <Card className="w-full max-w-md p-8 shadow-[var(--shadow-elevated)]">
        <div className="flex flex-col items-center mb-6">
          <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mb-3">
            AF
          </div>
          <h1 className="text-2xl font-bold text-foreground">AssetFlow</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mode === "signin" ? "Sign in to your workspace" : "Create your employee account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="space-y-1.5">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Priya Shah"
              />
            </div>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </Button>
        </form>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-card px-2 text-muted-foreground">or</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGoogle}
          disabled={loading}
        >
          Continue with Google
        </Button>

        <div className="mt-6 pt-5 border-t border-border text-center text-sm text-muted-foreground">
          {mode === "signin" ? (
            <>
              New here?{" "}
              <button
                type="button"
                onClick={() => setMode("signup")}
                className="text-primary font-medium hover:underline"
              >
                Create an account
              </button>
              <p className="mt-1 text-xs">Sign up creates an employee account. Admin roles are assigned later.</p>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("signin")}
                className="text-primary font-medium hover:underline"
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}

export const _link = Link;