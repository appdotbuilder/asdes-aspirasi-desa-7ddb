<?php

namespace Database\Seeders;

use App\Models\Report;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Admin Desa',
            'email' => 'admin@asdes.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'phone' => '08123456789',
            'email_verified_at' => now(),
        ]);

        // Create test warga users
        $warga1 = User::create([
            'name' => 'Budi Santoso',
            'email' => 'budi@asdes.com',
            'password' => Hash::make('password'),
            'role' => 'warga',
            'phone' => '08234567890',
            'email_verified_at' => now(),
        ]);

        $warga2 = User::create([
            'name' => 'Siti Rahayu',
            'email' => 'siti@asdes.com',
            'password' => Hash::make('password'),
            'role' => 'warga',
            'phone' => '08345678901',
            'email_verified_at' => now(),
        ]);

        // Create sample reports
        Report::create([
            'user_id' => $warga1->id,
            'title' => 'Jalan Rusak di Depan Balai Desa',
            'description' => 'Jalan di depan balai desa kondisinya sangat rusak dengan banyak lubang. Hal ini menyulitkan warga yang ingin mengakses pelayanan di balai desa.',
            'location' => 'Jl. Desa Raya No. 1, Depan Balai Desa',
            'category' => 'jalan',
            'priority' => 'tinggi',
            'status' => 'sedang_ditangani',
            'reporter_name' => $warga1->name,
            'reporter_phone' => $warga1->phone,
            'reporter_email' => $warga1->email,
            'admin_notes' => 'Sedang dikoordinasikan dengan Dinas PU untuk perbaikan jalan.',
        ]);

        Report::create([
            'user_id' => $warga2->id,
            'title' => 'Lampu Jalan Mati di RT 03',
            'description' => 'Lampu penerangan jalan di RT 03 sudah mati sejak seminggu yang lalu. Kondisi ini membuat jalan menjadi gelap di malam hari dan rawan kejahatan.',
            'location' => 'Jl. Mawar RT 03 RW 02',
            'category' => 'penerangan',
            'priority' => 'sedang',
            'status' => 'menunggu',
            'reporter_name' => $warga2->name,
            'reporter_phone' => $warga2->phone,
            'reporter_email' => $warga2->email,
        ]);

        Report::create([
            'user_id' => $warga1->id,
            'title' => 'Saluran Air Tersumbat',
            'description' => 'Saluran air di belakang pasar desa tersumbat sampah sehingga air menggenang dan menimbulkan bau tidak sedap.',
            'location' => 'Belakang Pasar Desa, Gang Kenanga',
            'category' => 'drainase',
            'priority' => 'tinggi',
            'status' => 'selesai',
            'reporter_name' => $warga1->name,
            'reporter_phone' => $warga1->phone,
            'reporter_email' => $warga1->email,
            'admin_notes' => 'Saluran air sudah dibersihkan dan diperbaiki. Terimakasih atas laporannya.',
        ]);

        // Create additional sample users and reports
        User::factory(10)->warga()->create();
        User::factory(2)->admin()->create();
        
        Report::factory(25)->create([
            'user_id' => fn() => User::where('role', 'warga')->inRandomOrder()->first()->id,
        ]);
    }
}