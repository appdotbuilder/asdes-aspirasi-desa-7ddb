<?php

namespace Database\Factories;

use App\Models\Report;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Report>
 */
class ReportFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<Report>
     */
    protected $model = Report::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = ['jalan', 'jembatan', 'drainase', 'fasilitas_umum', 'penerangan', 'lainnya'];
        $priorities = ['rendah', 'sedang', 'tinggi', 'mendesak'];
        $statuses = ['menunggu', 'sedang_ditangani', 'selesai', 'ditolak'];

        return [
            'user_id' => User::factory(),
            'title' => fake()->sentence(6),
            'description' => fake()->paragraphs(3, true),
            'location' => fake()->address(),
            'category' => fake()->randomElement($categories),
            'priority' => fake()->randomElement($priorities),
            'status' => fake()->randomElement($statuses),
            'reporter_name' => fake()->name(),
            'reporter_phone' => fake()->phoneNumber(),
            'reporter_email' => fake()->safeEmail(),
            'admin_notes' => fake()->optional(0.3)->paragraph(),
        ];
    }

    /**
     * Indicate that the report is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'menunggu',
        ]);
    }

    /**
     * Indicate that the report is in progress.
     */
    public function inProgress(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'sedang_ditangani',
        ]);
    }

    /**
     * Indicate that the report is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'selesai',
        ]);
    }

    /**
     * Indicate that the report is rejected.
     */
    public function rejected(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'ditolak',
            'admin_notes' => fake()->paragraph(),
        ]);
    }
}