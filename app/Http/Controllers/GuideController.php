<?php

namespace App\Http\Controllers;

use App\Models\Guide;
use Illuminate\Http\Request;

class GuideController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Guide::all();
        return response()->json([
            "data" => $data,
        ]);
    }

    public function show(string $id)
    {
        $data = Guide::find($id);
        return response()->json([
            "data" => $data,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = Guide::find($id);
        $data->update($request->all());
        return response()->json([
            "data" => $data,
            "message" => "Ubah data berhasil!"
        ]);
    }
}
