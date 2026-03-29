import React, { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Building2, Phone, Mail, Globe, Wallet, Users, Handshake, RefreshCcw, Download } from "lucide-react";
import { motion } from "framer-motion";

const vendorRows = [
  {
    supplier: "Launch Service",
    companyName: "Colombo Marine Launches (Pvt) Ltd",
    country: "Sri Lanka",
    port: "Colombo",
    phone: "+94 77 123 4567",
    email: "ops@cml.lk",
    openBalance: "USD 850",
  },
  {
    supplier: "Sampling Technician",
    companyName: "Fujairah Sampling Services LLC",
    country: "UAE",
    port: "Fujairah",
    phone: "+971 50 455 7788",
    email: "dispatch@fss.ae",
    openBalance: "USD 0",
  },
  {
    supplier: "Draft Surveyor",
    companyName: "Hambantota Cargo Survey Associates",
    country: "Sri Lanka",
    port: "Hambantota",
    phone: "+94 71 989 2121",
    email: "draft@hcsa.lk",
    openBalance: "USD 275",
  },
  {
    supplier: "Lab Service",
    companyName: "Trinco Marine Lab Solutions",
    country: "Sri Lanka",
    port: "Trincomalee",
    phone: "+94 76 555 1010",
    email: "lab@tmls.lk",
    openBalance: "USD 120",
  },
  {
    supplier: "Transport Vendor",
    companyName: "Port Louis Offshore Logistics Ltd",
    country: "Mauritius",
    port: "Port Louis",
    phone: "+230 5900 2244",
    email: "bookings@plol.mu",
    openBalance: "USD 430",
  },
];

const clientRows = [
  {
    name: "John Peter",
    companyName: "Oldendorff",
    email: "john@oldendorff.com",
    phone: "+49 40 7788 1001",
    outstanding: "USD 2,500",
  },
  {
    name: "Priya Raman",
    companyName: "Norden",
    email: "priya@norden.com",
    phone: "+65 8111 3300",
    outstanding: "USD 0",
  },
  {
    name: "Ruwan Perera",
    companyName: "Sea Consortium Lanka",
    email: "ruwan@scl.lk",
    phone: "+94 77 444 1212",
    outstanding: "USD 1,150",
  },
  {
    name: "Captain Lee",
    companyName: "Direct Owner",
    email: "lee@owner.com",
    phone: "+82 10 6677 8899",
    outstanding: "USD 920",
  },
  {
    name: "Mohamed Ali",
    companyName: "Local Agent",
    email: "ali@agent.com",
    phone: "+971 56 201 8877",
    outstanding: "USD 310",
  },
];

const vendorCountries = ["All Countries", "Sri Lanka", "UAE", "Mauritius"];
const vendorPorts = ["All Ports", "Colombo", "Fujairah", "Hambantota", "Trincomalee", "Port Louis"];

