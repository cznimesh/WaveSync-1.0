import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Ship, CalendarDays, Building2, MapPin, FileText, Save, RotateCcw, Paperclip, User } from "lucide-react";
import { motion } from "framer-motion";

const countries = ["Sri Lanka", "UAE", "India", "Mauritius", "Singapore"];
const ports = ["Colombo", "Hambantota", "Trincomalee", "Fujairah", "Port Louis"];
const portLocations = {
  Colombo: ["At Anchorage", "At Berth", "Outer Port Limits", "Oil Jetty"],
  Hambantota: ["At Anchorage", "At Berth", "Inner Harbor", "Outer Port Limits"],
  Trincomalee: ["At Anchorage", "At Berth", "Inner Harbor", "Offshore"],
  Fujairah: ["At Anchorage", "At Berth", "STS Area", "Offshore"],
  "Port Louis": ["At Anchorage", "At Berth", "Outer Anchorage", "Shipyard"],
};

const clientsSeed = [
  {
    name: "Oldendorff",
    contacts: [
      { name: "John Peter", designation: "Operations Executive", email: "john@oldendorff.com", isPrimary: true },
      { name: "Maria Silva", designation: "Marine Superintendent", email: "maria@oldendorff.com", isPrimary: false },
    ],
  },
  {
    name: "Norden",
    contacts: [
      { name: "Alan George", designation: "Claims Handler", email: "alan@norden.com", isPrimary: true },
      { name: "Priya Raman", designation: "Chartering Coordinator", email: "priya@norden.com", isPrimary: false },
    ],
  },
  {
    name: "Sea Consortium Lanka",
    contacts: [
      { name: "Ruwan Perera", designation: "Agency Coordinator", email: "ruwan@scl.lk", isPrimary: true },
    ],
  },
  {
    name: "Local Agent",
    contacts: [
      { name: "Mohamed Ali", designation: "Port Representative", email: "ali@agent.com", isPrimary: true },
    ],
  },
  {
    name: "Direct Owner",
    contacts: [
      { name: "Captain Lee", designation: "Technical Manager", email: "lee@owner.com", isPrimary: true },
    ],
  },
];

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

