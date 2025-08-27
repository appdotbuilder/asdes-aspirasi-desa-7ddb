import React from 'react';
import { Link, Head } from '@inertiajs/react';
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
    Plus,
    Eye
} from 'lucide-react';

interface Report {
    id: number;
    title: string;
    status: string;
    priority: string;
    category: string;
    location: string;
    created_at: string;
}

interface Stats {
    total_reports: number;
    pending_reports: number;
    in_progress_reports: number;
    completed_reports: number;
    rejected_reports: number;
}

interface Props {
    stats: Stats;
    recent_reports: Report[];
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ stats, recent_reports }: Props) {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'menunggu':
                return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Menunggu</Badge>;
            case 'sedang_ditangani':
                return <Badge variant="outline" className="text-blue-600 border-blue-600">Sedang Ditangani</Badge>;
            case 'selesai':
                return <Badge variant="outline" className="text-green-600 border-green-600">Selesai</Badge>;
            case 'ditolak':
                return <Badge variant="outline" className="text-red-600 border-red-600">Ditolak</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const getPriorityBadge = (priority: string) => {
        switch (priority) {
            case 'mendesak':
                return <Badge variant="destructive">Mendesak</Badge>;
            case 'tinggi':
                return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Tinggi</Badge>;
            case 'sedang':
                return <Badge variant="outline">Sedang</Badge>;
            case 'rendah':
                return <Badge variant="outline" className="text-gray-500 border-gray-300">Rendah</Badge>;
            default:
                return <Badge variant="outline">{priority}</Badge>;
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Warga" />
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">🏠 Dashboard Warga</h1>
                    <Link href="/reports/create">
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Buat Laporan Baru
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Laporan</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_reports}</div>
                            <p className="text-xs text-muted-foreground">
                                Semua laporan Anda
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
                                Sedang menunggu review
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
                                Dalam proses perbaikan
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
                                Masalah sudah diselesaikan
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
                                Laporan tidak diterima
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Reports */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>📋 Laporan Terbaru</CardTitle>
                        <Link href="/reports">
                            <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-2" />
                                Lihat Semua
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        {recent_reports.length > 0 ? (
                            <div className="space-y-4">
                                {recent_reports.map((report) => (
                                    <div key={report.id} className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <h3 className="font-semibold text-gray-900 truncate">
                                                    {report.title}
                                                </h3>
                                                {getStatusBadge(report.status)}
                                                {getPriorityBadge(report.priority)}
                                            </div>
                                            <p className="text-sm text-gray-600 mb-1">
                                                📍 {report.location}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {formatDate(report.created_at)}
                                            </p>
                                        </div>
                                        <Link href={`/reports/${report.id}`}>
                                            <Button variant="outline" size="sm">
                                                Detail
                                            </Button>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 mb-4">Belum ada laporan yang dibuat</p>
                                <Link href="/reports/create">
                                    <Button>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Buat Laporan Pertama
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>⚡ Aksi Cepat</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Link href="/reports/create">
                                <Button className="w-full h-20 flex flex-col items-center space-y-2">
                                    <Plus className="w-6 h-6" />
                                    <span>Buat Laporan</span>
                                </Button>
                            </Link>
                            
                            <Link href="/reports">
                                <Button variant="outline" className="w-full h-20 flex flex-col items-center space-y-2">
                                    <FileText className="w-6 h-6" />
                                    <span>Riwayat Laporan</span>
                                </Button>
                            </Link>

                            <Link href="/reports?status=menunggu">
                                <Button variant="outline" className="w-full h-20 flex flex-col items-center space-y-2">
                                    <Clock className="w-6 h-6" />
                                    <span>Laporan Menunggu</span>
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}