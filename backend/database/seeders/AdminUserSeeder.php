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
        $password = env('ADMIN_PASSWORD', 'Gigar@2024!');

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
