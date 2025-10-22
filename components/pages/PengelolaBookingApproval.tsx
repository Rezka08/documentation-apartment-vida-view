import { ArrowLeft, CheckCircle, XCircle, User, Home, Calendar, DollarSign, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { toast } from "sonner@2.0.3";
import { useState } from "react";

interface PengelolaBookingApprovalProps {
  onNavigate: (page: string, data?: any) => void;
  bookingData?: any;
}

export function PengelolaBookingApproval({ onNavigate, bookingData }: PengelolaBookingApprovalProps) {
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);

  const booking = bookingData || {
    id: "BK-2025-045",
    tenant: {
      name: "Andi Wijaya",
      email: "andi@example.com",
      phone: "+62 812-9876-5432"
    },
    unit: {
      name: "Studio Modern A-801",
      building: "Tower A",
      floor: 8
    },
    dates: {
      checkIn: "2025-11-15",
      checkOut: "2026-05-15",
      duration: "6 bulan"
    },
    payment: {
      monthlyRent: 5500000,
      deposit: 11000000,
      total: 16500000
    },
    status: "pending"
  };

  const handleApprove = () => {
    toast.success(`Booking ${booking.id} telah disetujui`);
    onNavigate("portal-pengelola");
  };

  const handleReject = () => {
    if (!rejectionReason) {
      toast.error("Mohon berikan alasan penolakan");
      return;
    }
    toast.error(`Booking ${booking.id} telah ditolak`);
    onNavigate("portal-pengelola");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-background">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => onNavigate("portal-pengelola")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1>Persetujuan Booking</h1>
              <p className="text-sm text-muted-foreground">Booking ID: {booking.id}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Alert */}
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="mb-1">Permintaan booking baru memerlukan persetujuan Anda</p>
                <p className="text-sm text-muted-foreground">
                  Harap tinjau detail booking di bawah sebelum menyetujui atau menolak
                </p>
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
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {booking.tenant?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="mb-1">{booking.tenant?.name || "Unknown"}</h3>
                  <p className="text-sm text-muted-foreground">{booking.tenant?.email || "N/A"}</p>
                  <p className="text-sm text-muted-foreground">{booking.tenant?.phone || "N/A"}</p>
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
              <div className="space-y-2">
                <p className="text-lg">{booking.unit?.name || "Unknown Unit"}</p>
                <p className="text-sm text-muted-foreground">
                  {booking.unit?.building || "N/A"} - Lantai {booking.unit?.floor || "N/A"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Booking Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Detail Booking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Check-in</p>
                  <p>{booking.dates?.checkIn || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Check-out</p>
                  <p>{booking.dates?.checkOut || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Durasi</p>
                  <p>{booking.dates?.duration || "N/A"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Informasi Pembayaran
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sewa Bulanan</span>
                <span>Rp {(booking.payment?.monthlyRent || 0).toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Deposit (2x)</span>
                <span>Rp {(booking.payment?.deposit || 0).toLocaleString('id-ID')}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>Total Pembayaran Awal</span>
                <span className="text-lg">Rp {(booking.payment?.total || 0).toLocaleString('id-ID')}</span>
              </div>
              <Separator />
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-900">
                  <strong>Pendapatan Anda:</strong> Rp {((booking.payment?.monthlyRent || 0) * 6).toLocaleString('id-ID')} untuk 6 bulan pertama
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Reject Form */}
          {showRejectForm && (
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600">Alasan Penolakan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="reason">Berikan alasan penolakan booking ini</Label>
                  <Textarea
                    id="reason"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Contoh: Unit sudah dibooking oleh penyewa lain, perbaikan sedang dilakukan, dll."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end">
            {!showRejectForm ? (
              <>
                <Button
                  variant="outline"
                  className="text-red-600 border-red-600"
                  onClick={() => setShowRejectForm(true)}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Tolak Booking
                </Button>
                <Button onClick={handleApprove} size="lg">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Setujui Booking
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setShowRejectForm(false)}>
                  Batal
                </Button>
                <Button variant="destructive" onClick={handleReject}>
                  <XCircle className="mr-2 h-4 w-4" />
                  Konfirmasi Penolakan
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
