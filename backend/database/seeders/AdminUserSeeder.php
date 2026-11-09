<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $email = env('ADMIN_EMAIL', 'admin@gigartrading.com');

        // SAST FIX (CWE-798): No hardcoded fallback password. The
        // admin password MUST be set via the ADMIN_PASSWORD env var.
        // If not set, we generate a random one and print it to the
        // console so the operator can use it immediately.
        $password = env('ADMIN_PASSWORD');
        if (! $password) {
            $password = bin2hex(random_bytes(16));
            $this->command->warn('No ADMIN_PASSWORD env var set. Generated a random password:');
            $this->command->info("  Email:    {$email}");
            $this->command->info("  Password: {$password}");
            $this->command->warn('  Change this immediately after first login.');
        }

        User::updateOrCreate(
            ['email' => $email],
            [
                'name'     => env('ADMIN_NAME', 'Gigar Admin'),
                'password' => Hash::make($password),
                'role'     => 'admin',
            ]
        );
    }
}
