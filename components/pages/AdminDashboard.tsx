import { LayoutDashboard, Building2, Users, FileText, TrendingUp, DollarSign, Calendar, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
  onLogout?: () => void;
}

export function AdminDashboard({ onNavigate, onLogout }: AdminDashboardProps) {
  const stats = [
    { icon: Building2, label: "Total Unit", value: "120", change: "+5", color: "text-blue-600", bgColor: "bg-blue-100" },
    { icon: Users, label: "Total Penyewa", value: "95", change: "+12", color: "text-green-600", bgColor: "bg-green-100" },
    { icon: Calendar, label: "Unit Tersedia", value: "25", change: "-3", color: "text-purple-600", bgColor: "bg-purple-100" },
    { icon: DollarSign, label: "Pendapatan Bulan Ini", value: "Rp 475M", change: "+8%", color: "text-orange-600", bgColor: "bg-orange-100" },
  ];

  const recentBookings = [
    { id: "BK001", tenant: "Budi Santoso", unit: "Studio Modern A", date: "2025-10-08", status: "confirmed" },
    { id: "BK002", tenant: "Siti Aminah", unit: "Deluxe 1BR", date: "2025-10-07", status: "pending" },
    { id: "BK003", tenant: "Andi Wijaya", unit: "Family Suite 2BR", date: "2025-10-06", status: "confirmed" },
    { id: "BK004", tenant: "Rina Kusuma", unit: "Premium 2BR", date: "2025-10-05", status: "cancelled" },
  ];

  const units = [
    { id: "U001", name: "Studio Modern A", type: "Studio", status: "occupied", price: "Rp 3.5M" },
    { id: "U002", name: "Deluxe 1BR", type: "1 BR", status: "available", price: "Rp 5M" },
    { id: "U003", name: "Family Suite 2BR", type: "2 BR", status: "occupied", price: "Rp 7.5M" },
    { id: "U004", name: "Premium 2BR", type: "2 BR", status: "maintenance", price: "Rp 9M" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl mb-2">Admin Dashboard</h1>
              <p className="text-purple-200">Selamat datang, Admin</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="secondary"
                onClick={() => onNavigate("admin-crud")}
              >
                Kelola Data
              </Button>
              <Button 
                variant="outline"
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => onLogout ? onLogout() : onNavigate("beranda")}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const detailTypes = ["units", "users", "units", "revenue"];
            return (
              <Card 
                key={index} 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => onNavigate("admin-dashboard-detail", { detailType: detailTypes[index] })}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                      <Icon className={stat.color} size={24} />
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {stat.change}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl">{stat.value}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">
              <LayoutDashboard className="mr-2" size={16} />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="units">
              <Building2 className="mr-2" size={16} />
              Manajemen Unit
            </TabsTrigger>
            <TabsTrigger value="bookings">
              <Calendar className="mr-2" size={16} />
              Booking
            </TabsTrigger>
            <TabsTrigger value="reports">
              <FileText className="mr-2" size={16} />
              Laporan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Terbaru</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID Booking</TableHead>
                      <TableHead>Penyewa</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.id}</TableCell>
                        <TableCell>{booking.tenant}</TableCell>
                        <TableCell>{booking.unit}</TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>
                          <Badge 
                            className={
                              booking.status === "confirmed" ? "bg-green-500" :
                              booking.status === "pending" ? "bg-yellow-500" :
                              "bg-red-500"
                            }
                          >
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
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

            {/* Quick Stats */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tingkat Okupansi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Total Terisi</span>
                        <span>79%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-600 rounded-full" style={{ width: '79%' }}></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl text-purple-600">95</p>
                        <p className="text-sm text-gray-600">Terisi</p>
                      </div>
                      <div>
                        <p className="text-2xl text-green-600">25</p>
                        <p className="text-sm text-gray-600">Tersedia</p>
                      </div>
                      <div>
                        <p className="text-2xl text-gray-600">0</p>
                        <p className="text-sm text-gray-600">Maintenance</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pendapatan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Bulan Ini</span>
                      <span className="text-purple-600">Rp 475.000.000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Bulan Lalu</span>
                      <span>Rp 440.000.000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Tahun Ini</span>
                      <span>Rp 4.500.000.000</span>
                    </div>
                    <div className="pt-3 border-t">
                      <div className="flex items-center gap-2 text-green-600">
                        <TrendingUp size={20} />
                        <span>+8% dari bulan lalu</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="units">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Daftar Unit</CardTitle>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Package className="mr-2" size={16} />
                    Tambah Unit
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID Unit</TableHead>
                      <TableHead>Nama Unit</TableHead>
                      <TableHead>Tipe</TableHead>
                      <TableHead>Harga</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {units.map((unit) => (
                      <TableRow key={unit.id}>
                        <TableCell>{unit.id}</TableCell>
                        <TableCell>{unit.name}</TableCell>
                        <TableCell>{unit.type}</TableCell>
                        <TableCell>{unit.price}</TableCell>
                        <TableCell>
                          <Badge 
                            className={
                              unit.status === "available" ? "bg-green-500" :
                              unit.status === "occupied" ? "bg-blue-500" :
                              "bg-yellow-500"
                            }
                          >
                            {unit.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => onNavigate("admin-unit-detail", unit)}
                            >
                              Detail
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => onNavigate("admin-unit-edit", unit)}
                            >
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">Hapus</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Manajemen Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Penyewa</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Check-in</TableHead>
                      <TableHead>Durasi</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>BK001</TableCell>
                      <TableCell>Budi Santoso</TableCell>
                      <TableCell>Studio Modern A</TableCell>
                      <TableCell>2025-11-01</TableCell>
                      <TableCell>12 bulan</TableCell>
                      <TableCell>Rp 42.000.000</TableCell>
                      <TableCell><Badge className="bg-green-500">Active</Badge></TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Detail</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Laporan Keuangan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => onNavigate("admin-finance-report")}
                    >
                      <FileText className="mr-2" size={16} />
                      Laporan Lengkap
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => onNavigate("admin-finance-report")}
                    >
                      <FileText className="mr-2" size={16} />
                      Laporan Pendapatan Bulanan
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => onNavigate("admin-finance-report")}
                    >
                      <FileText className="mr-2" size={16} />
                      Laporan Tunggakan
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => onNavigate("admin-finance-report")}
                    >
                      <FileText className="mr-2" size={16} />
                      Laporan Tahunan
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Laporan Operasional</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => onNavigate("admin-finance-report")}
                    >
                      <FileText className="mr-2" size={16} />
                      Laporan Okupansi
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => onNavigate("admin-finance-report")}
                    >
                      <FileText className="mr-2" size={16} />
                      Laporan Maintenance
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => onNavigate("admin-finance-report")}
                    >
                      <FileText className="mr-2" size={16} />
                      Laporan Penyewa
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
