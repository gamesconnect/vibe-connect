import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  Download, 
  CheckCircle, 
  Loader2,
  Filter
} from "lucide-react";

const Registrations = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: registrations, isLoading } = useQuery({
    queryKey: ["admin-registrations", statusFilter],
    queryFn: async () => {
      let query = supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("payment_status", statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const verifyMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("registrations")
        .update({ verified: true, payment_status: "paid" })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-registrations"] });
      toast({
        title: "Payment Verified",
        description: "The registration has been marked as verified.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to verify payment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const filteredRegistrations = registrations?.filter(
    (reg) =>
      reg.name.toLowerCase().includes(search.toLowerCase()) ||
      reg.email.toLowerCase().includes(search.toLowerCase()) ||
      reg.phone.includes(search)
  );

  const exportToCSV = () => {
    if (!filteredRegistrations?.length) return;

    const headers = ["Name", "Email", "Phone", "Team", "Payment Status", "Amount", "Date"];
    const rows = filteredRegistrations.map((reg) => [
      reg.name,
      reg.email,
      reg.phone,
      reg.team_color || "N/A",
      reg.payment_status,
      reg.amount_paid || 0,
      new Date(reg.created_at).toLocaleDateString(),
    ]);

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `registrations-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: `Exported ${filteredRegistrations.length} registrations to CSV.`,
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      paid: "default",
      pending: "secondary",
      failed: "destructive",
    };
    return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
  };

  const getTeamBadge = (color: string | null) => {
    if (!color) return null;
    const bgColors: Record<string, string> = {
      Red: "bg-primary text-primary-foreground",
      Blue: "bg-brand-blue text-white",
      Yellow: "bg-secondary text-secondary-foreground",
      Green: "bg-brand-green text-white",
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${bgColors[color] || "bg-muted"}`}>
        {color}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold">Registrations</h1>
          <p className="text-muted-foreground">Manage event registrations</p>
        </div>
        <Button onClick={exportToCSV} disabled={!filteredRegistrations?.length}>
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {filteredRegistrations?.length || 0} Registrations
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRegistrations?.map((reg) => (
                    <TableRow key={reg.id}>
                      <TableCell className="font-medium">{reg.name}</TableCell>
                      <TableCell>{reg.email}</TableCell>
                      <TableCell>{reg.phone}</TableCell>
                      <TableCell>{getTeamBadge(reg.team_color)}</TableCell>
                      <TableCell>{getStatusBadge(reg.payment_status)}</TableCell>
                      <TableCell>GH₵ {reg.amount_paid || 0}</TableCell>
                      <TableCell>
                        {new Date(reg.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {!reg.verified && reg.payment_status === "pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => verifyMutation.mutate(reg.id)}
                            disabled={verifyMutation.isPending}
                          >
                            {verifyMutation.isPending ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <>
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Verify
                              </>
                            )}
                          </Button>
                        )}
                        {reg.verified && (
                          <Badge variant="outline" className="text-green-600">
                            Verified
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {!filteredRegistrations?.length && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No registrations found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Registrations;
