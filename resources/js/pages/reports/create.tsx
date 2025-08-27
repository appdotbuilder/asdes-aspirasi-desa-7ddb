import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type BreadcrumbItem } from '@/types';
import { Save, AlertTriangle } from 'lucide-react';



const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Buat Laporan', href: '/reports/create' },
];

const categories = [
    { value: 'jalan', label: '🛣️ Jalan' },
    { value: 'jembatan', label: '🌉 Jembatan' },
    { value: 'drainase', label: '💧 Drainase' },
    { value: 'fasilitas_umum', label: '🏢 Fasilitas Umum' },
    { value: 'penerangan', label: '💡 Penerangan' },
    { value: 'lainnya', label: '📋 Lainnya' },
];

const priorities = [
    { value: 'rendah', label: 'Rendah' },
    { value: 'sedang', label: 'Sedang' },
    { value: 'tinggi', label: 'Tinggi' },
    { value: 'mendesak', label: 'Mendesak' },
];

export default function CreateReport() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        location: '',
        category: '',
        priority: 'sedang',
        reporter_name: '',
        reporter_phone: '',
        reporter_email: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/reports');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buat Laporan Baru" />
            
            <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">📝 Buat Laporan Baru</h1>
                    <p className="text-gray-600">
                        Laporkan masalah infrastruktur desa dengan lengkap dan detail untuk 
                        membantu penanganan yang tepat.
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <AlertTriangle className="h-5 w-5 text-orange-500" />
                            <span>Formulir Laporan</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Basic Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                                    🔍 Informasi Masalah
                                </h3>
                                
                                <div>
                                    <Label htmlFor="title">Judul Laporan *</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Contoh: Jalan rusak di depan balai desa"
                                        className={errors.title ? 'border-red-500' : ''}
                                        required
                                    />
                                    {errors.title && (
                                        <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="description">Deskripsi Masalah *</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Jelaskan masalah secara detail..."
                                        rows={4}
                                        className={errors.description ? 'border-red-500' : ''}
                                        required
                                    />
                                    {errors.description && (
                                        <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                                    )}
                                    <p className="text-gray-500 text-sm mt-1">Minimal 10 karakter</p>
                                </div>

                                <div>
                                    <Label htmlFor="location">Lokasi *</Label>
                                    <Input
                                        id="location"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        placeholder="Contoh: Jl. Desa Raya No. 15, RT 02 RW 01"
                                        className={errors.location ? 'border-red-500' : ''}
                                        required
                                    />
                                    {errors.location && (
                                        <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label>Kategori Infrastruktur *</Label>
                                        <Select value={data.category} onValueChange={(value) => setData('category', value)}>
                                            <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Pilih kategori..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem key={category.value} value={category.value}>
                                                        {category.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.category && (
                                            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label>Tingkat Prioritas *</Label>
                                        <Select value={data.priority} onValueChange={(value) => setData('priority', value)}>
                                            <SelectTrigger className={errors.priority ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Pilih prioritas..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {priorities.map((priority) => (
                                                    <SelectItem key={priority.value} value={priority.value}>
                                                        {priority.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.priority && (
                                            <p className="text-red-500 text-sm mt-1">{errors.priority}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Reporter Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                                    👤 Informasi Pelapor
                                </h3>
                                
                                <div>
                                    <Label htmlFor="reporter_name">Nama Lengkap *</Label>
                                    <Input
                                        id="reporter_name"
                                        value={data.reporter_name}
                                        onChange={(e) => setData('reporter_name', e.target.value)}
                                        placeholder="Masukkan nama lengkap Anda"
                                        className={errors.reporter_name ? 'border-red-500' : ''}
                                        required
                                    />
                                    {errors.reporter_name && (
                                        <p className="text-red-500 text-sm mt-1">{errors.reporter_name}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="reporter_phone">Nomor Telepon *</Label>
                                        <Input
                                            id="reporter_phone"
                                            value={data.reporter_phone}
                                            onChange={(e) => setData('reporter_phone', e.target.value)}
                                            placeholder="08xxxxxxxxxx"
                                            className={errors.reporter_phone ? 'border-red-500' : ''}
                                            required
                                        />
                                        {errors.reporter_phone && (
                                            <p className="text-red-500 text-sm mt-1">{errors.reporter_phone}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="reporter_email">Email *</Label>
                                        <Input
                                            id="reporter_email"
                                            type="email"
                                            value={data.reporter_email}
                                            onChange={(e) => setData('reporter_email', e.target.value)}
                                            placeholder="nama@email.com"
                                            className={errors.reporter_email ? 'border-red-500' : ''}
                                            required
                                        />
                                        {errors.reporter_email && (
                                            <p className="text-red-500 text-sm mt-1">{errors.reporter_email}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                                <p className="text-sm text-gray-500">
                                    Semua field dengan tanda * wajib diisi
                                </p>
                                <Button 
                                    type="submit" 
                                    disabled={processing}
                                    className="px-6"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    {processing ? 'Mengirim...' : 'Kirim Laporan'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}