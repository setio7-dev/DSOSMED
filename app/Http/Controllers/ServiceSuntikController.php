<?php

namespace App\Http\Controllers;

use App\Models\ServiceSuntik;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ServiceSuntikController extends Controller
{
    public function index()
    {
        $data = ServiceSuntik::all();
        return response()->json([
            "data" => $data,
            "message" => "Ambil data berhasil!"
        ]);
    }

    public function store(Request $request)
    {
        $validateData = Validator::make($request->all(), [
            'service_id' => "required",
            'name' => "required",
            'type' => "required",
            'category' => "required",
            'price' => "required",
            'min' => "required",
            'max' => "required",
            'description' => "required",
            'refill' => "required",
            'average_time' => "required",
        ]);

        if ($validateData->fails()) {
            return response()->json([
                "message" => "Data wajib diisi!",
                "errors" => $validateData->errors()
            ], 422);
        }

        $data = ServiceSuntik::create($request->all());
        return response()->json([
            "data" => $data,
            "message" => "Tambah data berhasil!"
        ]);
    }

    public function update(Request $request,$id)
    {
        $data = ServiceSuntik::find($id);
        $data->update($request->only(['name', 'price', 'stock']));

        return response()->json([
            "message" => "Ubah Layanan Berhaisl!"
        ], 200);
    }

    public function destroy($id)
    {
        $data = ServiceSuntik::find($id);
        $data->delete();
    
        return response()->json([
            "message"=> "Hapus Layanan Berhasil!"
        ]);
    }
}
