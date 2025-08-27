<?php

namespace Tests\Feature;

use App\Models\Report;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReportTest extends TestCase
{
    use RefreshDatabase;

    public function test_warga_can_create_report(): void
    {
        $warga = User::factory()->warga()->create();
        
        $response = $this->actingAs($warga)
            ->post('/reports', [
                'title' => 'Test Report',
                'description' => 'This is a test report description',
                'location' => 'Test Location',
                'category' => 'jalan',
                'priority' => 'sedang',
                'reporter_name' => 'Test Reporter',
                'reporter_phone' => '08123456789',
                'reporter_email' => 'reporter@test.com',
            ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('reports', [
            'title' => 'Test Report',
            'user_id' => $warga->id,
        ]);
    }

    public function test_admin_cannot_create_report(): void
    {
        $admin = User::factory()->admin()->create();
        
        $response = $this->actingAs($admin)
            ->post('/reports', [
                'title' => 'Test Report',
                'description' => 'This is a test report description',
                'location' => 'Test Location',
                'category' => 'jalan',
                'priority' => 'sedang',
                'reporter_name' => 'Test Reporter',
                'reporter_phone' => '08123456789',
                'reporter_email' => 'reporter@test.com',
            ]);

        $response->assertStatus(403);
    }

    public function test_warga_can_view_their_reports(): void
    {
        $warga = User::factory()->warga()->create();
        $report = Report::factory()->create(['user_id' => $warga->id]);

        $response = $this->actingAs($warga)
            ->get('/reports');

        $response->assertStatus(200);
    }

    public function test_warga_cannot_view_other_user_reports(): void
    {
        $warga1 = User::factory()->warga()->create();
        $warga2 = User::factory()->warga()->create();
        $report = Report::factory()->create(['user_id' => $warga2->id]);

        $response = $this->actingAs($warga1)
            ->get("/reports/{$report->id}");

        $response->assertStatus(403);
    }

    public function test_admin_can_view_all_reports(): void
    {
        $admin = User::factory()->admin()->create();
        $warga = User::factory()->warga()->create();
        $report = Report::factory()->create(['user_id' => $warga->id]);

        $response = $this->actingAs($admin)
            ->get('/admin/reports');

        $response->assertStatus(200);
    }
}