<?php

use Illuminate\Support\Facades\Route;

// Health check endpoint used by the framework.
Route::get('/up', function () {
    return response()->json(['status' => 'ok', 'service' => 'Gigar API']);
});
