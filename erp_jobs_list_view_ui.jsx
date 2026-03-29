import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, CalendarDays, Ship, Building2, MapPin, User, Eye, Download, RefreshCcw, CircleCheckBig, FileText } from "lucide-react";
import { motion } from "framer-motion";

const jobsSeed = [
  {
    jobNo: "JOB-202603-001",
    approvalRef: "APR-202603-001",
    vessel: "MV Ocean Crest",
    client: "Oldendorff",
    pic: "John Peter",
    country: "Sri Lanka",
    port: "Colombo",
    location: "At Anchorage",
    eta: "2026-03-25",
    jobTypes: ["Bunker Survey", "Condition Survey"],
    vendor: "Launch Service",
    authorizer: "Operations Manager",
    status: "Approved",
    createdDate: "2026-03-22",
    priority: "Normal",
  },
  {
    jobNo: "JOB-202603-002",
    approvalRef: "APR-202603-002",
    vessel: "MT Blue Horizon",
    client: "Norden",
    pic: "Priya Raman",
    country: "UAE",
    port: "Fujairah",
    location: "STS Area",
    eta: "2026-03-24",
    jobTypes: ["Bunker Survey"],
    vendor: "Sampling Technician",
    authorizer: "Managing Director",
    status: "Approved",
    createdDate: "2026-03-21",
    priority: "Urgent",
  },
  {
    jobNo: "JOB-202603-003",
    approvalRef: "APR-202603-003",
    vessel: "MV Eastern Pearl",
    client: "Sea Consortium Lanka",
    pic: "Ruwan Perera",
    country: "Sri Lanka",
    port: "Hambantota",
    location: "At Berth",
    eta: "2026-03-27",
    jobTypes: ["Draught Survey", "Cargo Survey"],
    vendor: "Draft Surveyor",
    authorizer: "Operations Manager",
    status: "Approved",
    createdDate: "2026-03-22",
    priority: "Normal",
  },
  {
    jobNo: "JOB-202603-004",
    approvalRef: "APR-202603-004",
    vessel: "MV Atlas Pioneer",
    client: "Direct Owner",
    pic: "Captain Lee",
    country: "Mauritius",
    port: "Port Louis",
    location: "Outer Anchorage",
    eta: "2026-03-29",
    jobTypes: ["Hull & Machinery Survey"],
    vendor: "Transport Vendor",
    authorizer: "Managing Director",
    status: "Approved",
    createdDate: "2026-03-20",
    priority: "High",
  },
  {
    jobNo: "JOB-202603-005",
    approvalRef: "APR-202603-005",
    vessel: "MV Trinco Star",
    client: "Local Agent",
    pic: "Mohamed Ali",
    country: "Sri Lanka",
    port: "Trincomalee",
    location: "Offshore",
    eta: "2026-03-26",
    jobTypes: ["P&I Survey", "Investigation"],
    vendor: "Lab Service",
    authorizer: "Accounts Controller",
    status: "Approved",
    createdDate: "2026-03-19",
    priority: "Critical",
  },
];

const clients = ["All Clients", "Oldendorff", "Norden", "Sea Consortium Lanka", "Direct Owner", "Local Agent"];
const ports = ["All Ports", "Colombo", "Fujairah", "Hambantota", "Port Louis", "Trincomalee"];
const statuses = ["All Statuses", "Approved"];
const priorities = ["All Priorities", "Normal", "High", "Urgent", "Critical"];

