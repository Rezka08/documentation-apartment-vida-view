import { useState } from "react";
import { ArrowLeft, Save, Upload, X, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { toast } from "sonner@2.0.3";

interface AdminUnitEditProps {
  onNavigate: (page: string, data?: any) => void;
  unitData?: any;
  mode?: "create" | "edit";
}

export function AdminUnitEdit({ onNavigate, unitData, mode = "edit" }: AdminUnitEditProps) {
  const [formData, setFormData] = useState(unitData || {
    name: "",
    type: "",
    building: "",
    floor: "",
    price: "",
    size: "",
    bedrooms: "",
    bathrooms: "",
    status: "Tersedia",
    description: "",
    facilities: [],
    images: []
  });

  const availableFacilities = [
    "AC", "Water Heater", "Kitchen Set", "Balcony", "Furnished", 
    "WiFi", "TV Cable", "Washing Machine", "Refrigerator", "Microwave"
  ];

  const handleSave = () => {
    if (!formData.name || !formData.type || !formData.building || !formData.price) {
      toast.error("Mohon lengkapi semua field yang wajib diisi");
      return;
    }
    
    if (mode === "create") {
      toast.success("Unit baru berhasil ditambahkan");
    } else {
      toast.success("Unit berhasil diperbarui");
    }
    
    onNavigate("admin-crud");
  };

  const handleFacilityToggle = (facility: string) => {
    setFormData((prev: any) => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter((f: string) => f !== facility)
        : [...prev.facilities, facility]
    }));
  };

  const handleImageUpload = () => {
    toast.info("Fungsi upload gambar akan tersedia setelah integrasi backend");
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
                onClick={() => onNavigate("admin-crud")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1>{mode === "create" ? "Tambah Unit Baru" : "Edit Unit"}</h1>
                <p className="text-sm text-muted-foreground">
                  {mode === "create" ? "Tambahkan unit apartemen baru" : `Edit: ${unitData?.name}`}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onNavigate("admin-crud")}>
                Batal
              </Button>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Simpan
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Dasar</CardTitle>
              <CardDescription>Detail utama unit apartemen</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Unit *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Studio Premium A-201"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipe Unit *</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Pilih tipe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Studio">Studio</SelectItem>
                      <SelectItem value="1 Bedroom">1 Bedroom</SelectItem>
                      <SelectItem value="2 Bedroom">2 Bedroom</SelectItem>
                      <SelectItem value="3 Bedroom">3 Bedroom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="building">Gedung *</Label>
                  <Select value={formData.building} onValueChange={(value) => setFormData({ ...formData, building: value })}>
                    <SelectTrigger id="building">
                      <SelectValue placeholder="Pilih gedung" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tower A">Tower A</SelectItem>
                      <SelectItem value="Tower B">Tower B</SelectItem>
                      <SelectItem value="Tower C">Tower C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="floor">Lantai *</Label>
                  <Input
                    id="floor"
                    type="number"
                    value={formData.floor}
                    onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                    placeholder="8"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size">Luas (m²)</Label>
                  <Input
                    id="size"
                    type="number"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    placeholder="35"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Jumlah Kamar Tidur</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    placeholder="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Jumlah Kamar Mandi</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                    placeholder="1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Deskripsi singkat tentang unit ini..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Status */}
          <Card>
            <CardHeader>
              <CardTitle>Harga & Status</CardTitle>
              <CardDescription>Informasi harga dan ketersediaan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Harga Sewa per Bulan (Rp) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="5500000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status Unit</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tersedia">Tersedia</SelectItem>
                      <SelectItem value="Terisi">Terisi</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Facilities */}
          <Card>
            <CardHeader>
              <CardTitle>Fasilitas Unit</CardTitle>
              <CardDescription>Pilih fasilitas yang tersedia di unit ini</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {availableFacilities.map((facility) => (
                  <div key={facility} className="flex items-center space-x-2">
                    <Checkbox
                      id={facility}
                      checked={formData.facilities?.includes(facility)}
                      onCheckedChange={() => handleFacilityToggle(facility)}
                    />
                    <label
                      htmlFor={facility}
                      className="text-sm cursor-pointer"
                    >
                      {facility}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Foto Unit</CardTitle>
              <CardDescription>Upload foto-foto unit (maksimal 10 foto)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Klik untuk upload atau drag and drop foto di sini
                  </p>
                  <Button variant="outline" onClick={handleImageUpload}>
                    <Upload className="mr-2 h-4 w-4" />
                    Pilih Foto
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Format: JPG, PNG (Max 5MB per file)
                  </p>
                </div>

                {formData.images && formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.images.map((img: string, idx: number) => (
                      <div key={idx} className="relative group">
                        <img src={img} alt={`Unit ${idx + 1}`} className="w-full h-32 object-cover rounded-lg" />
                        <button className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => onNavigate("admin-crud")}>
              Batal
            </Button>
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              {mode === "create" ? "Tambah Unit" : "Simpan Perubahan"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
