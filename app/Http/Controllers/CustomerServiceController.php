<?php

namespace App\Http\Controllers;

use App\Models\CustomerService;
use Illuminate\Http\Request;

class CustomerServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = CustomerService::all();
        return response()->json([
            "data" => $data,
            "message" => "Mengambil data berhasil!",
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = CustomerService::find($id);
        $data->update($request->all());
        return response()->json([
            "data" => $data,
            "message" => "Ubah data berhasil!"
        ]);
    }

}
