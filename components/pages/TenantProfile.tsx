import { useState } from "react";
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Edit2, Save, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

interface TenantProfileProps {
  onNavigate: (page: string, data?: any) => void;
  userData?: any;
}

export function TenantProfile({ onNavigate, userData }: TenantProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: userData?.name || "Jane Smith",
    email: userData?.email || "jane.smith@example.com",
    phone: "08123456789",
    address: "Jl. Sudirman No. 123, Jakarta Pusat",
    birthDate: "1990-05-15",
    idNumber: "3171234567890123"
  });

  const currentRentals = [
    {
      id: 1,
      unitName: "Studio Premium A-201",
      building: "Tower A",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      monthlyRent: "Rp 5.500.000",
      status: "Aktif"
    }
  ];

  const rentalHistory = [
    {
      id: 2,
      unitName: "1BR Deluxe B-305",
      building: "Tower B",
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      status: "Selesai"
    },
    {
      id: 3,
      unitName: "Studio Standard A-105",
      building: "Tower A",
      startDate: "2022-06-01",
      endDate: "2022-12-31",
      status: "Selesai"
    }
  ];

  const documents = [
    { id: 1, name: "KTP", status: "Terverifikasi", uploadDate: "2024-01-01" },
    { id: 2, name: "Kartu Keluarga", status: "Terverifikasi", uploadDate: "2024-01-01" },
    { id: 3, name: "NPWP", status: "Pending", uploadDate: "2024-01-05" }
  ];

  const handleSave = () => {
    // In production, this would call an API
    setIsEditing(false);
    alert("Profil berhasil diperbarui!");
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
                onClick={() => onNavigate("portal-penyewa")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1>Profil Saya</h1>
            </div>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Profil
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Batal
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Simpan
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2>{profileData.name}</h2>
                    <p className="text-muted-foreground">{profileData.email}</p>
                  </div>
                  <Badge className="bg-green-500">Penyewa Aktif</Badge>
                  <Separator />
                  <div className="w-full space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{profileData.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-left">{profileData.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Bergabung sejak Jan 2022</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="info" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info">Informasi</TabsTrigger>
                <TabsTrigger value="rentals">Sewa</TabsTrigger>
                <TabsTrigger value="documents">Dokumen</TabsTrigger>
              </TabsList>

              <TabsContent value="info">
                <Card>
                  <CardHeader>
                    <CardTitle>Informasi Pribadi</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Nomor Telepon</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="birthDate">Tanggal Lahir</Label>
                        <Input
                          id="birthDate"
                          type="date"
                          value={profileData.birthDate}
                          onChange={(e) => setProfileData({ ...profileData, birthDate: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="idNumber">NIK</Label>
                        <Input
                          id="idNumber"
                          value={profileData.idNumber}
                          onChange={(e) => setProfileData({ ...profileData, idNumber: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">Alamat</Label>
                        <Input
                          id="address"
                          value={profileData.address}
                          onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rentals">
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sewa Aktif</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {currentRentals.map((rental) => (
                        <div key={rental.id} className="border rounded-lg p-4 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3>{rental.unitName}</h3>
                              <p className="text-muted-foreground">{rental.building}</p>
                            </div>
                            <Badge className="bg-green-500">{rental.status}</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <p className="text-muted-foreground">Mulai</p>
                              <p>{new Date(rental.startDate).toLocaleDateString('id-ID')}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Berakhir</p>
                              <p>{new Date(rental.endDate).toLocaleDateString('id-ID')}</p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-muted-foreground">Sewa per Bulan</p>
                              <p className="font-semibold text-primary">{rental.monthlyRent}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Riwayat Sewa</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {rentalHistory.map((rental) => (
                        <div key={rental.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4>{rental.unitName}</h4>
                              <p className="text-sm text-muted-foreground">{rental.building}</p>
                            </div>
                            <Badge variant="outline">{rental.status}</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(rental.startDate).toLocaleDateString('id-ID')} - {new Date(rental.endDate).toLocaleDateString('id-ID')}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="documents">
                <Card>
                  <CardHeader>
                    <CardTitle>Dokumen Penyewa</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between border rounded-lg p-4">
                        <div>
                          <h4>{doc.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Diunggah: {new Date(doc.uploadDate).toLocaleDateString('id-ID')}
                          </p>
                        </div>
                        <Badge className={doc.status === "Terverifikasi" ? "bg-green-500" : "bg-yellow-500"}>
                          {doc.status}
                        </Badge>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      Upload Dokumen Baru
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
