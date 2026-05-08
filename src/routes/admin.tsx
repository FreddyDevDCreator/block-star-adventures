import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { PageShell } from "@/components/cq/PageShell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ApiError, isAdminEnabled } from "@/services/api";
import {
  createAdminLesson,
  createAdminReward,
  createAdminUser,
  deleteAdminLesson,
  deleteAdminReward,
  getAdminSummary,
  getAdminUser,
  listAdminLessons,
  listAdminRewards,
  listAdminUsers,
  publishAdminLesson,
  resetAdminUserProgress,
  unpublishAdminLesson,
  updateAdminLesson,
  updateAdminReward,
  updateAdminUser,
  type AdminLesson,
  type AdminReward,
  type AdminRole,
  type AdminSummary,
  type AdminUser,
  type AdminUserDetails,
  type AgeGroup,
} from "@/services/adminApi";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin — Block Star Adventures" }],
  }),
  loader: async () => {
    if (!isAdminEnabled()) {
      throw new Response("Not found", { status: 404 });
    }
    try {
      return await getAdminSummary();
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) {
        throw redirect({ to: "/login", search: { next: "/admin" } });
      }
      throw e;
    }
  },
  component: AdminDashboard,
});

function AdminDashboard() {
  const initial = Route.useLoaderData() as AdminSummary;
  const [tab, setTab] = useState<"overview" | "users" | "lessons" | "rewards">("overview");
  const [q, setQ] = useState("");
  const [summary, setSummary] = useState<AdminSummary>(initial);
  const [summaryLoading, setSummaryLoading] = useState(false);

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersCursor, setUsersCursor] = useState<string | undefined>(undefined);
  const [usersNextCursor, setUsersNextCursor] = useState<string | undefined>(undefined);
  const usersCursorStack = useRef<string[]>([]);

  const [lessons, setLessons] = useState<AdminLesson[]>([]);
  const [lessonsLoading, setLessonsLoading] = useState(false);
  const [lessonsCursor, setLessonsCursor] = useState<string | undefined>(undefined);
  const [lessonsNextCursor, setLessonsNextCursor] = useState<string | undefined>(undefined);
  const lessonsCursorStack = useRef<string[]>([]);

  const [rewards, setRewards] = useState<AdminReward[]>([]);
  const [rewardsLoading, setRewardsLoading] = useState(false);
  const [rewardsCursor, setRewardsCursor] = useState<string | undefined>(undefined);
  const [rewardsNextCursor, setRewardsNextCursor] = useState<string | undefined>(undefined);
  const rewardsCursorStack = useRef<string[]>([]);

  const [createUserOpen, setCreateUserOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [editUser, setEditUser] = useState<AdminUserDetails | null>(null);
  const [createLessonOpen, setCreateLessonOpen] = useState(false);
  const [editLessonOpen, setEditLessonOpen] = useState(false);
  const [editLesson, setEditLesson] = useState<AdminLesson | null>(null);
  const [createRewardOpen, setCreateRewardOpen] = useState(false);
  const [editRewardOpen, setEditRewardOpen] = useState(false);
  const [editReward, setEditReward] = useState<AdminReward | null>(null);

  async function refreshSummary() {
    setSummaryLoading(true);
    try {
      setSummary(await getAdminSummary());
    } catch (e) {
      toast.error(getErrorMessage(e));
    } finally {
      setSummaryLoading(false);
    }
  }

  async function loadUsers(cursor?: string) {
    setUsersLoading(true);
    try {
      const page = await listAdminUsers({ q: q.trim() || undefined, cursor, limit: 25 });
      setUsers(page.items);
      setUsersNextCursor(page.nextCursor ? String(page.nextCursor) : undefined);
    } catch (e) {
      toast.error(getErrorMessage(e));
    } finally {
      setUsersLoading(false);
    }
  }

  async function loadLessons(cursor?: string) {
    setLessonsLoading(true);
    try {
      const page = await listAdminLessons({ q: q.trim() || undefined, cursor, limit: 25 });
      setLessons(page.items);
      setLessonsNextCursor(page.nextCursor ? String(page.nextCursor) : undefined);
    } catch (e) {
      toast.error(getErrorMessage(e));
    } finally {
      setLessonsLoading(false);
    }
  }

  async function loadRewards(cursor?: string) {
    setRewardsLoading(true);
    try {
      const page = await listAdminRewards({ q: q.trim() || undefined, cursor, limit: 25 });
      setRewards(page.items);
      setRewardsNextCursor(page.nextCursor ? String(page.nextCursor) : undefined);
    } catch (e) {
      toast.error(getErrorMessage(e));
    } finally {
      setRewardsLoading(false);
    }
  }

  useEffect(() => {
    if (tab === "users") {
      usersCursorStack.current = [];
      setUsersCursor(undefined);
      void loadUsers(undefined);
    }
    if (tab === "lessons") {
      lessonsCursorStack.current = [];
      setLessonsCursor(undefined);
      void loadLessons(undefined);
    }
    if (tab === "rewards") {
      rewardsCursorStack.current = [];
      setRewardsCursor(undefined);
      void loadRewards(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, q]);

  const filteredRecentUsers = useMemo(() => {
    const base = summary?.recentUsers ?? [];
    const query = q.trim().toLowerCase();
    if (!query) return base;
    return base.filter((u) => u.name.toLowerCase().includes(query) || u.id.toLowerCase().includes(query));
  }, [summary, q]);

  return (
    <PageShell>
      <div className="mx-auto w-full max-w-5xl flex flex-col gap-4">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">Admin dashboard</h1>
            <p className="text-sm text-muted-foreground font-semibold">
              Manage users, lessons, and rewards.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search (users/lessons/rewards)…"
              className="w-full sm:w-[320px]"
              aria-label="Search"
            />
            <Button variant="secondary" onClick={() => setQ("")} disabled={!q.trim()}>
              Clear
            </Button>
          </div>
        </header>

        <section className="rounded-3xl bg-card border-2 border-border p-4 sm:p-5 shadow-[var(--shadow-soft)]">
          <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
            <TabsList className="flex flex-wrap h-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="lessons">Lessons</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                <Kpi title="Users" value={summary?.totals?.users ?? summary?.recentUsers?.length ?? 0} />
                <Kpi title="Lessons" value={summary?.totals?.lessons ?? summary?.lessons?.length ?? 0} />
                <Kpi title="Rewards" value={summary?.totals?.rewards ?? summary?.rewards?.length ?? 0} />
              </div>

              <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-3">
                <Panel title="Recent users">
                  <UsersTable users={filteredRecentUsers.slice(0, 8)} />
                </Panel>
                <Panel title="Recent lesson changes">
                  <LessonsTable
                    lessons={(summary?.lessons ?? []).slice(0, 8)}
                    onEdit={(l) => {
                      setEditLesson(l);
                      setEditLessonOpen(true);
                    }}
                  />
                </Panel>
              </div>

              <div className="mt-4 flex items-center justify-end gap-2">
                <Button variant="secondary" onClick={() => void refreshSummary()} disabled={summaryLoading}>
                  {summaryLoading ? "Refreshing…" : "Refresh"}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="users">
              <div className="mt-3 flex items-center justify-between gap-2 flex-wrap">
                <div className="text-sm text-muted-foreground font-semibold">
                  Showing <span className="text-foreground font-extrabold">{users.length}</span> user(s)
                </div>
                <Button onClick={() => setCreateUserOpen(true)}>Add user</Button>
              </div>

              <div className="mt-3">
                <UsersTable
                  users={users}
                  loading={usersLoading}
                  onView={async (id) => {
                    try {
                      const details = await getAdminUser(id);
                      setEditUser(details);
                      setEditUserOpen(true);
                    } catch (e) {
                      toast.error(getErrorMessage(e));
                    }
                  }}
                />
              </div>

              <Pager
                loading={usersLoading}
                hasPrev={usersCursorStack.current.length > 0}
                hasNext={!!usersNextCursor}
                onPrev={() => {
                  const prev = usersCursorStack.current.pop();
                  setUsersCursor(prev);
                  void loadUsers(prev);
                }}
                onNext={() => {
                  if (!usersNextCursor) return;
                  if (usersCursor) usersCursorStack.current.push(usersCursor);
                  setUsersCursor(usersNextCursor);
                  void loadUsers(usersNextCursor);
                }}
              />
            </TabsContent>

            <TabsContent value="lessons">
              <div className="mt-3 flex items-center justify-between gap-2 flex-wrap">
                <div className="text-sm text-muted-foreground font-semibold">
                  Lessons: <span className="text-foreground font-extrabold">{lessons.length}</span>
                </div>
                <Button onClick={() => setCreateLessonOpen(true)}>Create lesson</Button>
              </div>

              <div className="mt-3">
                <LessonsTable
                  lessons={lessons}
                  loading={lessonsLoading}
                  onEdit={(l) => {
                    setEditLesson(l);
                    setEditLessonOpen(true);
                  }}
                  onTogglePublish={async (l) => {
                    try {
                      if (l.published) await unpublishAdminLesson(l.id);
                      else await publishAdminLesson(l.id);
                      toast.success(l.published ? "Lesson unpublished" : "Lesson published");
                      await refreshSummary();
                      await loadLessons(lessonsCursor);
                    } catch (e) {
                      toast.error(getErrorMessage(e));
                    }
                  }}
                  onDelete={async (l) => {
                    try {
                      await deleteAdminLesson(l.id);
                      toast.success("Lesson deleted");
                      await refreshSummary();
                      await loadLessons(lessonsCursor);
                    } catch (e) {
                      toast.error(getErrorMessage(e));
                    }
                  }}
                />
              </div>

              <Pager
                loading={lessonsLoading}
                hasPrev={lessonsCursorStack.current.length > 0}
                hasNext={!!lessonsNextCursor}
                onPrev={() => {
                  const prev = lessonsCursorStack.current.pop();
                  setLessonsCursor(prev);
                  void loadLessons(prev);
                }}
                onNext={() => {
                  if (!lessonsNextCursor) return;
                  if (lessonsCursor) lessonsCursorStack.current.push(lessonsCursor);
                  setLessonsCursor(lessonsNextCursor);
                  void loadLessons(lessonsNextCursor);
                }}
              />
            </TabsContent>

            <TabsContent value="rewards">
              <div className="mt-3 flex items-center justify-between gap-2 flex-wrap">
                <div className="text-sm text-muted-foreground font-semibold">
                  Rewards: <span className="text-foreground font-extrabold">{rewards.length}</span>
                </div>
                <Button onClick={() => setCreateRewardOpen(true)}>Create reward</Button>
              </div>

              <div className="mt-3">
                <RewardsTable
                  rewards={rewards}
                  loading={rewardsLoading}
                  onEdit={(r) => {
                    setEditReward(r);
                    setEditRewardOpen(true);
                  }}
                  onDelete={async (r) => {
                    try {
                      await deleteAdminReward(r.id);
                      toast.success("Reward deleted");
                      await refreshSummary();
                      await loadRewards(rewardsCursor);
                    } catch (e) {
                      toast.error(getErrorMessage(e));
                    }
                  }}
                />
              </div>

              <Pager
                loading={rewardsLoading}
                hasPrev={rewardsCursorStack.current.length > 0}
                hasNext={!!rewardsNextCursor}
                onPrev={() => {
                  const prev = rewardsCursorStack.current.pop();
                  setRewardsCursor(prev);
                  void loadRewards(prev);
                }}
                onNext={() => {
                  if (!rewardsNextCursor) return;
                  if (rewardsCursor) rewardsCursorStack.current.push(rewardsCursor);
                  setRewardsCursor(rewardsNextCursor);
                  void loadRewards(rewardsNextCursor);
                }}
              />
            </TabsContent>
          </Tabs>
        </section>

        <CreateUserDialog
          open={createUserOpen}
          onOpenChange={setCreateUserOpen}
          onCreated={async () => {
            await refreshSummary();
            if (tab === "users") await loadUsers(usersCursor);
          }}
        />
        <EditUserDialog
          open={editUserOpen}
          onOpenChange={(o) => {
            setEditUserOpen(o);
            if (!o) setEditUser(null);
          }}
          user={editUser}
          onChanged={async () => {
            await refreshSummary();
            if (tab === "users") await loadUsers(usersCursor);
          }}
        />
        <CreateLessonDialog
          open={createLessonOpen}
          onOpenChange={setCreateLessonOpen}
          onCreated={async () => {
            await refreshSummary();
            if (tab === "lessons") await loadLessons(lessonsCursor);
          }}
        />
        <EditLessonDialog
          open={editLessonOpen}
          onOpenChange={(o) => {
            setEditLessonOpen(o);
            if (!o) setEditLesson(null);
          }}
          lesson={editLesson}
          onChanged={async () => {
            await refreshSummary();
            if (tab === "lessons") await loadLessons(lessonsCursor);
          }}
        />
        <CreateRewardDialog
          open={createRewardOpen}
          onOpenChange={setCreateRewardOpen}
          onCreated={async () => {
            await refreshSummary();
            if (tab === "rewards") await loadRewards(rewardsCursor);
          }}
        />
        <EditRewardDialog
          open={editRewardOpen}
          onOpenChange={(o) => {
            setEditRewardOpen(o);
            if (!o) setEditReward(null);
          }}
          reward={editReward}
          onChanged={async () => {
            await refreshSummary();
            if (tab === "rewards") await loadRewards(rewardsCursor);
          }}
        />
      </div>
    </PageShell>
  );
}

function Kpi({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-2xl border-2 border-border bg-background p-4">
      <div className="text-xs text-muted-foreground font-semibold">{title.toUpperCase()}</div>
      <div className="text-3xl font-extrabold text-primary">{value}</div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border-2 border-border bg-background p-4">
      <div className="font-extrabold">{title}</div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function UsersTable({
  users,
  loading,
  onView,
}: {
  users: AdminUser[];
  loading?: boolean;
  onView?: (id: string) => void | Promise<void>;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Created</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={4} className="text-muted-foreground">
              Loading…
            </TableCell>
          </TableRow>
        ) : users.length ? (
          users.map((u) => (
            <TableRow key={u.id}>
              <TableCell className="font-semibold">{u.name}</TableCell>
              <TableCell>
                <Badge
                  className={cn(
                    u.role === "admin"
                      ? "bg-primary text-primary-foreground"
                      : u.role === "teacher"
                        ? "bg-amber-500 text-white"
                        : "bg-muted text-foreground",
                  )}
                >
                  {u.role}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">{formatDate(u.createdAt)}</TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="secondary" onClick={() => void onView?.(u.id)}>
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-muted-foreground">
              No users found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

function LessonsTable({
  lessons,
  loading,
  onEdit,
  onTogglePublish,
  onDelete,
}: {
  lessons: AdminLesson[];
  loading?: boolean;
  onEdit?: (lesson: AdminLesson) => void;
  onTogglePublish?: (lesson: AdminLesson) => void | Promise<void>;
  onDelete?: (lesson: AdminLesson) => void | Promise<void>;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Updated</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={4} className="text-muted-foreground">
              Loading…
            </TableCell>
          </TableRow>
        ) : lessons.length ? (
          lessons.map((l) => (
            <TableRow key={l.id}>
              <TableCell className="font-semibold">{l.title}</TableCell>
              <TableCell>
                <Badge className={l.published ? "bg-success text-white" : "bg-muted text-foreground"}>
                  {l.published ? "published" : "draft"}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">{formatDate(l.updatedAt)}</TableCell>
              <TableCell className="text-right flex items-center justify-end gap-2">
                {onTogglePublish ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => void onTogglePublish(l)}
                    className="hidden sm:inline-flex"
                  >
                    {l.published ? "Unpublish" : "Publish"}
                  </Button>
                ) : null}
                <Button size="sm" variant="secondary" onClick={() => onEdit?.(l)}>
                  Edit
                </Button>
                {onDelete ? (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="destructive">
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete lesson?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete <span className="font-semibold">{l.title}</span>.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => void onDelete(l)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : null}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-muted-foreground">
              No lessons.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

function RewardsTable({
  rewards,
  loading,
  onEdit,
  onDelete,
}: {
  rewards: AdminReward[];
  loading?: boolean;
  onEdit?: (reward: AdminReward) => void;
  onDelete?: (reward: AdminReward) => void | Promise<void>;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Cost</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={4} className="text-muted-foreground">
              Loading…
            </TableCell>
          </TableRow>
        ) : rewards.length ? (
          rewards.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="font-semibold">{r.title}</TableCell>
              <TableCell className="text-muted-foreground">{r.costCoins} coins</TableCell>
              <TableCell>
                <Badge className={r.enabled ? "bg-success text-white" : "bg-muted text-foreground"}>
                  {r.enabled ? "enabled" : "disabled"}
                </Badge>
              </TableCell>
              <TableCell className="text-right flex items-center justify-end gap-2">
                <Button size="sm" variant="secondary" onClick={() => onEdit?.(r)}>
                  Edit
                </Button>
                {onDelete ? (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="destructive">
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete reward?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete <span className="font-semibold">{r.title}</span>.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => void onDelete(r)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : null}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-muted-foreground">
              No rewards.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}

function getErrorMessage(e: unknown) {
  if (!e) return "Unknown error";
  if (typeof e === "string") return e;
  if (e instanceof Error) return e.message;
  return "Request failed";
}

function Pager({
  loading,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
}: {
  loading: boolean;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="mt-3 flex items-center justify-between gap-2">
      <Button variant="secondary" onClick={onPrev} disabled={loading || !hasPrev}>
        Prev
      </Button>
      <div className="text-xs text-muted-foreground font-semibold">
        {loading ? "Loading…" : hasNext ? "More available" : "End"}
      </div>
      <Button variant="secondary" onClick={onNext} disabled={loading || !hasNext}>
        Next
      </Button>
    </div>
  );
}

function CreateUserDialog({
  open,
  onOpenChange,
  onCreated,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void | Promise<void>;
}) {
  const [name, setName] = useState("");
  const [role, setRole] = useState<AdminRole>("student");
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("kid");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) {
      setName("");
      setRole("student");
      setAgeGroup("kid");
      setSaving(false);
    }
  }, [open]);

  async function submit() {
    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("Name is required");
      return;
    }
    setSaving(true);
    try {
      await createAdminUser({ name: trimmed, role, ageGroup });
      toast.success("User created");
      onOpenChange(false);
      await onCreated();
    } catch (e) {
      toast.error(getErrorMessage(e));
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add user</DialogTitle>
          <DialogDescription>Create a new user account.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="admin-user-name">Name</Label>
            <Input
              id="admin-user-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ada"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Role</Label>
              <Select value={role} onValueChange={(v) => setRole(v as AdminRole)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">student</SelectItem>
                  <SelectItem value="teacher">teacher</SelectItem>
                  <SelectItem value="admin">admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Age group</Label>
              <Select value={ageGroup} onValueChange={(v) => setAgeGroup(v as AgeGroup)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kid">kid</SelectItem>
                  <SelectItem value="teen">teen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={() => void submit()} disabled={saving}>
            {saving ? "Creating…" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function EditUserDialog({
  open,
  onOpenChange,
  user,
  onChanged,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: AdminUserDetails | null;
  onChanged: () => void | Promise<void>;
}) {
  const [name, setName] = useState("");
  const [role, setRole] = useState<AdminRole>("student");
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("kid");
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    if (!open || !user) return;
    setName(user.name ?? "");
    setRole(user.role ?? "student");
    setAgeGroup(user.ageGroup ?? "kid");
    setSaving(false);
    setResetting(false);
  }, [open, user]);

  async function submit() {
    if (!user) return;
    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("Name is required");
      return;
    }
    setSaving(true);
    try {
      await updateAdminUser(user.id, { name: trimmed, role, ageGroup });
      toast.success("User updated");
      onOpenChange(false);
      await onChanged();
    } catch (e) {
      toast.error(getErrorMessage(e));
    } finally {
      setSaving(false);
    }
  }

  async function doResetProgress() {
    if (!user) return;
    setResetting(true);
    try {
      await resetAdminUserProgress(user.id);
      toast.success("Progress reset");
      onOpenChange(false);
      await onChanged();
    } catch (e) {
      toast.error(getErrorMessage(e));
    } finally {
      setResetting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User</DialogTitle>
          <DialogDescription>{user ? `ID: ${user.id}` : "Loading…"}</DialogDescription>
        </DialogHeader>

        {user ? (
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="admin-edit-user-name">Name</Label>
              <Input
                id="admin-edit-user-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Role</Label>
                <Select value={role} onValueChange={(v) => setRole(v as AdminRole)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">student</SelectItem>
                    <SelectItem value="teacher">teacher</SelectItem>
                    <SelectItem value="admin">admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Age group</Label>
                <Select value={ageGroup} onValueChange={(v) => setAgeGroup(v as AgeGroup)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kid">kid</SelectItem>
                    <SelectItem value="teen">teen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {(user.progress || user.badges) ? (
              <>
                <Separator />
                <div className="grid gap-2 text-sm">
                  {user.progress ? (
                    <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
                      <span>
                        XP: <span className="text-foreground font-semibold">{user.progress.xp}</span>
                      </span>
                      <span>
                        Level:{" "}
                        <span className="text-foreground font-semibold">{user.progress.level}</span>
                      </span>
                      <span>
                        Coins:{" "}
                        <span className="text-foreground font-semibold">{user.progress.coins}</span>
                      </span>
                    </div>
                  ) : null}
                  {user.badges?.length ? (
                    <div className="text-muted-foreground">
                      Badges: <span className="text-foreground font-semibold">{user.badges.length}</span>
                    </div>
                  ) : null}
                </div>
              </>
            ) : null}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">No user loaded.</div>
        )}

        <DialogFooter className="gap-2 sm:gap-2">
          {user ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={resetting}>
                  Reset progress
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset progress?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will wipe XP/coins/badges for <span className="font-semibold">{user.name}</span>.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={resetting}>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => void doResetProgress()} disabled={resetting}>
                    {resetting ? "Resetting…" : "Reset"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : null}

          <Button variant="secondary" onClick={() => onOpenChange(false)} disabled={saving || resetting}>
            Close
          </Button>
          <Button onClick={() => void submit()} disabled={!user || saving || resetting}>
            {saving ? "Saving…" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CreateLessonDialog({
  open,
  onOpenChange,
  onCreated,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void | Promise<void>;
}) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) {
      setTitle("");
      setSummary("");
      setSaving(false);
    }
  }, [open]);

  async function submit() {
    const t = title.trim();
    if (!t) {
      toast.error("Title is required");
      return;
    }
    setSaving(true);
    try {
      await createAdminLesson({ title: t, summary: summary.trim() || undefined });
      toast.success("Lesson created");
      onOpenChange(false);
      await onCreated();
    } catch (e) {
      toast.error(getErrorMessage(e));
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create lesson</DialogTitle>
          <DialogDescription>Create a new lesson draft.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="admin-lesson-title">Title</Label>
            <Input id="admin-lesson-title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="admin-lesson-summary">Summary</Label>
            <Textarea
              id="admin-lesson-summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Short description shown to learners…"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={() => void submit()} disabled={saving}>
            {saving ? "Creating…" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function EditLessonDialog({
  open,
  onOpenChange,
  lesson,
  onChanged,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lesson: AdminLesson | null;
  onChanged: () => void | Promise<void>;
}) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard" | "">("");
  const [published, setPublished] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open || !lesson) return;
    setTitle(lesson.title ?? "");
    setSummary(lesson.summary ?? "");
    setDifficulty(lesson.difficulty ?? "");
    setPublished(!!lesson.published);
    setSaving(false);
  }, [open, lesson]);

  async function submit() {
    if (!lesson) return;
    const t = title.trim();
    if (!t) {
      toast.error("Title is required");
      return;
    }
    setSaving(true);
    try {
      await updateAdminLesson(lesson.id, {
        title: t,
        summary: summary.trim() || undefined,
        difficulty: (difficulty || undefined) as any,
        published,
      });
      toast.success("Lesson updated");
      onOpenChange(false);
      await onChanged();
    } catch (e) {
      toast.error(getErrorMessage(e));
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit lesson</DialogTitle>
          <DialogDescription>{lesson ? `ID: ${lesson.id}` : ""}</DialogDescription>
        </DialogHeader>

        {lesson ? (
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="admin-edit-lesson-title">Title</Label>
              <Input
                id="admin-edit-lesson-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="admin-edit-lesson-summary">Summary</Label>
              <Textarea
                id="admin-edit-lesson-summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Difficulty</Label>
                <Select
                  value={difficulty || "__none__"}
                  onValueChange={(v) => setDifficulty(v === "__none__" ? "" : (v as any))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="(none)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">(none)</SelectItem>
                    <SelectItem value="easy">easy</SelectItem>
                    <SelectItem value="medium">medium</SelectItem>
                    <SelectItem value="hard">hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Status</Label>
                <Select
                  value={published ? "published" : "draft"}
                  onValueChange={(v) => setPublished(v === "published")}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">draft</SelectItem>
                    <SelectItem value="published">published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">No lesson loaded.</div>
        )}

        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={() => void submit()} disabled={!lesson || saving}>
            {saving ? "Saving…" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CreateRewardDialog({
  open,
  onOpenChange,
  onCreated,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void | Promise<void>;
}) {
  const [title, setTitle] = useState("");
  const [costCoins, setCostCoins] = useState("50");
  const [enabled, setEnabled] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) {
      setTitle("");
      setCostCoins("50");
      setEnabled(true);
      setSaving(false);
    }
  }, [open]);

  async function submit() {
    const t = title.trim();
    const cost = Number(costCoins);
    if (!t) {
      toast.error("Title is required");
      return;
    }
    if (!Number.isFinite(cost) || cost < 0) {
      toast.error("Cost must be a number ≥ 0");
      return;
    }
    setSaving(true);
    try {
      await createAdminReward({ title: t, costCoins: cost, enabled });
      toast.success("Reward created");
      onOpenChange(false);
      await onCreated();
    } catch (e) {
      toast.error(getErrorMessage(e));
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create reward</DialogTitle>
          <DialogDescription>Add a reward to the store.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="admin-reward-title">Title</Label>
            <Input id="admin-reward-title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="admin-reward-cost">Cost (coins)</Label>
              <Input
                id="admin-reward-cost"
                inputMode="numeric"
                value={costCoins}
                onChange={(e) => setCostCoins(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Status</Label>
              <Select value={enabled ? "enabled" : "disabled"} onValueChange={(v) => setEnabled(v === "enabled")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="enabled">enabled</SelectItem>
                  <SelectItem value="disabled">disabled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={() => void submit()} disabled={saving}>
            {saving ? "Creating…" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function EditRewardDialog({
  open,
  onOpenChange,
  reward,
  onChanged,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reward: AdminReward | null;
  onChanged: () => void | Promise<void>;
}) {
  const [title, setTitle] = useState("");
  const [costCoins, setCostCoins] = useState("0");
  const [enabled, setEnabled] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open || !reward) return;
    setTitle(reward.title ?? "");
    setCostCoins(String(reward.costCoins ?? 0));
    setEnabled(!!reward.enabled);
    setSaving(false);
  }, [open, reward]);

  async function submit() {
    if (!reward) return;
    const t = title.trim();
    const cost = Number(costCoins);
    if (!t) {
      toast.error("Title is required");
      return;
    }
    if (!Number.isFinite(cost) || cost < 0) {
      toast.error("Cost must be a number ≥ 0");
      return;
    }
    setSaving(true);
    try {
      await updateAdminReward(reward.id, { title: t, costCoins: cost, enabled });
      toast.success("Reward updated");
      onOpenChange(false);
      await onChanged();
    } catch (e) {
      toast.error(getErrorMessage(e));
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit reward</DialogTitle>
          <DialogDescription>{reward ? `ID: ${reward.id}` : ""}</DialogDescription>
        </DialogHeader>

        {reward ? (
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="admin-edit-reward-title">Title</Label>
              <Input
                id="admin-edit-reward-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="admin-edit-reward-cost">Cost (coins)</Label>
                <Input
                  id="admin-edit-reward-cost"
                  inputMode="numeric"
                  value={costCoins}
                  onChange={(e) => setCostCoins(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Status</Label>
                <Select value={enabled ? "enabled" : "disabled"} onValueChange={(v) => setEnabled(v === "enabled")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="enabled">enabled</SelectItem>
                    <SelectItem value="disabled">disabled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">No reward loaded.</div>
        )}

        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={() => void submit()} disabled={!reward || saving}>
            {saving ? "Saving…" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
