<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Report
 *
 * @property int $id
 * @property int $user_id
 * @property string $title
 * @property string $description
 * @property string $location
 * @property string $category
 * @property string $priority
 * @property string $status
 * @property string $reporter_name
 * @property string $reporter_phone
 * @property string $reporter_email
 * @property string|null $admin_notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Report newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Report newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Report query()
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereAdminNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report wherePriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereReporterEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereReporterName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereReporterPhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereUserId($value)
 * @method static \Database\Factories\ReportFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Report extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'location',
        'category',
        'priority',
        'status',
        'reporter_name',
        'reporter_phone',
        'reporter_email',
        'admin_notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user who submitted this report.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the category display name.
     */
    public function getCategoryDisplayAttribute(): string
    {
        $categories = [
            'jalan' => 'Jalan',
            'jembatan' => 'Jembatan',
            'drainase' => 'Drainase',
            'fasilitas_umum' => 'Fasilitas Umum',
            'penerangan' => 'Penerangan',
            'lainnya' => 'Lainnya',
        ];

        return $categories[$this->category] ?? $this->category;
    }

    /**
     * Get the priority display name.
     */
    public function getPriorityDisplayAttribute(): string
    {
        $priorities = [
            'rendah' => 'Rendah',
            'sedang' => 'Sedang',
            'tinggi' => 'Tinggi',
            'mendesak' => 'Mendesak',
        ];

        return $priorities[$this->priority] ?? $this->priority;
    }

    /**
     * Get the status display name.
     */
    public function getStatusDisplayAttribute(): string
    {
        $statuses = [
            'menunggu' => 'Menunggu',
            'sedang_ditangani' => 'Sedang Ditangani',
            'selesai' => 'Selesai',
            'ditolak' => 'Ditolak',
        ];

        return $statuses[$this->status] ?? $this->status;
    }
}