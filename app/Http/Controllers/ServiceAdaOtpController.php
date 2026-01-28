<?php

namespace App\Http\Controllers;

use App\Models\ServiceAdaOtpChildren;
use App\Models\ServiceAdaOtpParent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class ServiceAdaOtpController extends Controller
{
    public function index()
    {
        $data = ServiceAdaOtpParent::with('children')->orderBy("created_at", "DESC")->get();
        return response()->json([
            "message" => "Data layanan nokos dengan OTP berhasil diperoleh!",
            "data" => $data
        ], 200);
    }

    public function store(Request $request)
    {
        $validateData = Validator::make($request->all(), [
            "parent_service_id" => "required",
            "text" => "required",
            "description" => "nullable",
            "icon" => "required",

            'service_id' => "required",
            'name' => "required",
            'iso' => "required",
            'prefix' => "required",
            'price' => "required",
            'stock' => "required",
            'delivery_percent' => "required",
            'operator' => "required",
            'quality_score' => "required",
            'provider_rate' => "required",
            'current_demand_status' => "required",
            'avg_delivery_time' => "required",
            'avg_delivery_time_formatted' => "required",
        ]);

        if ($validateData->fails()) {
            return response()->json([
                "message" => "Data harus diisi!",
                "error" => $validateData->errors()
            ], 422);
        }

        $serviceNokosParent = ServiceAdaOtpParent::where('parent_service_id', $request->parent_service_id)->first();
        if (!$serviceNokosParent) {
            $dataParent = ServiceAdaOtpParent::create($request->all());
        }

        $data = $request->all();
        $data['parent_id'] = $serviceNokosParent->id ?? $dataParent->id;
        ServiceAdaOtpChildren::create($data);

        return response()->json([
            "message" => "Layanan Nokos berhasil ditambahkan!"
        ], 201);
    }

    public function update(Request $request,$id)
    {
        $data = ServiceAdaOtpChildren::find($id);
        $data->update($request->only(['name', 'price', 'stock']));

        return response()->json([
            "message" => "Ubah Layanan Berhaisl!"
        ], 200);
    }

    public function destroy($id)
    {
        $data = ServiceAdaOtpChildren::find($id);
        $parentId = $data->parent_id;
        $data->delete();

        $parentCheck = ServiceAdaOtpChildren::where("parent_id", $parentId)->exists();
        if (!$parentCheck) {
            ServiceAdaOtpParent::where("id", $parentId)->delete();
        }
    
        return response()->json([
            "message"=> "Hapus Layanan Berhasil!"
        ]);
    }
}
