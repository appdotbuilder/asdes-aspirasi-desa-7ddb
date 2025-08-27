import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type BreadcrumbItem } from '@/types';
import { 
    FileText, 
    Eye, 
    Calendar,
    MapPin,
    User,
    Clock,
    AlertTriangle,
    CheckCircle,
    XCircle
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
        id: number;
        name: string;
        email: string;
    };
}

interface PaginationLinks {
    url: string | null;
    label: string;
    active: boolean;
}

interface ReportsData {
    data: Report[];
    links: PaginationLinks[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    reports: ReportsData;
    filters: {
        status?: string;
        category?: string;
        priority?: string;
        search?: string;
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard Admin', href: '/admin/dashboard' },
    { title: 'Kelola Laporan', href: '/admin/reports' },
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
        icon: AlertTriangle
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

export default function AdminReports({ reports }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Laporan - Admin" />
            
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">📋 Kelola Laporan</h1>
                        <p className="text-gray-600 mt-1">
                            Total {reports.total} laporan ditemukan
                        </p>
                    </div>
                </div>

                {/* Reports List */}
                {reports.data.length > 0 ? (
                    <div className="space-y-4">
                        {reports.data.map((report) => {
                            const statusInfo = statusConfig[report.status as keyof typeof statusConfig];
                            const StatusIcon = statusInfo.icon;
                            
                            return (
                                <Card key={report.id} className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between mb-3">
                                                    <h3 className="text-lg font-semibold text-gray-900 pr-2">
                                                        {report.title}
                                                    </h3>
                                                    <div className="flex items-center space-x-2 flex-shrink-0">
                                                        <Badge variant="outline" className={statusInfo.color}>
                                                            <StatusIcon className="w-3 h-3 mr-1" />
                                                            <span>{statusInfo.label}</span>
                                                        </Badge>
                                                        <Badge className={priorityColors[report.priority as keyof typeof priorityColors]}>
                                                            {report.priority.charAt(0).toUpperCase() + report.priority.slice(1)}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                
                                                <div className="space-y-2 text-sm text-gray-600">
                                                    <div className="flex items-center space-x-2">
                                                        <span className="font-medium">
                                                            {categoryLabels[report.category as keyof typeof categoryLabels]}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <MapPin className="w-4 h-4" />
                                                        <span>{report.location}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-4">
                                                        <div className="flex items-center space-x-1">
                                                            <User className="w-4 h-4" />
                                                            <span>{report.reporter_name}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-1">
                                                            <Calendar className="w-4 h-4" />
                                                            <span>{formatDate(report.created_at)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex-shrink-0">
                                                <Button variant="outline">
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    Detail & Kelola
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}

                        {/* Pagination */}
                        {reports.last_page > 1 && (
                            <div className="flex items-center justify-center space-x-2">
                                {reports.links.map((link, index) => (
                                    <React.Fragment key={index}>
                                        {link.url ? (
                                            <Link 
                                                href={link.url}
                                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                                    link.active 
                                                        ? 'bg-blue-600 text-white' 
                                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <span 
                                                className="px-3 py-2 rounded-md text-sm font-medium text-gray-400"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="text-center py-12">
                            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada laporan</h3>
                            <p className="text-gray-500 mb-6">
                                Belum ada laporan yang masuk dari warga.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}