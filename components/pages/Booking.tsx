import { ArrowLeft, CreditCard, Wallet, Building2, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Separator } from "../ui/separator";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useState } from "react";

interface BookingProps {
  onNavigate: (page: string, data?: any) => void;
  unitData?: any;
}

export function Booking({ onNavigate, unitData }: BookingProps) {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("transfer");

  const unit = unitData || {
    id: 1,
    name: "Studio Modern A",
    price: "Rp 3.500.000",
    image: "https://images.unsplash.com/photo-1613575831056-0acd5da8f085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc1OTgzNTg5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  };

  const handleSubmit = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-green-600" size={48} />
            </div>
            <h2 className="text-2xl mb-2 text-purple-900">Booking Berhasil!</h2>
            <p className="text-gray-600 mb-6">
              Terima kasih telah melakukan booking. Kami akan segera menghubungi Anda untuk konfirmasi lebih lanjut.
            </p>
            <div className="bg-purple-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-600 mb-1">Nomor Invoice</p>
              <p className="text-purple-600">INV-2025-001234</p>
            </div>
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700"
              onClick={() => onNavigate("beranda")}
            >
              Kembali ke Beranda
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate("unit")}
          >
            <ArrowLeft className="mr-2" size={20} />
            Kembali
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="hidden sm:inline">Pilih Unit</span>
            </div>
            <div className={`h-px w-12 ${step >= 2 ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="hidden sm:inline">Pembayaran</span>
            </div>
            <div className={`h-px w-12 ${step >= 3 ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="hidden sm:inline">Selesai</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Penyewa</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nama">Nama Lengkap</Label>
                      <Input id="nama" placeholder="Masukkan nama lengkap" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="email@example.com" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Nomor Telepon</Label>
                      <Input id="phone" placeholder="+62" />
                    </div>
                    <div>
                      <Label htmlFor="nik">NIK</Label>
                      <Input id="nik" placeholder="Nomor Induk Kependudukan" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Alamat Saat Ini</Label>
                    <Input id="address" placeholder="Alamat lengkap" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Tanggal Mulai Sewa</Label>
                      <Input id="startDate" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="duration">Durasi Sewa</Label>
                      <Input id="duration" placeholder="Bulan" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Metode Pembayaran</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:border-purple-600">
                        <RadioGroupItem value="transfer" id="transfer" />
                        <Label htmlFor="transfer" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <Building2 className="text-purple-600" />
                            <div>
                              <p>Transfer Bank</p>
                              <p className="text-sm text-gray-600">Transfer ke rekening bank kami</p>
                            </div>
                          </div>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:border-purple-600">
                        <RadioGroupItem value="wallet" id="wallet" />
                        <Label htmlFor="wallet" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <Wallet className="text-purple-600" />
                            <div>
                              <p>E-Wallet</p>
                              <p className="text-sm text-gray-600">OVO, GoPay, Dana, LinkAja</p>
                            </div>
                          </div>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:border-purple-600">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <CreditCard className="text-purple-600" />
                            <div>
                              <p>Kartu Kredit/Debit</p>
                              <p className="text-sm text-gray-600">Visa, Mastercard, JCB</p>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                  
                  {paymentMethod === "transfer" && (
                    <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                      <p className="mb-2">Transfer ke rekening berikut:</p>
                      <p>Bank BCA - 1234567890</p>
                      <p>a.n. PT Vida View Properti</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Ringkasan Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <ImageWithFallback
                    src={unit.image}
                    alt={unit.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
                
                <h3 className="mb-2 text-purple-900">{unit.name}</h3>
                
                <Separator className="my-4" />
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Harga sewa/bulan</span>
                    <span>{unit.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Deposit</span>
                    <span>Rp 2.000.000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Biaya admin</span>
                    <span>Rp 500.000</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between mb-6">
                  <span>Total</span>
                  <span className="text-purple-600">Rp 6.000.000</span>
                </div>
                
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={handleSubmit}
                >
                  {step === 1 ? "Lanjut ke Pembayaran" : "Konfirmasi Pembayaran"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
