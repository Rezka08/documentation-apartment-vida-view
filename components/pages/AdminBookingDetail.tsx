import { ArrowLeft, User, Home, Calendar, DollarSign, FileText, CheckCircle, XCircle, Clock, Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { toast } from "sonner@2.0.3";

interface AdminBookingDetailProps {
  onNavigate: (page: string, data?: any) => void;
  bookingData?: any;
}

export function AdminBookingDetail({ onNavigate, bookingData }: AdminBookingDetailProps) {
  // Mock data if not provided
  const booking = bookingData || {
    id: "BK-2025-045",
    tenant: {
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+62 812-3456-7890",
      address: "Jl. Sudirman No. 123, Jakarta",
      idNumber: "3171234567890123"
    },
    unit: {
      name: "Studio Premium A-201",
      building: "Tower A",
      floor: 2,
      type: "Studio",
      size: "35 m²"
    },
    dates: {
      bookingDate: "2025-10-08 14:30",
      checkIn: "2025-11-01",
      checkOut: "2026-10-31",
      duration: "12 bulan"
    },
    payment: {
      monthlyRent: 5500000,
      deposit: 11000000,
      utilityDeposit: 1000000,
      adminFee: 500000,
      total: 18000000,
      method: "Transfer Bank",
      status: "Pending"
    },
    status: "Pending",
    notes: "Membutuhkan konfirmasi segera untuk mulai kontrak awal November"
  };

  const handleApprove = () => {
    toast.success(`Booking ${booking.id} telah disetujui`);
    // In real app, update status in backend
  };

  const handleReject = () => {
    toast.error(`Booking ${booking.id} telah ditolak`);
    // In real app, update status in backend
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { className: string; icon: any }> = {
      "Pending": { className: "bg-yellow-500", icon: Clock },
      "Confirmed": { className: "bg-green-500", icon: CheckCircle },
      "Cancelled": { className: "bg-red-500", icon: XCircle },
    };
    const { className, icon: Icon } = config[status] || { className: "bg-gray-500", icon: Clock };
    return (
      <Badge className={className}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </Badge>
    );
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
                onClick={() => onNavigate("admin")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1>Detail Booking</h1>
                <p className="text-sm text-muted-foreground">Booking ID: {booking.id}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {booking.status === "Pending" && (
                <>
                  <Button variant="outline" className="text-red-600 border-red-600" onClick={handleReject}>
                    <XCircle className="mr-2 h-4 w-4" />
                    Tolak
                  </Button>
                  <Button onClick={handleApprove}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Setujui
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Status Booking</CardTitle>
                  {getStatusBadge(booking.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Tanggal Booking</p>
                    <p className="text-sm">{booking.dates.bookingDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Check-in</p>
                    <p className="text-sm">{booking.dates.checkIn}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Check-out</p>
                    <p className="text-sm">{booking.dates.checkOut}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Durasi</p>
                    <p className="text-sm">{booking.dates.duration}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tenant Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Informasi Penyewa
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {booking.tenant?.name?.charAt(0) || "T"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="mb-2">{booking.tenant?.name || "Unknown"}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        {booking.tenant?.email || "N/A"}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        {booking.tenant?.phone || "N/A"}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                        <MapPin className="w-4 h-4" />
                        {booking.tenant?.address || "N/A"}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <FileText className="w-4 h-4" />
                        NIK: {booking.tenant?.idNumber || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Unit Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Informasi Unit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Nama Unit</p>
                    <p className="text-lg">{booking.unit?.name || "Unknown Unit"}</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Gedung</p>
                      <p className="text-sm">{booking.unit?.building || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Lantai</p>
                      <p className="text-sm">{booking.unit?.floor || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Tipe</p>
                      <p className="text-sm">{booking.unit?.type || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Luas</p>
                      <p className="text-sm">{booking.unit?.size || "N/A"}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => onNavigate("admin-unit-detail", { unit: booking.unit })}>
                    Lihat Detail Unit
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            {booking.notes && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Catatan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{booking.notes}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Payment Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Rincian Pembayaran
                </CardTitle>
                <CardDescription>Detail biaya dan pembayaran</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sewa Bulanan</span>
                  <span>Rp {(booking.payment?.monthlyRent || 0).toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Deposit (2x)</span>
                  <span>Rp {(booking.payment?.deposit || 0).toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Deposit Utilitas</span>
                  <span>Rp {(booking.payment?.utilityDeposit || 0).toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Biaya Admin</span>
                  <span>Rp {(booking.payment?.adminFee || 0).toLocaleString('id-ID')}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="text-lg">Rp {(booking.payment?.total || 0).toLocaleString('id-ID')}</span>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Metode Pembayaran</span>
                    <Badge variant="outline">{booking.payment?.method || "N/A"}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status Pembayaran</span>
                    <Badge className={booking.payment?.status === "Pending" ? "bg-yellow-500" : "bg-green-500"}>
                      {booking.payment?.status || "N/A"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Aksi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Download Kontrak
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Lihat Invoice
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="mr-2 h-4 w-4" />
                  Kirim Email ke Penyewa
                </Button>
                <Separator className="my-4" />
                <Button variant="destructive" className="w-full">
                  Batalkan Booking
                </Button>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm">Booking Dibuat</p>
                      <p className="text-xs text-muted-foreground">{booking.dates.bookingDate}</p>
                    </div>
                  </div>
                  {booking.status === "Confirmed" && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm">Booking Disetujui</p>
                        <p className="text-xs text-muted-foreground">2025-10-08 16:45</p>
                      </div>
                    </div>
                  )}
                  {booking.status === "Pending" && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm">Menunggu Persetujuan</p>
                        <p className="text-xs text-muted-foreground">Pending</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
