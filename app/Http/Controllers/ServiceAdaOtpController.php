<?php

namespace App\Http\Controllers;

use App\Models\ServiceAdaOtpParent;
use App\Models\ServiceNokosChildren;
use App\Models\ServiceNokosParent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class ServiceAdaOtpController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = ServiceAdaOtpParent::with('children')->get();
        return response()->json([
            "message" => "Data layanan nokos dengan OTP berhasil diperoleh!",
            "data" => $data
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
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

        $serviceNokosParent = ServiceNokosParent::where('parent_service_id', $request->parent_service_id)->first();
        if (!$serviceNokosParent) {
            $dataParent = ServiceNokosParent::create($request->all());
        }

        $data = $request->all();
        $data['parent_id'] = $serviceNokosParent->id ?? $dataParent->id;
        ServiceNokosChildren::create($data);

        return response()->json([
            "message" => "Layanan Nokos berhasil ditambahkan!"
        ], 201);
    }
}
