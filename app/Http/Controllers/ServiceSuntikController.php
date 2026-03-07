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
            'api_type' => "required",
            'category' => "required",
            'old_price' => "required",
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
        $data->update([
            "name" => $request->name ?: $data->name,
            "description" => $request->description ?: $data->description,
            "price" => $request->price ?: $data->price,
            "old_price" => $request->old_price ?: $data->old_price,
        ]);

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
