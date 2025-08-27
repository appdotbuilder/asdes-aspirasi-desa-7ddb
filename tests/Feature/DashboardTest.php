<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_warga_can_access_dashboard(): void
    {
        $warga = User::factory()->warga()->create();

        $response = $this->actingAs($warga)
            ->get('/dashboard');

        $response->assertStatus(200);
    }

    public function test_admin_redirected_to_admin_dashboard(): void
    {
        $admin = User::factory()->admin()->create();

        $response = $this->actingAs($admin)
            ->get('/dashboard');

        $response->assertRedirect('/admin/dashboard');
    }

    public function test_admin_can_access_admin_dashboard(): void
    {
        $admin = User::factory()->admin()->create();

        $response = $this->actingAs($admin)
            ->get('/admin/dashboard');

        $response->assertStatus(200);
    }

    public function test_warga_cannot_access_admin_dashboard(): void
    {
        $warga = User::factory()->warga()->create();

        $response = $this->actingAs($warga)
            ->get('/admin/dashboard');

        $response->assertStatus(403);
    }
}