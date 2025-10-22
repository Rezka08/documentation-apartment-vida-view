import { useState } from "react";
import { ArrowLeft, Plus, Edit, Trash2, Search, Filter, KeyRound, Shield, UserCheck, UserX } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { toast } from "sonner@2.0.3";

interface AdminCRUDProps {
  onNavigate: (page: string, data?: any) => void;
}

export function AdminCRUD({ onNavigate }: AdminCRUDProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("units");
  const [userTypeFilter, setUserTypeFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newPassword, setNewPassword] = useState("");

  // Mock data for units
  const [units, setUnits] = useState([
    { id: 1, name: "Studio Premium A-201", type: "Studio", building: "Tower A", floor: 2, price: 5500000, status: "Tersedia" },
    { id: 2, name: "1BR Deluxe B-305", type: "1 Bedroom", building: "Tower B", floor: 3, price: 7500000, status: "Terisi" },
    { id: 3, name: "2BR Executive C-501", type: "2 Bedroom", building: "Tower C", floor: 5, price: 12000000, status: "Tersedia" },
    { id: 4, name: "Studio Standard A-105", type: "Studio", building: "Tower A", floor: 1, price: 4500000, status: "Maintenance" },
  ]);

  // Mock data for users
  const [users, setUsers] = useState([
    { id: 1, name: "Jane Smith", email: "jane@example.com", phone: "08123456789", type: "Penyewa", status: "Aktif", createdAt: "2024-01-15", lastLogin: "2025-10-07" },
    { id: 2, name: "John Doe", email: "john@example.com", phone: "08198765432", type: "Pengelola", status: "Aktif", createdAt: "2024-02-20", lastLogin: "2025-10-08" },
    { id: 3, name: "Admin User", email: "admin@vidaview.com", phone: "08111222333", type: "Admin", status: "Aktif", createdAt: "2023-12-01", lastLogin: "2025-10-08" },
    { id: 4, name: "Robert Wilson", email: "robert@example.com", phone: "08555666777", type: "Penyewa", status: "Nonaktif", createdAt: "2024-03-10", lastLogin: "2025-09-20" },
    { id: 5, name: "Sarah Johnson", email: "sarah@example.com", phone: "08222333444", type: "Penyewa", status: "Aktif", createdAt: "2024-04-05", lastLogin: "2025-10-06" },
    { id: 6, name: "Michael Chen", email: "michael@example.com", phone: "08333444555", type: "Pengelola", status: "Aktif", createdAt: "2024-05-12", lastLogin: "2025-10-08" },
  ]);

  // Mock data for bookings
  const [bookings, setBookings] = useState([
    { id: 1, tenant: "Jane Smith", unit: "Studio Premium A-201", startDate: "2024-01-01", endDate: "2024-12-31", status: "Aktif" },
    { id: 2, tenant: "Alice Brown", unit: "1BR Deluxe B-305", startDate: "2024-02-01", endDate: "2025-01-31", status: "Aktif" },
    { id: 3, tenant: "Mike Johnson", unit: "2BR Executive C-501", startDate: "2024-03-15", endDate: "2024-09-15", status: "Pending" },
  ]);

  const [formData, setFormData] = useState<any>({});

  const handleAdd = (type: string) => {
    setEditingItem(null);
    setFormData({});
    setIsDialogOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData(item);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number, type: string) => {
    if (type === "units") {
      const unit = units.find(u => u.id === id);
      setUnits(units.filter(u => u.id !== id));
      toast.success(`Unit ${unit?.name} berhasil dihapus`);
    } else if (type === "users") {
      const user = users.find(u => u.id === id);
      setUsers(users.filter(u => u.id !== id));
      toast.success(`User ${user?.name} berhasil dihapus`);
    } else if (type === "bookings") {
      setBookings(bookings.filter(b => b.id !== id));
      toast.success("Booking berhasil dihapus");
    }
  };

  const handleSave = () => {
    if (activeTab === "units") {
      if (editingItem) {
        setUnits(units.map(u => u.id === editingItem.id ? { ...formData, id: editingItem.id } : u));
        toast.success("Unit berhasil diperbarui");
      } else {
        setUnits([...units, { ...formData, id: units.length + 1 }]);
        toast.success("Unit berhasil ditambahkan");
      }
    } else if (activeTab === "users") {
      if (editingItem) {
        setUsers(users.map(u => u.id === editingItem.id ? { ...formData, id: editingItem.id, createdAt: u.createdAt, lastLogin: u.lastLogin } : u));
        toast.success(`User ${formData.name} berhasil diperbarui`);
      } else {
        const today = new Date().toISOString().split('T')[0];
        setUsers([...users, { 
          ...formData, 
          id: users.length + 1,
          createdAt: today,
          lastLogin: today
        }]);
        toast.success(`User ${formData.name} berhasil ditambahkan`);
      }
    } else if (activeTab === "bookings") {
      if (editingItem) {
        setBookings(bookings.map(b => b.id === editingItem.id ? { ...formData, id: editingItem.id } : b));
        toast.success("Booking berhasil diperbarui");
      } else {
        setBookings([...bookings, { ...formData, id: bookings.length + 1 }]);
        toast.success("Booking berhasil ditambahkan");
      }
    }
    setIsDialogOpen(false);
    setFormData({});
  };

  const handleToggleUserStatus = (userId: number) => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        const newStatus = u.status === "Aktif" ? "Nonaktif" : "Aktif";
        toast.success(`User ${u.name} berhasil diubah menjadi ${newStatus}`);
        return { ...u, status: newStatus };
      }
      return u;
    }));
  };

  const handleResetPassword = () => {
    if (newPassword.length < 6) {
      toast.error("Password harus minimal 6 karakter");
      return;
    }
    toast.success(`Password untuk ${selectedUser?.name} berhasil direset`);
    setIsPasswordDialogOpen(false);
    setNewPassword("");
    setSelectedUser(null);
  };

  const openPasswordDialog = (user: any) => {
    setSelectedUser(user);
    setIsPasswordDialogOpen(true);
  };

  const getFilteredUsers = () => {
    let filtered = users;
    if (userTypeFilter !== "all") {
      filtered = filtered.filter(u => u.type === userTypeFilter);
    }
    if (searchQuery) {
      filtered = filtered.filter(u => 
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.phone.includes(searchQuery)
      );
    }
    return filtered;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Tersedia":
      case "Aktif":
        return "bg-green-500";
      case "Terisi":
        return "bg-blue-500";
      case "Maintenance":
      case "Pending":
        return "bg-yellow-500";
      case "Nonaktif":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-background">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate("admin")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1>Manajemen Data</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="units">Unit</TabsTrigger>
            <TabsTrigger value="users">Pengguna</TabsTrigger>
            <TabsTrigger value="bookings">Booking</TabsTrigger>
          </TabsList>

          {/* Units Tab */}
          <TabsContent value="units">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <CardTitle>Daftar Unit</CardTitle>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Cari unit..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <Dialog open={isDialogOpen && activeTab === "units"} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button onClick={() => handleAdd("units")}>
                          <Plus className="h-4 w-4 mr-2" />
                          Tambah Unit
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{editingItem ? "Edit Unit" : "Tambah Unit Baru"}</DialogTitle>
                          <DialogDescription>
                            Masukkan detail unit apartemen
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="unit-name">Nama Unit</Label>
                            <Input
                              id="unit-name"
                              value={formData.name || ""}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="Studio Premium A-201"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="unit-type">Tipe</Label>
                              <Select value={formData.type || ""} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                                <SelectTrigger id="unit-type">
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
                            <div className="space-y-2">
                              <Label htmlFor="unit-building">Gedung</Label>
                              <Select value={formData.building || ""} onValueChange={(value) => setFormData({ ...formData, building: value })}>
                                <SelectTrigger id="unit-building">
                                  <SelectValue placeholder="Pilih gedung" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Tower A">Tower A</SelectItem>
                                  <SelectItem value="Tower B">Tower B</SelectItem>
                                  <SelectItem value="Tower C">Tower C</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="unit-floor">Lantai</Label>
                              <Input
                                id="unit-floor"
                                type="number"
                                value={formData.floor || ""}
                                onChange={(e) => setFormData({ ...formData, floor: parseInt(e.target.value) })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="unit-price">Harga (Rp)</Label>
                              <Input
                                id="unit-price"
                                type="number"
                                value={formData.price || ""}
                                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="unit-status">Status</Label>
                            <Select value={formData.status || ""} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                              <SelectTrigger id="unit-status">
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
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
                          <Button onClick={handleSave}>Simpan</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nama Unit</TableHead>
                        <TableHead>Tipe</TableHead>
                        <TableHead>Gedung</TableHead>
                        <TableHead>Lantai</TableHead>
                        <TableHead>Harga</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {units.map((unit) => (
                        <TableRow key={unit.id}>
                          <TableCell>{unit.name}</TableCell>
                          <TableCell>{unit.type}</TableCell>
                          <TableCell>{unit.building}</TableCell>
                          <TableCell>{unit.floor}</TableCell>
                          <TableCell>Rp {unit.price.toLocaleString('id-ID')}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(unit.status)}>{unit.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onNavigate("admin-unit-detail", unit)}
                              >
                                Detail
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEdit(unit)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(unit.id, "units")}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle>Manajemen Pengguna</CardTitle>
                      <CardDescription>Kelola akun pengguna, status, dan password</CardDescription>
                    </div>
                    <Dialog open={isDialogOpen && activeTab === "users"} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button onClick={() => handleAdd("users")}>
                          <Plus className="h-4 w-4 mr-2" />
                          Tambah Pengguna
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{editingItem ? "Edit Pengguna" : "Tambah Pengguna Baru"}</DialogTitle>
                          <DialogDescription>
                            Masukkan detail pengguna
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                          <div className="space-y-2">
                            <Label htmlFor="user-name">Nama Lengkap</Label>
                            <Input
                              id="user-name"
                              value={formData.name || ""}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="John Doe"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="user-email">Email</Label>
                            <Input
                              id="user-email"
                              type="email"
                              value={formData.email || ""}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="email@example.com"
                              required
                            />
                          </div>
                          {!editingItem && (
                            <div className="space-y-2">
                              <Label htmlFor="user-password">Password</Label>
                              <Input
                                id="user-password"
                                type="password"
                                value={formData.password || ""}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="Minimal 6 karakter"
                                required
                              />
                              <p className="text-xs text-muted-foreground">
                                Password untuk login pengguna baru
                              </p>
                            </div>
                          )}
                          <div className="space-y-2">
                            <Label htmlFor="user-phone">Nomor Telepon</Label>
                            <Input
                              id="user-phone"
                              value={formData.phone || ""}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              placeholder="08123456789"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="user-type">Tipe Pengguna</Label>
                              <Select value={formData.type || ""} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                                <SelectTrigger id="user-type">
                                  <SelectValue placeholder="Pilih tipe" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Penyewa">Penyewa</SelectItem>
                                  <SelectItem value="Pengelola">Pengelola</SelectItem>
                                  <SelectItem value="Admin">Admin</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="user-status">Status</Label>
                              <Select value={formData.status || ""} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                                <SelectTrigger id="user-status">
                                  <SelectValue placeholder="Pilih status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Aktif">Aktif</SelectItem>
                                  <SelectItem value="Nonaktif">Nonaktif</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          {editingItem && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                              <p className="text-sm text-yellow-900">
                                <strong>Catatan:</strong> Untuk mengubah password, gunakan tombol "Reset Password" pada tabel pengguna.
                              </p>
                            </div>
                          )}
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
                          <Button onClick={handleSave}>Simpan</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  
                  {/* Filters and Search */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Cari nama, email, atau telepon..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <Select value={userTypeFilter} onValueChange={setUserTypeFilter}>
                      <SelectTrigger className="w-full sm:w-48">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filter Tipe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Tipe</SelectItem>
                        <SelectItem value="Penyewa">Penyewa</SelectItem>
                        <SelectItem value="Pengelola">Pengelola</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-600">Total User</p>
                      <p className="text-2xl text-blue-900">{users.length}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <p className="text-sm text-green-600">Aktif</p>
                      <p className="text-2xl text-green-900">{users.filter(u => u.status === "Aktif").length}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <p className="text-sm text-purple-600">Penyewa</p>
                      <p className="text-2xl text-purple-900">{users.filter(u => u.type === "Penyewa").length}</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                      <p className="text-sm text-orange-600">Pengelola</p>
                      <p className="text-2xl text-orange-900">{users.filter(u => u.type === "Pengelola").length}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nama</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Telepon</TableHead>
                        <TableHead>Tipe</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Terdaftar</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getFilteredUsers().length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                            Tidak ada data pengguna
                          </TableCell>
                        </TableRow>
                      ) : (
                        getFilteredUsers().map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {user.type === "Admin" && <Shield className="h-4 w-4 text-primary" />}
                                <span>{user.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{user.type}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {new Date(user.createdAt).toLocaleDateString('id-ID')}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEdit(user)}
                                  title="Edit pengguna"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => openPasswordDialog(user)}
                                  title="Reset password"
                                >
                                  <KeyRound className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleToggleUserStatus(user.id)}
                                  title={user.status === "Aktif" ? "Nonaktifkan" : "Aktifkan"}
                                >
                                  {user.status === "Aktif" ? (
                                    <UserX className="h-4 w-4 text-orange-600" />
                                  ) : (
                                    <UserCheck className="h-4 w-4 text-green-600" />
                                  )}
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      title="Hapus pengguna"
                                    >
                                      <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Hapus Pengguna?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Apakah Anda yakin ingin menghapus pengguna <strong>{user.name}</strong>? 
                                        Tindakan ini tidak dapat dibatalkan.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Batal</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDelete(user.id, "users")}>
                                        Hapus
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Password Reset Dialog */}
            <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reset Password</DialogTitle>
                  <DialogDescription>
                    Reset password untuk pengguna: <strong>{selectedUser?.name}</strong>
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Password Baru</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="Masukkan password baru (min. 6 karakter)"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-900">
                      <strong>Info:</strong> Password akan direset dan pengguna akan diminta menggunakan password baru ini saat login.
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => {
                    setIsPasswordDialogOpen(false);
                    setNewPassword("");
                    setSelectedUser(null);
                  }}>
                    Batal
                  </Button>
                  <Button onClick={handleResetPassword}>
                    Reset Password
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <CardTitle>Daftar Booking</CardTitle>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Cari booking..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <Dialog open={isDialogOpen && activeTab === "bookings"} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button onClick={() => handleAdd("bookings")}>
                          <Plus className="h-4 w-4 mr-2" />
                          Tambah Booking
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{editingItem ? "Edit Booking" : "Tambah Booking Baru"}</DialogTitle>
                          <DialogDescription>
                            Masukkan detail booking
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="booking-tenant">Penyewa</Label>
                            <Input
                              id="booking-tenant"
                              value={formData.tenant || ""}
                              onChange={(e) => setFormData({ ...formData, tenant: e.target.value })}
                              placeholder="Nama Penyewa"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="booking-unit">Unit</Label>
                            <Input
                              id="booking-unit"
                              value={formData.unit || ""}
                              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                              placeholder="Nama Unit"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="booking-start">Tanggal Mulai</Label>
                              <Input
                                id="booking-start"
                                type="date"
                                value={formData.startDate || ""}
                                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="booking-end">Tanggal Selesai</Label>
                              <Input
                                id="booking-end"
                                type="date"
                                value={formData.endDate || ""}
                                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="booking-status">Status</Label>
                            <Select value={formData.status || ""} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                              <SelectTrigger id="booking-status">
                                <SelectValue placeholder="Pilih status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="Aktif">Aktif</SelectItem>
                                <SelectItem value="Selesai">Selesai</SelectItem>
                                <SelectItem value="Dibatalkan">Dibatalkan</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
                          <Button onClick={handleSave}>Simpan</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Penyewa</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Tanggal Mulai</TableHead>
                        <TableHead>Tanggal Selesai</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell>{booking.tenant}</TableCell>
                          <TableCell>{booking.unit}</TableCell>
                          <TableCell>{new Date(booking.startDate).toLocaleDateString('id-ID')}</TableCell>
                          <TableCell>{new Date(booking.endDate).toLocaleDateString('id-ID')}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEdit(booking)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(booking.id, "bookings")}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
