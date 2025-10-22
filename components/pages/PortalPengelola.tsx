import { Building2, Calendar, DollarSign, TrendingUp, Users, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Calendar as CalendarComponent } from "../ui/calendar";

interface PortalPengelolaProps {
  onNavigate: (page: string) => void;
  onLogout?: () => void;
}

export function PortalPengelola({ onNavigate, onLogout }: PortalPengelolaProps) {
  const stats = [
    { icon: Building2, label: "Unit Dikelola", value: "25", color: "text-blue-600", bgColor: "bg-blue-100" },
    { icon: Users, label: "Total Penyewa", value: "20", color: "text-green-600", bgColor: "bg-green-100" },
    { icon: Calendar, label: "Booking Bulan Ini", value: "8", color: "text-purple-600", bgColor: "bg-purple-100" },
    { icon: DollarSign, label: "Pendapatan Bulan Ini", value: "Rp 120M", color: "text-orange-600", bgColor: "bg-orange-100" },
  ];

  const myUnits = [
    { id: "U101", name: "Studio Modern A", floor: "8", status: "occupied", tenant: "Budi Santoso", rent: "Rp 3.5M" },
    { id: "U102", name: "Deluxe 1BR", floor: "12", status: "available", tenant: "-", rent: "Rp 5M" },
    { id: "U203", name: "Family Suite 2BR", floor: "15", status: "occupied", tenant: "Siti Aminah", rent: "Rp 7.5M" },
    { id: "U204", name: "Premium 2BR", floor: "18", status: "maintenance", tenant: "-", rent: "Rp 9M" },
  ];

  const bookings = [
    { id: "BK101", unit: "U102", tenant: "Andi Wijaya", checkIn: "2025-11-15", duration: "6 bulan", status: "pending" },
    { id: "BK102", unit: "U105", tenant: "Rina Kusuma", checkIn: "2025-11-20", duration: "12 bulan", status: "confirmed" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-white text-green-600">DP</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl mb-1">Portal Pengelola</h1>
                <p className="text-green-200">Selamat datang, Deddy Prasetyo</p>
              </div>
            </div>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                      <Icon className={stat.color} size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p className="text-2xl">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="units">Unit Saya</TabsTrigger>
            <TabsTrigger value="bookings">Booking</TabsTrigger>
            <TabsTrigger value="finance">Keuangan</TabsTrigger>
            <TabsTrigger value="settings">Pengaturan</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Occupancy Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Tingkat Okupansi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Unit Terisi</span>
                        <span>80%</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-600 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center pt-4">
                      <div>
                        <p className="text-2xl text-green-600">20</p>
                        <p className="text-sm text-gray-600">Terisi</p>
                      </div>
                      <div>
                        <p className="text-2xl text-blue-600">4</p>
                        <p className="text-sm text-gray-600">Tersedia</p>
                      </div>
                      <div>
                        <p className="text-2xl text-yellow-600">1</p>
                        <p className="text-sm text-gray-600">Maintenance</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Ringkasan Pendapatan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Bulan Ini</span>
                      <span className="text-green-600">Rp 120.000.000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Bulan Lalu</span>
                      <span>Rp 115.000.000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Tahun Ini</span>
                      <span>Rp 1.200.000.000</span>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex items-center gap-2 text-green-600">
                        <TrendingUp size={20} />
                        <span>+4.3% dari bulan lalu</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Terbaru</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Penyewa</TableHead>
                      <TableHead>Check-in</TableHead>
                      <TableHead>Durasi</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.id}</TableCell>
                        <TableCell>{booking.unit}</TableCell>
                        <TableCell>{booking.tenant}</TableCell>
                        <TableCell>{booking.checkIn}</TableCell>
                        <TableCell>{booking.duration}</TableCell>
                        <TableCell>
                          <Badge className={booking.status === "confirmed" ? "bg-green-500" : "bg-yellow-500"}>
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => onNavigate("pengelola-booking-approval", booking)}
                          >
                            {booking.status === "pending" ? "Approve" : "Detail"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="units">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Daftar Unit yang Dikelola</CardTitle>
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => onNavigate("pengelola-unit-edit")}
                  >
                    Tambah Unit
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID Unit</TableHead>
                      <TableHead>Nama</TableHead>
                      <TableHead>Lantai</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Penyewa</TableHead>
                      <TableHead>Harga Sewa</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myUnits.map((unit) => (
                      <TableRow key={unit.id}>
                        <TableCell>{unit.id}</TableCell>
                        <TableCell>{unit.name}</TableCell>
                        <TableCell>Lantai {unit.floor}</TableCell>
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
                        <TableCell>{unit.tenant}</TableCell>
                        <TableCell>{unit.rent}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => onNavigate("pengelola-unit-edit", unit)}
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => onNavigate("pengelola-unit-detail", unit)}
                            >
                              Detail
                            </Button>
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
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Manajemen Booking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Unit</TableHead>
                          <TableHead>Penyewa</TableHead>
                          <TableHead>Check-in</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bookings.map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell>{booking.id}</TableCell>
                            <TableCell>{booking.unit}</TableCell>
                            <TableCell>{booking.tenant}</TableCell>
                            <TableCell>{booking.checkIn}</TableCell>
                            <TableCell>
                              <Badge className={booking.status === "confirmed" ? "bg-green-500" : "bg-yellow-500"}>
                                {booking.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                {booking.status === "pending" ? (
                                  <>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => onNavigate("pengelola-booking-approval", booking)}
                                    >
                                      Review
                                    </Button>
                                  </>
                                ) : (
                                  <Button variant="ghost" size="sm">Detail</Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Kalender Ketersediaan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CalendarComponent mode="single" className="rounded-md border" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="finance">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Laporan Keuangan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-600">Pendapatan Bulan Ini</p>
                        <p className="text-2xl text-green-600">Rp 120.000.000</p>
                      </div>
                      <TrendingUp className="text-green-600" size={32} />
                    </div>
                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-600">Total Terbayar</p>
                        <p className="text-2xl text-blue-600">Rp 118.000.000</p>
                      </div>
                      <DollarSign className="text-blue-600" size={32} />
                    </div>
                    <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-600">Pending</p>
                        <p className="text-2xl text-yellow-600">Rp 2.000.000</p>
                      </div>
                      <Calendar className="text-yellow-600" size={32} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pricing Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p>Studio Modern A</p>
                        <p className="text-sm text-gray-600">Rp 3.500.000/bulan</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onNavigate("pengelola-finance-edit", { unit: "Studio Modern A" })}
                      >
                        Edit
                      </Button>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p>Deluxe 1BR</p>
                        <p className="text-sm text-gray-600">Rp 5.000.000/bulan</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onNavigate("pengelola-finance-edit", { unit: "Deluxe 1BR" })}
                      >
                        Edit
                      </Button>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p>Family Suite 2BR</p>
                        <p className="text-sm text-gray-600">Rp 7.500.000/bulan</p>
                      </div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Profil & Pengaturan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="w-24 h-24">
                      <AvatarFallback className="bg-green-600 text-white text-2xl">DP</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="mb-1">Deddy Prasetyo</h3>
                      <p className="text-gray-600">deddy.prasetyo@email.com</p>
                      <p className="text-gray-600">+62 811 2233 4455</p>
                      <Badge className="bg-green-600 mt-2">Pengelola Terverifikasi</Badge>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button variant="outline">
                      <Settings className="mr-2" size={16} />
                      Edit Profil
                    </Button>
                    <Button variant="outline">Ubah Password</Button>
                    <Button variant="outline">Notifikasi</Button>
                    <Button variant="outline">Preferensi</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
