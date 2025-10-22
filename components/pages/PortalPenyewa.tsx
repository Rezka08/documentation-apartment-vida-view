import { useState } from "react";
import { 
  Home, 
  CreditCard, 
  Star, 
  User, 
  Calendar, 
  FileText, 
  Search, 
  Wrench,
  MessageSquare,
  Download,
  Upload,
  AlertCircle,
  CheckCircle,
  Clock,
  Bell,
  Heart,
  Filter
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Progress } from "../ui/progress";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { toast } from "sonner@2.0.3";

interface PortalPenyewaProps {
  onNavigate: (page: string, data?: any) => void;
  onLogout?: () => void;
  userData?: any;
}

export function PortalPenyewa({ onNavigate, onLogout, userData }: PortalPenyewaProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMaintenanceDialogOpen, setIsMaintenanceDialogOpen] = useState(false);
  const [maintenanceForm, setMaintenanceForm] = useState({ title: "", description: "", priority: "" });

  const currentRental = {
    unit: "Studio Modern A",
    building: "Tower A - Lantai 8",
    startDate: "2024-06-01",
    endDate: "2025-06-01",
    monthlyRent: "Rp 3.500.000",
    nextPayment: "2025-11-01",
    contractStatus: "Aktif"
  };

  const paymentHistory = [
    { id: "INV-001", date: "2025-10-01", amount: "Rp 3.500.000", status: "paid", method: "Transfer Bank", invoice: "invoice-001.pdf" },
    { id: "INV-002", date: "2025-09-01", amount: "Rp 3.500.000", status: "paid", method: "Transfer Bank", invoice: "invoice-002.pdf" },
    { id: "INV-003", date: "2025-08-01", amount: "Rp 3.500.000", status: "paid", method: "E-Wallet", invoice: "invoice-003.pdf" },
    { id: "INV-004", date: "2025-07-01", amount: "Rp 3.500.000", status: "paid", method: "Transfer Bank", invoice: "invoice-004.pdf" },
  ];

  const rentalHistory = [
    { id: 1, unit: "1BR Deluxe B-305", period: "2023-01-01 s/d 2024-05-31", status: "Selesai", contract: "contract-001.pdf" },
    { id: 2, unit: "Studio Modern A-801", period: "2024-06-01 s/d 2025-06-01", status: "Aktif", contract: "contract-002.pdf" },
  ];

  const maintenanceRequests = [
    { id: "MNT-001", title: "AC tidak dingin", date: "2025-10-05", priority: "Tinggi", status: "Dalam Proses", assignedTo: "Teknisi A" },
    { id: "MNT-002", title: "Lampu kamar mandi mati", date: "2025-09-28", priority: "Sedang", status: "Selesai", assignedTo: "Teknisi B" },
    { id: "MNT-003", title: "Wastafel bocor", date: "2025-09-15", priority: "Rendah", status: "Selesai", assignedTo: "Teknisi C" },
  ];

  const messages = [
    { id: 1, from: "Manajemen", subject: "Pembayaran Bulan November", date: "2025-10-07", read: false, preview: "Pengingat pembayaran sewa bulan November..." },
    { id: 2, from: "Teknisi", subject: "Update Perbaikan AC", date: "2025-10-06", read: true, preview: "Perbaikan AC akan dilakukan besok pagi..." },
    { id: 3, from: "Admin", subject: "Maintenance Lift", date: "2025-10-03", read: true, preview: "Informasi jadwal maintenance lift gedung..." },
  ];

  const notifications = [
    { id: 1, title: "Pembayaran Jatuh Tempo", message: "Pembayaran sewa bulan November jatuh tempo pada 1 Nov 2025", type: "warning", date: "2025-10-25" },
    { id: 2, title: "Maintenance Selesai", message: "Permintaan maintenance MNT-002 telah diselesaikan", type: "success", date: "2025-10-01" },
    { id: 3, title: "Pesan Baru", message: "Anda memiliki 1 pesan baru dari Manajemen", type: "info", date: "2025-10-07" },
  ];

  const handleSubmitMaintenance = () => {
    if (!maintenanceForm.title || !maintenanceForm.description || !maintenanceForm.priority) {
      toast.error("Mohon lengkapi semua field");
      return;
    }
    toast.success("Permintaan maintenance berhasil dikirim");
    setIsMaintenanceDialogOpen(false);
    setMaintenanceForm({ title: "", description: "", priority: "" });
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast.success(`Download invoice ${invoiceId}`);
  };

  const handleDownloadContract = (contractId: string) => {
    toast.success(`Download kontrak ${contractId}`);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string }> = {
      paid: { label: "Lunas", className: "bg-green-500" },
      pending: { label: "Pending", className: "bg-yellow-500" },
      "Dalam Proses": { label: "Dalam Proses", className: "bg-blue-500" },
      "Selesai": { label: "Selesai", className: "bg-green-500" },
      "Aktif": { label: "Aktif", className: "bg-green-500" },
    };
    
    const config = statusConfig[status] || { label: status, className: "bg-gray-500" };
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig: Record<string, string> = {
      "Tinggi": "bg-red-500",
      "Sedang": "bg-yellow-500",
      "Rendah": "bg-blue-500",
    };
    return <Badge className={priorityConfig[priority] || "bg-gray-500"}>{priority}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 cursor-pointer border-2 border-white" onClick={() => onNavigate("tenant-profile")}>
                <AvatarFallback className="bg-white text-purple-600">
                  {userData?.name?.charAt(0) || "P"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl mb-1">Portal Penyewa</h1>
                <p className="text-purple-200">Selamat datang, {userData?.name || "Penyewa"}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="secondary"
                onClick={() => onNavigate("tenant-profile")}
              >
                <User className="mr-2 h-4 w-4" />
                Profil
              </Button>
              <Button 
                variant="outline"
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => onLogout ? onLogout() : onNavigate("beranda")}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 mb-6">
            <TabsTrigger value="dashboard">
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="payments">
              <CreditCard className="mr-2 h-4 w-4" />
              Pembayaran
            </TabsTrigger>
            <TabsTrigger value="maintenance">
              <Wrench className="mr-2 h-4 w-4" />
              Maintenance
            </TabsTrigger>
            <TabsTrigger value="messages">
              <MessageSquare className="mr-2 h-4 w-4" />
              Pesan
            </TabsTrigger>
            <TabsTrigger value="search">
              <Search className="mr-2 h-4 w-4" />
              Cari Unit
            </TabsTrigger>
            <TabsTrigger value="documents">
              <FileText className="mr-2 h-4 w-4" />
              Dokumen
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Home className="text-purple-600" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Unit Saya</p>
                      <p className="text-lg">{currentRental.unit}</p>
                      <p className="text-xs text-muted-foreground">{currentRental.building}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="text-green-600" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Sewa Bulanan</p>
                      <p className="text-lg">{currentRental.monthlyRent}</p>
                      <p className="text-xs text-muted-foreground">Jatuh tempo: {currentRental.nextPayment}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Kontrak</p>
                      <p className="text-lg">{getStatusBadge(currentRental.contractStatus)}</p>
                      <p className="text-xs text-muted-foreground">s/d {currentRental.endDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Bell className="text-orange-600" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Notifikasi</p>
                      <p className="text-lg">{notifications.length} Notifikasi</p>
                      <p className="text-xs text-muted-foreground">1 belum dibaca</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>Notifikasi Terbaru</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        notif.type === "warning" ? "bg-yellow-100" :
                        notif.type === "success" ? "bg-green-100" : "bg-blue-100"
                      }`}>
                        {notif.type === "warning" ? <AlertCircle className="w-5 h-5 text-yellow-600" /> :
                         notif.type === "success" ? <CheckCircle className="w-5 h-5 text-green-600" /> :
                         <Bell className="w-5 h-5 text-blue-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="mb-1">{notif.title}</p>
                        <p className="text-sm text-muted-foreground mb-2">{notif.message}</p>
                        <p className="text-xs text-muted-foreground">{notif.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-24 flex flex-col gap-2" onClick={() => setActiveTab("payments")}>
                    <CreditCard className="w-6 h-6" />
                    <span>Bayar Sewa</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col gap-2" onClick={() => setIsMaintenanceDialogOpen(true)}>
                    <Wrench className="w-6 h-6" />
                    <span>Lapor Kerusakan</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col gap-2" onClick={() => setActiveTab("search")}>
                    <Search className="w-6 h-6" />
                    <span>Cari Unit Baru</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col gap-2" onClick={() => setActiveTab("documents")}>
                    <FileText className="w-6 h-6" />
                    <span>Dokumen</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Riwayat Pembayaran</CardTitle>
                  <CardDescription>Daftar pembayaran sewa apartemen Anda</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice ID</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Jumlah</TableHead>
                        <TableHead>Metode</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentHistory.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>{payment.id}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>{payment.amount}</TableCell>
                          <TableCell>{payment.method}</TableCell>
                          <TableCell>{getStatusBadge(payment.status)}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDownloadInvoice(payment.invoice)}
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Invoice
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tagihan Berikutnya</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Jumlah</p>
                    <p className="text-2xl">{currentRental.monthlyRent}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Jatuh Tempo</p>
                    <p className="text-lg">{currentRental.nextPayment}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Status</p>
                    <Badge className="bg-yellow-500">Belum Dibayar</Badge>
                  </div>
                  <Button className="w-full mt-4">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Bayar Sekarang
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Maintenance Tab */}
          <TabsContent value="maintenance" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg mb-1">Permintaan Maintenance</h3>
                <p className="text-sm text-muted-foreground">Kelola permintaan perbaikan dan maintenance</p>
              </div>
              <Dialog open={isMaintenanceDialogOpen} onOpenChange={setIsMaintenanceDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Wrench className="mr-2 h-4 w-4" />
                    Buat Permintaan
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Permintaan Maintenance Baru</DialogTitle>
                    <DialogDescription>
                      Laporkan kerusakan atau permintaan perbaikan di unit Anda
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Judul</Label>
                      <Input
                        id="title"
                        placeholder="Contoh: AC tidak dingin"
                        value={maintenanceForm.title}
                        onChange={(e) => setMaintenanceForm({ ...maintenanceForm, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Deskripsi</Label>
                      <Textarea
                        id="description"
                        placeholder="Jelaskan masalah yang terjadi..."
                        rows={4}
                        value={maintenanceForm.description}
                        onChange={(e) => setMaintenanceForm({ ...maintenanceForm, description: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Prioritas</Label>
                      <Select value={maintenanceForm.priority} onValueChange={(value) => setMaintenanceForm({ ...maintenanceForm, priority: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih prioritas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Rendah">Rendah</SelectItem>
                          <SelectItem value="Sedang">Sedang</SelectItem>
                          <SelectItem value="Tinggi">Tinggi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Upload Foto (Opsional)</Label>
                      <div className="border-2 border-dashed rounded-lg p-8 text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Klik untuk upload atau drag and drop</p>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsMaintenanceDialogOpen(false)}>Batal</Button>
                    <Button onClick={handleSubmitMaintenance}>Kirim Permintaan</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Judul</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Prioritas</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Teknisi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {maintenanceRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>{request.id}</TableCell>
                        <TableCell>{request.title}</TableCell>
                        <TableCell>{request.date}</TableCell>
                        <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell>{request.assignedTo}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Inbox</CardTitle>
                <CardDescription>Pesan dari manajemen dan pengelola</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors ${
                        !message.read ? "bg-blue-50 border-blue-200" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>{message.from?.charAt(0) || "M"}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm">{message.from}</p>
                            <p className="text-xs text-muted-foreground">{message.date}</p>
                          </div>
                        </div>
                        {!message.read && <Badge className="bg-blue-500">Baru</Badge>}
                      </div>
                      <p className="mb-1">{message.subject}</p>
                      <p className="text-sm text-muted-foreground">{message.preview}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Search Tab */}
          <TabsContent value="search" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cari Unit Lain</CardTitle>
                <CardDescription>Temukan unit yang sesuai dengan kebutuhan Anda</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg mb-4">Ingin pindah atau mencari unit tambahan?</p>
                  <Button onClick={() => onNavigate("unit")}>
                    <Search className="mr-2 h-4 w-4" />
                    Browse Katalog Unit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Riwayat Sewa & Kontrak</CardTitle>
                <CardDescription>Arsip kontrak dan dokumen sewa</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Unit</TableHead>
                      <TableHead>Periode</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rentalHistory.map((rental) => (
                      <TableRow key={rental.id}>
                        <TableCell>{rental.unit}</TableCell>
                        <TableCell>{rental.period}</TableCell>
                        <TableCell>{getStatusBadge(rental.status)}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownloadContract(rental.contract)}
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Kontrak
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
