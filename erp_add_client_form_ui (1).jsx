import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, User, Mail, Phone, MapPin, Globe, FileText, Save, RotateCcw, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const countries = ["Sri Lanka", "UAE", "India", "Mauritius", "Singapore"];
const clientTypes = ["Ship Owner", "Charterer", "Manager", "Trader", "Broker", "Agent", "P&I Correspondent", "Other"];
const currencies = ["USD", "LKR", "AED", "EUR", "SGD"];
const paymentTerms = ["Immediate", "7 Days", "14 Days", "30 Days", "45 Days", "60 Days"];

export default function ERPAddClientFormUI() {
  const [form, setForm] = useState({
    clientCode: "CL-0001",
    clientName: "",
    clientType: "",
    country: "",
    address: "",
    contactPerson: "",
    designation: "",
    email: "",
    phone: "",
    whatsapp: "",
    website: "",
    taxNumber: "",
    registrationNumber: "",
    defaultCurrency: "USD",
    paymentTerm: "30 Days",
    creditLimit: "",
    billingInstructions: "",
    remarks: "",
    activeStatus: true,
    sendWelcomeEmail: false,
    portalAccess: false,
  });

  const [contacts, setContacts] = useState([
    {
      name: "",
      designation: "",
      email: "",
      phone: "",
      whatsapp: "",
      isPrimary: true,
    },
  ]);

  const updateField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const completion = useMemo(() => {
    const required = [
      form.clientCode,
      form.clientName,
      form.clientType,
      form.country,
      form.contactPerson,
      form.email,
      form.phone,
      form.defaultCurrency,
      form.paymentTerm,
    ];
    const filled = required.filter(Boolean).length;
    return Math.round((filled / required.length) * 100);
  }, [form]);

  const handleReset = () => {
    setForm({
      clientCode: "CL-0001",
      clientName: "",
      clientType: "",
      country: "",
      address: "",
      contactPerson: "",
      designation: "",
      email: "",
      phone: "",
      whatsapp: "",
      website: "",
      taxNumber: "",
      registrationNumber: "",
      defaultCurrency: "USD",
      paymentTerm: "30 Days",
      creditLimit: "",
      billingInstructions: "",
      remarks: "",
      activeStatus: true,
      sendWelcomeEmail: false,
      portalAccess: false,
    });
    setContacts([
      {
        name: "",
        designation: "",
        email: "",
        phone: "",
        whatsapp: "",
        isPrimary: true,
      },
    ]);
  };

  const addContact = () => {
    setContacts((prev) => [
      ...prev,
      {
        name: "",
        designation: "",
        email: "",
        phone: "",
        whatsapp: "",
        isPrimary: false,
      },
    ]);
  };

  const removeContact = (index) => {
    setContacts((prev) => {
      if (prev.length === 1) return prev;
      const updated = prev.filter((_, i) => i !== index);
      if (!updated.some((contact) => contact.isPrimary) && updated.length > 0) {
        updated[0] = { ...updated[0], isPrimary: true };
      }
      return updated;
    });
  };

  const updateContact = (index, key, value) => {
    setContacts((prev) => prev.map((contact, i) => (i === index ? { ...contact, [key]: value } : contact)));
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
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">ERP Add Client Form</h1>
            <p className="mt-1 text-sm text-slate-600">
              Create and maintain client master records for operations, invoicing, and communication.
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
              <Save className="mr-2 h-4 w-4" /> Save Client
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
                  <Building2 className="h-5 w-5" /> Client Master Information
                </CardTitle>
                <CardDescription>Enter organization, contact, billing, and compliance information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Client Code</Label>
                    <Input value={form.clientCode} readOnly className="rounded-2xl bg-slate-100 font-medium" />
                  </div>
                  <div className="space-y-2">
                    <Label>Client Name</Label>
                    <Input
                      placeholder="Enter company / client name"
                      value={form.clientName}
                      onChange={(e) => updateField("clientName", e.target.value)}
                      className="rounded-2xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Client Type</Label>
                    <Select value={form.clientType} onValueChange={(v) => updateField("clientType", v)}>
                      <SelectTrigger className="rounded-2xl">
                        <SelectValue placeholder="Select client type" />
                      </SelectTrigger>
                      <SelectContent>
                        {clientTypes.map((item) => (
                          <SelectItem key={item} value={item}>{item}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                </div>

                <div className="space-y-2">
                  <Label>Address</Label>
                  <Textarea
                    placeholder="Enter registered address or billing address"
                    value={form.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    className="min-h-[110px] rounded-2xl"
                  />
                </div>

                <div className="space-y-4 rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between">
                    <Label>Multiple Contacts per Client</Label>
                    <Button type="button" variant="outline" size="sm" className="rounded-2xl" onClick={addContact}>
                      <User className="mr-2 h-4 w-4" /> Add Contact
                    </Button>
                  </div>

                  {contacts.map((contact, index) => (
                    <div key={index} className="space-y-4 rounded-2xl border border-slate-200 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <p className="text-sm font-medium text-slate-800">Contact {index + 1}</p>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="rounded-2xl"
                            onClick={() => removeContact(index)}
                            disabled={contacts.length === 1}
                          >
                            Remove Contact
                          </Button>
                        </div>
                        <label className="flex items-center gap-2 text-sm text-slate-700">
                          <Checkbox
                            checked={contact.isPrimary}
                            onCheckedChange={(checked) => updateContact(index, "isPrimary", Boolean(checked))}
                          />
                          <span>Primary Contact</span>
                        </label>
                      </div>

                      <div className="grid gap-5 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Contact Person</Label>
                          <Input
                            placeholder="Enter contact person"
                            value={contact.name}
                            onChange={(e) => updateContact(index, "name", e.target.value)}
                            className="rounded-2xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Designation</Label>
                          <Input
                            placeholder="Enter designation"
                            value={contact.designation}
                            onChange={(e) => updateContact(index, "designation", e.target.value)}
                            className="rounded-2xl"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input
                            placeholder="Enter email address"
                            value={contact.email}
                            onChange={(e) => updateContact(index, "email", e.target.value)}
                            className="rounded-2xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Phone</Label>
                          <Input
                            placeholder="Enter phone number"
                            value={contact.phone}
                            onChange={(e) => updateContact(index, "phone", e.target.value)}
                            className="rounded-2xl"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>WhatsApp</Label>
                          <Input
                            placeholder="Enter WhatsApp number"
                            value={contact.whatsapp}
                            onChange={(e) => updateContact(index, "whatsapp", e.target.value)}
                            className="rounded-2xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Website</Label>
                          <Input
                            placeholder="Enter website URL"
                            value={form.website}
                            onChange={(e) => updateField("website", e.target.value)}
                            className="rounded-2xl"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Website</Label>
                    <Input
                      placeholder="Enter website URL"
                      value={form.website}
                      onChange={(e) => updateField("website", e.target.value)}
                      className="rounded-2xl"
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Tax Number</Label>
                    <Input
                      placeholder="Enter tax / VAT / TRN number"
                      value={form.taxNumber}
                      onChange={(e) => updateField("taxNumber", e.target.value)}
                      className="rounded-2xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Registration Number</Label>
                    <Input
                      placeholder="Enter business registration number"
                      value={form.registrationNumber}
                      onChange={(e) => updateField("registrationNumber", e.target.value)}
                      className="rounded-2xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Default Currency</Label>
                    <Select value={form.defaultCurrency} onValueChange={(v) => updateField("defaultCurrency", v)}>
                      <SelectTrigger className="rounded-2xl">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((item) => (
                          <SelectItem key={item} value={item}>{item}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Payment Term</Label>
                    <Select value={form.paymentTerm} onValueChange={(v) => updateField("paymentTerm", v)}>
                      <SelectTrigger className="rounded-2xl">
                        <SelectValue placeholder="Select payment term" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentTerms.map((item) => (
                          <SelectItem key={item} value={item}>{item}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Credit Limit</Label>
                    <Input
                      placeholder="Enter approved credit limit"
                      value={form.creditLimit}
                      onChange={(e) => updateField("creditLimit", e.target.value)}
                      className="rounded-2xl"
                    />
                  </div>
                  <div className="space-y-3 rounded-2xl border border-slate-200 p-4">
                    <Label>Status & Access</Label>
                    <div className="space-y-3 pt-1">
                      <label className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
                        <span className="text-sm text-slate-700">Active Client</span>
                        <Checkbox checked={form.activeStatus} onCheckedChange={(checked) => updateField("activeStatus", Boolean(checked))} />
                      </label>
                      <label className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
                        <span className="text-sm text-slate-700">Send Welcome Email</span>
                        <Checkbox checked={form.sendWelcomeEmail} onCheckedChange={(checked) => updateField("sendWelcomeEmail", Boolean(checked))} />
                      </label>
                      <label className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
                        <span className="text-sm text-slate-700">Portal Access</span>
                        <Checkbox checked={form.portalAccess} onCheckedChange={(checked) => updateField("portalAccess", Boolean(checked))} />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Billing Instructions</Label>
                  <Textarea
                    placeholder="Enter invoice recipient details, PO requirements, billing email, or special payment notes"
                    value={form.billingInstructions}
                    onChange={(e) => updateField("billingInstructions", e.target.value)}
                    className="min-h-[110px] rounded-2xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Remarks</Label>
                  <Textarea
                    placeholder="Enter internal remarks, commercial notes, or operational observations"
                    value={form.remarks}
                    onChange={(e) => updateField("remarks", e.target.value)}
                    className="min-h-[110px] rounded-2xl"
                  />
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
                  <FileText className="h-5 w-5" /> Client Summary
                </CardTitle>
                <CardDescription>Live preview of the client master data.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="grid gap-3">
                  <SummaryRow icon={<Building2 className="h-4 w-4" />} label="Client Code" value={form.clientCode || "—"} />
                  <SummaryRow icon={<Building2 className="h-4 w-4" />} label="Client Name" value={form.clientName || "—"} />
                  <SummaryRow icon={<ShieldCheck className="h-4 w-4" />} label="Client Type" value={form.clientType || "—"} />
                  <SummaryRow icon={<MapPin className="h-4 w-4" />} label="Country" value={form.country || "—"} />
                  <SummaryRow icon={<User className="h-4 w-4" />} label="Contact Person" value={form.contactPerson || "—"} />
                  <SummaryRow icon={<Mail className="h-4 w-4" />} label="Email" value={form.email || "—"} />
                  <SummaryRow icon={<Phone className="h-4 w-4" />} label="Phone" value={form.phone || "—"} />
                  <SummaryRow icon={<Globe className="h-4 w-4" />} label="Currency / Payment" value={`${form.defaultCurrency || "—"} / ${form.paymentTerm || "—"}`} />
                </div>

                <div className="space-y-2 pt-2">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Status</p>
                  <div className="flex flex-wrap gap-2">
                    {form.activeStatus && <Badge className="rounded-xl">Active</Badge>}
                    {form.sendWelcomeEmail && <Badge variant="secondary" className="rounded-xl">Welcome Email</Badge>}
                    {form.portalAccess && <Badge variant="secondary" className="rounded-xl">Portal Access</Badge>}
                    {!form.activeStatus && !form.sendWelcomeEmail && !form.portalAccess && (
                      <span className="text-slate-500">No special selections</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Suggested Master Data</CardTitle>
                <CardDescription>Useful options to connect later to your ERP backend.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-slate-700">
                  <div className="rounded-2xl border p-3">Multiple contacts per client</div>
                  <div className="rounded-2xl border p-3">Separate billing and operational email fields</div>
                  <div className="rounded-2xl border p-3">Client-specific rate card</div>
                  <div className="rounded-2xl border p-3">Tax and invoice validation rules</div>
                  <div className="rounded-2xl border p-3">Credit control and document upload</div>
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
