import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Building2 } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

interface RegisterProps {
  onNavigate: (page: string, data?: any) => void;
}

export function Register({ onNavigate }: RegisterProps) {
  const [activeTab, setActiveTab] = useState("penyewa");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false
  });

  const handleSubmit = (e: React.FormEvent, userType: string) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Password tidak cocok!");
      return;
    }

    if (!formData.agreeTerms) {
      alert("Harap setujui syarat dan ketentuan");
      return;
    }

    // Mock registration - in production, this would call an API
    alert(`Registrasi berhasil sebagai ${userType}! Silakan login.`);
    onNavigate("login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-3 text-center">
          <div className="flex justify-center mb-2">
            <div className="bg-primary p-3 rounded-xl">
              <Building2 className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-3xl">Daftar Akun Baru</CardTitle>
          <CardDescription>
            Buat akun untuk menggunakan layanan Vida View
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="penyewa">Penyewa</TabsTrigger>
              <TabsTrigger value="pengelola">Pengelola</TabsTrigger>
            </TabsList>
            
            <TabsContent value="penyewa">
              <form onSubmit={(e) => handleSubmit(e, "penyewa")} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name-penyewa">Nama Lengkap</Label>
                  <Input
                    id="name-penyewa"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-penyewa">Email</Label>
                  <Input
                    id="email-penyewa"
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone-penyewa">Nomor Telepon</Label>
                  <Input
                    id="phone-penyewa"
                    type="tel"
                    placeholder="08123456789"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-penyewa">Password</Label>
                  <Input
                    id="password-penyewa"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password-penyewa">Konfirmasi Password</Label>
                  <Input
                    id="confirm-password-penyewa"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms-penyewa"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, agreeTerms: checked as boolean })
                    }
                  />
                  <label htmlFor="terms-penyewa" className="text-sm text-muted-foreground">
                    Saya setuju dengan syarat dan ketentuan
                  </label>
                </div>
                <Button type="submit" className="w-full">
                  Daftar sebagai Penyewa
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="pengelola">
              <form onSubmit={(e) => handleSubmit(e, "pengelola")} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name-pengelola">Nama Lengkap / Perusahaan</Label>
                  <Input
                    id="name-pengelola"
                    type="text"
                    placeholder="ABC Property Management"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-pengelola">Email</Label>
                  <Input
                    id="email-pengelola"
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone-pengelola">Nomor Telepon</Label>
                  <Input
                    id="phone-pengelola"
                    type="tel"
                    placeholder="08123456789"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-pengelola">Password</Label>
                  <Input
                    id="password-pengelola"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password-pengelola">Konfirmasi Password</Label>
                  <Input
                    id="confirm-password-pengelola"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms-pengelola"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, agreeTerms: checked as boolean })
                    }
                  />
                  <label htmlFor="terms-pengelola" className="text-sm text-muted-foreground">
                    Saya setuju dengan syarat dan ketentuan
                  </label>
                </div>
                <Button type="submit" className="w-full">
                  Daftar sebagai Pengelola
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-muted-foreground">
            Sudah punya akun?{" "}
            <button
              onClick={() => onNavigate("login")}
              className="text-primary hover:underline"
            >
              Masuk sekarang
            </button>
          </div>
          <button
            onClick={() => onNavigate("beranda")}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Kembali ke Beranda
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}
