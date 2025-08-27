// Helper function for route names
// This is a simple implementation that works with our Laravel routes
export function route(name: string, params: number | Record<string, unknown> = {}): string {
    const routes: Record<string, string | ((id: number) => string)> = {
        'reports.store': '/reports',
        'reports.show': (id: number) => `/reports/${id}`,
        'reports.destroy': (id: number) => `/reports/${id}`,
        'admin.reports.update-status': (id: number) => `/admin/reports/${id}/status`,
    };

    const routePattern = routes[name];
    if (typeof routePattern === 'function') {
        return routePattern(params as number);
    }
    return routePattern as string || name;
}

// Make it globally available
declare global {
    interface Window {
        route: typeof route;
    }
}

if (typeof window !== 'undefined') {
    window.route = route;
}