import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
    MapPin, 
    Home, 
    FileText, 
    Users, 
    LogOut,
    Menu,
    X
} from 'lucide-react';
import { type BreadcrumbItem } from '@/types';

interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'warga';
}

interface Props {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs }: Props) {
    const { auth } = usePage<{ auth: { user: User } }>().props;
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    
    const navigation = [
        { 
            name: 'Dashboard', 
            href: auth.user.role === 'admin' ? '/admin/dashboard' : '/dashboard', 
            icon: Home 
        },
        ...(auth.user.role === 'warga' ? [
            { name: 'Laporan Saya', href: '/reports', icon: FileText },
            { name: 'Buat Laporan', href: '/reports/create', icon: FileText },
        ] : []),
        ...(auth.user.role === 'admin' ? [
            { name: 'Kelola Laporan', href: '/admin/reports', icon: FileText },
            { name: 'Kelola User', href: '/admin/users', icon: Users },
        ] : []),
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navigation */}
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            {/* Mobile menu button */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                            >
                                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </Button>

                            {/* Logo */}
                            <Link href="/" className="flex items-center space-x-3 ml-2 md:ml-0">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <MapPin className="h-5 w-5 text-white" />
                                </div>
                                <div className="hidden sm:block">
                                    <h1 className="text-xl font-bold text-gray-900">ASDES</h1>
                                    <p className="text-xs text-gray-600">Aspirasi Desa</p>
                                </div>
                            </Link>
                        </div>

                        {/* User menu */}
                        <div className="flex items-center space-x-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-gray-900">{auth.user.name}</p>
                                <Badge variant={auth.user.role === 'admin' ? 'default' : 'secondary'}>
                                    {auth.user.role === 'admin' ? 'Admin' : 'Warga'}
                                </Badge>
                            </div>
                            
                            <Link href="/logout" method="post" as="button">
                                <Button variant="outline" size="sm">
                                    <LogOut className="w-4 h-4 mr-2" />
                                    <span className="hidden sm:inline">Logout</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex">
                {/* Sidebar */}
                <aside className={`${sidebarOpen ? 'block' : 'hidden'} md:block w-64 bg-white shadow-sm border-r min-h-screen`}>
                    <nav className="mt-8">
                        <div className="px-4 space-y-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
                                >
                                    <item.icon className="mr-3 h-5 w-5" />
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </nav>
                </aside>

                {/* Main content */}
                <main className="flex-1 p-8">
                    {/* Breadcrumbs */}
                    {breadcrumbs && breadcrumbs.length > 0 && (
                        <nav className="flex mb-6" aria-label="Breadcrumb">
                            <ol className="flex items-center space-x-2">
                                {breadcrumbs.map((item, index) => (
                                    <li key={item.href} className="flex items-center">
                                        {index > 0 && (
                                            <span className="text-gray-400 mr-2">/</span>
                                        )}
                                        {index === breadcrumbs.length - 1 ? (
                                            <span className="text-gray-900 font-medium">{item.title}</span>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                className="text-gray-500 hover:text-gray-700"
                                            >
                                                {item.title}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ol>
                        </nav>
                    )}

                    {/* Page content */}
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}