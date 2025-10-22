import { ArrowLeft, Edit, Trash2, Home, Users, DollarSign, Calendar, TrendingUp, AlertCircle, Eye, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { toast } from "sonner@2.0.3";

interface AdminUnitDetailProps {
  onNavigate: (page: string, data?: any) => void;
  unitData?: any;
}

export function AdminUnitDetail({ onNavigate, unitData }: AdminUnitDetailProps) {
  const unit = unitData || {
    id: "U-001",
    name: "Studio Premium A-801",
    building: "Tower A",
    floor: 8,
    unitNumber: "801",
    type: "Studio",
    size: "35 m²",
    bedrooms: 1,
    bathrooms: 1,
    price: 5500000,
    status: "occupied",
    furnishStatus: "Fully Furnished",
    viewDirection: "Timur",
    facilities: ["AC", "Water Heater", "Kitchen Set", "Balcony", "WiFi", "TV Cable", "Refrigerator"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"
    ],
    currentTenant: {
      name: "Budi Santoso",
      email: "budi@example.com",
      phone: "+62 812-3456-7890",
      startDate: "2024-06-01",
      endDate: "2025-06-01",
      monthlyRent: 5500000,
      depositPaid: 11000000,
      status: "Active"
    },
    owner: {
      name: "Deddy Prasetyo",
      email: "deddy@example.com",
      phone: "+62 821-9876-5432"
    },
    financials: {
      totalEarned: 82500000,
      currentMonthIncome: 5500000,
      outstandingPayments: 0,
      occupancyRate: 95,
      avgRating: 4.8,
      totalViews: 245,
      totalInquiries: 32
    },
    rentalHistory: [
      { 
        tenant: "Ahmad Yani", 
        period: "2023-01-01 s/d 2024-05-31", 
        totalPaid: 82500000,
        rating: 4.5,
        status: "Completed" 
      },
      { 
        tenant: "Budi Santoso", 
        period: "2024-06-01 s/d Sekarang", 
        totalPaid: 60500000,
        rating: 4.8,
        status: "Active" 
      }
    ],
    maintenanceHistory: [
      { date: "2025-09-15", issue: "AC Service", cost: 500000, status: "Selesai", technician: "PT Sejuk AC" },
      { date: "2025-07-20", issue: "Perbaikan Wastafel", cost: 350000, status: "Selesai", technician: "Tukang Plumbing" },
      { date: "2025-05-10", issue: "Cat Dinding", cost: 1200000, status: "Selesai", technician: "CV Cat Indah" }
    ],
    bookingHistory: [
      { id: "BK-045", tenant: "Sarah Johnson", date: "2025-10-08", status: "Pending", amount: 16500000 },
      { id: "BK-032", tenant: "Michael Chen", date: "2025-09-15", status: "Cancelled", amount: 16500000 }
    ],
    specifications: {
      electricity: "2200 Watt",
      waterSource: "PDAM",
      parking: "1 Mobil + 1 Motor",
      balcony: true,
      petFriendly: false,
      smoking: false
    }
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { label: string; className: string; icon: any }> = {
      occupied: { label: "Terisi", className: "bg-blue-500", icon: Users },
      available: { label: "Tersedia", className: "bg-green-500", icon: CheckCircle },
      maintenance: { label: "Maintenance", className: "bg-yellow-500", icon: AlertCircle }
    };
    const { label, className, icon: Icon } = config[status] || { label: status, className: "bg-gray-500", icon: Clock };
    return (
      <Badge className={className}>
        <Icon className="w-3 h-3 mr-1" />
        {label}
      </Badge>
    );
  };

  const handleEdit = () => {
    onNavigate("admin-unit-edit", unit);
  };

  const handleDelete = () => {
    if (confirm(`Apakah Anda yakin ingin menghapus unit ${unit.name}?`)) {
      toast.success(`Unit ${unit.name} berhasil dihapus`);
      onNavigate("admin-crud");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-background">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onNavigate("admin-crud")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1>{unit.name}</h1>
                <p className="text-sm text-muted-foreground">{unit.building} - Lantai {unit.floor} - Unit {unit.unitNumber}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                Hapus
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="grid grid-cols-3 gap-2 p-4">
                  {unit.images?.map((img: string, idx: number) => (
                    <div key={idx} className="aspect-video rounded-lg overflow-hidden">
                      <img src={img} alt={`Unit ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Unit Details */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Detail Unit</CardTitle>
                  {getStatusBadge(unit.status)}
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="info">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="info">Informasi</TabsTrigger>
                    <TabsTrigger value="tenant">Penyewa</TabsTrigger>
                    <TabsTrigger value="owner">Pemilik</TabsTrigger>
                  </TabsList>

                  <TabsContent value="info" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Tipe</p>
                        <p>{unit.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Luas</p>
                        <p>{unit.size}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Kamar Tidur</p>
                        <p>{unit.bedrooms}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Kamar Mandi</p>
                        <p>{unit.bathrooms}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Furnish Status</p>
                        <p>{unit.furnishStatus}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">View Direction</p>
                        <p>{unit.viewDirection}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Listrik</p>
                        <p>{unit.specifications.electricity}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Parkir</p>
                        <p>{unit.specifications.parking}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Pet Friendly</p>
                        <p>{unit.specifications.petFriendly ? "Ya" : "Tidak"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Smoking</p>
                        <p>{unit.specifications.smoking ? "Diperbolehkan" : "Tidak"}</p>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Fasilitas</p>
                      <div className="flex flex-wrap gap-2">
                        {unit.facilities.map((facility: string) => (
                          <Badge key={facility} variant="outline">{facility}</Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="tenant" className="space-y-4 mt-4">
                    {unit.status === "occupied" && unit.currentTenant ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-16 h-16">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {unit.currentTenant.name?.charAt(0) || "T"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3>{unit.currentTenant.name}</h3>
                            <p className="text-sm text-muted-foreground">{unit.currentTenant.email}</p>
                            <p className="text-sm text-muted-foreground">{unit.currentTenant.phone}</p>
                          </div>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Mulai Kontrak</p>
                            <p>{unit.currentTenant.startDate}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Akhir Kontrak</p>
                            <p>{unit.currentTenant.endDate}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Sewa Bulanan</p>
                            <p>Rp {unit.currentTenant.monthlyRent.toLocaleString('id-ID')}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Deposit</p>
                            <p>Rp {unit.currentTenant.depositPaid.toLocaleString('id-ID')}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Users className="w-12 h-12 mx-auto mb-2 opacity-20" />
                        <p>Unit ini belum disewa</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="owner" className="space-y-4 mt-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarFallback className="bg-green-600 text-white">
                          {unit.owner.name?.charAt(0) || "O"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3>{unit.owner.name}</h3>
                        <p className="text-sm text-muted-foreground">{unit.owner.email}</p>
                        <p className="text-sm text-muted-foreground">{unit.owner.phone}</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Rental History */}
            <Card>
              <CardHeader>
                <CardTitle>Riwayat Sewa</CardTitle>
                <CardDescription>Histori penyewaan unit ini</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Penyewa</TableHead>
                      <TableHead>Periode</TableHead>
                      <TableHead>Total Pembayaran</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {unit.rentalHistory.map((rental: any, idx: number) => (
                      <TableRow key={idx}>
                        <TableCell>{rental.tenant}</TableCell>
                        <TableCell>{rental.period}</TableCell>
                        <TableCell>Rp {rental.totalPaid.toLocaleString('id-ID')}</TableCell>
                        <TableCell>⭐ {rental.rating}</TableCell>
                        <TableCell>
                          <Badge className={rental.status === "Active" ? "bg-green-500" : "bg-gray-500"}>
                            {rental.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Maintenance History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Riwayat Maintenance
                </CardTitle>
                <CardDescription>Histori perbaikan dan perawatan</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Perbaikan</TableHead>
                      <TableHead>Teknisi</TableHead>
                      <TableHead>Biaya</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {unit.maintenanceHistory.map((maintenance: any, idx: number) => (
                      <TableRow key={idx}>
                        <TableCell>{maintenance.date}</TableCell>
                        <TableCell>{maintenance.issue}</TableCell>
                        <TableCell className="text-sm">{maintenance.technician}</TableCell>
                        <TableCell>Rp {maintenance.cost.toLocaleString('id-ID')}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500">{maintenance.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Booking History */}
            <Card>
              <CardHeader>
                <CardTitle>Riwayat Booking</CardTitle>
                <CardDescription>Histori booking untuk unit ini</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Penyewa</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Jumlah</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {unit.bookingHistory.map((booking: any) => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.id}</TableCell>
                        <TableCell>{booking.tenant}</TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>Rp {booking.amount.toLocaleString('id-ID')}</TableCell>
                        <TableCell>
                          <Badge className={booking.status === "Pending" ? "bg-yellow-500" : "bg-red-500"}>
                            {booking.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Harga & Keuangan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Harga Sewa/Bulan</p>
                  <p className="text-3xl">Rp {(unit.price / 1000000).toFixed(1)}jt</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Pendapatan</p>
                  <p className="text-xl">Rp {(unit.financials.totalEarned / 1000000).toFixed(1)}jt</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Bulan Ini</p>
                  <p className="text-lg">Rp {(unit.financials.currentMonthIncome / 1000000).toFixed(1)}jt</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Outstanding</p>
                  <p className="text-lg">Rp {unit.financials.outstandingPayments.toLocaleString('id-ID')}</p>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Performa Unit
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Occupancy Rate</span>
                    <span className="text-sm">{unit.financials.occupancyRate}%</span>
                  </div>
                  <Progress value={unit.financials.occupancyRate} />
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Rating Penyewa</span>
                  <span className="text-lg">⭐ {unit.financials.avgRating}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Views</span>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                    <span className="text-lg">{unit.financials.totalViews}</span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Inquiries</span>
                  <span className="text-lg">{unit.financials.totalInquiries}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Aksi Cepat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={handleEdit}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Detail Unit
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Atur Ketersediaan
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Ubah Harga
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Request Maintenance
                </Button>
                <Separator className="my-2" />
                <Button variant="destructive" className="w-full" onClick={handleDelete}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Hapus Unit
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
