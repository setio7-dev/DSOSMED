<?php

namespace App\Http\Controllers;

use App\Models\ServiceJasaOtpChildren;
use App\Models\ServiceJasaOtpParent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class ServiceJasaOtpController extends Controller
{
    public function index()
    {
        $data = ServiceJasaOtpParent::with('children')->orderBy("created_at", "DESC")->get();
        return response()->json([
            "message" => "Data layanan nokos dengan OTP berhasil diperoleh!",
            "data" => $data
        ], 200);
    }

    public function store(Request $request)
    {
        $validateData = Validator::make($request->all(), [
            "code" => "required",
            "country" => "required",
            "country_id" => "required",
            "price" => "required",
            "service" => "required",
            "operator" => "required",
            "stock" => "required",
        ]);

        if ($validateData->fails()) {
            return response()->json([
                "message" => "Data harus diisi!",
                "error" => $validateData->errors()
            ], 422);
        }

        $serviceNokosParent = ServiceJasaOtpParent::where('country_id', $request->country_id)->first();
        if (!$serviceNokosParent) {
            $dataParent = ServiceJasaOtpParent::create($request->all());
        }

        $data = $request->all();
        $data['parent_id'] = $serviceNokosParent->id ?? $dataParent->id;
        ServiceJasaOtpChildren::create($data);

        return response()->json([
            "message" => "Layanan Nokos berhasil ditambahkan!"
        ], 201);
    }

    public function destroy($id)
    {
        $data = ServiceJasaOtpChildren::find($id);
        $parentId = $data->parent_id;
        $data->delete();

        $parentCheck = ServiceJasaOtpChildren::where("parent_id", $parentId)->exists();
        if (!$parentCheck) {
            ServiceJasaOtpParent::where("id", $parentId)->delete();
        }

        return response()->json([
            "message" => "Hapus Layanan Berhasil!"
        ]);
    }
}
