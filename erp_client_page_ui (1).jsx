import React, { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Users, RefreshCcw, Download, Building2 } from "lucide-react";
import { motion } from "framer-motion";

const clientRows = [
  {
    companyName: "Oldendorff",
    email: "john@oldendorff.com",
    phone: "+49 40 7788 1001",
    outstanding: "USD 2,500",
  },
  {
    companyName: "Norden",
    email: "priya@norden.com",
    phone: "+65 8111 3300",
    outstanding: "USD 0",
  },
  {
    companyName: "Sea Consortium Lanka",
    email: "ruwan@scl.lk",
    phone: "+94 77 444 1212",
    outstanding: "USD 1,150",
  },
  {
    companyName: "Direct Owner",
    email: "lee@owner.com",
    phone: "+82 10 6677 8899",
    outstanding: "USD 920",
  },
  {
    companyName: "Local Agent",
    email: "ali@agent.com",
    phone: "+971 56 201 8877",
    outstanding: "USD 310",
  },
];

export default function ERPClientPageUI() {
  const [clientSearch, setClientSearch] = useState("");

  const filteredClients = useMemo(() => {
    return clientRows.filter((row) => {
      return (
        !clientSearch ||
        [row.companyName, row.email, row.phone]
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
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">ERP Client Page</h1>
            <p className="mt-1 text-sm text-slate-600">
              Default list view of client records with search option on top.
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

        <Card className="rounded-3xl border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Search className="h-5 w-5" /> Client Search
            </CardTitle>
            <CardDescription>Use the search field to narrow down client records.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label>Search</Label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  value={clientSearch}
                  onChange={(e) => setClientSearch(e.target.value)}
                  placeholder="Search company name, email, or phone"
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
                <Users className="h-5 w-5" /> Client Register
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
                    <TableHead>Company Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Outstanding</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((row) => (
                    <TableRow key={`${row.companyName}-${row.email}`}>
                      <TableCell>
                        <div className="flex items-center gap-2 font-medium text-slate-900">
                          <Building2 className="h-4 w-4 text-slate-500" />
                          {row.companyName}
                        </div>
                      </TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.phone}</TableCell>
                      <TableCell>
                        <OutstandingBadge value={row.outstanding} />
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

function OutstandingBadge({ value }) {
  const zero = value === "USD 0";
  return <Badge variant={zero ? "secondary" : "outline"} className="rounded-xl">{value}</Badge>;
}
