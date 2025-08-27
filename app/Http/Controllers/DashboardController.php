<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Report;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the user dashboard.
     */
    public function index()
    {
        $user = auth()->user();
        
        if ($user->isAdmin()) {
            return redirect()->route('admin.dashboard');
        }
        
        // Warga dashboard
        $stats = [
            'total_reports' => $user->reports()->count(),
            'pending_reports' => $user->reports()->where('status', 'menunggu')->count(),
            'in_progress_reports' => $user->reports()->where('status', 'sedang_ditangani')->count(),
            'completed_reports' => $user->reports()->where('status', 'selesai')->count(),
            'rejected_reports' => $user->reports()->where('status', 'ditolak')->count(),
        ];
        
        $recent_reports = $user->reports()
            ->latest()
            ->take(5)
            ->get();
            
        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recent_reports' => $recent_reports,
        ]);
    }
}