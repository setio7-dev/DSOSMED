<?php

namespace App\Http\Controllers;

use App\Models\ServiceNokosChildren;
use App\Models\ServiceNokosParent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ServiceNokosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = ServiceNokosParent::with('child')->get();
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
            "country" => "required",
            "stock" => "required",
            "price" => "required",
            "name" => "required",
            "image" => "required",
        ]);

        if ($validateData->fails()) {
            return response()->json([
                "message" => "Data harus diisi!",
                "error" => $validateData->errors()
            ], 422);
        }

        $serviceNokosParent = ServiceNokosParent::where('name', $request->name)->first();
        if (!$serviceNokosParent) {
            $dataParent = ServiceNokosParent::create([
                "name" => $request->name,
                "image" => $request->image,
            ]);
        }

        ServiceNokosChildren::create([
            "country" => $request->country,
            "stock" => $request->stock,
            "price" => $request->price,
            "nokos_parent_id" => $serviceNokosParent ? $serviceNokosParent->id : $dataParent->id,
        ]);

        return response()->json([
            "message" => "Layanan Nokos dengan OTP berhasil ditambahkan!"
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