export default function ERPJobEntryFormWithPICUI() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const generatedJobNo = `JOB-${year}${month}-001`;

  const [clientList, setClientList] = useState(clientsSeed);
  const [newClient, setNewClient] = useState("");
  const [form, setForm] = useState({
    jobNumber: generatedJobNo,
    vesselName: "",
    country: "",
    port: "",
    location: "",
    client: "",
    pic: "",
    eta: "",
    jobTypes: [],
    clientRef: "",
    specialInstructions: "",
    vendor: "",
    vendorEmailSend: "",
    attachments: [],
  });

  const [quotationItems, setQuotationItems] = useState([
    { item: "Survey Fee", amount: "" },
    { item: "Transport", amount: "" },
  ]);

  const [costItems, setCostItems] = useState([
    { item: "Launch Charges", amount: "" },
    { item: "Port Pass", amount: "" },
  ]);

  const selectedClient = clientList.find((client) => client.name === form.client);
  const availablePICs = selectedClient?.contacts || [];
  const selectedPIC = availablePICs.find((contact) => contact.name === form.pic);

  const completion = useMemo(() => {
    const required = [
      form.jobNumber,
      form.vesselName,
      form.country,
      form.port,
      form.location,
      form.client,
      form.pic,
      form.eta,
      form.clientRef,
    ];
    const filled = required.filter(Boolean).length + (form.jobTypes.length > 0 ? 1 : 0);
    return Math.round((filled / (required.length + 1)) * 100);
  }, [form]);

  const filteredLocations = form.port ? portLocations[form.port] || [] : [];

  const updateField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const toggleJobType = (job) => {
    setForm((prev) => ({
      ...prev,
      jobTypes: prev.jobTypes.includes(job)
        ? prev.jobTypes.filter((j) => j !== job)
        : [...prev.jobTypes, job],
    }));
  };

  const handleReset = () => {
    setForm({
      jobNumber: generatedJobNo,
      vesselName: "",
      country: "",
      port: "",
      location: "",
      client: "",
      pic: "",
      eta: "",
      jobTypes: [],
      clientRef: "",
      specialInstructions: "",
      vendor: "",
      vendorEmailSend: "",
      attachments: [],
    });
    setQuotationItems([
      { item: "Survey Fee", amount: "" },
      { item: "Transport", amount: "" },
    ]);
    setCostItems([
      { item: "Launch Charges", amount: "" },
      { item: "Port Pass", amount: "" },
    ]);
  };

  const handleAddClient = () => {
    const clean = newClient.trim();
    if (!clean) return;
    if (!clientList.some((client) => client.name === clean)) {
      setClientList((prev) => [
        ...prev,
        {
          name: clean,
          contacts: [{ name: "Primary Contact", designation: "", email: "", isPrimary: true }],
        },
      ]);
    }
    setForm((prev) => ({ ...prev, client: clean, pic: "Primary Contact" }));
    setNewClient("");
  };

  const addQuotationRow = () => {
    setQuotationItems((prev) => [...prev, { item: "", amount: "" }]);
  };

  const addCostRow = () => {
    setCostItems((prev) => [...prev, { item: "", amount: "" }]);
  };

  const updateQuotationItem = (index, key, value) => {
    setQuotationItems((prev) => prev.map((row, i) => (i === index ? { ...row, [key]: value } : row)));
  };

  const updateCostItem = (index, key, value) => {
    setCostItems((prev) => prev.map((row, i) => (i === index ? { ...row, [key]: value } : row)));
  };

  const handleAttachmentUpload = (e) => {
    const files = Array.from(e.target.files || []);
    setForm((prev) => ({ ...prev, attachments: files.map((f) => f.name) }));
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
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">ERP Job Entry Form</h1>
            <p className="mt-1 text-sm text-slate-600">
              Create and manage marine survey jobs with structured operational details and linked client PIC selection.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="flex items-center gap-3 px-4 py-3">
                <div>
                  <p className="text-xs text-slate-500">Completion</p>
                  <p className="text-lg font-semibold text-slate-900">{completion}%</p>
                </div>
                <div className="h-2 w-28 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full rounded-full bg-slate-900" style={{ width: `${completion}%` }} />
                </div>
              </CardContent>
            </Card>
            <Button variant="outline" onClick={handleReset} className="rounded-2xl">
              <RotateCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
            <Button className="rounded-2xl">
              <Save className="mr-2 h-4 w-4" /> Save Job
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
                  <Ship className="h-5 w-5" /> Job Information
                </CardTitle>
                <CardDescription>Enter vessel, client, PIC, operational, and vendor details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Job Number</Label>
                    <Input value={form.jobNumber} readOnly className="rounded-2xl bg-slate-100 font-medium" />
                  </div>

                  <div className="space-y-2">
                    <Label>Vessel Name</Label>
                    <Input
                      placeholder="Enter vessel name"
                      value={form.vesselName}
                      onChange={(e) => updateField("vesselName", e.target.value)}
                      className="rounded-2xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Country</Label>
                    <Select value={form.country} onValueChange={(v) => updateField("country", v)}>
                      <SelectTrigger className="rounded-2xl">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((item) => (
                          <SelectItem key={item} value={item}>{item}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Port</Label>
                    <Select
                      value={form.port}
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
                    <Select value={form.location} onValueChange={(v) => updateField("location", v)}>
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

                  <div className="space-y-2 md:col-span-2">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <Label>Client</Label>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button type="button" variant="outline" size="sm" className="rounded-2xl">
                            <Plus className="mr-2 h-4 w-4" /> Add new client
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="rounded-3xl">
                          <DialogHeader>
                            <DialogTitle>Add New Client</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-3 py-2">
                            <Label>Client Name</Label>
                            <Input
                              placeholder="Enter client name"
                              value={newClient}
                              onChange={(e) => setNewClient(e.target.value)}
                              className="rounded-2xl"
                            />
                          </div>
                          <DialogFooter>
                            <Button onClick={handleAddClient} className="rounded-2xl">Save Client</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <Select
                      value={form.client}
                      onValueChange={(v) => {
                        const client = clientList.find((item) => item.name === v);
                        const defaultPIC = client?.contacts.find((c) => c.isPrimary)?.name || "";
                        setForm((prev) => ({ ...prev, client: v, pic: defaultPIC }));
                      }}
                    >
                      <SelectTrigger className="rounded-2xl">
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent>
                        {clientList.map((item) => (
                          <SelectItem key={item.name} value={item.name}>{item.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Select PIC</Label>
                    <Select value={form.pic} onValueChange={(v) => updateField("pic", v)} disabled={!form.client}>
                      <SelectTrigger className="rounded-2xl">
                        <SelectValue placeholder={form.client ? "Select PIC" : "Select client first"} />
                      </SelectTrigger>
                      <SelectContent>
                        {availablePICs.map((contact) => (
                          <SelectItem key={contact.name} value={contact.name}>
                            {contact.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedPIC && (
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                        <p className="font-medium">{selectedPIC.name}</p>
                        <p>{selectedPIC.designation || "No designation"}</p>
                        <p>{selectedPIC.email || "No email"}</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>ETA</Label>
                    <div className="relative">
                      <CalendarDays className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        type="date"
                        value={form.eta}
                        onChange={(e) => updateField("eta", e.target.value)}
                        className="rounded-2xl pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>Client Ref</Label>
                    <Input
                      placeholder="Enter client reference"
                      value={form.clientRef}
                      onChange={(e) => updateField("clientRef", e.target.value)}
                      className="rounded-2xl"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Job Type</Label>
                  <div className="grid gap-3 rounded-2xl border border-slate-200 p-4 md:grid-cols-2 xl:grid-cols-3">
                    {jobTypeOptions.map((job) => (
                      <label key={job} className="flex items-center gap-3 rounded-xl p-2 hover:bg-slate-50">
                        <Checkbox checked={form.jobTypes.includes(job)} onCheckedChange={() => toggleJobType(job)} />
                        <span className="text-sm text-slate-700">{job}</span>
                      </label>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {form.jobTypes.length === 0 ? (
                      <span className="text-sm text-slate-500">No job types selected</span>
                    ) : (
                      form.jobTypes.map((job) => <Badge key={job} className="rounded-xl">{job}</Badge>)
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Special Instructions</Label>
                  <Textarea
                    placeholder="Enter operational notes, boarding instructions, permits, timing constraints, or client-specific requirements"
                    value={form.specialInstructions}
                    onChange={(e) => updateField("specialInstructions", e.target.value)}
                    className="min-h-[120px] rounded-2xl"
                  />
                </div>

                <div className="space-y-3 rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between">
                    <Label>Quotation Breakdown Table</Label>
                    <Button type="button" variant="outline" size="sm" className="rounded-2xl" onClick={addQuotationRow}>
                      <Plus className="mr-2 h-4 w-4" /> Add Row
                    </Button>
                  </div>
                  {quotationItems.map((row, index) => (
                    <div key={index} className="grid gap-3 md:grid-cols-2">
                      <Input
                        placeholder="Item"
                        value={row.item}
                        onChange={(e) => updateQuotationItem(index, "item", e.target.value)}
                        className="rounded-2xl"
                      />
                      <Input
                        placeholder="Amount"
                        value={row.amount}
                        onChange={(e) => updateQuotationItem(index, "amount", e.target.value)}
                        className="rounded-2xl"
                      />
                    </div>
                  ))}
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Vendor List</Label>
                    <div className="flex flex-col gap-3 lg:flex-row">
                      <div className="flex-1">
                        <Select value={form.vendor} onValueChange={(v) => updateField("vendor", v)}>
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
                      <div className="rounded-2xl border border-slate-200 px-4 py-3 lg:min-w-[220px]">
                        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">Send Email to Vendor</p>
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-2 text-sm text-slate-700">
                            <Checkbox
                              checked={form.vendorEmailSend === "Yes"}
                              onCheckedChange={() => updateField("vendorEmailSend", form.vendorEmailSend === "Yes" ? "" : "Yes")}
                            />
                            <span>Yes</span>
                          </label>
                          <label className="flex items-center gap-2 text-sm text-slate-700">
                            <Checkbox
                              checked={form.vendorEmailSend === "No"}
                              onCheckedChange={() => updateField("vendorEmailSend", form.vendorEmailSend === "No" ? "" : "No")}
                            />
                            <span>No</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-center justify-between">
                      <Label>Cost Breakdown Table</Label>
                      <Button type="button" variant="outline" size="sm" className="rounded-2xl" onClick={addCostRow}>
                        <Plus className="mr-2 h-4 w-4" /> Add Row
                      </Button>
                    </div>
                    {costItems.map((row, index) => (
                      <div key={index} className="grid gap-3 md:grid-cols-2">
                        <Input
                          placeholder="Cost Item"
                          value={row.item}
                          onChange={(e) => updateCostItem(index, "item", e.target.value)}
                          className="rounded-2xl"
                        />
                        <Input
                          placeholder="Amount"
                          value={row.amount}
                          onChange={(e) => updateCostItem(index, "amount", e.target.value)}
                          className="rounded-2xl"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 rounded-2xl border border-dashed border-slate-300 p-4">
                  <div className="flex items-center gap-2">
                    <Paperclip className="h-4 w-4 text-slate-500" />
                    <Label>Attachment Upload for Quotation / PDA / Instructions</Label>
                  </div>
                  <Input type="file" multiple onChange={handleAttachmentUpload} className="rounded-2xl" />
                  <div className="flex flex-wrap gap-2">
                    {form.attachments.length > 0 ? (
                      form.attachments.map((file) => (
                        <Badge key={file} variant="secondary" className="rounded-xl">{file}</Badge>
                      ))
                    ) : (
                      <span className="text-sm text-slate-500">No attachments uploaded</span>
                    )}
                  </div>
                </div>
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
                  <FileText className="h-5 w-5" /> Summary
                </CardTitle>
                <CardDescription>Live preview of the job entry data.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="grid gap-3">
                  <SummaryRow icon={<FileText className="h-4 w-4" />} label="Job No." value={form.jobNumber || "—"} />
                  <SummaryRow icon={<Ship className="h-4 w-4" />} label="Vessel" value={form.vesselName || "—"} />
                  <SummaryRow icon={<Building2 className="h-4 w-4" />} label="Client" value={form.client || "—"} />
                  <SummaryRow icon={<User className="h-4 w-4" />} label="PIC" value={form.pic || "—"} />
                  <SummaryRow
                    icon={<FileText className="h-4 w-4" />}
                    label="PIC Email"
                    value={selectedPIC?.email || "—"}
                  />
                  <SummaryRow icon={<MapPin className="h-4 w-4" />} label="Country / Port" value={`${form.country || "—"} / ${form.port || "—"}`} />
                  <SummaryRow icon={<MapPin className="h-4 w-4" />} label="Location" value={form.location || "—"} />
                  <SummaryRow icon={<Building2 className="h-4 w-4" />} label="Vendor" value={form.vendor || "—"} />
                  <SummaryRow icon={<FileText className="h-4 w-4" />} label="Vendor Email" value={form.vendorEmailSend || "—"} />
                  <SummaryRow icon={<CalendarDays className="h-4 w-4" />} label="ETA" value={form.eta || "—"} />
                  <SummaryRow icon={<FileText className="h-4 w-4" />} label="Client Ref" value={form.clientRef || "—"} />
                </div>

                <div className="space-y-2 pt-2">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Selected Job Types</p>
                  <div className="flex flex-wrap gap-2">
                    {form.jobTypes.length ? (
                      form.jobTypes.map((job) => (
                        <Badge key={job} variant="secondary" className="rounded-xl">{job}</Badge>
                      ))
                    ) : (
                      <span className="text-slate-500">No selections yet</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Workflow Features Added</CardTitle>
                <CardDescription>ERP functions now built into this screen.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-slate-700">
                  <div className="rounded-2xl border p-3">Auto job number generation</div>
                  <div className="rounded-2xl border p-3">Port-wise location filtering</div>
                  <div className="rounded-2xl border p-3">Client PIC selection from master contacts</div>
                  <div className="rounded-2xl border p-3">Auto-load primary PIC when client is selected</div>
                  <div className="rounded-2xl border p-3">Quotation breakdown table</div>
                  <div className="rounded-2xl border p-3">Cost breakdown table</div>
                  <div className="rounded-2xl border p-3">Attachment upload</div>
                  <div className="rounded-2xl border p-3">Vendor email yes / no option</div>
                </div>
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
        <p className="truncate font-medium text-slate-900">{value}</p>
      </div>
    </div>
  );
}
