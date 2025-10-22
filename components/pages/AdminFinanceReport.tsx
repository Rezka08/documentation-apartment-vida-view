import { useState } from "react";
import { ArrowLeft, Download, Printer, TrendingUp, TrendingDown, DollarSign, AlertCircle, Calendar, Users, Home, Wrench, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Separator } from "../ui/separator";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { toast } from "sonner@2.0.3";

interface AdminFinanceReportProps {
  onNavigate: (page: string, data?: any) => void;
}

export function AdminFinanceReport({ onNavigate }: AdminFinanceReportProps) {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedMonth, setSelectedMonth] = useState("10");

  // Data Laporan Pendapatan Bulanan
  const monthlyIncomeData = [
    { month: "Jan", income: 420000000, expense: 85000000, net: 335000000 },
    { month: "Feb", income: 440000000, expense: 90000000, net: 350000000 },
    { month: "Mar", income: 450000000, expense: 88000000, net: 362000000 },
    { month: "Apr", income: 455000000, expense: 92000000, net: 363000000 },
    { month: "May", income: 460000000, expense: 95000000, net: 365000000 },
    { month: "Jun", income: 465000000, expense: 89000000, net: 376000000 },
    { month: "Jul", income: 470000000, expense: 93000000, net: 377000000 },
    { month: "Aug", income: 468000000, expense: 91000000, net: 377000000 },
    { month: "Sep", income: 472000000, expense: 87000000, net: 385000000 },
    { month: "Oct", income: 475000000, expense: 90000000, net: 385000000 },
    { month: "Nov", income: 0, expense: 0, net: 0 },
    { month: "Dec", income: 0, expense: 0, net: 0 }
  ];

  const currentMonthDetails = [
    { category: "Sewa Bulanan", amount: 420000000, count: 78, percentage: 88.4 },
    { category: "Deposit", amount: 35000000, count: 5, percentage: 7.4 },
    { category: "Denda Keterlambatan", amount: 12000000, count: 8, percentage: 2.5 },
    { category: "Biaya Tambahan", amount: 8000000, count: 12, percentage: 1.7 }
  ];

  // Data Laporan Tunggakan
  const overdueData = [
    { id: "TGK-001", tenant: "Ahmad Yani", unit: "Studio A-201", amount: 5500000, daysOverdue: 15, status: "warning" },
    { id: "TGK-002", tenant: "Siti Nurhaliza", unit: "2BR B-305", amount: 8500000, daysOverdue: 30, status: "danger" },
    { id: "TGK-003", tenant: "Budi Santoso", unit: "1BR C-102", amount: 6500000, daysOverdue: 7, status: "info" },
    { id: "TGK-004", tenant: "Dewi Lestari", unit: "Studio A-401", amount: 5500000, daysOverdue: 45, status: "danger" },
    { id: "TGK-005", tenant: "Eko Prasetyo", unit: "3BR B-501", amount: 12000000, daysOverdue: 20, status: "warning" }
  ];

  const overdueByCategory = [
    { name: "0-7 Hari", value: 6500000, count: 1, color: "#10b981" },
    { name: "8-30 Hari", value: 11000000, count: 2, color: "#f59e0b" },
    { name: "Lebih dari 30 Hari", value: 20500000, count: 2, color: "#ef4444" }
  ];

  // Data Laporan Tahunan
  const yearlyComparison = [
    { year: "2021", revenue: 4800000000, units: 85, occupancy: 88 },
    { year: "2022", revenue: 5200000000, units: 88, occupancy: 91 },
    { year: "2023", revenue: 5450000000, units: 90, occupancy: 93 },
    { year: "2024", revenue: 5680000000, units: 95, occupancy: 94 },
    { year: "2025", revenue: 4735000000, units: 95, occupancy: 95 } // YTD
  ];

  const quarterlyData = [
    { quarter: "Q1 2025", revenue: 1310000000, growth: 8.5 },
    { quarter: "Q2 2025", revenue: 1380000000, growth: 5.3 },
    { quarter: "Q3 2025", revenue: 1415000000, growth: 2.5 },
    { quarter: "Q4 2025", revenue: 630000000, growth: 0 }
  ];

  // Data Laporan Okupansi
  const occupancyData = [
    { month: "Jan", occupied: 85, available: 10, maintenance: 5 },
    { month: "Feb", occupied: 87, available: 8, maintenance: 5 },
    { month: "Mar", occupied: 88, available: 7, maintenance: 5 },
    { month: "Apr", occupied: 89, available: 6, maintenance: 5 },
    { month: "May", occupied: 90, available: 5, maintenance: 5 },
    { month: "Jun", occupied: 91, available: 4, maintenance: 5 },
    { month: "Jul", occupied: 92, available: 3, maintenance: 5 },
    { month: "Aug", occupied: 91, available: 4, maintenance: 5 },
    { month: "Sep", occupied: 93, available: 2, maintenance: 5 },
    { month: "Oct", occupied: 90, available: 5, maintenance: 5 }
  ];

  const unitTypeOccupancy = [
    { type: "Studio", total: 35, occupied: 33, rate: 94.3, revenue: 181500000 },
    { type: "1 Bedroom", total: 30, occupied: 29, rate: 96.7, revenue: 188500000 },
    { type: "2 Bedroom", total: 20, occupied: 19, rate: 95.0, revenue: 161500000 },
    { type: "3 Bedroom", total: 15, occupied: 14, rate: 93.3, revenue: 168000000 }
  ];

  // Data Laporan Maintenance
  const maintenanceData = [
    { month: "Jan", preventive: 15000000, corrective: 8000000, emergency: 3000000 },
    { month: "Feb", preventive: 18000000, corrective: 10000000, emergency: 2000000 },
    { month: "Mar", preventive: 16000000, corrective: 9000000, emergency: 4000000 },
    { month: "Apr", preventive: 17000000, corrective: 11000000, emergency: 3500000 },
    { month: "May", preventive: 19000000, corrective: 12000000, emergency: 2500000 },
    { month: "Jun", preventive: 15000000, corrective: 8000000, emergency: 3000000 },
    { month: "Jul", preventive: 16000000, corrective: 9500000, emergency: 4000000 },
    { month: "Aug", preventive: 18000000, corrective: 10500000, emergency: 2000000 },
    { month: "Sep", preventive: 17000000, corrective: 9000000, emergency: 3500000 },
    { month: "Oct", preventive: 19000000, corrective: 11000000, emergency: 3000000 }
  ];

  const maintenanceByType = [
    { type: "AC Service", count: 45, cost: 22500000, avgCost: 500000 },
    { type: "Plumbing", count: 32, cost: 11200000, avgCost: 350000 },
    { type: "Electrical", count: 28, cost: 14000000, avgCost: 500000 },
    { type: "Painting", count: 15, cost: 18000000, avgCost: 1200000 },
    { type: "Furniture", count: 20, cost: 10000000, avgCost: 500000 },
    { type: "Other", count: 18, cost: 7200000, avgCost: 400000 }
  ];

  // Data Laporan Penyewa
  const tenantStats = [
    { status: "Active", count: 90, percentage: 78.9, color: "#10b981" },
    { status: "Pending", count: 12, percentage: 10.5, color: "#f59e0b" },
    { status: "Expired", count: 8, percentage: 7.0, color: "#6b7280" },
    { status: "Terminated", count: 4, percentage: 3.5, color: "#ef4444" }
  ];

  const tenantRetention = [
    { month: "Jan", newTenants: 5, renewed: 8, left: 2 },
    { month: "Feb", newTenants: 7, renewed: 6, left: 3 },
    { month: "Mar", newTenants: 6, renewed: 9, left: 1 },
    { month: "Apr", newTenants: 8, renewed: 7, left: 2 },
    { month: "May", newTenants: 5, renewed: 10, left: 1 },
    { month: "Jun", newTenants: 9, renewed: 8, left: 3 },
    { month: "Jul", newTenants: 6, renewed: 9, left: 2 },
    { month: "Aug", newTenants: 7, renewed: 7, left: 1 },
    { month: "Sep", newTenants: 8, renewed: 10, left: 2 },
    { month: "Oct", newTenants: 6, renewed: 8, left: 1 }
  ];

  const tenantDuration = [
    { duration: "Kurang dari 6 Bulan", count: 15, percentage: 16.7 },
    { duration: "6-12 Bulan", count: 28, percentage: 31.1 },
    { duration: "1-2 Tahun", count: 32, percentage: 35.6 },
    { duration: "Lebih dari 2 Tahun", count: 15, percentage: 16.7 }
  ];

  const handleExport = (reportType: string) => {
    toast.success(`Laporan ${reportType} berhasil diexport ke Excel`);
  };

  const handlePrint = () => {
    window.print();
    toast.success("Membuka dialog print");
  };

  const COLORS = ["#9B7AA8", "#b598c1", "#ceb6d9", "#e0d4e8"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-background">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 print:relative">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onNavigate("admin")}
                className="print:hidden"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1>Laporan Keuangan</h1>
                <p className="text-sm text-muted-foreground">Analisis keuangan dan performa properti</p>
              </div>
            </div>
            <div className="flex gap-2 print:hidden">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="monthly" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 print:hidden">
            <TabsTrigger value="monthly">
              <DollarSign className="mr-2 h-4 w-4" />
              Bulanan
            </TabsTrigger>
            <TabsTrigger value="overdue">
              <AlertCircle className="mr-2 h-4 w-4" />
              Tunggakan
            </TabsTrigger>
            <TabsTrigger value="yearly">
              <Calendar className="mr-2 h-4 w-4" />
              Tahunan
            </TabsTrigger>
            <TabsTrigger value="occupancy">
              <Home className="mr-2 h-4 w-4" />
              Okupansi
            </TabsTrigger>
            <TabsTrigger value="maintenance">
              <Wrench className="mr-2 h-4 w-4" />
              Maintenance
            </TabsTrigger>
            <TabsTrigger value="tenant">
              <Users className="mr-2 h-4 w-4" />
              Penyewa
            </TabsTrigger>
          </TabsList>

          {/* 1. LAPORAN PENDAPATAN BULANAN */}
          <TabsContent value="monthly" className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Pendapatan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl">Rp 475jt</p>
                      <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
                        <TrendingUp className="h-3 w-3" />
                        <span>+0.6%</span>
                      </div>
                    </div>
                    <DollarSign className="h-8 w-8 text-primary opacity-20" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Pengeluaran</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl">Rp 90jt</p>
                      <p className="text-sm text-muted-foreground mt-1">18.9% dari income</p>
                    </div>
                    <TrendingDown className="h-8 w-8 text-orange-500 opacity-20" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Net Income</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl">Rp 385jt</p>
                      <p className="text-sm text-muted-foreground mt-1">81.1% margin</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600 opacity-20" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Rata-rata per Unit</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="text-2xl">Rp 5.28jt</p>
                    <p className="text-sm text-muted-foreground mt-1">90 unit terisi</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chart */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Tren Pendapatan 2025</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExport("Pendapatan Bulanan")}
                    className="print:hidden"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={monthlyIncomeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
                    <Tooltip formatter={(value: any) => `Rp ${(value / 1000000).toFixed(1)}jt`} />
                    <Legend />
                    <Line type="monotone" dataKey="income" stroke="#9B7AA8" strokeWidth={2} name="Pendapatan" />
                    <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} name="Pengeluaran" />
                    <Line type="monotone" dataKey="net" stroke="#10b981" strokeWidth={2} name="Net Income" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Detail Table */}
            <Card>
              <CardHeader>
                <CardTitle>Rincian Pendapatan Bulan Ini</CardTitle>
                <CardDescription>Oktober 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Jumlah Transaksi</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Persentase</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentMonthDetails.map((item) => (
                      <TableRow key={item.category}>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.count}</TableCell>
                        <TableCell>Rp {(item.amount / 1000000).toFixed(1)}jt</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${item.percentage}%` }}
                              />
                            </div>
                            <span className="text-sm">{item.percentage}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 2. LAPORAN TUNGGAKAN */}
          <TabsContent value="overdue" className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Tunggakan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="text-2xl text-red-600">Rp 38jt</p>
                    <p className="text-sm text-muted-foreground mt-1">5 penyewa</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Tunggakan Kritis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="text-2xl text-red-600">Rp 20.5jt</p>
                    <p className="text-sm text-muted-foreground mt-1">Lebih dari 30 hari</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Rata-rata Keterlambatan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="text-2xl">23 hari</p>
                    <p className="text-sm text-muted-foreground mt-1">Per penyewa</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Tingkat Koleksi</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="text-2xl text-green-600">92%</p>
                    <p className="text-sm text-muted-foreground mt-1">Bulan ini</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Tunggakan Berdasarkan Kategori</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={overdueByCategory}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name}: ${entry.count}`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {overdueByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: any) => `Rp ${(value / 1000000).toFixed(1)}jt`} />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="space-y-4">
                    {overdueByCategory.map((item) => (
                      <div key={item.name} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded" 
                            style={{ backgroundColor: item.color }}
                          />
                          <div>
                            <p>{item.name}</p>
                            <p className="text-sm text-muted-foreground">{item.count} penyewa</p>
                          </div>
                        </div>
                        <p className="text-lg">Rp {(item.value / 1000000).toFixed(1)}jt</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detail Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Daftar Tunggakan</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExport("Tunggakan")}
                    className="print:hidden"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Penyewa</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Jumlah</TableHead>
                      <TableHead>Keterlambatan</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {overdueData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.tenant}</TableCell>
                        <TableCell>{item.unit}</TableCell>
                        <TableCell>Rp {(item.amount / 1000000).toFixed(1)}jt</TableCell>
                        <TableCell>{item.daysOverdue} hari</TableCell>
                        <TableCell>
                          <Badge 
                            className={
                              item.status === "danger" ? "bg-red-500" :
                              item.status === "warning" ? "bg-yellow-500" :
                              "bg-blue-500"
                            }
                          >
                            {item.status === "danger" ? "Kritis" : 
                             item.status === "warning" ? "Perhatian" : "Baru"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="print:hidden">
                            Kirim Reminder
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 3. LAPORAN TAHUNAN */}
          <TabsContent value="yearly" className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Revenue YTD 2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="text-2xl">Rp 4.74M</p>
                    <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
                      <TrendingUp className="h-3 w-3" />
                      <span>+8.2% vs 2024</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Target Tahunan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="text-2xl">Rp 6.0M</p>
                    <p className="text-sm text-muted-foreground mt-1">79% tercapai</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Rata-rata Pertumbuhan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="text-2xl">8.5%</p>
                    <p className="text-sm text-muted-foreground mt-1">Per tahun</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Proyeksi 2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="text-2xl">Rp 5.9M</p>
                    <p className="text-sm text-muted-foreground mt-1">Target tercapai 98%</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Yearly Comparison Chart */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Perbandingan Revenue Tahunan</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExport("Laporan Tahunan")}
                    className="print:hidden"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={yearlyComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => `${value / 1000000000}M`} />
                    <Tooltip formatter={(value: any) => `Rp ${(value / 1000000000).toFixed(2)}M`} />
                    <Legend />
                    <Bar dataKey="revenue" fill="#9B7AA8" name="Revenue" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Quarterly Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Performa Kuartalan 2025</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Kuartal</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Growth (%)</TableHead>
                      <TableHead>Kontribusi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quarterlyData.map((item) => (
                      <TableRow key={item.quarter}>
                        <TableCell>{item.quarter}</TableCell>
                        <TableCell>Rp {(item.revenue / 1000000000).toFixed(2)}M</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {item.growth > 0 && <TrendingUp className="h-4 w-4 text-green-600" />}
                            <span className={item.growth > 0 ? "text-green-600" : "text-gray-500"}>
                              {item.growth > 0 ? `+${item.growth}%` : "N/A"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {item.revenue > 0 ? `${((item.revenue / 4735000000) * 100).toFixed(1)}%` : "N/A"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Historical Data */}
            <Card>
              <CardHeader>
                <CardTitle>Data Historis (2021-2025)</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tahun</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Jumlah Unit</TableHead>
                      <TableHead>Okupansi</TableHead>
                      <TableHead>Growth</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {yearlyComparison.map((item, index) => (
                      <TableRow key={item.year}>
                        <TableCell>{item.year}</TableCell>
                        <TableCell>Rp {(item.revenue / 1000000000).toFixed(2)}M</TableCell>
                        <TableCell>{item.units} unit</TableCell>
                        <TableCell>{item.occupancy}%</TableCell>
                        <TableCell>
                          {index > 0 && (
                            <span className="text-green-600">
                              +{(((item.revenue - yearlyComparison[index - 1].revenue) / yearlyComparison[index - 1].revenue) * 100).toFixed(1)}%
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 4. LAPORAN OKUPANSI */}
          <TabsContent value="occupancy" className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Okupansi Saat Ini</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="text-2xl text-green-600">95%</p>
                    <p className="text-sm text-muted-foreground mt-1">90 dari 95 unit</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Unit Tersedia</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="text-2xl">5 unit</p>
                    <p className="text-sm text-muted-foreground mt-1">Siap disewakan</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Maintenance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="text-2xl">5 unit</p>
                    <p className="text-sm text-muted-foreground mt-1">Dalam perbaikan</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Rata-rata Okupansi</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="text-2xl">92%</p>
                    <p className="text-sm text-muted-foreground mt-1">10 bulan terakhir</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Occupancy Trend Chart */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Tren Okupansi 2025</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExport("Okupansi")}
                    className="print:hidden"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={occupancyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="occupied" stackId="a" fill="#10b981" name="Terisi" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="available" stackId="a" fill="#6b7280" name="Tersedia" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="maintenance" stackId="a" fill="#f59e0b" name="Maintenance" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Unit Type Occupancy */}
            <Card>
              <CardHeader>
                <CardTitle>Okupansi Berdasarkan Tipe Unit</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipe Unit</TableHead>
                      <TableHead>Total Unit</TableHead>
                      <TableHead>Terisi</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead>Revenue Kontribusi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {unitTypeOccupancy.map((item) => (
                      <TableRow key={item.type}>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>{item.total}</TableCell>
                        <TableCell>{item.occupied}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-muted rounded-full h-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ width: `${item.rate}%` }}
                              />
                            </div>
                            <span className="text-sm">{item.rate}%</span>
                          </div>
                        </TableCell>
                        <TableCell>Rp {(item.revenue / 1000000).toFixed(1)}jt</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 5. LAPORAN MAINTENANCE */}
          <TabsContent value="maintenance" className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Biaya Bulan Ini</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="text-2xl">Rp 33jt</p>
                    <p className="text-sm text-muted-foreground mt-1">Oktober 2025</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Tahun Ini</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="text-2xl">Rp 303jt</p>
                    <div className="flex items-center gap-1 text-red-600 text-sm mt-1">
                      <TrendingUp className="h-3 w-3" />
                      <span>+12% vs 2024</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Request</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="text-2xl">158</p>
                    <p className="text-sm text-muted-foreground mt-1">Tahun ini</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Rata-rata Biaya</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="text-2xl">Rp 522k</p>
                    <p className="text-sm text-muted-foreground mt-1">Per request</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Maintenance Cost Trend */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Biaya Maintenance per Bulan</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExport("Maintenance")}
                    className="print:hidden"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={maintenanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
                    <Tooltip formatter={(value: any) => `Rp ${(value / 1000000).toFixed(1)}jt`} />
                    <Legend />
                    <Bar dataKey="preventive" fill="#10b981" name="Preventive" />
                    <Bar dataKey="corrective" fill="#f59e0b" name="Corrective" />
                    <Bar dataKey="emergency" fill="#ef4444" name="Emergency" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Maintenance by Type */}
            <Card>
              <CardHeader>
                <CardTitle>Biaya Berdasarkan Jenis Perbaikan</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Jenis Perbaikan</TableHead>
                      <TableHead>Jumlah Request</TableHead>
                      <TableHead>Total Biaya</TableHead>
                      <TableHead>Rata-rata Biaya</TableHead>
                      <TableHead>Persentase</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {maintenanceByType.map((item) => {
                      const totalCost = maintenanceByType.reduce((sum, i) => sum + i.cost, 0);
                      const percentage = (item.cost / totalCost) * 100;
                      return (
                        <TableRow key={item.type}>
                          <TableCell>{item.type}</TableCell>
                          <TableCell>{item.count}</TableCell>
                          <TableCell>Rp {(item.cost / 1000000).toFixed(1)}jt</TableCell>
                          <TableCell>Rp {(item.avgCost / 1000).toFixed(0)}k</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-muted rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full" 
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-sm">{percentage.toFixed(1)}%</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 6. LAPORAN PENYEWA */}
          <TabsContent value="tenant" className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Penyewa</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="text-2xl">114</p>
                    <p className="text-sm text-muted-foreground mt-1">Semua status</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Penyewa Aktif</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="text-2xl text-green-600">90</p>
                    <p className="text-sm text-muted-foreground mt-1">78.9% dari total</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Retention Rate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="text-2xl text-green-600">85%</p>
                    <p className="text-sm text-muted-foreground mt-1">Tahun ini</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Rata-rata Durasi Sewa</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="text-2xl">14.2 bln</p>
                    <p className="text-sm text-muted-foreground mt-1">Per penyewa</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tenant Status Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Distribusi Status Penyewa</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={tenantStats}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.status}: ${entry.count}`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {tenantStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rincian Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tenantStats.map((item) => (
                      <div key={item.status} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          />
                          <div>
                            <p>{item.status}</p>
                            <p className="text-sm text-muted-foreground">{item.percentage}%</p>
                          </div>
                        </div>
                        <p className="text-2xl">{item.count}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tenant Retention Trend */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Tren Penyewa 2025</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExport("Penyewa")}
                    className="print:hidden"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={tenantRetention}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="newTenants" stroke="#10b981" strokeWidth={2} name="Penyewa Baru" />
                    <Line type="monotone" dataKey="renewed" stroke="#9B7AA8" strokeWidth={2} name="Perpanjangan" />
                    <Line type="monotone" dataKey="left" stroke="#ef4444" strokeWidth={2} name="Keluar" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Tenant Duration */}
            <Card>
              <CardHeader>
                <CardTitle>Durasi Sewa Penyewa</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Durasi</TableHead>
                      <TableHead>Jumlah Penyewa</TableHead>
                      <TableHead>Persentase</TableHead>
                      <TableHead>Visualisasi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tenantDuration.map((item) => (
                      <TableRow key={item.duration}>
                        <TableCell>{item.duration}</TableCell>
                        <TableCell>{item.count}</TableCell>
                        <TableCell>{item.percentage}%</TableCell>
                        <TableCell>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
