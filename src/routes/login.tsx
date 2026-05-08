import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/cq/PageShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiFetch, setAuthToken, type ApiError } from "@/services/api";

type LoginResponse =
  | { token: string; user?: { id: string; name?: string; role?: string } }
  | { ok: true; user?: { id: string; name?: string; role?: string } };

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const next = (Route.useSearch() as any)?.next as string | undefined;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const nextPath = useMemo(() => {
    const n = typeof next === "string" && next.startsWith("/") ? next : "/admin";
    return n;
  }, [next]);

  async function submit() {
    const e = email.trim();
    const p = password;
    if (!e || !p) {
      toast.error("Email and password are required");
      return;
    }

    setLoading(true);
    try {
      // Expected backend endpoint:
      // POST /auth/login
      const res = await apiFetch<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: e, password: p }),
      });

      if ("token" in res && res.token) {
        setAuthToken(res.token);
      }

      toast.success("Logged in");
      navigate({ to: nextPath });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell className="flex items-center justify-center">
      <div className="w-full max-w-md">
        <Card className="border-2 border-border shadow-[var(--shadow-soft)]">
          <CardHeader>
            <CardTitle className="text-2xl font-extrabold">Admin login</CardTitle>
            <CardDescription>Sign in to access the admin dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  autoComplete="email"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>

              <Button onClick={() => void submit()} disabled={loading}>
                {loading ? "Signing in…" : "Sign in"}
              </Button>

              <Button
                variant="secondary"
                onClick={() => navigate({ to: "/" })}
                disabled={loading}
              >
                Back home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}

