<?php

namespace App\Http\Controllers;

use App\Models\Nokos;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NokosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $data = Nokos::all();

        return response()->json([
            'message' => "Get data berhasil",
            "data" => $data
        ]);

    }

    public function indexByUser() {
        $user = Auth::user();

        $data = Nokos::where("user_id", $user->id)->get();

        return response()->json([
            'message' => "Get data berhasil",
            "data" => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        try {
            $user = Auth::user();
            $data = new Nokos();
            $data->user_id = $user->id;
            $data->price = $request->price;
            $data->service_name = $request->service_name;
            $data->save();

            return response()->json([
                'message' => "Get data berhasil",
                'data' => $data
                ], 201);
        } catch(Exception $e) {
            return response()->json(['err' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Nokos $nokos)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Nokos $nokos)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Nokos $nokos)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Nokos $nokos)
    {
        //
    }
}
