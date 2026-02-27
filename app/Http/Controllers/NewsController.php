<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = News::orderByDesc('created_at')->get();
        return response()->json([
            "message" => "Berhasil mengambil data berita",
            "data" => $data
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'desc' => 'required',
            'image' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "message" => "Data harus diisi!",
                "error" => $validator->errors()
            ], 422);
        }

        $file = Storage::disk("public")->put("news", $request->image);
        $data = News::create([
            "title" => $request->title,
            "desc" => $request->desc,
            "image" => $file
        ]);

        return response()->json([
            "message" => "Berita berhasil ditambahkan!",
            "data" => $data
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = News::find($id);
        if (!$data) {
            return response()->json([
                "message" => "Berita tidak ditemukan!"
            ], 404);
        }
        return response()->json([
            "data" => $data,
            "message" => "Detail berita berhasil diambil!"
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = News::find($id);
        if (!$data) {
            return response()->json([
                "message" => "Berita tidak ditemukan!"
            ], 404);
        }

        if ($request->image) {
            if ($data->image) {
                Storage::disk("public")->delete($data->image);
            }

            $file = Storage::disk("public")->put("news", $request->image);
            $data->image = $file;
        }

        $data->title = $request->title ?: $data->title;
        $data->desc = $request->desc ?: $data->desc;
        $data->save();


        return response()->json([
            "message" => "Berita berhasil diperbarui!",
            "data" => $data
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = News::find($id);
        if (!$data) {
            return response()->json([
                "message" => "Berita tidak ditemukan!"
            ], 404);
        }

        $data->delete();

        return response()->json([
            "message" => "Berita berhasil dihapus!"
        ]);
    }
}
