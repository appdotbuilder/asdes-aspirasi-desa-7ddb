import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type BreadcrumbItem } from '@/types';
import { 
    FileText, 
    Plus, 
    Search, 
    Filter,
    Eye,
    Calendar,
    MapPin,
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
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Laporan Saya', href: '/reports' },
];

const statusColors = {
    menunggu: 'text-yellow-600 border-yellow-600',
    sedang_ditangani: 'text-blue-600 border-blue-600',
    selesai: 'text-green-600 border-green-600',
    ditolak: 'text-red-600 border-red-600',
};

const statusLabels = {
    menunggu: 'Menunggu',
    sedang_ditangani: 'Sedang Ditangani',
    selesai: 'Selesai',
    ditolak: 'Ditolak',
};

const priorityColors = {
    mendesak: 'bg-red-100 text-red-800',
    tinggi: 'bg-orange-100 text-orange-800',
    sedang: 'bg-gray-100 text-gray-800',
    rendah: 'bg-gray-50 text-gray-600',
};

const priorityLabels = {
    mendesak: 'Mendesak',
    tinggi: 'Tinggi',
    sedang: 'Sedang',
    rendah: 'Rendah',
};

const categoryLabels = {
    jalan: '🛣️ Jalan',
    jembatan: '🌉 Jembatan',
    drainase: '💧 Drainase',
    fasilitas_umum: '🏢 Fasilitas Umum',
    penerangan: '💡 Penerangan',
    lainnya: '📋 Lainnya',
};

export default function ReportsIndex({ reports, filters }: Props) {
    const [search, setSearch] = React.useState(filters.search || '');
    const [status, setStatus] = React.useState(filters.status || '');
    const [category, setCategory] = React.useState(filters.category || '');
    const [priority, setPriority] = React.useState(filters.priority || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/reports', { 
            search, 
            status: status || undefined, 
            category: category || undefined,
            priority: priority || undefined,
        }, { 
            preserveState: true 
        });
    };

    const clearFilters = () => {
        setSearch('');
        setStatus('');
        setCategory('');
        setPriority('');
        router.get('/reports');
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'menunggu':
                return <Clock className="w-4 h-4" />;
            case 'sedang_ditangani':
                return <AlertTriangle className="w-4 h-4" />;
            case 'selesai':
                return <CheckCircle className="w-4 h-4" />;
            case 'ditolak':
                return <XCircle className="w-4 h-4" />;
            default:
                return <FileText className="w-4 h-4" />;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Laporan Saya" />
            
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">📋 Laporan Saya</h1>
                        <p className="text-gray-600 mt-1">
                            Total {reports.total} laporan ditemukan
                        </p>
                    </div>
                    <Link href="/reports/create">
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Buat Laporan Baru
                        </Button>
                    </Link>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Filter className="w-5 h-5" />
                            <span>Filter & Pencarian</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSearch} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                                        Pencarian
                                    </label>
                                    <Input
                                        placeholder="Cari judul, lokasi..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full"
                                    />
                                </div>
                                
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                                        Status
                                    </label>
                                    <Select value={status} onValueChange={setStatus}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Semua status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="">Semua Status</SelectItem>
                                            <SelectItem value="menunggu">Menunggu</SelectItem>
                                            <SelectItem value="sedang_ditangani">Sedang Ditangani</SelectItem>
                                            <SelectItem value="selesai">Selesai</SelectItem>
                                            <SelectItem value="ditolak">Ditolak</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                                        Kategori
                                    </label>
                                    <Select value={category} onValueChange={setCategory}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Semua kategori" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="">Semua Kategori</SelectItem>
                                            <SelectItem value="jalan">🛣️ Jalan</SelectItem>
                                            <SelectItem value="jembatan">🌉 Jembatan</SelectItem>
                                            <SelectItem value="drainase">💧 Drainase</SelectItem>
                                            <SelectItem value="fasilitas_umum">🏢 Fasilitas Umum</SelectItem>
                                            <SelectItem value="penerangan">💡 Penerangan</SelectItem>
                                            <SelectItem value="lainnya">📋 Lainnya</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                                        Prioritas
                                    </label>
                                    <Select value={priority} onValueChange={setPriority}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Semua prioritas" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="">Semua Prioritas</SelectItem>
                                            <SelectItem value="mendesak">Mendesak</SelectItem>
                                            <SelectItem value="tinggi">Tinggi</SelectItem>
                                            <SelectItem value="sedang">Sedang</SelectItem>
                                            <SelectItem value="rendah">Rendah</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <Button type="submit">
                                    <Search className="w-4 h-4 mr-2" />
                                    Cari
                                </Button>
                                <Button type="button" variant="outline" onClick={clearFilters}>
                                    Reset Filter
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Reports List */}
                {reports.data.length > 0 ? (
                    <div className="space-y-4">
                        {reports.data.map((report) => (
                            <Card key={report.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between mb-3">
                                                <h3 className="text-lg font-semibold text-gray-900 pr-2">
                                                    {report.title}
                                                </h3>
                                                <div className="flex items-center space-x-2 flex-shrink-0">
                                                    <Badge variant="outline" className={statusColors[report.status as keyof typeof statusColors]}>
                                                        {getStatusIcon(report.status)}
                                                        <span className="ml-1">{statusLabels[report.status as keyof typeof statusLabels]}</span>
                                                    </Badge>
                                                    <Badge className={priorityColors[report.priority as keyof typeof priorityColors]}>
                                                        {priorityLabels[report.priority as keyof typeof priorityLabels]}
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
                                                <div className="flex items-center space-x-2">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{formatDate(report.created_at)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex-shrink-0">
                                            <Link href={`/reports/${report.id}`}>
                                                <Button variant="outline">
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    Detail
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

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
                                {filters.search || filters.status || filters.category || filters.priority
                                    ? 'Tidak ada laporan yang sesuai dengan filter.'
                                    : 'Anda belum membuat laporan apapun.'
                                }
                            </p>
                            {!filters.search && !filters.status && !filters.category && !filters.priority && (
                                <Link href="/reports/create">
                                    <Button>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Buat Laporan Pertama
                                    </Button>
                                </Link>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}