<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\File;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::latest('created_at');

        if ($status = $request->get('status')) {
            $query->where('status', $status);
        }

        return response()->json($query->paginate($request->get('per_page', 12)));
    }

    public function show(Post $post)
    {
        return response()->json($post);
    }

    public function store(StorePostRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = $request->user()->id;

        // Auto-generate slug if not provided
        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['title']) . '-' . Str::random(6);
        }

        $post = Post::create($data);

        return response()->json([
            'message' => 'Post created successfully.',
            'post'    => $post,
        ], 201);
    }

    public function update(UpdatePostRequest $request, Post $post)
    {
        $post->update($request->validated());

        return response()->json([
            'message' => 'Post updated successfully.',
            'post'    => $post->fresh(),
        ]);
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return response()->json(['message' => 'Post deleted successfully.']);
    }

    public function toggleFeature(Post $post)
    {
        $post->update(['is_featured' => ! $post->is_featured]);

        return response()->json([
            'message'      => 'Feature toggled.',
            'is_featured'  => $post->is_featured,
        ]);
    }

    /**
     * Upload an image or video file. Returns the storage path used in
     * `media_url` / `media_poster` fields when creating/updating a post.
     */
    public function uploadMedia(Request $request)
    {
        $request->validate([
            'file' => ['required', File::types(['image/*', 'video/*'])->max(50 * 1024)],
        ]);

        $file     = $request->file('file');
        $isVideo  = str_starts_with($file->getMimeType(), 'video/');
        $dir      = $isVideo ? 'posts/videos' : 'posts/images';
        $path     = $file->store($dir, 'public');
        $fullUrl  = asset('storage/' . $path);

        return response()->json([
            'message' => 'File uploaded successfully.',
            'path'    => $path,
            'url'     => $fullUrl,
            'type'    => $isVideo ? 'video' : 'image',
        ], 201);
    }

    public function deleteMedia(Request $request, ?string $path = null)
    {
        $path = $path ?: $request->query('path');
        if (! $path) {
            return response()->json(['message' => 'No path provided.'], 422);
        }

        $full = storage_path('app/public/' . ltrim($path, '/'));
        if (file_exists($full) && is_file($full)) {
            unlink($full);
        }

        return response()->json(['message' => 'File deleted.']);
    }

    /**
     * Admin dashboard summary.
     */
    public function dashboard()
    {
        return response()->json([
            'total_posts'     => Post::count(),
            'published_posts' => Post::where('status', 'published')->count(),
            'draft_posts'     => Post::where('status', 'draft')->count(),
            'featured_posts'  => Post::where('is_featured', true)->count(),
            'recent_posts'    => Post::latest()->limit(5)->get(['id', 'title', 'status', 'is_featured', 'created_at']),
        ]);
    }
}
