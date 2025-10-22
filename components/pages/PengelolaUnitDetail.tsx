import { ArrowLeft, Edit, Home, Users, DollarSign, Calendar, TrendingUp, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";

interface PengelolaUnitDetailProps {
  onNavigate: (page: string, data?: any) => void;
  unitData?: any;
}

export function PengelolaUnitDetail({ onNavigate, unitData }: PengelolaUnitDetailProps) {
  const unit = unitData || {
    id: "U101",
    name: "Studio Modern A-801",
    building: "Tower A",
    floor: 8,
    type: "Studio",
    size: "35 m²",
    bedrooms: 1,
    bathrooms: 1,
    price: 5500000,
    status: "occupied",
    facilities: ["AC", "Water Heater", "Kitchen Set", "Balcony", "WiFi"],
    currentTenant: {
      name: "Budi Santoso",
      email: "budi@example.com",
      phone: "+62 812-3456-7890",
      startDate: "2024-06-01",
      endDate: "2025-06-01",
      monthlyRent: 5500000,
      depositPaid: 11000000
    },
    financials: {
      totalEarned: 60500000,
      currentMonthIncome: 5500000,
      occupancyRate: 95,
      avgRating: 4.8
    },
    rentalHistory: [
      { tenant: "Ahmad Yani", period: "2023-01-01 s/d 2024-05-31", totalPaid: 82500000 },
      { tenant: "Budi Santoso", period: "2024-06-01 s/d Sekarang", totalPaid: 60500000 }
    ],
    maintenanceHistory: [
      { date: "2025-09-15", issue: "AC Service", cost: 500000, status: "Selesai" },
      { date: "2025-07-20", issue: "Perbaikan Wastafel", cost: 350000, status: "Selesai" }
    ]
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { label: string; className: string }> = {
      occupied: { label: "Terisi", className: "bg-blue-500" },
      available: { label: "Tersedia", className: "bg-green-500" },
      maintenance: { label: "Maintenance", className: "bg-yellow-500" }
    };
    const { label, className } = config[status] || { label: status, className: "bg-gray-500" };
    return <Badge className={className}>{label}</Badge>;
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
                onClick={() => onNavigate("portal-pengelola")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1>{unit.name}</h1>
                <p className="text-sm text-muted-foreground">{unit.building} - Lantai {unit.floor}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => onNavigate("pengelola-unit-edit", unit)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Unit
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
            {/* Unit Details */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Detail Unit</CardTitle>
                  {getStatusBadge(unit.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
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

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Fasilitas</p>
                  <div className="flex flex-wrap gap-2">
                    {unit.facilities.map((facility: string) => (
                      <Badge key={facility} variant="outline">{facility}</Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Harga Sewa/Bulan</p>
                    <p className="text-2xl">Rp {unit.price.toLocaleString('id-ID')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Rating Penyewa</p>
                    <p className="text-2xl">⭐ {unit.financials.avgRating}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Tenant */}
            {unit.status === "occupied" && unit.currentTenant && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Penyewa Saat Ini
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Nama</p>
                      <p>{unit.currentTenant.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <p className="text-sm">{unit.currentTenant.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Telepon</p>
                      <p className="text-sm">{unit.currentTenant.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Sewa Bulanan</p>
                      <p>Rp {unit.currentTenant.monthlyRent.toLocaleString('id-ID')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Mulai Kontrak</p>
                      <p>{unit.currentTenant.startDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Akhir Kontrak</p>
                      <p>{unit.currentTenant.endDate}</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Deposit Dibayar</p>
                    <p className="text-lg">Rp {unit.currentTenant.depositPaid.toLocaleString('id-ID')}</p>
                  </div>
                </CardContent>
              </Card>
            )}

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
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {unit.rentalHistory.map((rental: any, idx: number) => (
                      <TableRow key={idx}>
                        <TableCell>{rental.tenant}</TableCell>
                        <TableCell>{rental.period}</TableCell>
                        <TableCell>Rp {rental.totalPaid.toLocaleString('id-ID')}</TableCell>
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
                      <TableHead>Biaya</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {unit.maintenanceHistory.map((maintenance: any, idx: number) => (
                      <TableRow key={idx}>
                        <TableCell>{maintenance.date}</TableCell>
                        <TableCell>{maintenance.issue}</TableCell>
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Financial Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Ringkasan Keuangan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Pendapatan</p>
                  <p className="text-2xl">Rp {(unit.financials.totalEarned / 1000000).toFixed(1)}jt</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Pendapatan Bulan Ini</p>
                  <p className="text-xl">Rp {(unit.financials.currentMonthIncome / 1000000).toFixed(1)}jt</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Occupancy Rate</p>
                  <Progress value={unit.financials.occupancyRate} className="mb-2" />
                  <p className="text-sm">{unit.financials.occupancyRate}%</p>
                </div>
              </CardContent>
            </Card>

            {/* Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Performa Unit
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Rating Penyewa</span>
                  <span className="text-lg">⭐ {unit.financials.avgRating}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Lama Okupansi</span>
                  <span className="text-lg">18 bulan</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Biaya Maintenance</span>
                  <span className="text-lg">Rp 850K</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Aksi Cepat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate("pengelola-unit-edit", unit)}>
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
                <Separator className="my-2" />
                <Button variant="destructive" className="w-full">
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
