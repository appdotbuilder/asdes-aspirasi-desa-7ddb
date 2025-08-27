import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
    MapPin, 
    AlertTriangle, 
    Users, 
    Clock, 
    CheckCircle, 
    Shield,
    FileText,
    Eye,
    Settings
} from 'lucide-react';

interface Props {
    auth?: {
        user?: {
            id: number;
            name: string;
            email: string;
            role: string;
        };
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <MapPin className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">ASDES</h1>
                                <p className="text-sm text-gray-600">Aspirasi Desa</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            {auth?.user ? (
                                <div className="flex items-center space-x-4">
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-900">{auth.user.name}</p>
                                        <Badge variant={auth.user.role === 'admin' ? 'default' : 'secondary'}>
                                            {auth.user.role === 'admin' ? 'Admin' : 'Warga'}
                                        </Badge>
                                    </div>
                                    <Link href="/dashboard">
                                        <Button>Dashboard</Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-3">
                                    <Link href="/login">
                                        <Button variant="outline">Masuk</Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button>Daftar Sekarang</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            🏘️ Laporkan Masalah Infrastruktur Desa Anda
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Platform digital untuk melaporkan kerusakan infrastruktur desa secara online, 
                            real-time, dan terdokumentasi dengan baik. Tingkatkan partisipasi warga dalam 
                            pembangunan desa.
                        </p>
                        
                        {!auth?.user && (
                            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                                <Link href="/register">
                                    <Button size="lg" className="w-full sm:w-auto px-8 py-3 text-lg">
                                        🚀 Mulai Melaporkan
                                    </Button>
                                </Link>
                                <Link href="/login">
                                    <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-3 text-lg">
                                        📊 Login Admin
                                    </Button>
                                </Link>
                            </div>
                        )}
                        
                        {auth?.user && (
                            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                                <Link href="/dashboard">
                                    <Button size="lg" className="w-full sm:w-auto px-8 py-3 text-lg">
                                        📊 Buka Dashboard
                                    </Button>
                                </Link>
                                {auth.user.role === 'warga' && (
                                    <Link href="/reports/create">
                                        <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-3 text-lg">
                                            ➕ Buat Laporan Baru
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                            ✨ Fitur Unggulan ASDES
                        </h3>
                        <p className="text-lg text-gray-600">
                            Solusi lengkap untuk pelaporan dan pengelolaan infrastruktur desa
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Warga Features */}
                        <Card className="border-l-4 border-l-blue-500">
                            <CardHeader>
                                <div className="flex items-center space-x-3">
                                    <Users className="h-8 w-8 text-blue-600" />
                                    <CardTitle className="text-blue-900">Untuk Warga</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-start space-x-3">
                                    <FileText className="h-5 w-5 text-gray-500 mt-0.5" />
                                    <div>
                                        <p className="font-medium">Buat Laporan</p>
                                        <p className="text-sm text-gray-600">Laporkan masalah infrastruktur dengan detail lengkap</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Eye className="h-5 w-5 text-gray-500 mt-0.5" />
                                    <div>
                                        <p className="font-medium">Pantau Status</p>
                                        <p className="text-sm text-gray-600">Lacak progress penanganan laporan Anda</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                                    <div>
                                        <p className="font-medium">Riwayat Laporan</p>
                                        <p className="text-sm text-gray-600">Akses semua laporan yang pernah dibuat</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Admin Features */}
                        <Card className="border-l-4 border-l-green-500">
                            <CardHeader>
                                <div className="flex items-center space-x-3">
                                    <Shield className="h-8 w-8 text-green-600" />
                                    <CardTitle className="text-green-900">Untuk Admin</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-start space-x-3">
                                    <Settings className="h-5 w-5 text-gray-500 mt-0.5" />
                                    <div>
                                        <p className="font-medium">Kelola Laporan</p>
                                        <p className="text-sm text-gray-600">Update status dan berikan tanggapan</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Users className="h-5 w-5 text-gray-500 mt-0.5" />
                                    <div>
                                        <p className="font-medium">Manajemen User</p>
                                        <p className="text-sm text-gray-600">Kelola akun warga dan admin</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="h-5 w-5 text-gray-500 mt-0.5" />
                                    <div>
                                        <p className="font-medium">Dashboard Admin</p>
                                        <p className="text-sm text-gray-600">Monitor statistik dan aktivitas</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Categories */}
                        <Card className="border-l-4 border-l-orange-500">
                            <CardHeader>
                                <div className="flex items-center space-x-3">
                                    <AlertTriangle className="h-8 w-8 text-orange-600" />
                                    <CardTitle className="text-orange-900">Kategori Laporan</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Badge variant="outline">🛣️ Jalan</Badge>
                                <Badge variant="outline">🌉 Jembatan</Badge>
                                <Badge variant="outline">💧 Drainase</Badge>
                                <Badge variant="outline">🏢 Fasilitas Umum</Badge>
                                <Badge variant="outline">💡 Penerangan</Badge>
                                <Badge variant="outline">📋 Lainnya</Badge>
                                <p className="text-sm text-gray-600 pt-2">
                                    Kategori lengkap untuk semua jenis infrastruktur desa
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                            🎯 Tujuan Aplikasi ASDES
                        </h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl text-blue-900">🎯 Tujuan Utama</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                    <p className="text-gray-700">
                                        Mempermudah pelaporan masalah infrastruktur oleh warga secara online, 
                                        real-time, dan terdokumentasi dengan baik
                                    </p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                    <p className="text-gray-700">
                                        Meningkatkan transparansi dan akuntabilitas pemerintah desa dalam 
                                        menindaklanjuti laporan warga
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl text-green-900">📈 Manfaat</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                    <p className="text-gray-700">
                                        Menyediakan dashboard monitoring untuk pemerintah desa dalam 
                                        memetakan masalah dan prioritas pembangunan
                                    </p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                    <p className="text-gray-700">
                                        Memperkuat partisipasi masyarakat dalam pembangunan desa 
                                        sesuai prinsip good governance
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-3xl font-bold text-white mb-4">
                        🤝 Mari Bersama Membangun Desa yang Lebih Baik
                    </h3>
                    <p className="text-xl text-blue-100 mb-8">
                        Bergabunglah dengan ASDES dan menjadi bagian dari transformasi digital desa. 
                        Laporkan masalah, pantau progress, dan wujudkan desa yang lebih maju.
                    </p>
                    
                    {!auth?.user && (
                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <Link href="/register">
                                <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8 py-3 text-lg">
                                    ✨ Daftar Sebagai Warga
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-3 text-lg border-white text-white hover:bg-white hover:text-blue-600">
                                    🔐 Login Admin
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-3 mb-4 md:mb-0">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <MapPin className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="font-semibold text-white">ASDES</p>
                                <p className="text-sm text-gray-400">Aspirasi Desa</p>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm">
                            © 2024 ASDES. Platform digital untuk pembangunan desa yang berkelanjutan.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}