export default function ERPVendorClientPagesUI() {
  const [vendorSearch, setVendorSearch] = useState("");
  const [vendorCountry, setVendorCountry] = useState("All Countries");
  const [vendorPort, setVendorPort] = useState("All Ports");
  const [clientSearch, setClientSearch] = useState("");

  const filteredVendors = useMemo(() => {
    return vendorRows.filter((row) => {
      const matchesSearch =
        !vendorSearch ||
        [row.supplier, row.companyName, row.phone, row.email]
          .join(" ")
          .toLowerCase()
          .includes(vendorSearch.toLowerCase());
      const matchesCountry = vendorCountry === "All Countries" || row.country === vendorCountry;
      const matchesPort = vendorPort === "All Ports" || row.port === vendorPort;
      return matchesSearch && matchesCountry && matchesPort;
    });
  }, [vendorSearch, vendorCountry, vendorPort]);

  const filteredClients = useMemo(() => {
    return clientRows.filter((row) => {
      return (
        !clientSearch ||
        [row.name, row.companyName, row.email, row.phone]
          .join(" ")
          .toLowerCase()
          .includes(clientSearch.toLowerCase())
      );
    });
  }, [clientSearch]);

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
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">ERP Registered Pages</h1>
            <p className="mt-1 text-sm text-slate-600">
              After approval, job-related records are visible across All Jobs, Vendor Page, and Client Page for operational and commercial tracking.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-2xl">
              <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
            </Button>
            <Button className="rounded-2xl">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          <MiniStat title="All Jobs Page" value="Ready" icon={<Handshake className="h-5 w-5" />} />
          <MiniStat title="Vendor Records" value={vendorRows.length} icon={<Building2 className="h-5 w-5" />} />
          <MiniStat title="Client Records" value={clientRows.length} icon={<Users className="h-5 w-5" />} />
        </div>

        <Tabs defaultValue="vendor" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 rounded-2xl">
            <TabsTrigger value="vendor">Vendor Page</TabsTrigger>
            <TabsTrigger value="client">Client Page</TabsTrigger>
          </TabsList>

          <TabsContent value="vendor" className="space-y-6">
            <Card className="rounded-3xl border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Filter className="h-5 w-5" /> Vendor Filters
                </CardTitle>
                <CardDescription>Default list view with search and filters by country and port.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="space-y-2 xl:col-span-2">
                  <Label>Search</Label>
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      value={vendorSearch}
                      onChange={(e) => setVendorSearch(e.target.value)}
                      placeholder="Search supplier, company, phone, or email"
                      className="rounded-2xl pl-10"
                    />
                  </div>
                </div>

                <FilterSelect label="Country" value={vendorCountry} onChange={setVendorCountry} options={vendorCountries} />
                <FilterSelect label="Port" value={vendorPort} onChange={setVendorPort} options={vendorPorts} />
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-0 shadow-md">
              <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Building2 className="h-5 w-5" /> Vendor Page
                  </CardTitle>
                  <CardDescription>Showing {filteredVendors.length} vendor records in default list view.</CardDescription>
                </div>
                <Badge className="rounded-xl">Default List View</Badge>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>Port</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Open Balance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredVendors.map((row) => (
                        <TableRow key={`${row.supplier}-${row.companyName}`}>
                          <TableCell>
                            <div className="flex items-center gap-2 font-medium text-slate-900">
                              <Handshake className="h-4 w-4 text-slate-500" />
                              {row.supplier}
                            </div>
                          </TableCell>
                          <TableCell>{row.companyName}</TableCell>
                          <TableCell>{row.country}</TableCell>
                          <TableCell>{row.port}</TableCell>
                          <TableCell>{row.phone}</TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell>
                            <BalanceBadge value={row.openBalance} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="client" className="space-y-6">
            <Card className="rounded-3xl border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Search className="h-5 w-5" /> Client Search
                </CardTitle>
                <CardDescription>Default list view with searching option on top.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label>Search</Label>
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      value={clientSearch}
                      onChange={(e) => setClientSearch(e.target.value)}
                      placeholder="Search name, company name, email, or phone"
                      className="rounded-2xl pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-0 shadow-md">
              <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Users className="h-5 w-5" /> Client Page
                  </CardTitle>
                  <CardDescription>Showing {filteredClients.length} client records in default list view.</CardDescription>
                </div>
                <Badge className="rounded-xl">Default List View</Badge>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Outstanding</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClients.map((row) => (
                        <TableRow key={`${row.name}-${row.companyName}`}>
                          <TableCell>
                            <div className="flex items-center gap-2 font-medium text-slate-900">
                              <Users className="h-4 w-4 text-slate-500" />
                              {row.name}
                            </div>
                          </TableCell>
                          <TableCell>{row.companyName}</TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell>{row.phone}</TableCell>
                          <TableCell>
                            <BalanceBadge value={row.outstanding} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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

function MiniStat({ title, value, icon }) {
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

function BalanceBadge({ value }) {
  const zero = value === "USD 0";
  return <Badge variant={zero ? "secondary" : "outline"} className="rounded-xl">{value}</Badge>;
}
