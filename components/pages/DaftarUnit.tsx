import { Search, Filter, Bed, Bath, Maximize, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface DaftarUnitProps {
  onNavigate: (page: string, data?: any) => void;
}

export function DaftarUnit({ onNavigate }: DaftarUnitProps) {
  const units = [
    {
      id: 1,
      name: "Studio Modern A",
      image: "https://images.unsplash.com/photo-1613575831056-0acd5da8f085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc1OTgzNTg5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      price: "Rp 3.500.000",
      bedrooms: 1,
      bathrooms: 1,
      size: 35,
      floor: "Lantai 5-10",
      available: true,
    },
    {
      id: 2,
      name: "Deluxe 1BR",
      image: "https://images.unsplash.com/photo-1633104069776-ea7e61258ec9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBiZWRyb29tfGVufDF8fHx8MTc1OTcyODkyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      price: "Rp 5.000.000",
      bedrooms: 1,
      bathrooms: 1,
      size: 45,
      floor: "Lantai 11-20",
      available: true,
    },
    {
      id: 3,
      name: "Family Suite 2BR",
      image: "https://images.unsplash.com/photo-1751998816246-c63d182770c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTk3MzQ3MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      price: "Rp 7.500.000",
      bedrooms: 2,
      bathrooms: 2,
      size: 65,
      floor: "Lantai 15-25",
      available: true,
    },
    {
      id: 4,
      name: "Premium 2BR",
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBraXRjaGVufGVufDF8fHx8MTc1OTgyMDM4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      price: "Rp 9.000.000",
      bedrooms: 2,
      bathrooms: 2,
      size: 75,
      floor: "Lantai 20-30",
      available: false,
    },
    {
      id: 5,
      name: "Executive 3BR",
      image: "https://images.unsplash.com/photo-1613575831056-0acd5da8f085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc1OTgzNTg5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      price: "Rp 12.000.000",
      bedrooms: 3,
      bathrooms: 2,
      size: 95,
      floor: "Lantai 25-35",
      available: true,
    },
    {
      id: 6,
      name: "Penthouse Suite",
      image: "https://images.unsplash.com/photo-1751998816246-c63d182770c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTk3MzQ3MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      price: "Rp 20.000.000",
      bedrooms: 3,
      bathrooms: 3,
      size: 150,
      floor: "Lantai 35-40",
      available: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl mb-4">Daftar Unit Tersedia</h1>
          <p className="text-purple-100">Temukan unit apartemen yang sempurna untuk Anda</p>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input 
                  placeholder="Cari unit..."
                  className="pl-10"
                />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Tipe Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="1br">1 Bedroom</SelectItem>
                  <SelectItem value="2br">2 Bedroom</SelectItem>
                  <SelectItem value="3br">3 Bedroom</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Harga" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">{"< Rp 5.000.000"}</SelectItem>
                  <SelectItem value="mid">Rp 5.000.000 - 10.000.000</SelectItem>
                  <SelectItem value="high">{"> Rp 10.000.000"}</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Filter className="mr-2" size={20} />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Units Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {units.map((unit) => (
            <Card key={unit.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <ImageWithFallback
                  src={unit.image}
                  alt={unit.name}
                  className="w-full h-56 object-cover"
                />
                {unit.available ? (
                  <Badge className="absolute top-4 right-4 bg-green-500">Tersedia</Badge>
                ) : (
                  <Badge className="absolute top-4 right-4 bg-red-500">Tidak Tersedia</Badge>
                )}
              </div>
              
              <CardContent className="p-6">
                <h3 className="mb-2 text-purple-900">{unit.name}</h3>
                <p className="text-purple-600 mb-4">{unit.price}/bulan</p>
                
                <div className="grid grid-cols-3 gap-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Bed size={16} />
                    <span>{unit.bedrooms} BR</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath size={16} />
                    <span>{unit.bathrooms} BA</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Maximize size={16} />
                    <span>{unit.size}m²</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <MapPin size={16} />
                  <span>{unit.floor}</span>
                </div>
              </CardContent>
              
              <CardFooter className="p-6 pt-0 flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1 border-purple-600 text-purple-600 hover:bg-purple-50"
                  onClick={() => onNavigate("detail-unit", unit)}
                >
                  Detail
                </Button>
                <Button 
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                  onClick={() => onNavigate("booking", unit)}
                  disabled={!unit.available}
                >
                  Booking
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
