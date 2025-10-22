import { ArrowLeft, TrendingUp, Users, Home, DollarSign, Calendar, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Progress } from "../ui/progress";

interface AdminDashboardDetailProps {
  onNavigate: (page: string, data?: any) => void;
  detailType: string;
}

export function AdminDashboardDetail({ onNavigate, detailType }: AdminDashboardDetailProps) {
  // Mock data for different detail views
  const unitStatistics = {
    total: 150,
    available: 45,
    occupied: 95,
    maintenance: 10,
    byType: [
      { type: "Studio", total: 50, occupied: 38, available: 12 },
      { type: "1 Bedroom", total: 60, occupied: 45, available: 15 },
      { type: "2 Bedroom", total: 30, occupied: 10, available: 18 },
      { type: "3 Bedroom", total: 10, occupied: 2, available: 8 },
    ],
    byBuilding: [
      { building: "Tower A", total: 50, occupied: 42, occupancyRate: 84 },
      { building: "Tower B", total: 50, occupied: 38, occupancyRate: 76 },
      { building: "Tower C", total: 50, occupied: 15, occupancyRate: 30 },
    ]
  };

  const userStatistics = {
    total: 285,
    tenants: 95,
    owners: 12,
    admins: 3,
    active: 260,
    inactive: 25,
    newThisMonth: 15,
    recentUsers: [
      { name: "Jane Smith", email: "jane@example.com", type: "Penyewa", joined: "2025-10-05", status: "Aktif" },
      { name: "John Doe", email: "john@example.com", type: "Pengelola", joined: "2025-10-03", status: "Aktif" },
      { name: "Alice Brown", email: "alice@example.com", type: "Penyewa", joined: "2025-10-01", status: "Aktif" },
      { name: "Bob Wilson", email: "bob@example.com", type: "Penyewa", joined: "2025-09-28", status: "Aktif" },
    ]
  };

  const revenueStatistics = {
    totalThisMonth: 332500000,
    totalLastMonth: 310000000,
    growth: 7.26,
    bySource: [
      { source: "Sewa Bulanan", amount: 280000000, percentage: 84 },
      { source: "Deposit", amount: 35000000, percentage: 11 },
      { source: "Utilitas", amount: 12500000, percentage: 4 },
      { source: "Lainnya", amount: 5000000, percentage: 1 },
    ],
    monthlyTrend: [
      { month: "Apr", amount: 285000000 },
      { month: "May", amount: 295000000 },
      { month: "Jun", amount: 298000000 },
      { month: "Jul", amount: 305000000 },
      { month: "Aug", amount: 310000000 },
      { month: "Sep", amount: 315000000 },
      { month: "Oct", amount: 332500000 },
    ]
  };

  const bookingStatistics = {
    total: 45,
    pending: 8,
    confirmed: 32,
    cancelled: 5,
    recentBookings: [
      { id: "BK-2025-045", tenant: "Sarah Johnson", unit: "Studio Premium A-201", date: "2025-10-08", status: "Pending", amount: "Rp 5.500.000" },
      { id: "BK-2025-044", tenant: "Michael Chen", unit: "1BR Deluxe B-305", date: "2025-10-07", status: "Confirmed", amount: "Rp 7.500.000" },
      { id: "BK-2025-043", tenant: "Emily Davis", unit: "2BR Executive C-501", date: "2025-10-06", status: "Confirmed", amount: "Rp 12.000.000" },
      { id: "BK-2025-042", tenant: "David Lee", unit: "Studio Standard A-105", date: "2025-10-05", status: "Cancelled", amount: "Rp 4.500.000" },
    ]
  };

  const renderDetailContent = () => {
    switch (detailType) {
      case "units":
        return (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Unit</p>
                      <p className="text-3xl">{unitStatistics.total}</p>
                    </div>
                    <Home className="w-10 h-10 text-primary opacity-20" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Tersedia</p>
                      <p className="text-3xl text-green-600">{unitStatistics.available}</p>
                    </div>
                    <CheckCircle className="w-10 h-10 text-green-600 opacity-20" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Terisi</p>
                      <p className="text-3xl text-blue-600">{unitStatistics.occupied}</p>
                    </div>
                    <Users className="w-10 h-10 text-blue-600 opacity-20" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Maintenance</p>
                      <p className="text-3xl text-orange-600">{unitStatistics.maintenance}</p>
                    </div>
                    <AlertCircle className="w-10 h-10 text-orange-600 opacity-20" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Unit by Type */}
            <Card>
              <CardHeader>
                <CardTitle>Statistik Unit per Tipe</CardTitle>
                <CardDescription>Breakdown unit berdasarkan tipe</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipe Unit</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Terisi</TableHead>
                      <TableHead>Tersedia</TableHead>
                      <TableHead>Occupancy Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {unitStatistics.byType.map((item) => {
                      const occupancyRate = (item.occupied / item.total) * 100;
                      return (
                        <TableRow key={item.type}>
                          <TableCell>{item.type}</TableCell>
                          <TableCell>{item.total}</TableCell>
                          <TableCell>{item.occupied}</TableCell>
                          <TableCell>{item.available}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={occupancyRate} className="w-24" />
                              <span className="text-sm">{occupancyRate.toFixed(0)}%</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Unit by Building */}
            <Card>
              <CardHeader>
                <CardTitle>Statistik Unit per Gedung</CardTitle>
                <CardDescription>Breakdown unit berdasarkan gedung</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {unitStatistics.byBuilding.map((building) => (
                    <div key={building.building} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-primary" />
                          <span>{building.building}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {building.occupied}/{building.total} unit
                        </span>
                      </div>
                      <Progress value={building.occupancyRate} />
                      <p className="text-sm text-muted-foreground">Occupancy Rate: {building.occupancyRate}%</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "users":
        return (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Pengguna</p>
                      <p className="text-3xl">{userStatistics.total}</p>
                    </div>
                    <Users className="w-10 h-10 text-primary opacity-20" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Penyewa</p>
                      <p className="text-3xl text-blue-600">{userStatistics.tenants}</p>
                    </div>
                    <Home className="w-10 h-10 text-blue-600 opacity-20" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Pengelola</p>
                      <p className="text-3xl text-green-600">{userStatistics.owners}</p>
                    </div>
                    <Users className="w-10 h-10 text-green-600 opacity-20" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Baru Bulan Ini</p>
                      <p className="text-3xl text-purple-600">+{userStatistics.newThisMonth}</p>
                    </div>
                    <TrendingUp className="w-10 h-10 text-purple-600 opacity-20" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* User Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Status Pengguna</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Aktif</span>
                      <Badge className="bg-green-500">{userStatistics.active} users</Badge>
                    </div>
                    <Progress value={(userStatistics.active / userStatistics.total) * 100} />
                    <div className="flex items-center justify-between mt-4">
                      <span>Nonaktif</span>
                      <Badge className="bg-red-500">{userStatistics.inactive} users</Badge>
                    </div>
                    <Progress value={(userStatistics.inactive / userStatistics.total) * 100} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribusi Tipe Pengguna</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Penyewa</span>
                      <span className="text-sm text-muted-foreground">{((userStatistics.tenants / userStatistics.total) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={(userStatistics.tenants / userStatistics.total) * 100} />
                    <div className="flex items-center justify-between mt-4">
                      <span>Pengelola</span>
                      <span className="text-sm text-muted-foreground">{((userStatistics.owners / userStatistics.total) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={(userStatistics.owners / userStatistics.total) * 100} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Users */}
            <Card>
              <CardHeader>
                <CardTitle>Pengguna Terbaru</CardTitle>
                <CardDescription>Pengguna yang baru bergabung</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Tipe</TableHead>
                      <TableHead>Bergabung</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userStatistics.recentUsers.map((user, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell><Badge variant="outline">{user.type}</Badge></TableCell>
                        <TableCell>{user.joined}</TableCell>
                        <TableCell><Badge className="bg-green-500">{user.status}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      case "revenue":
        return (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Pendapatan Bulan Ini</p>
                      <p className="text-2xl">Rp {(revenueStatistics.totalThisMonth / 1000000).toFixed(1)}jt</p>
                      <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                        <TrendingUp className="w-4 h-4" />
                        +{revenueStatistics.growth}% vs bulan lalu
                      </p>
                    </div>
                    <DollarSign className="w-10 h-10 text-primary opacity-20" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Pendapatan Bulan Lalu</p>
                      <p className="text-2xl">Rp {(revenueStatistics.totalLastMonth / 1000000).toFixed(1)}jt</p>
                    </div>
                    <Calendar className="w-10 h-10 text-blue-600 opacity-20" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Rata-rata per Unit</p>
                      <p className="text-2xl">Rp {(revenueStatistics.totalThisMonth / unitStatistics.occupied / 1000000).toFixed(1)}jt</p>
                    </div>
                    <Home className="w-10 h-10 text-green-600 opacity-20" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Revenue by Source */}
            <Card>
              <CardHeader>
                <CardTitle>Pendapatan per Sumber</CardTitle>
                <CardDescription>Breakdown pendapatan bulan ini</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueStatistics.bySource.map((source) => (
                    <div key={source.source} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>{source.source}</span>
                        <div className="text-right">
                          <p className="font-medium">Rp {(source.amount / 1000000).toFixed(1)}jt</p>
                          <p className="text-sm text-muted-foreground">{source.percentage}%</p>
                        </div>
                      </div>
                      <Progress value={source.percentage} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Monthly Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Tren Pendapatan Bulanan</CardTitle>
                <CardDescription>7 bulan terakhir</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {revenueStatistics.monthlyTrend.map((month) => (
                    <div key={month.month} className="flex items-center gap-4">
                      <span className="w-12 text-sm text-muted-foreground">{month.month}</span>
                      <Progress value={(month.amount / revenueStatistics.totalThisMonth) * 100} className="flex-1" />
                      <span className="w-32 text-right text-sm">Rp {(month.amount / 1000000).toFixed(1)}jt</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "bookings":
        return (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Booking</p>
                      <p className="text-3xl">{bookingStatistics.total}</p>
                    </div>
                    <Calendar className="w-10 h-10 text-primary opacity-20" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Pending</p>
                      <p className="text-3xl text-yellow-600">{bookingStatistics.pending}</p>
                    </div>
                    <Clock className="w-10 h-10 text-yellow-600 opacity-20" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Confirmed</p>
                      <p className="text-3xl text-green-600">{bookingStatistics.confirmed}</p>
                    </div>
                    <CheckCircle className="w-10 h-10 text-green-600 opacity-20" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Cancelled</p>
                      <p className="text-3xl text-red-600">{bookingStatistics.cancelled}</p>
                    </div>
                    <AlertCircle className="w-10 h-10 text-red-600 opacity-20" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Terbaru</CardTitle>
                <CardDescription>Daftar booking terbaru yang masuk</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Penyewa</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Jumlah</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookingStatistics.recentBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.id}</TableCell>
                        <TableCell>{booking.tenant}</TableCell>
                        <TableCell>{booking.unit}</TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>{booking.amount}</TableCell>
                        <TableCell>
                          <Badge className={
                            booking.status === "Pending" ? "bg-yellow-500" :
                            booking.status === "Confirmed" ? "bg-green-500" : "bg-red-500"
                          }>
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => onNavigate("admin-booking-detail", { booking })}
                          >
                            Detail
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (detailType) {
      case "units": return "Detail Statistik Unit";
      case "users": return "Detail Statistik Pengguna";
      case "revenue": return "Detail Pendapatan";
      case "bookings": return "Detail Booking";
      default: return "Detail";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-background">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate("admin")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1>{getTitle()}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {renderDetailContent()}
      </div>
    </div>
  );
}
