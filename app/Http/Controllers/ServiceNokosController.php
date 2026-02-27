<?php

namespace App\Http\Controllers;

use App\Models\NokosCountry;
use App\Models\NokosService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ServiceNokosController extends Controller
{
    public function index()
    {
        $data = NokosService::with("country")->orderByDesc("created_at")->get();
        return response()->json([
            "data" => $data,
            "message" => "Ambil data berhasil!",
        ]);
    
    }

    public function store(Request $request)
    {
        $validateData = Validator::make($request->all(), [
            "country_name" => "required",
            "price" => "required",
            "stock" => "required",
        ]);

        if ($validateData->fails()) {
            return response()->json([
                "message" => "Data harus diisi!",
                "error" => $validateData->errors()
            ], 422);
        }

        $dataService = NokosService::where("name", $request->name)->orWhere("code", $request->code)->first();
        $newDataService = "";

        if (!$dataService) {
            $newDataService = NokosService::create($request->all());
        } else {
            $dataService->update([
                "code" => $request->code ?: $dataService->code,
                "name" => $request->name ?: $dataService->name,
                "icon" => $request->icon ?: $dataService->icon,
            ]);
        }

        $data = $request->all();
        $data['nokos_service_id'] = $dataService->id ?? $newDataService->id;
        $dataCountry = NokosCountry::create($data);

        return response()->json([
            "message" => "Layanan Nokos berhasil ditambahkan!",
            "data" => $dataCountry
        ], 201);
    }

    public function destroy($id)
    {
        $data = NokosCountry::find($id);
        $parentId = $data->nokos_service_id;
        $data->delete();

        $parentCheck = NokosCountry::where("nokos_service_id", $parentId)->exists();
        if (!$parentCheck) {
            NokosService::where("id", $parentId)->delete();
        }

        return response()->json([
            "message" => "Hapus Layanan Berhasil!"
        ]);
    }
}
