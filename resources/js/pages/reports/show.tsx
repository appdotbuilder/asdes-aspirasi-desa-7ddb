import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type BreadcrumbItem } from '@/types';
import { 
    ArrowLeft, 
    Trash2, 
    User, 
    Phone, 
    Mail, 
    MapPin,
    AlertTriangle,
    Clock,
    CheckCircle,
    XCircle,
    FileText,
    Flag
} from 'lucide-react';

interface Report {
    id: number;
    title: string;
    description: string;
    location: string;
    category: string;
    priority: string;
    status: string;
    reporter_name: string;
    reporter_phone: string;
    reporter_email: string;
    admin_notes: string | null;
    created_at: string;
    updated_at: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
}

interface Props {
    report: Report;
    [key: string]: unknown;
}

const statusConfig = {
    menunggu: {
        label: 'Menunggu',
        color: 'text-yellow-600 border-yellow-600',
        icon: Clock,
        bgColor: 'bg-yellow-50'
    },
    sedang_ditangani: {
        label: 'Sedang Ditangani',
        color: 'text-blue-600 border-blue-600',
        icon: AlertTriangle,
        bgColor: 'bg-blue-50'
    },
    selesai: {
        label: 'Selesai',
        color: 'text-green-600 border-green-600',
        icon: CheckCircle,
        bgColor: 'bg-green-50'
    },
    ditolak: {
        label: 'Ditolak',
        color: 'text-red-600 border-red-600',
        icon: XCircle,
        bgColor: 'bg-red-50'
    },
};

const priorityConfig = {
    mendesak: { label: 'Mendesak', color: 'bg-red-100 text-red-800' },
    tinggi: { label: 'Tinggi', color: 'bg-orange-100 text-orange-800' },
    sedang: { label: 'Sedang', color: 'bg-gray-100 text-gray-800' },
    rendah: { label: 'Rendah', color: 'bg-gray-50 text-gray-600' },
};

const categoryConfig = {
    jalan: { label: 'Jalan', icon: '🛣️' },
    jembatan: { label: 'Jembatan', icon: '🌉' },
    drainase: { label: 'Drainase', icon: '💧' },
    fasilitas_umum: { label: 'Fasilitas Umum', icon: '🏢' },
    penerangan: { label: 'Penerangan', icon: '💡' },
    lainnya: { label: 'Lainnya', icon: '📋' },
};

export default function ShowReport({ report }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Laporan Saya', href: '/reports' },
        { title: report.title, href: `/reports/${report.id}` },
    ];

    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus laporan ini?')) {
            router.delete(`/reports/${report.id}`);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const statusInfo = statusConfig[report.status as keyof typeof statusConfig];
    const StatusIcon = statusInfo.icon;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Laporan: ${report.title}`} />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <Link href="/reports">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Kembali ke Daftar Laporan
                        </Button>
                    </Link>

                    {report.status === 'menunggu' && (
                        <Button variant="destructive" size="sm" onClick={handleDelete}>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Hapus Laporan
                        </Button>
                    )}
                </div>

                {/* Status Banner */}
                <Card className={`border-l-4 ${statusInfo.bgColor}`}>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <StatusIcon className="w-6 h-6 text-gray-600" />
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Status Laporan</h2>
                                    <Badge variant="outline" className={`${statusInfo.color} mt-1`}>
                                        {statusInfo.label}
                                    </Badge>
                                </div>
                            </div>
                            <Badge className={priorityConfig[report.priority as keyof typeof priorityConfig].color}>
                                <Flag className="w-3 h-3 mr-1" />
                                {priorityConfig[report.priority as keyof typeof priorityConfig].label}
                            </Badge>
                        </div>
                        
                        {report.admin_notes && (
                            <div className="mt-4 p-4 bg-white rounded-lg border">
                                <h4 className="font-semibold text-gray-900 mb-2">💬 Catatan Admin</h4>
                                <p className="text-gray-700">{report.admin_notes}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Report Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <FileText className="w-5 w-5" />
                                    <span>Detail Laporan</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{report.title}</h3>
                                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                                        <span className="flex items-center space-x-1">
                                            <span>{categoryConfig[report.category as keyof typeof categoryConfig].icon}</span>
                                            <span>{categoryConfig[report.category as keyof typeof categoryConfig].label}</span>
                                        </span>
                                        <span className="flex items-center space-x-1">
                                            <MapPin className="w-4 h-4" />
                                            <span>{report.location}</span>
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">📝 Deskripsi Masalah</h4>
                                    <div className="prose prose-sm max-w-none">
                                        <p className="text-gray-700 whitespace-pre-line">{report.description}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Timeline */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Clock className="w-5 h-5" />
                                    <span>Timeline</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="font-medium text-gray-900">Laporan dibuat</p>
                                                <time className="text-sm text-gray-500">
                                                    {formatDate(report.created_at)}
                                                </time>
                                            </div>
                                            <p className="text-gray-600">Laporan telah berhasil dikirim</p>
                                        </div>
                                    </div>

                                    {report.updated_at !== report.created_at && (
                                        <div className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="font-medium text-gray-900">Status diperbarui</p>
                                                    <time className="text-sm text-gray-500">
                                                        {formatDate(report.updated_at)}
                                                    </time>
                                                </div>
                                                <p className="text-gray-600">Status diubah menjadi "{statusInfo.label}"</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Reporter Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <User className="w-5 h-5" />
                                    <span>Info Pelapor</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <User className="w-4 h-4 text-gray-500" />
                                    <div>
                                        <p className="font-medium text-gray-900">{report.reporter_name}</p>
                                        <p className="text-sm text-gray-600">Nama Pelapor</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Phone className="w-4 h-4 text-gray-500" />
                                    <div>
                                        <p className="font-medium text-gray-900">{report.reporter_phone}</p>
                                        <p className="text-sm text-gray-600">Nomor Telepon</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Mail className="w-4 h-4 text-gray-500" />
                                    <div>
                                        <p className="font-medium text-gray-900">{report.reporter_email}</p>
                                        <p className="text-sm text-gray-600">Email</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>📊 Ringkasan</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">ID Laporan</span>
                                    <span className="font-mono text-sm">#AST-{report.id.toString().padStart(4, '0')}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Kategori</span>
                                    <span>{categoryConfig[report.category as keyof typeof categoryConfig].icon} {categoryConfig[report.category as keyof typeof categoryConfig].label}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Prioritas</span>
                                    <Badge className={priorityConfig[report.priority as keyof typeof priorityConfig].color}>
                                        {priorityConfig[report.priority as keyof typeof priorityConfig].label}
                                    </Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Status</span>
                                    <Badge variant="outline" className={statusInfo.color}>
                                        {statusInfo.label}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>🚀 Aksi Cepat</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Link href="/reports/create" className="block">
                                    <Button className="w-full" variant="outline">
                                        Buat Laporan Baru
                                    </Button>
                                </Link>
                                <Link href="/reports" className="block">
                                    <Button className="w-full" variant="outline">
                                        Lihat Semua Laporan
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}