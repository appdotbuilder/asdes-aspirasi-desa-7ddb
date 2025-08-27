<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ReportController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Welcome page
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Reports (for warga)
    Route::resource('reports', ReportController::class);
    
    // Admin routes
    Route::prefix('admin')->middleware(AdminMiddleware::class)->group(function () {
        Route::get('/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
        Route::get('/reports', [AdminController::class, 'create'])->name('admin.reports');
        Route::put('/reports/{report}/status', [AdminController::class, 'update'])->name('admin.reports.update-status');
        Route::get('/users', [AdminController::class, 'show'])->name('admin.users');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