export default function ERPJobsListViewUI() {
  const [filters, setFilters] = useState({
    search: "",
    client: "All Clients",
    port: "All Ports",
    status: "All Statuses",
    priority: "All Priorities",
    dateFrom: "",
    dateTo: "",
  });

  const filteredJobs = useMemo(() => {
    return jobsSeed.filter((job) => {
      const searchMatch =
        !filters.search ||
        [job.jobNo, job.vessel, job.client, job.pic, job.vendor, job.approvalRef]
          .join(" ")
          .toLowerCase()
          .includes(filters.search.toLowerCase());

      const clientMatch = filters.client === "All Clients" || job.client === filters.client;
      const portMatch = filters.port === "All Ports" || job.port === filters.port;
      const statusMatch = filters.status === "All Statuses" || job.status === filters.status;
      const priorityMatch = filters.priority === "All Priorities" || job.priority === filters.priority;
      const fromMatch = !filters.dateFrom || job.eta >= filters.dateFrom;
      const toMatch = !filters.dateTo || job.eta <= filters.dateTo;

      return searchMatch && clientMatch && portMatch && statusMatch && priorityMatch && fromMatch && toMatch;
    });
  }, [filters]);

  const stats = useMemo(() => {
    return {
      total: jobsSeed.length,
      urgent: jobsSeed.filter((j) => j.priority === "Urgent" || j.priority === "Critical").length,
      sriLanka: jobsSeed.filter((j) => j.country === "Sri Lanka").length,
      thisWeek: jobsSeed.filter((j) => j.createdDate >= "2026-03-19").length,
    };
  }, []);

  const updateFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

  const resetFilters = () => {
    setFilters({
      search: "",
      client: "All Clients",
      port: "All Ports",
      status: "All Statuses",
      priority: "All Priorities",
      dateFrom: "",
      dateTo: "",
    });
  };

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
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">ERP Jobs Page</h1>
            <p className="mt-1 text-sm text-slate-600">
              Approved jobs are officially registered here for operational tracking, review, and quick access.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-2xl">
              <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
            </Button>
            <Button className="rounded-2xl">
              <Download className="mr-2 h-4 w-4" /> Export List
            </Button>
          </div>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Total Approved Jobs" value={stats.total} icon={<CircleCheckBig className="h-5 w-5" />} />
          <StatCard title="Urgent / Critical" value={stats.urgent} icon={<Filter className="h-5 w-5" />} />
          <StatCard title="Sri Lanka Jobs" value={stats.sriLanka} icon={<MapPin className="h-5 w-5" />} />
          <StatCard title="Created This Week" value={stats.thisWeek} icon={<CalendarDays className="h-5 w-5" />} />
        </div>

        <Card className="rounded-3xl border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Filter className="h-5 w-5" /> Data Filters
            </CardTitle>
            <CardDescription>Use filters to narrow down the jobs visible in the list view.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              <div className="space-y-2 xl:col-span-2">
                <Label>Search</Label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    value={filters.search}
                    onChange={(e) => updateFilter("search", e.target.value)}
                    placeholder="Search by job no, vessel, client, PIC, vendor, approval ref"
                    className="rounded-2xl pl-10"
                  />
                </div>
              </div>

              <FilterSelect label="Client" value={filters.client} onChange={(v) => updateFilter("client", v)} options={clients} />
              <FilterSelect label="Port" value={filters.port} onChange={(v) => updateFilter("port", v)} options={ports} />
              <FilterSelect label="Priority" value={filters.priority} onChange={(v) => updateFilter("priority", v)} options={priorities} />
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <FilterSelect label="Status" value={filters.status} onChange={(v) => updateFilter("status", v)} options={statuses} />
              <div className="space-y-2">
                <Label>ETA From</Label>
                <Input type="date" value={filters.dateFrom} onChange={(e) => updateFilter("dateFrom", e.target.value)} className="rounded-2xl" />
              </div>
              <div className="space-y-2">
                <Label>ETA To</Label>
                <Input type="date" value={filters.dateTo} onChange={(e) => updateFilter("dateTo", e.target.value)} className="rounded-2xl" />
              </div>
              <div className="flex items-end">
                <Button variant="outline" onClick={resetFilters} className="w-full rounded-2xl">
                  Reset Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-md">
          <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <FileText className="h-5 w-5" /> Approved Jobs Register
              </CardTitle>
              <CardDescription>
                List view of officially recorded jobs after approval. Showing {filteredJobs.length} of {jobsSeed.length} jobs.
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="rounded-xl">List View</Badge>
              <Badge variant="secondary" className="rounded-xl">Official ERP Register</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job No.</TableHead>
                    <TableHead>Vessel</TableHead>
                    <TableHead>Client / PIC</TableHead>
                    <TableHead>Port / Location</TableHead>
                    <TableHead>ETA</TableHead>
                    <TableHead>Job Type</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Authorizer</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobs.map((job) => (
                    <TableRow key={job.jobNo}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-slate-900">{job.jobNo}</p>
                          <p className="text-xs text-slate-500">{job.approvalRef}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-start gap-2">
                          <Ship className="mt-0.5 h-4 w-4 text-slate-500" />
                          <span className="font-medium text-slate-900">{job.vessel}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-slate-900">{job.client}</p>
                          <p className="text-xs text-slate-500">PIC: {job.pic}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-slate-900">{job.port}</p>
                          <p className="text-xs text-slate-500">{job.location}</p>
                        </div>
                      </TableCell>
                      <TableCell>{job.eta}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {job.jobTypes.map((type) => (
                            <Badge key={type} variant="secondary" className="rounded-xl text-xs">{type}</Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{job.vendor}</TableCell>
                      <TableCell>{job.authorizer}</TableCell>
                      <TableCell>
                        <PriorityBadge value={job.priority} />
                      </TableCell>
                      <TableCell>
                        <Badge className="rounded-xl">{job.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="rounded-xl">
                          <Eye className="mr-2 h-4 w-4" /> View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
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
        <div className="rounded-2xl border border-slate-200 p-3 text-slate-700">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}

function PriorityBadge({ value }) {
  if (value === "Critical") return <Badge className="rounded-xl">Critical</Badge>;
  if (value === "Urgent") return <Badge variant="secondary" className="rounded-xl">Urgent</Badge>;
  if (value === "High") return <Badge variant="outline" className="rounded-xl">High</Badge>;
  return <Badge variant="secondary" className="rounded-xl">Normal</Badge>;
}
