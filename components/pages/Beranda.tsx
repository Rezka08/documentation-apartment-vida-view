import { Search, MapPin, Star, Wifi, Car, Dumbbell, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface BerandaProps {
  onNavigate: (page: string) => void;
}

export function Beranda({ onNavigate }: BerandaProps) {
  const facilities = [
    { icon: Wifi, name: "WiFi High Speed", description: "Koneksi internet cepat 24/7" },
    { icon: Car, name: "Parkir Luas", description: "Area parkir yang aman dan nyaman" },
    { icon: Dumbbell, name: "Fitness Center", description: "Gym dengan peralatan modern" },
    { icon: Users, name: "Kolam Renang", description: "Kolam renang indoor & outdoor" },
  ];

  const testimonials = [
    { name: "Budi Santoso", rating: 5, text: "Apartemen yang sangat nyaman dengan fasilitas lengkap!" },
    { name: "Siti Aminah", rating: 5, text: "Lokasi strategis dan pemandangan indah. Sangat puas!" },
    { name: "Andi Wijaya", rating: 5, text: "Pelayanan excellent dan unit sangat bersih." },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTk4MzE4OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Vida View Apartments"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-purple-600/60"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl mb-6">Selamat Datang di Vida View</h1>
          <p className="text-xl mb-8">Apartemen Modern dengan Pemandangan Terbaik di Kota</p>
          
          {/* Quick Search */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input 
                    placeholder="Lokasi yang diinginkan..."
                    className="bg-white"
                  />
                </div>
                <div className="flex-1">
                  <Input 
                    type="date"
                    className="bg-white"
                  />
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Search className="mr-2" size={20} />
                  Cari Unit
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tentang Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl mb-6 text-purple-900">Tentang Vida View</h2>
              <p className="mb-4 text-gray-700">
                Vida View adalah kompleks apartemen modern yang menawarkan kenyamanan hidup di tengah kota dengan pemandangan spektakuler. Kami berkomitmen untuk memberikan pengalaman tinggal terbaik dengan fasilitas lengkap dan pelayanan prima.
              </p>
              <p className="mb-6 text-gray-700">
                Dengan lokasi strategis dan akses mudah ke berbagai pusat bisnis, pusat perbelanjaan, dan tempat hiburan, Vida View adalah pilihan sempurna untuk Anda yang menginginkan gaya hidup urban yang berkualitas.
              </p>
              <Button 
                onClick={() => onNavigate("unit")}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Lihat Unit Tersedia
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1613575831056-0acd5da8f085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc1OTgzNTg5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Living Room"
                className="w-full h-48 object-cover rounded-lg"
              />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1633104069776-ea7e61258ec9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBiZWRyb29tfGVufDF8fHx8MTc1OTcyODkyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Bedroom"
                className="w-full h-48 object-cover rounded-lg"
              />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1484154218962-a197022b5858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBraXRjaGVufGVufDF8fHx8MTc1OTgyMDM4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Kitchen"
                className="w-full h-48 object-cover rounded-lg"
              />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1577877319317-b5b6ac30f3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMHBvb2wlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTk4Mzk2OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Pool"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fasilitas Section */}
      <section className="py-20 px-4 bg-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-purple-900">Fasilitas Premium</h2>
            <p className="text-gray-600">Nikmati berbagai fasilitas kelas dunia untuk kenyamanan Anda</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((facility, index) => {
              const Icon = facility.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="text-purple-600" size={32} />
                    </div>
                    <h3 className="mb-2 text-purple-900">{facility.name}</h3>
                    <p className="text-sm text-gray-600">{facility.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lokasi Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-purple-900">Lokasi Strategis</h2>
            <p className="text-gray-600">Berada di jantung kota dengan akses mudah ke berbagai tempat</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-purple-50 p-8 rounded-lg">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="text-purple-600 flex-shrink-0" size={24} />
                <div>
                  <h3 className="mb-2 text-purple-900">Alamat</h3>
                  <p className="text-gray-700">Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10220</p>
                </div>
              </div>
              
              <div className="space-y-3 mt-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Mall Central Park</span>
                  <span className="text-purple-600">5 menit</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Stasiun MRT</span>
                  <span className="text-purple-600">3 menit</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Bandara Internasional</span>
                  <span className="text-purple-600">30 menit</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Pusat Bisnis</span>
                  <span className="text-purple-600">10 menit</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              <p className="text-gray-500">Map Placeholder</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-900 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">Apa Kata Penyewa Kami</h2>
            <p className="text-purple-200">Pengalaman nyata dari penyewa Vida View</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-yellow-400" size={20} />
                    ))}
                  </div>
                  <p className="mb-4 text-white">{testimonial.text}</p>
                  <p className="text-purple-200">- {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
