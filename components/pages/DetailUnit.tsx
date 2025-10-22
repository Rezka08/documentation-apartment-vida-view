import { ArrowLeft, Bed, Bath, Maximize, MapPin, Check, Calendar } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface DetailUnitProps {
  onNavigate: (page: string, data?: any) => void;
  unitData?: any;
}

export function DetailUnit({ onNavigate, unitData }: DetailUnitProps) {
  const unit = unitData || {
    id: 1,
    name: "Studio Modern A",
    price: "Rp 3.500.000",
    bedrooms: 1,
    bathrooms: 1,
    size: 35,
    floor: "Lantai 5-10",
    available: true,
  };

  const images = [
    "https://images.unsplash.com/photo-1613575831056-0acd5da8f085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc1OTgzNTg5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1633104069776-ea7e61258ec9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBiZWRyb29tfGVufDF8fHx8MTc1OTcyODkyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBraXRjaGVufGVufDF8fHx8MTc1OTgyMDM4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  ];

  const facilities = [
    "AC", "Water Heater", "Kitchen Set", "Lemari Pakaian",
    "Smart TV", "WiFi", "Parkir Mobil", "Balkon Pribadi"
  ];

  const buildingFacilities = [
    "Kolam Renang", "Fitness Center", "24/7 Security", "CCTV",
    "Laundry Service", "Mini Market", "Food Court", "Rooftop Garden"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate("unit")}
            className="mb-2"
          >
            <ArrowLeft className="mr-2" size={20} />
            Kembali ke Daftar Unit
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-6">
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-4">
                  <ImageWithFallback
                    src={images[0]}
                    alt="Main"
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </div>
                {images.slice(1).map((img, idx) => (
                  <div key={idx} className="col-span-2">
                    <ImageWithFallback
                      src={img}
                      alt={`Image ${idx + 2}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Details Tabs */}
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="detail">
                  <TabsList className="w-full grid grid-cols-3">
                    <TabsTrigger value="detail">Detail</TabsTrigger>
                    <TabsTrigger value="fasilitas">Fasilitas</TabsTrigger>
                    <TabsTrigger value="ketersediaan">Ketersediaan</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="detail" className="mt-6">
                    <h3 className="mb-4 text-purple-900">Deskripsi Unit</h3>
                    <p className="text-gray-700 mb-6">
                      Unit apartemen modern dengan desain minimalis yang elegan. Dilengkapi dengan furniture berkualitas tinggi dan pemandangan kota yang menakjubkan. Lokasi strategis dengan akses mudah ke berbagai fasilitas publik.
                    </p>
                    
                    <h3 className="mb-4 text-purple-900">Spesifikasi</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Bed className="text-purple-600" size={24} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Kamar Tidur</p>
                          <p>{unit.bedrooms} Kamar</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Bath className="text-purple-600" size={24} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Kamar Mandi</p>
                          <p>{unit.bathrooms} Kamar</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Maximize className="text-purple-600" size={24} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Luas</p>
                          <p>{unit.size} m²</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <MapPin className="text-purple-600" size={24} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Lokasi</p>
                          <p>{unit.floor}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="fasilitas" className="mt-6">
                    <h3 className="mb-4 text-purple-900">Fasilitas Unit</h3>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {facilities.map((facility, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Check className="text-green-500" size={20} />
                          <span className="text-gray-700">{facility}</span>
                        </div>
                      ))}
                    </div>
                    
                    <h3 className="mb-4 text-purple-900">Fasilitas Gedung</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {buildingFacilities.map((facility, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Check className="text-green-500" size={20} />
                          <span className="text-gray-700">{facility}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="ketersediaan" className="mt-6">
                    <div className="bg-purple-50 p-6 rounded-lg mb-4">
                      <div className="flex items-center gap-3 mb-4">
                        <Calendar className="text-purple-600" size={24} />
                        <h3 className="text-purple-900">Status Ketersediaan</h3>
                      </div>
                      {unit.available ? (
                        <div>
                          <Badge className="bg-green-500 mb-2">Tersedia</Badge>
                          <p className="text-gray-700">Unit ini tersedia untuk disewa mulai sekarang.</p>
                        </div>
                      ) : (
                        <div>
                          <Badge className="bg-red-500 mb-2">Tidak Tersedia</Badge>
                          <p className="text-gray-700">Unit ini sedang tidak tersedia. Silakan pilih unit lain atau hubungi kami untuk informasi lebih lanjut.</p>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600">
                      Untuk informasi ketersediaan yang lebih detail, silakan hubungi customer service kami atau lihat kalender ketersediaan.
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="mb-2 text-purple-900">{unit.name}</h2>
                <p className="text-3xl text-purple-600 mb-1">{unit.price}</p>
                <p className="text-sm text-gray-600 mb-6">/bulan</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tipe</span>
                    <span>{unit.bedrooms} Bedroom</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Luas</span>
                    <span>{unit.size} m²</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Lantai</span>
                    <span>{unit.floor}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700 mb-3"
                  onClick={() => onNavigate("booking", unit)}
                  disabled={!unit.available}
                >
                  Booking Sekarang
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
                >
                  Hubungi Kami
                </Button>
                
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-gray-600 mb-2">Butuh bantuan?</p>
                  <p className="text-purple-600">+62 21 1234 5678</p>
                  <p className="text-sm text-gray-600">Senin - Jumat: 08:00 - 17:00</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
