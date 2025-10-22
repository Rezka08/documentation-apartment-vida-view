import { useState } from "react";
import { 
  Dumbbell, 
  Waves, 
  ShoppingBag, 
  Car, 
  Shield, 
  Wifi, 
  Users, 
  TreePine,
  UtensilsCrossed,
  Baby,
  Droplets,
  Wind
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";

interface FasilitasProps {
  onNavigate: (page: string) => void;
}

export function Fasilitas({ onNavigate }: FasilitasProps) {
  const [activeCategory, setActiveCategory] = useState("semua");

  const facilities = [
    {
      icon: Dumbbell,
      name: "Fitness Center",
      category: "olahraga",
      description: "Gym modern dengan peralatan lengkap dan trainer profesional tersedia 24/7",
      features: ["Alat kardio terbaru", "Free weights", "Personal trainer", "Ruang yoga"],
      image: "fitness gym equipment"
    },
    {
      icon: Waves,
      name: "Swimming Pool",
      category: "olahraga",
      description: "Kolam renang outdoor dengan pemandangan kota yang menakjubkan",
      features: ["Kolam dewasa 25m", "Kolam anak", "Jacuzzi", "Pool bar"],
      image: "luxury swimming pool"
    },
    {
      icon: ShoppingBag,
      name: "Shopping Arcade",
      category: "komersial",
      description: "Area retail dengan berbagai toko, minimarket, dan kafe",
      features: ["Minimarket 24 jam", "Kafe & restoran", "Laundry", "ATM center"],
      image: "modern shopping mall"
    },
    {
      icon: Car,
      name: "Parking Area",
      category: "keamanan",
      description: "Area parkir luas dengan sistem keamanan terintegrasi",
      features: ["Parkir basement", "CCTV 24/7", "Akses kartu", "EV charging"],
      image: "underground parking garage"
    },
    {
      icon: Shield,
      name: "24/7 Security",
      category: "keamanan",
      description: "Sistem keamanan berlapis dengan petugas profesional",
      features: ["Security 24 jam", "CCTV area publik", "Access card", "Security patrol"],
      image: "security guard building"
    },
    {
      icon: Wifi,
      name: "High-Speed Internet",
      category: "teknologi",
      description: "Koneksi internet fiber optic hingga 100 Mbps di area publik",
      features: ["WiFi area publik", "Smart building", "Digital signage", "Mobile app"],
      image: "modern technology"
    },
    {
      icon: Users,
      name: "Function Hall",
      category: "sosial",
      description: "Ruang serbaguna untuk acara dan gathering",
      features: ["Kapasitas 100 orang", "Audio system", "Projector", "Catering service"],
      image: "event hall interior"
    },
    {
      icon: TreePine,
      name: "Sky Garden",
      category: "rekreasi",
      description: "Taman rooftop dengan pemandangan kota 360 derajat",
      features: ["Jogging track", "Kids playground", "BBQ area", "Gazebo"],
      image: "rooftop garden city"
    },
    {
      icon: UtensilsCrossed,
      name: "Food Court",
      category: "komersial",
      description: "Area kuliner dengan berbagai pilihan makanan",
      features: ["10+ tenant F&B", "Outdoor seating", "Delivery service", "Catering"],
      image: "modern food court"
    },
    {
      icon: Baby,
      name: "Children's Playground",
      category: "rekreasi",
      description: "Area bermain anak yang aman dan menyenangkan",
      features: ["Playground outdoor", "Indoor play area", "Kids pool", "Safety certified"],
      image: "children playground"
    },
    {
      icon: Droplets,
      name: "Spa & Sauna",
      category: "wellness",
      description: "Fasilitas spa dan sauna untuk relaksasi",
      features: ["Sauna room", "Steam room", "Massage service", "Relaxation area"],
      image: "luxury spa interior"
    },
    {
      icon: Wind,
      name: "Air Quality System",
      category: "teknologi",
      description: "Sistem ventilasi dan filtrasi udara berkualitas tinggi",
      features: ["HVAC system", "Air purifier", "Fresh air circulation", "Temperature control"],
      image: "modern ventilation system"
    }
  ];

  const categories = [
    { id: "semua", label: "Semua Fasilitas" },
    { id: "olahraga", label: "Olahraga & Fitness" },
    { id: "keamanan", label: "Keamanan" },
    { id: "komersial", label: "Komersial" },
    { id: "rekreasi", label: "Rekreasi" },
    { id: "wellness", label: "Wellness" },
    { id: "teknologi", label: "Teknologi" },
    { id: "sosial", label: "Sosial" }
  ];

  const filteredFacilities = activeCategory === "semua" 
    ? facilities 
    : facilities.filter(f => f.category === activeCategory);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 text-white py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              Premium Facilities
            </Badge>
            <h1 className="text-4xl md:text-5xl mb-4">Fasilitas Vida View</h1>
            <p className="text-lg text-white/90">
              Nikmati berbagai fasilitas premium yang dirancang untuk kenyamanan dan gaya hidup modern Anda
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white border-b sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? "bg-primary text-white"
                    : "bg-secondary text-secondary-foreground hover:bg-accent"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-16 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFacilities.map((facility, index) => {
              const Icon = facility.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                      <Icon className="w-24 h-24 text-primary/30 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white text-primary border-primary/20">
                        {categories.find(c => c.id === facility.category)?.label}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="mb-1">{facility.name}</h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">
                      {facility.description}
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm">Fitur Unggulan:</p>
                      <ul className="space-y-1">
                        {facility.features.map((feature, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">Tertarik dengan Fasilitas Kami?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Jadwalkan kunjungan Anda untuk melihat langsung semua fasilitas premium yang kami tawarkan
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate("unit")}
              className="px-8 py-3 bg-white text-primary rounded-lg hover:bg-white/90 transition-all"
            >
              Lihat Unit Tersedia
            </button>
            <button
              onClick={() => onNavigate("kontak")}
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-all"
            >
              Hubungi Kami
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
