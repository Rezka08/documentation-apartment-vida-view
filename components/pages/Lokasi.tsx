import { MapPin, Train, Bus, ShoppingBag, Hospital, GraduationCap, Building, Navigation, Phone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface LokasiProps {
  onNavigate: (page: string) => void;
}

export function Lokasi({ onNavigate }: LokasiProps) {
  const transportAccess = [
    { icon: Train, name: "MRT Bundaran HI", distance: "500m", time: "5 menit jalan kaki", color: "text-red-600" },
    { icon: Train, name: "Stasiun Sudirman", distance: "1.2km", time: "15 menit jalan kaki", color: "text-blue-600" },
    { icon: Bus, name: "Halte TransJakarta", distance: "300m", time: "3 menit jalan kaki", color: "text-orange-600" },
  ];

  const nearbyPlaces = [
    {
      category: "Shopping",
      icon: ShoppingBag,
      color: "text-purple-600",
      places: [
        { name: "Grand Indonesia", distance: "800m" },
        { name: "Plaza Indonesia", distance: "600m" },
        { name: "Sarinah", distance: "400m" },
      ]
    },
    {
      category: "Kesehatan",
      icon: Hospital,
      color: "text-green-600",
      places: [
        { name: "RS Mitra Keluarga", distance: "1.5km" },
        { name: "Klinik Kimia Farma", distance: "500m" },
        { name: "Apotek Guardian", distance: "300m" },
      ]
    },
    {
      category: "Pendidikan",
      icon: GraduationCap,
      color: "text-blue-600",
      places: [
        { name: "Universitas Indonesia", distance: "5km" },
        { name: "Binus University", distance: "3km" },
        { name: "SD Menteng", distance: "1km" },
      ]
    },
    {
      category: "Perkantoran",
      icon: Building,
      color: "text-gray-600",
      places: [
        { name: "Gedung BRI II", distance: "600m" },
        { name: "Wisma 46", distance: "1.2km" },
        { name: "Menara BCA", distance: "800m" },
      ]
    },
  ];

  const routeGuide = [
    {
      from: "Bandara Soekarno-Hatta",
      steps: [
        "Naik Airport Train dari Terminal 3 ke Stasiun BNI City (45 menit)",
        "Transfer ke MRT menuju Bundaran HI (15 menit)",
        "Jalan kaki 5 menit ke Vida View"
      ],
      time: "±75 menit",
      cost: "Rp 75.000"
    },
    {
      from: "Stasiun Gambir",
      steps: [
        "Naik TransJakarta koridor 1 ke Halte Bundaran HI (20 menit)",
        "Jalan kaki 3 menit ke Vida View"
      ],
      time: "±25 menit",
      cost: "Rp 3.500"
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 text-white py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              Lokasi Strategis
            </Badge>
            <h1 className="text-4xl md:text-5xl mb-4">Lokasi & Akses</h1>
            <p className="text-lg text-white/90">
              Vida View terletak di jantung kota Jakarta dengan akses mudah ke berbagai destinasi penting
            </p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-primary" />
                  Peta Lokasi
                </CardTitle>
                <CardDescription>Jl. M.H. Thamrin No. 1, Jakarta Pusat 10310</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent rounded-lg flex items-center justify-center border-2 border-dashed border-primary/20">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 mx-auto mb-4 text-primary" />
                    <p className="text-muted-foreground">Peta Interaktif Google Maps</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Integrasi peta akan tersedia setelah deployment
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline">
                    <Navigation className="mr-2 h-4 w-4" />
                    Buka di Google Maps
                  </Button>
                  <Button variant="outline">
                    <Phone className="mr-2 h-4 w-4" />
                    Hubungi Kami
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Transport Access */}
      <section className="py-16 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl mb-4">Akses Transportasi Umum</h2>
              <p className="text-muted-foreground">Dekat dengan berbagai moda transportasi</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {transportAccess.map((transport, idx) => {
                const Icon = transport.icon;
                return (
                  <Card key={idx} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg bg-secondary ${transport.color}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="mb-2">{transport.name}</h3>
                          <p className="text-sm text-muted-foreground mb-1">{transport.distance}</p>
                          <Badge variant="outline">{transport.time}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Places */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl mb-4">Destinasi Terdekat</h2>
              <p className="text-muted-foreground">Berbagai fasilitas penting di sekitar Vida View</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nearbyPlaces.map((category, idx) => {
                const Icon = category.icon;
                return (
                  <Card key={idx}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon className={`w-5 h-5 ${category.color}`} />
                        {category.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {category.places.map((place, placeIdx) => (
                          <div key={placeIdx} className="flex items-center justify-between">
                            <span>{place.name}</span>
                            <Badge variant="outline">{place.distance}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Route Guide */}
      <section className="py-16 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl mb-4">Panduan Rute</h2>
              <p className="text-muted-foreground">Cara tercepat menuju Vida View</p>
            </div>

            <div className="space-y-6">
              {routeGuide.map((route, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Navigation className="w-5 h-5 text-primary" />
                      Dari {route.from}
                    </CardTitle>
                    <CardDescription>
                      Waktu Tempuh: {route.time} • Biaya: {route.cost}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-3">
                      {route.steps.map((step, stepIdx) => (
                        <li key={stepIdx} className="flex gap-3">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                            {stepIdx + 1}
                          </div>
                          <p className="text-sm text-muted-foreground pt-0.5">{step}</p>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">Ingin Mengunjungi Vida View?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Jadwalkan kunjungan Anda atau hubungi tim kami untuk informasi lebih lanjut
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => onNavigate("kontak")}
              className="bg-white text-primary hover:bg-white/90"
              size="lg"
            >
              <Phone className="mr-2 h-4 w-4" />
              Hubungi Kami
            </Button>
            <Button
              onClick={() => onNavigate("unit")}
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              size="lg"
            >
              <MapPin className="mr-2 h-4 w-4" />
              Lihat Unit Tersedia
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
