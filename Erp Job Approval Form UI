import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, FileCheck, User, CalendarDays, Ship, MapPin, Building2, FileText, Save, Send, XCircle, Clock3, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const authorizers = ["Operations Manager", "Managing Director", "Accounts Controller"];
const approvalStatuses = ["Pending Review", "Approved", "Returned for Correction", "Rejected"];
const ports = ["Colombo", "Hambantota", "Trincomalee", "Fujairah", "Port Louis"];
const portLocations = {
  Colombo: ["At Anchorage", "At Berth", "Outer Port Limits", "Oil Jetty"],
  Hambantota: ["At Anchorage", "At Berth", "Inner Harbor", "Outer Port Limits"],
  Trincomalee: ["At Anchorage", "At Berth", "Inner Harbor", "Offshore"],
  Fujairah: ["At Anchorage", "At Berth", "STS Area", "Offshore"],
  "Port Louis": ["At Anchorage", "At Berth", "Outer Anchorage", "Shipyard"],
};
const clients = ["Oldendorff", "Norden", "Sea Consortium Lanka", "Local Agent", "Direct Owner"];
const pics = {
  Oldendorff: ["John Peter", "Maria Silva"],
  Norden: ["Alan George", "Priya Raman"],
  "Sea Consortium Lanka": ["Ruwan Perera"],
  "Local Agent": ["Mohamed Ali"],
  "Direct Owner": ["Captain Lee"],
};
const vendors = ["Launch Service", "Sampling Technician", "Draft Surveyor", "Lab Service", "Transport Vendor"];
const jobTypeOptions = [
  "Bunker Survey",
  "Hull & Machinery Survey",
  "Draught Survey",
  "Cargo Survey",
  "P&I Survey",
  "Investigation",
  "On/Off-Hire Survey",
  "Condition Survey",
];

