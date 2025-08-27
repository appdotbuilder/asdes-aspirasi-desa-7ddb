import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type BreadcrumbItem } from '@/types';
import { 
    FileText, 
    Clock, 
    AlertCircle, 
    CheckCircle, 
    XCircle,
    Users,
    TrendingUp,
    Eye,
    Calendar,
    MapPin
} from 'lucide-react';

interface Report {
    id: number;
    title: string;
    status: string;
    priority: string;
    category: string;
    location: string;
    created_at: string;
    reporter_name: string;
    user: {
        name: string;
    };
}

interface Stats {
    total_reports: number;
    pending_reports: number;
    in_progress_reports: number;
    completed_reports: number;
    rejected_reports: number;
    total_users: number;
}

interface Props {
    stats: Stats;
    recent_reports: Report[];
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard Admin', href: '/admin/dashboard' },
];

const statusConfig = {
    menunggu: {
        label: 'Menunggu',
        color: 'text-yellow-600 border-yellow-600',
        icon: Clock
    },
    sedang_ditangani: {
        label: 'Sedang Ditangani',
        color: 'text-blue-600 border-blue-600',
        icon: AlertCircle
    },
    selesai: {
        label: 'Selesai',
        color: 'text-green-600 border-green-600',
        icon: CheckCircle
    },
    ditolak: {
        label: 'Ditolak',
        color: 'text-red-600 border-red-600',
        icon: XCircle
    },
};

const priorityColors = {
    mendesak: 'bg-red-100 text-red-800',
    tinggi: 'bg-orange-100 text-orange-800',
    sedang: 'bg-gray-100 text-gray-800',
    rendah: 'bg-gray-50 text-gray-600',
};

const categoryLabels = {
    jalan: '🛣️ Jalan',
    jembatan: '🌉 Jembatan',
    drainase: '💧 Drainase',
    fasilitas_umum: '🏢 Fasilitas Umum',
    penerangan: '💡 Penerangan',
    lainnya: '📋 Lainnya',
};

export default function AdminDashboard({ stats, recent_reports }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Admin" />
            
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">🛠️ Dashboard Admin</h1>
                        <p className="text-gray-600 mt-1">
                            Kelola dan pantau laporan infrastruktur desa
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Laporan</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_reports}</div>
                            <p className="text-xs text-muted-foreground">
                                Semua laporan masuk
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Menunggu</CardTitle>
                            <Clock className="h-4 w-4 text-yellow-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-600">{stats.pending_reports}</div>
                            <p className="text-xs text-muted-foreground">
                                Perlu ditinjau
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Sedang Ditangani</CardTitle>
                            <AlertCircle className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{stats.in_progress_reports}</div>
                            <p className="text-xs text-muted-foreground">
                                Dalam proses
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Selesai</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{stats.completed_reports}</div>
                            <p className="text-xs text-muted-foreground">
                                Berhasil ditangani
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Ditolak</CardTitle>
                            <XCircle className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{stats.rejected_reports}</div>
                            <p className="text-xs text-muted-foreground">
                                Tidak dapat ditangani
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Warga</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_users}</div>
                            <p className="text-xs text-muted-foreground">
                                User terdaftar
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Stats Summary */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <TrendingUp className="w-5 h-5" />
                                <span>📊 Ringkasan Performa</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Tingkat Penyelesaian</span>
                                    <div className="text-right">
                                        <span className="font-semibold text-green-600">
                                            {stats.total_reports > 0 
                                                ? Math.round((stats.completed_reports / stats.total_reports) * 100)
                                                : 0
                                            }%
                                        </span>
                                        <div className="text-xs text-gray-500">
                                            {stats.completed_reports} dari {stats.total_reports}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Laporan Pending</span>
                                    <div className="text-right">
                                        <span className="font-semibold text-yellow-600">
                                            {stats.pending_reports}
                                        </span>
                                        <div className="text-xs text-gray-500">
                                            Memerlukan tindakan
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Dalam Proses</span>
                                    <div className="text-right">
                                        <span className="font-semibold text-blue-600">
                                            {stats.in_progress_reports}
                                        </span>
                                        <div className="text-xs text-gray-500">
                                            Sedang dikerjakan
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>⚡ Aksi Cepat</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <Link href="/admin/reports?status=menunggu">
                                    <Button className="w-full h-16 flex flex-col items-center space-y-1" variant="outline">
                                        <Clock className="w-5 h-5" />
                                        <span className="text-sm">Review Laporan</span>
                                        {stats.pending_reports > 0 && (
                                            <Badge variant="secondary" className="text-xs">
                                                {stats.pending_reports}
                                            </Badge>
                                        )}
                                    </Button>
                                </Link>
                                
                                <Link href="/admin/reports">
                                    <Button className="w-full h-16 flex flex-col items-center space-y-1" variant="outline">
                                        <FileText className="w-5 h-5" />
                                        <span className="text-sm">Semua Laporan</span>
                                    </Button>
                                </Link>

                                <Link href="/admin/users">
                                    <Button className="w-full h-16 flex flex-col items-center space-y-1" variant="outline">
                                        <Users className="w-5 h-5" />
                                        <span className="text-sm">Kelola User</span>
                                    </Button>
                                </Link>

                                <Link href="/admin/reports?status=sedang_ditangani">
                                    <Button className="w-full h-16 flex flex-col items-center space-y-1" variant="outline">
                                        <AlertCircle className="w-5 h-5" />
                                        <span className="text-sm">Dalam Proses</span>
                                        {stats.in_progress_reports > 0 && (
                                            <Badge variant="secondary" className="text-xs">
                                                {stats.in_progress_reports}
                                            </Badge>
                                        )}
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Reports */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>📋 Laporan Terbaru</CardTitle>
                        <Link href="/admin/reports">
                            <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-2" />
                                Lihat Semua
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        {recent_reports.length > 0 ? (
                            <div className="space-y-4">
                                {recent_reports.map((report) => {
                                    const statusInfo = statusConfig[report.status as keyof typeof statusConfig];
                                    return (
                                        <div key={report.id} className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <h3 className="font-semibold text-gray-900 truncate">
                                                        {report.title}
                                                    </h3>
                                                    <Badge variant="outline" className={statusInfo.color}>
                                                        {statusInfo.label}
                                                    </Badge>
                                                    <Badge className={priorityColors[report.priority as keyof typeof priorityColors]}>
                                                        {report.priority.charAt(0).toUpperCase() + report.priority.slice(1)}
                                                    </Badge>
                                                </div>
                                                <div className="space-y-1 text-sm text-gray-600">
                                                    <div className="flex items-center space-x-4">
                                                        <span>{categoryLabels[report.category as keyof typeof categoryLabels]}</span>
                                                        <span className="flex items-center space-x-1">
                                                            <MapPin className="w-3 h-3" />
                                                            <span>{report.location}</span>
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-4">
                                                        <span>👤 {report.reporter_name}</span>
                                                        <span className="flex items-center space-x-1">
                                                            <Calendar className="w-3 h-3" />
                                                            <span>{formatDate(report.created_at)}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Link href={`/admin/reports/${report.id}`}>
                                                <Button variant="outline" size="sm">
                                                    Detail
                                                </Button>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500">Belum ada laporan yang masuk</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}