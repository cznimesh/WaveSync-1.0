import React, { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Bell,
  Search,
  Filter,
  AlertTriangle,
  Clock3,
  FileWarning,
  CreditCard,
  HandCoins,
  CheckCircle2,
  Eye,
  RefreshCcw,
  Send,
  ShieldAlert,
} from "lucide-react";
import { motion } from "framer-motion";

const notificationsSeed = [
  {
    id: 1,
    type: "Pending Approval",
    severity: "High",
    title: "Job awaiting authorizer review",
    ref: "JOB-202603-006",
    details: "MV Silver Tide is pending approval by Operations Manager.",
    page: "Approval Queue",
    time: "10 mins ago",
    isRead: false,
  },
  {
    id: 2,
    type: "ETA Nearing",
    severity: "Urgent",
    title: "ETA within next 12 hours",
    ref: "JOB-202603-002",
    details: "MT Blue Horizon ETA at Fujairah STS Area is approaching.",
    page: "Jobs",
    time: "25 mins ago",
    isRead: false,
  },
  {
    id: 3,
    type: "Missing Attachment",
    severity: "Medium",
    title: "Quotation file not uploaded",
    ref: "JOB-202603-007",
    details: "Job entry is missing quotation attachment before release.",
    page: "Job Entry",
    time: "1 hour ago",
    isRead: false,
  },
  {
    id: 4,
    type: "Overdue Invoice",
    severity: "High",
    title: "Client invoice overdue",
    ref: "INV-202603-014",
    details: "Oldendorff invoice is overdue by 9 days.",
    page: "Invoices",
    time: "2 hours ago",
    isRead: true,
  },
  {
    id: 5,
    type: "Vendor Balance",
    severity: "Medium",
    title: "Vendor open balance requires attention",
    ref: "VEND-Launch Service",
    details: "Launch Service vendor open balance has reached USD 850.",
    page: "Vendor Page",
    time: "3 hours ago",
    isRead: true,
  },
  {
    id: 6,
    type: "Pending Approval",
    severity: "Critical",
    title: "Critical job still not approved",
    ref: "JOB-202603-005",
    details: "MV Trinco Star marked Critical is still pending final approval.",
    page: "Approval Queue",
    time: "5 hours ago",
    isRead: false,
  },
  {
    id: 7,
    type: "Vendor Invoice Approval",
    severity: "High",
    title: "Vendor invoice submitted and pending approval",
    ref: "VINV-202603-021",
    details: "Launch Service vendor invoice has been submitted and is awaiting approval before payment processing.",
    page: "Vendor Invoices",
    time: "15 mins ago",
    isRead: false,
  },
];

const typeOptions = ["All Types", "Pending Approval", "ETA Nearing", "Missing Attachment", "Overdue Invoice", "Vendor Balance", "Vendor Invoice Approval"];
const severityOptions = ["All Severities", "Critical", "Urgent", "High", "Medium"];