export default function ERPJobApprovalFormUI() {
  const [approval, setApproval] = useState({
    approvalRef: "APR-202603-001",
    authorizer: "Operations Manager",
    status: "Pending Review",
    jobNumber: "JOB-202603-001",
    submittedBy: "Document / Operations Executive",
    submittedDate: "2026-03-22",
    approvedDate: "",
    priority: "Normal",
    revisionNo: "0",
    commentsToTeam: "",
    returnReason: "",
    changeLog: "Adjusted vendor selection and verified PIC details before final authorization.",
    vesselName: "MV SAMPLE VESSEL",
    country: "Sri Lanka",
    port: "Colombo",
    location: "At Anchorage",
    client: "Oldendorff",
    pic: "John Peter",
    eta: "2026-03-25",
    clientRef: "OLD/OPS/2451",
    specialInstructions: "Attend with launch arrangement confirmed. Sampling kit to be carried. Final boarding time to be reconfirmed with agent.",
    vendor: "Launch Service",
    vendorEmailSend: "Yes",
    quoteApproved: true,
    costApproved: true,
    sendFinalJobEmail: true,
    approvalRequired: true,
  });

  const [quotationItems, setQuotationItems] = useState([
    { item: "Survey Fee", amount: "USD 500" },
    { item: "Transport", amount: "USD 100" },
  ]);

  const [costItems, setCostItems] = useState([
    { item: "Launch Charges", amount: "USD 80" },
    { item: "Port Pass", amount: "USD 40" },
  ]);

  const completion = useMemo(() => {
    const required = [
      approval.authorizer,
      approval.status,
      approval.jobNumber,
      approval.vesselName,
      approval.client,
      approval.pic,
      approval.port,
      approval.location,
    ];
    return Math.round((required.filter(Boolean).length / required.length) * 100);
  }, [approval]);

  const updateField = (key, value) => setApproval((prev) => ({ ...prev, [key]: value }));

  const toggleJobType = (job) => {
    setApproval((prev) => ({
      ...prev,
      selectedJobTypes: prev.selectedJobTypes?.includes(job)
        ? prev.selectedJobTypes.filter((j) => j !== job)
        : [...(prev.selectedJobTypes || ["Bunker Survey", "Condition Survey"]), job],
    }));
  };

  const filteredLocations = approval.port ? portLocations[approval.port] || [] : [];
  const availablePics = approval.client ? pics[approval.client] || [] : [];
  const selectedJobTypes = approval.selectedJobTypes || ["Bunker Survey", "Condition Survey"];

  const updateQuotation = (index, key, value) => {
    setQuotationItems((prev) => prev.map((row, i) => (i === index ? { ...row, [key]: value } : row)));
  };

  const updateCost = (index, key, value) => {
    setCostItems((prev) => prev.map((row, i) => (i === index ? { ...row, [key]: value } : row)));
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
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">ERP Job Approval Form</h1>
            <p className="mt-1 text-sm text-slate-600">
              Review, edit, approve, return, or reject submitted job entries with full authorizer control.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="flex items-center gap-3 px-4 py-3">
                <div>
                  <p className="text-xs text-slate-500">Review Readiness</p>
                  <p className="text-lg font-semibold text-slate-900">{completion}%</p>
                </div>
                <div className="h-2 w-28 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full rounded-full bg-slate-900" style={{ width: `${completion}%` }} />
                </div>
              </CardContent>
            </Card>
            <Button variant="outline" className="rounded-2xl">
              <Save className="mr-2 h-4 w-4" /> Save Edits
            </Button>
            <Button className="rounded-2xl">
              <FileCheck className="mr-2 h-4 w-4" /> Approve Job
            </Button>
          </div>
        </motion.div>

        <div className="grid gap-6 xl:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="xl:col-span-2"
          >
            <Card className="rounded-3xl border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <ShieldCheck className="h-5 w-5" /> Authorization Review
                </CardTitle>
                <CardDescription>The authorizer can review and edit all job entry details before final action.</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="approval" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-3 rounded-2xl">
                    <TabsTrigger value="approval">Approval Control</TabsTrigger>
                    <TabsTrigger value="job">Editable Job Data</TabsTrigger>
                    <TabsTrigger value="financials">Quote & Cost Review</TabsTrigger>
                  </TabsList>

                  <TabsContent value="approval" className="space-y-6">
                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Approval Reference</Label>
                        <Input value={approval.approvalRef} readOnly className="rounded-2xl bg-slate-100 font-medium" />
                      </div>
                      <div className="space-y-2">
                        <Label>Job Number</Label>
                        <Input value={approval.jobNumber} readOnly className="rounded-2xl bg-slate-100 font-medium" />
                      </div>

                      <div className="space-y-2">
                        <Label>Authorizer</Label>
                        <Select value={approval.authorizer} onValueChange={(v) => updateField("authorizer", v)}>
                          <SelectTrigger className="rounded-2xl">
                            <SelectValue placeholder="Select authorizer" />
                          </SelectTrigger>
                          <SelectContent>
                            {authorizers.map((item) => (
                              <SelectItem key={item} value={item}>{item}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Approval Status</Label>
                        <Select value={approval.status} onValueChange={(v) => updateField("status", v)}>
                          <SelectTrigger className="rounded-2xl">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            {approvalStatuses.map((item) => (
                              <SelectItem key={item} value={item}>{item}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Submitted By</Label>
                        <Input value={approval.submittedBy} onChange={(e) => updateField("submittedBy", e.target.value)} className="rounded-2xl" />
                      </div>
                      <div className="space-y-2">
                        <Label>Submitted Date</Label>
                        <Input type="date" value={approval.submittedDate} onChange={(e) => updateField("submittedDate", e.target.value)} className="rounded-2xl" />
                      </div>

                      <div className="space-y-2">
                        <Label>Approved / Reviewed Date</Label>
                        <Input type="date" value={approval.approvedDate} onChange={(e) => updateField("approvedDate", e.target.value)} className="rounded-2xl" />
                      </div>
                      <div className="space-y-2">
                        <Label>Revision No.</Label>
                        <Input value={approval.revisionNo} onChange={(e) => updateField("revisionNo", e.target.value)} className="rounded-2xl" />
                      </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Comments to Team</Label>
                        <Textarea
                          value={approval.commentsToTeam}
                          onChange={(e) => updateField("commentsToTeam", e.target.value)}
                          placeholder="Enter final instructions to document team, operations, or surveyor"
                          className="min-h-[120px] rounded-2xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Return / Rejection Reason</Label>
                        <Textarea
                          value={approval.returnReason}
                          onChange={(e) => updateField("returnReason", e.target.value)}
                          placeholder="Enter reason when returning for correction or rejecting"
                          className="min-h-[120px] rounded-2xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Authorizer Change Log</Label>
                      <Textarea
                        value={approval.changeLog}
                        onChange={(e) => updateField("changeLog", e.target.value)}
                        className="min-h-[100px] rounded-2xl"
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <ActionCard icon={<FileCheck className="h-5 w-5" />} title="Approve" desc="Finalize and release the job entry" />
                      <ActionCard icon={<Send className="h-5 w-5" />} title="Return" desc="Send back with comments for correction" />
                      <ActionCard icon={<XCircle className="h-5 w-5" />} title="Reject" desc="Decline the request and close approval" />
                    </div>
                  </TabsContent>

                  <TabsContent value="job" className="space-y-6">
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                      The authorizer has full edit authority. All data below remains editable before approval.
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Vessel Name</Label>
                        <Input value={approval.vesselName} onChange={(e) => updateField("vesselName", e.target.value)} className="rounded-2xl" />
                      </div>
                      <div className="space-y-2">
                        <Label>Client</Label>
                        <Select
                          value={approval.client}
                          onValueChange={(v) => {
                            const defaultPIC = (pics[v] || [])[0] || "";
                            setApproval((prev) => ({ ...prev, client: v, pic: defaultPIC }));
                          }}
                        >
                          <SelectTrigger className="rounded-2xl">
                            <SelectValue placeholder="Select client" />
                          </SelectTrigger>
                          <SelectContent>
                            {clients.map((item) => (
                              <SelectItem key={item} value={item}>{item}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Port</Label>
                        <Select
                          value={approval.port}
                          onValueChange={(v) => {
                            updateField("port", v);
                            updateField("location", "");
                          }}
                        >
                          <SelectTrigger className="rounded-2xl">
                            <SelectValue placeholder="Select port" />
                          </SelectTrigger>
                          <SelectContent>
                            {ports.map((item) => (
                              <SelectItem key={item} value={item}>{item}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Location</Label>
                        <Select value={approval.location} onValueChange={(v) => updateField("location", v)}>
                          <SelectTrigger className="rounded-2xl">
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            {filteredLocations.map((item) => (
                              <SelectItem key={item} value={item}>{item}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Select PIC</Label>
                        <Select value={approval.pic} onValueChange={(v) => updateField("pic", v)}>
                          <SelectTrigger className="rounded-2xl">
                            <SelectValue placeholder="Select PIC" />
                          </SelectTrigger>
                          <SelectContent>
                            {availablePics.map((item) => (
                              <SelectItem key={item} value={item}>{item}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>ETA</Label>
                        <Input type="date" value={approval.eta} onChange={(e) => updateField("eta", e.target.value)} className="rounded-2xl" />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label>Client Ref</Label>
                        <Input value={approval.clientRef} onChange={(e) => updateField("clientRef", e.target.value)} className="rounded-2xl" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Job Type</Label>
                      <div className="grid gap-3 rounded-2xl border border-slate-200 p-4 md:grid-cols-2 xl:grid-cols-3">
                        {jobTypeOptions.map((job) => (
                          <label key={job} className="flex items-center gap-3 rounded-xl p-2 hover:bg-slate-50">
                            <Checkbox checked={selectedJobTypes.includes(job)} onCheckedChange={() => toggleJobType(job)} />
                            <span className="text-sm text-slate-700">{job}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Special Instructions</Label>
                      <Textarea value={approval.specialInstructions} onChange={(e) => updateField("specialInstructions", e.target.value)} className="min-h-[120px] rounded-2xl" />
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Vendor</Label>
                        <Select value={approval.vendor} onValueChange={(v) => updateField("vendor", v)}>
                          <SelectTrigger className="rounded-2xl">
                            <SelectValue placeholder="Select vendor" />
                          </SelectTrigger>
                          <SelectContent>
                            {vendors.map((item) => (
                              <SelectItem key={item} value={item}>{item}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Vendor Email Option</Label>
                        <div className="flex gap-5 rounded-2xl border border-slate-200 px-4 py-3">
                          <label className="flex items-center gap-2 text-sm text-slate-700">
                            <Checkbox checked={approval.vendorEmailSend === "Yes"} onCheckedChange={() => updateField("vendorEmailSend", "Yes")} />
                            <span>Yes</span>
                          </label>
                          <label className="flex items-center gap-2 text-sm text-slate-700">
                            <Checkbox checked={approval.vendorEmailSend === "No"} onCheckedChange={() => updateField("vendorEmailSend", "No")} />
                            <span>No</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="financials" className="space-y-6">
                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="space-y-3 rounded-2xl border border-slate-200 p-4">
                        <div className="flex items-center justify-between">
                          <Label>Quotation Breakdown</Label>
                          <Badge className="rounded-xl">Editable</Badge>
                        </div>
                        {quotationItems.map((row, index) => (
                          <div key={index} className="grid gap-3 md:grid-cols-2">
                            <Input value={row.item} onChange={(e) => updateQuotation(index, "item", e.target.value)} className="rounded-2xl" />
                            <Input value={row.amount} onChange={(e) => updateQuotation(index, "amount", e.target.value)} className="rounded-2xl" />
                          </div>
                        ))}
                        <label className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
                          <span className="text-sm text-slate-700">Quotation Checked / Approved</span>
                          <Checkbox checked={approval.quoteApproved} onCheckedChange={(checked) => updateField("quoteApproved", Boolean(checked))} />
                        </label>
                      </div>

                      <div className="space-y-3 rounded-2xl border border-slate-200 p-4">
                        <div className="flex items-center justify-between">
                          <Label>Cost Breakdown</Label>
                          <Badge className="rounded-xl">Editable</Badge>
                        </div>
                        {costItems.map((row, index) => (
                          <div key={index} className="grid gap-3 md:grid-cols-2">
                            <Input value={row.item} onChange={(e) => updateCost(index, "item", e.target.value)} className="rounded-2xl" />
                            <Input value={row.amount} onChange={(e) => updateCost(index, "amount", e.target.value)} className="rounded-2xl" />
                          </div>
                        ))}
                        <label className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
                          <span className="text-sm text-slate-700">Cost Checked / Approved</span>
                          <Checkbox checked={approval.costApproved} onCheckedChange={(checked) => updateField("costApproved", Boolean(checked))} />
                        </label>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
                        <span className="text-sm text-slate-700">Approval required before release</span>
                        <Checkbox checked={approval.approvalRequired} onCheckedChange={(checked) => updateField("approvalRequired", Boolean(checked))} />
                      </label>
                      <label className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
                        <span className="text-sm text-slate-700">Send final job email after approval</span>
                        <Checkbox checked={approval.sendFinalJobEmail} onCheckedChange={(checked) => updateField("sendFinalJobEmail", Boolean(checked))} />
                      </label>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="space-y-6"
          >
            <Card className="rounded-3xl border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5" /> Approval Snapshot
                </CardTitle>
                <CardDescription>Key review data and current authorization status.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <SummaryRow icon={<ShieldCheck className="h-4 w-4" />} label="Status" value={approval.status} />
                <SummaryRow icon={<User className="h-4 w-4" />} label="Authorizer" value={approval.authorizer} />
                <SummaryRow icon={<FileText className="h-4 w-4" />} label="Approval Ref." value={approval.approvalRef} />
                <SummaryRow icon={<Ship className="h-4 w-4" />} label="Vessel" value={approval.vesselName} />
                <SummaryRow icon={<Building2 className="h-4 w-4" />} label="Client / PIC" value={`${approval.client} / ${approval.pic}`} />
                <SummaryRow icon={<MapPin className="h-4 w-4" />} label="Port / Location" value={`${approval.port} / ${approval.location}`} />
                <SummaryRow icon={<CalendarDays className="h-4 w-4" />} label="ETA" value={approval.eta} />
                <SummaryRow icon={<Clock3 className="h-4 w-4" />} label="Submitted" value={approval.submittedDate} />

                <Separator />

                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Review Flags</p>
                  <div className="flex flex-wrap gap-2">
                    {approval.quoteApproved && <Badge className="rounded-xl">Quote Checked</Badge>}
                    {approval.costApproved && <Badge className="rounded-xl">Cost Checked</Badge>}
                    {approval.sendFinalJobEmail && <Badge variant="secondary" className="rounded-xl">Release Email</Badge>}
                    {approval.approvalRequired && <Badge variant="secondary" className="rounded-xl">Approval Required</Badge>}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Suggested Approval Actions</CardTitle>
                <CardDescription>Recommended controls for the approval workflow.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-slate-700">
                  <div className="rounded-2xl border p-3">Lock release email until approval is completed</div>
                  <div className="rounded-2xl border p-3">Track all authorizer edits in audit trail</div>
                  <div className="rounded-2xl border p-3">Require return reason for corrections / rejection</div>
                  <div className="rounded-2xl border p-3">Show before vs. after changes for edited fields</div>
                  <div className="rounded-2xl border p-3">Notify preparer once action is taken</div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-0 shadow-md border border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-amber-900">
                  <AlertCircle className="h-5 w-5" /> Authorizer Authority
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-amber-900">
                The authorizer can revise any field in the submitted job entry before approving, returning, or rejecting it. This screen is designed for full supervisory control.
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-200 p-3">
      <div className="mt-0.5 text-slate-500">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
        <p className="truncate font-medium text-slate-900">{value || "—"}</p>
      </div>
    </div>
  );
}

function ActionCard({ icon, title, desc }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      <div className="mb-2 flex items-center gap-2 text-slate-900">
        {icon}
        <span className="font-medium">{title}</span>
      </div>
      <p className="text-sm text-slate-600">{desc}</p>
    </div>
  );
}
