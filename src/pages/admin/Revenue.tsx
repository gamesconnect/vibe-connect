import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, DollarSign, TrendingUp, Clock, CheckCircle } from "lucide-react";

const Revenue = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-revenue"],
    queryFn: async () => {
      const { data: payments, error } = await supabase
        .from("payments")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const successful = payments?.filter((p) => p.status === "successful") || [];
      const pending = payments?.filter((p) => p.status === "pending") || [];
      const failed = payments?.filter((p) => p.status === "failed") || [];

      const totalRevenue = successful.reduce((sum, p) => sum + Number(p.amount), 0);
      const pendingAmount = pending.reduce((sum, p) => sum + Number(p.amount), 0);

      // Group by date for chart
      const revenueByDate = successful.reduce((acc, p) => {
        const date = new Date(p.created_at).toLocaleDateString();
        acc[date] = (acc[date] || 0) + Number(p.amount);
        return acc;
      }, {} as Record<string, number>);

      return {
        payments: payments || [],
        totalRevenue,
        pendingAmount,
        successfulCount: successful.length,
        pendingCount: pending.length,
        failedCount: failed.length,
        revenueByDate,
      };
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Revenue",
      value: `GH₵ ${(data?.totalRevenue || 0).toLocaleString()}`,
      icon: DollarSign,
      color: "text-brand-green",
      bgColor: "bg-brand-green/10",
    },
    {
      title: "Pending Amount",
      value: `GH₵ ${(data?.pendingAmount || 0).toLocaleString()}`,
      icon: Clock,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Successful Payments",
      value: data?.successfulCount || 0,
      icon: CheckCircle,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Conversion Rate",
      value: `${data?.payments?.length ? Math.round((data.successfulCount / data.payments.length) * 100) : 0}%`,
      icon: TrendingUp,
      color: "text-brand-blue",
      bgColor: "bg-brand-blue/10",
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      successful: "default",
      pending: "secondary",
      failed: "destructive",
    };
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-bold">Revenue</h1>
        <p className="text-muted-foreground">Payment analytics and transaction history</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Revenue by Date */}
      {data?.revenueByDate && Object.keys(data.revenueByDate).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(data.revenueByDate)
                .slice(0, 7)
                .map(([date, amount]) => (
                  <div key={date} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{date}</span>
                    <span className="font-semibold">GH₵ {amount.toLocaleString()}</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.payments?.slice(0, 20).map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-mono text-sm">
                      {payment.reference.slice(0, 12)}...
                    </TableCell>
                    <TableCell>{payment.email}</TableCell>
                    <TableCell>GH₵ {Number(payment.amount).toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell>
                      {new Date(payment.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
                {!data?.payments?.length && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No transactions yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Revenue;
