<?php

namespace App\Http\Controllers;

use App\Models\ServiceVirtusimChildren;
use App\Models\ServiceVirtusimParent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class ServiceVirtusimController extends Controller
{
    public function index()
    {
        $data = ServiceVirtusimParent::with('children')->orderBy("created_at", "DESC")->get();
        return response()->json([
            "message" => "Data layanan nokos dengan OTP berhasil diperoleh!",
            "data" => $data
        ], 200);
    }

    public function store(Request $request)
    {
        $validateData = Validator::make($request->all(), [
            'parent_service_id' => "required",
            'country_code' => "required",
            'country_name' => "required",
            'img_link' => "required",

            "service_id" => "required",
            'price' => "required",
            'is_promo' => "required",
            'tersedia' => "required",
            'country' => "required",
            'status' => "required",
            'category' => "required",
        ]);

        if ($validateData->fails()) {
            return response()->json([
                "message" => "Data harus diisi!",
                "error" => $validateData->errors()
            ], 422);
        }

        $serviceNokosParent = ServiceVirtusimParent::where('parent_service_id', $request->parent_service_id)->first();
        if (!$serviceNokosParent) {
            $dataParent = ServiceVirtusimParent::create($request->all());
        }

        $data = $request->all();
        $data['parent_id'] = $serviceNokosParent->id ?? $dataParent->id;
        ServiceVirtusimChildren::create($data);

        return response()->json([
            "message" => "Layanan Nokos berhasil ditambahkan!"
        ], 201);
    }

    public function update(Request $request,$id)
    {
        $data = ServiceVirtusimChildren::find($id);
        $data->update($request->only(['country_name', 'price']));

        return response()->json([
            "message" => "Ubah Layanan Berhaisl!"
        ], 200);
    }

    public function destroy($id)
    {
        $data = ServiceVirtusimChildren::find($id);
        $parentId = $data->parent_id;
        $data->delete();

        $parentCheck = ServiceVirtusimChildren::where("parent_id", $parentId)->exists();
        if (!$parentCheck) {
            ServiceVirtusimParent::where("id", $parentId)->delete();
        }
    
        return response()->json([
            "message"=> "Hapus Layanan Berhasil!"
        ]);
    }
}
