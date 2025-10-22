import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Building2 } from "lucide-react";

interface LoginProps {
  onNavigate: (page: string, data?: any) => void;
  onLogin: (userType: string, userData: any) => void;
}

export function Login({ onNavigate, onLogin }: LoginProps) {
  const [activeTab, setActiveTab] = useState("penyewa");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent, userType: string) => {
    e.preventDefault();
    
    // Mock login - in production, this would call an API
    const mockUser = {
      id: 1,
      name: userType === "admin" ? "Admin" : userType === "pengelola" ? "John Doe (Pengelola)" : "Jane Smith",
      email: formData.email,
      type: userType
    };

    onLogin(userType, mockUser);

    // Navigate to appropriate dashboard
    if (userType === "admin") {
      onNavigate("admin");
    } else if (userType === "pengelola") {
      onNavigate("portal-pengelola");
    } else {
      onNavigate("portal-penyewa");
    }
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
          <CardTitle className="text-3xl">Vida View</CardTitle>
          <CardDescription>
            Masuk ke akun Anda untuk melanjutkan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="penyewa">Penyewa</TabsTrigger>
              <TabsTrigger value="pengelola">Pengelola</TabsTrigger>
            </TabsList>
            
            <TabsContent value="penyewa">
              <form onSubmit={(e) => handleSubmit(e, "penyewa")} className="space-y-4">
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
                <Button type="submit" className="w-full">
                  Masuk sebagai Penyewa
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="pengelola">
              <form onSubmit={(e) => handleSubmit(e, "pengelola")} className="space-y-4">
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
                <Button type="submit" className="w-full">
                  Masuk sebagai Pengelola
                </Button>
              </form>
            </TabsContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-muted-foreground">
            Belum punya akun?{" "}
            <button
              onClick={() => onNavigate("register")}
              className="text-primary hover:underline"
            >
              Daftar sekarang
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
