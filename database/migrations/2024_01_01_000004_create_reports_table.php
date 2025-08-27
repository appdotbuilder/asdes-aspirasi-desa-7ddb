<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title')->comment('Report title');
            $table->text('description')->comment('Problem description');
            $table->string('location')->comment('Location of the problem');
            $table->enum('category', ['jalan', 'jembatan', 'drainase', 'fasilitas_umum', 'penerangan', 'lainnya'])
                  ->comment('Infrastructure category');
            $table->enum('priority', ['rendah', 'sedang', 'tinggi', 'mendesak'])
                  ->default('sedang')
                  ->comment('Priority level');
            $table->enum('status', ['menunggu', 'sedang_ditangani', 'selesai', 'ditolak'])
                  ->default('menunggu')
                  ->comment('Report status');
            $table->string('reporter_name')->comment('Reporter full name');
            $table->string('reporter_phone')->comment('Reporter phone number');
            $table->string('reporter_email')->comment('Reporter email address');
            $table->text('admin_notes')->nullable()->comment('Admin notes or rejection reason');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('user_id');
            $table->index('status');
            $table->index('category');
            $table->index('priority');
            $table->index(['status', 'created_at']);
            $table->index(['user_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};