export default function ERPNotificationCenterUI() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [severityFilter, setSeverityFilter] = useState("All Severities");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const filteredNotifications = useMemo(() => {
    return notificationsSeed.filter((item) => {
      const searchMatch =
        !search ||
        [item.title, item.ref, item.details, item.page, item.type]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
      const typeMatch = typeFilter === "All Types" || item.type === typeFilter;
      const severityMatch = severityFilter === "All Severities" || item.severity === severityFilter;
      const unreadMatch = !showUnreadOnly || !item.isRead;
      return searchMatch && typeMatch && severityMatch && unreadMatch;
    });
  }, [search, typeFilter, severityFilter, showUnreadOnly]);

  const stats = useMemo(() => ({
    total: notificationsSeed.length,
    unread: notificationsSeed.filter((n) => !n.isRead).length,
    critical: notificationsSeed.filter((n) => n.severity === "Critical" || n.severity === "Urgent").length,
    finance: notificationsSeed.filter((n) => n.type === "Overdue Invoice" || n.type === "Vendor Balance" || n.type === "Vendor Invoice Approval").length,
  }), []);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Notification Center</h1>
            <p className="mt-1 text-sm text-slate-600">
              Monitor approval alerts, ETA warnings, missing files, overdue invoices, and vendor balance notifications in one place.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-2xl">
              <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
            </Button>
            <Button className="rounded-2xl">
              <CheckCircle2 className="mr-2 h-4 w-4" /> Mark All Read
            </Button>
          </div>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Total Alerts" value={stats.total} icon={<Bell className="h-5 w-5" />} />
          <StatCard title="Unread Alerts" value={stats.unread} icon={<Eye className="h-5 w-5" />} />
          <StatCard title="Critical / Urgent" value={stats.critical} icon={<ShieldAlert className="h-5 w-5" />} />
          <StatCard title="Finance Alerts" value={stats.finance} icon={<CreditCard className="h-5 w-5" />} />
        </div>

        <Card className="rounded-3xl border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Filter className="h-5 w-5" /> Filters
            </CardTitle>
            <CardDescription>Filter notifications by keyword, type, severity, or unread status.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="space-y-2 xl:col-span-2">
              <Label>Search</Label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search title, ref, details, page, or type"
                  className="rounded-2xl pl-10"
                />
              </div>
            </div>

            <FilterSelect label="Type" value={typeFilter} onChange={setTypeFilter} options={typeOptions} />
            <FilterSelect label="Severity" value={severityFilter} onChange={setSeverityFilter} options={severityOptions} />

            <div className="xl:col-span-4">
              <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 w-fit">
                <Checkbox checked={showUnreadOnly} onCheckedChange={(checked) => setShowUnreadOnly(Boolean(checked))} />
                <span>Show unread notifications only</span>
              </label>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-md">
          <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Bell className="h-5 w-5" /> Alerts Feed
              </CardTitle>
              <CardDescription>Showing {filteredNotifications.length} notifications from the ERP alert engine.</CardDescription>
            </div>
            <Badge className="rounded-xl">Live Monitoring View</Badge>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-5">
              <TabsList className="grid w-full grid-cols-3 rounded-2xl">
                <TabsTrigger value="all">All Alerts</TabsTrigger>
                <TabsTrigger value="operational">Operational</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {filteredNotifications.map((item) => (
                  <NotificationCard key={item.id} item={item} />
                ))}
              </TabsContent>

              <TabsContent value="operational" className="space-y-4">
                {filteredNotifications
                  .filter((n) => ["Pending Approval", "ETA Nearing", "Missing Attachment"].includes(n.type))
                  .map((item) => (
                    <NotificationCard key={item.id} item={item} />
                  ))}
              </TabsContent>

              <TabsContent value="financial" className="space-y-4">
                {filteredNotifications
                  .filter((n) => ["Overdue Invoice", "Vendor Balance", "Vendor Invoice Approval"].includes(n.type))
                  .map((item) => (
                    <NotificationCard key={item.id} item={item} />
                  ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="rounded-2xl">
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((item) => (
            <SelectItem key={item} value={item}>{item}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <Card className="rounded-3xl border-0 shadow-md">
      <CardContent className="flex items-center justify-between p-5">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 p-3 text-slate-700">{icon}</div>
      </CardContent>
    </Card>
  );
}

function NotificationCard({ item }) {
  const iconMap = {
    "Pending Approval": <Clock3 className="h-5 w-5" />,
    "ETA Nearing": <AlertTriangle className="h-5 w-5" />,
    "Missing Attachment": <FileWarning className="h-5 w-5" />,
    "Overdue Invoice": <CreditCard className="h-5 w-5" />,
    "Vendor Balance": <HandCoins className="h-5 w-5" />,
    "Vendor Invoice Approval": <CreditCard className="h-5 w-5" />,
  };

  return (
    <div className={`rounded-3xl border p-5 shadow-sm ${item.isRead ? "border-slate-200 bg-white" : "border-slate-300 bg-slate-50"}`}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-700">
            {iconMap[item.type]}
          </div>
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold text-slate-900">{item.title}</p>
              <SeverityBadge value={item.severity} />
              {!item.isRead && <Badge className="rounded-xl">Unread</Badge>}
            </div>
            <p className="text-sm text-slate-600">{item.details}</p>
            <div className="flex flex-wrap gap-2 text-xs text-slate-500">
              <Badge variant="secondary" className="rounded-xl">{item.type}</Badge>
              <Badge variant="outline" className="rounded-xl">{item.ref}</Badge>
              <Badge variant="outline" className="rounded-xl">{item.page}</Badge>
              <span className="self-center">{item.time}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="rounded-xl">
            <Eye className="mr-2 h-4 w-4" /> Open
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl">
            <CheckCircle2 className="mr-2 h-4 w-4" /> Mark Read
          </Button>
          <Button size="sm" className="rounded-xl">
            <Send className="mr-2 h-4 w-4" /> Take Action
          </Button>
        </div>
      </div>
    </div>
  );
}

function SeverityBadge({ value }) {
  if (value === "Critical") return <Badge className="rounded-xl">Critical</Badge>;
  if (value === "Urgent") return <Badge className="rounded-xl">Urgent</Badge>;
  if (value === "High") return <Badge variant="outline" className="rounded-xl">High</Badge>;
  return <Badge variant="secondary" className="rounded-xl">Medium</Badge>;
}
