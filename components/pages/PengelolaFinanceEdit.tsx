import { useState } from "react";
import { ArrowLeft, Save, DollarSign, TrendingUp, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner@2.0.3";

interface PengelolaFinanceEditProps {
  onNavigate: (page: string, data?: any) => void;
  financeData?: any;
}

export function PengelolaFinanceEdit({ onNavigate, financeData }: PengelolaFinanceEditProps) {
  const [formData, setFormData] = useState(financeData || {
    unit: "",
    monthlyRent: "",
    seasonalPricing: false,
    highSeasonPrice: "",
    lowSeasonPrice: "",
    minimumStay: "1",
    deposit: "",
    bankAccount: "",
    bankName: "",
    accountHolder: "",
    payoutSchedule: "monthly",
    notes: ""
  });

  const handleSave = () => {
    if (!formData.monthlyRent || !formData.bankAccount) {
      toast.error("Mohon lengkapi field yang wajib diisi");
      return;
    }
    toast.success("Pengaturan keuangan berhasil diperbarui");
    onNavigate("portal-pengelola");
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
                <h1>Pengaturan Keuangan</h1>
                <p className="text-sm text-muted-foreground">Kelola harga dan metode pembayaran</p>
              </div>
            </div>
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Simpan
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Pengaturan Harga
              </CardTitle>
              <CardDescription>Atur harga sewa dan deposit</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit *</Label>
                  <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                    <SelectTrigger id="unit">
                      <SelectValue placeholder="Pilih unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="U101">Studio Modern A-801</SelectItem>
                      <SelectItem value="U102">Deluxe 1BR B-305</SelectItem>
                      <SelectItem value="U103">Premium 2BR C-501</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyRent">Harga Sewa/Bulan (Rp) *</Label>
                  <Input
                    id="monthlyRent"
                    type="number"
                    value={formData.monthlyRent}
                    onChange={(e) => setFormData({ ...formData, monthlyRent: e.target.value })}
                    placeholder="5500000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deposit">Deposit (Rp)</Label>
                  <Input
                    id="deposit"
                    type="number"
                    value={formData.deposit}
                    onChange={(e) => setFormData({ ...formData, deposit: e.target.value })}
                    placeholder="11000000"
                  />
                  <p className="text-xs text-muted-foreground">Biasanya 2x harga sewa bulanan</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minimumStay">Minimum Durasi Sewa (Bulan)</Label>
                  <Select value={formData.minimumStay} onValueChange={(value) => setFormData({ ...formData, minimumStay: value })}>
                    <SelectTrigger id="minimumStay">
                      <SelectValue placeholder="Pilih durasi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Bulan</SelectItem>
                      <SelectItem value="3">3 Bulan</SelectItem>
                      <SelectItem value="6">6 Bulan</SelectItem>
                      <SelectItem value="12">12 Bulan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seasonal Pricing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Harga Musiman (Opsional)
              </CardTitle>
              <CardDescription>Atur harga berbeda untuk musim ramai dan sepi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="highSeasonPrice">Harga Musim Ramai (Rp)</Label>
                  <Input
                    id="highSeasonPrice"
                    type="number"
                    value={formData.highSeasonPrice}
                    onChange={(e) => setFormData({ ...formData, highSeasonPrice: e.target.value })}
                    placeholder="6500000"
                  />
                  <p className="text-xs text-muted-foreground">Lebaran, Liburan akhir tahun</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lowSeasonPrice">Harga Musim Sepi (Rp)</Label>
                  <Input
                    id="lowSeasonPrice"
                    type="number"
                    value={formData.lowSeasonPrice}
                    onChange={(e) => setFormData({ ...formData, lowSeasonPrice: e.target.value })}
                    placeholder="4500000"
                  />
                  <p className="text-xs text-muted-foreground">Januari - Maret</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bank Account */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Informasi Rekening Bank
              </CardTitle>
              <CardDescription>Untuk pembayaran sewa dari penyewa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Nama Bank *</Label>
                  <Select value={formData.bankName} onValueChange={(value) => setFormData({ ...formData, bankName: value })}>
                    <SelectTrigger id="bankName">
                      <SelectValue placeholder="Pilih bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BCA">BCA</SelectItem>
                      <SelectItem value="Mandiri">Mandiri</SelectItem>
                      <SelectItem value="BNI">BNI</SelectItem>
                      <SelectItem value="BRI">BRI</SelectItem>
                      <SelectItem value="CIMB">CIMB Niaga</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bankAccount">Nomor Rekening *</Label>
                  <Input
                    id="bankAccount"
                    value={formData.bankAccount}
                    onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                    placeholder="1234567890"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountHolder">Nama Pemegang Rekening *</Label>
                <Input
                  id="accountHolder"
                  value={formData.accountHolder}
                  onChange={(e) => setFormData({ ...formData, accountHolder: e.target.value })}
                  placeholder="Nama sesuai rekening bank"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="payoutSchedule">Jadwal Payout</Label>
                <Select value={formData.payoutSchedule} onValueChange={(value) => setFormData({ ...formData, payoutSchedule: value })}>
                  <SelectTrigger id="payoutSchedule">
                    <SelectValue placeholder="Pilih jadwal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Bulanan (Setiap tanggal 5)</SelectItem>
                    <SelectItem value="quarterly">Kuartalan (Setiap 3 bulan)</SelectItem>
                    <SelectItem value="semiannual">Semesteran (Setiap 6 bulan)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Catatan Tambahan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="notes">Catatan</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Catatan tambahan tentang pembayaran atau aturan khusus..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => onNavigate("portal-pengelola")}>
              Batal
            </Button>
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Simpan Pengaturan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
