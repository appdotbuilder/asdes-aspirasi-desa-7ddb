<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateReportStatusRequest;
use App\Models\Report;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource (dashboard).
     */
    public function index()
    {
        if (!auth()->user()->isAdmin()) {
            abort(403, 'Akses ditolak. Hanya admin yang dapat mengakses halaman ini.');
        }
        
        $stats = [
            'total_reports' => Report::count(),
            'pending_reports' => Report::where('status', 'menunggu')->count(),
            'in_progress_reports' => Report::where('status', 'sedang_ditangani')->count(),
            'completed_reports' => Report::where('status', 'selesai')->count(),
            'rejected_reports' => Report::where('status', 'ditolak')->count(),
            'total_users' => User::where('role', 'warga')->count(),
        ];
        
        $recent_reports = Report::with('user')
            ->latest()
            ->take(5)
            ->get();
            
        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recent_reports' => $recent_reports,
        ]);
    }

    /**
     * Show the form for creating a new resource (reports listing).
     */
    public function create(Request $request)
    {
        if (!auth()->user()->isAdmin()) {
            abort(403, 'Akses ditolak. Hanya admin yang dapat mengakses halaman ini.');
        }
        
        $reports = Report::with('user')
            ->when($request->status, function ($query, $status) {
                return $query->where('status', $status);
            })
            ->when($request->category, function ($query, $category) {
                return $query->where('category', $category);
            })
            ->when($request->priority, function ($query, $priority) {
                return $query->where('priority', $priority);
            })
            ->when($request->search, function ($query, $search) {
                return $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%")
                      ->orWhere('location', 'like', "%{$search}%")
                      ->orWhere('reporter_name', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();
            
        return Inertia::render('admin/reports', [
            'reports' => $reports,
            'filters' => $request->only(['status', 'category', 'priority', 'search']),
        ]);
    }

    /**
     * Update the specified resource in storage (report status).
     */
    public function update(UpdateReportStatusRequest $request, Report $report)
    {
        $report->update([
            'status' => $request->status,
            'admin_notes' => $request->admin_notes,
        ]);

        return redirect()->back()
            ->with('success', 'Status laporan berhasil diperbarui.');
    }

    /**
     * Display the specified resource (users listing).
     */
    public function show(Request $request)
    {
        if (!auth()->user()->isAdmin()) {
            abort(403, 'Akses ditolak. Hanya admin yang dapat mengakses halaman ini.');
        }
        
        $users = User::when($request->role, function ($query, $role) {
                return $query->where('role', $role);
            })
            ->when($request->search, function ($query, $search) {
                return $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%")
                      ->orWhere('phone', 'like', "%{$search}%");
                });
            })
            ->withCount('reports')
            ->latest()
            ->paginate(15)
            ->withQueryString();
            
        return Inertia::render('admin/users', [
            'users' => $users,
            'filters' => $request->only(['role', 'search']),
        ]);
    }
}