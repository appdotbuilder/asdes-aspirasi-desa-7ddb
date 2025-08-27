<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReportRequest;
use App\Models\Report;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        
        if ($user->isAdmin()) {
            // Admin can see all reports
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
                ->latest()
                ->paginate(10)
                ->withQueryString();
        } else {
            // Warga can only see their own reports
            $reports = $user->reports()
                ->when($request->status, function ($query, $status) {
                    return $query->where('status', $status);
                })
                ->latest()
                ->paginate(10)
                ->withQueryString();
        }
        
        return Inertia::render('reports/index', [
            'reports' => $reports,
            'filters' => $request->only(['status', 'category', 'priority']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (!auth()->user()->isWarga()) {
            abort(403, 'Hanya warga yang dapat membuat laporan.');
        }
        
        return Inertia::render('reports/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReportRequest $request)
    {
        $report = Report::create([
            'user_id' => auth()->id(),
            ...$request->validated(),
        ]);

        return redirect()->route('reports.show', $report)
            ->with('success', 'Laporan berhasil dibuat dan akan segera ditinjau oleh admin.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Report $report)
    {
        $user = auth()->user();
        
        // Check authorization
        if ($user->isWarga() && $report->user_id !== $user->id) {
            abort(403, 'Anda tidak memiliki akses ke laporan ini.');
        }
        
        $report->load('user');
        
        return Inertia::render('reports/show', [
            'report' => $report,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Report $report)
    {
        // This method is handled by AdminController for status updates
        abort(404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Report $report)
    {
        $user = auth()->user();
        
        // Only allow deletion by report owner or admin
        if ($user->isWarga() && $report->user_id !== $user->id) {
            abort(403, 'Anda tidak memiliki akses untuk menghapus laporan ini.');
        }
        
        // Only allow deletion of pending reports
        if ($report->status !== 'menunggu') {
            return redirect()->back()
                ->with('error', 'Hanya laporan dengan status "Menunggu" yang dapat dihapus.');
        }
        
        $report->delete();

        return redirect()->route('reports.index')
            ->with('success', 'Laporan berhasil dihapus.');
    }
}