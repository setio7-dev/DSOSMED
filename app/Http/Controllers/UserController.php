<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Exception;

class UserController extends Controller
{

    public function register(Request $request) {
        try {
            $query = User::where('username', $request->name)->first();

             if ($query) return response()->json(['message' => 'Username is already in use'], 401);

             $data = new User();
             $data->username = $request->username;
             $data->password = $request->password;
             $data->isAdmin = false;
             $data->saldo = 0;
             $data->save();

             return response()->json([
                'message' => "Register successfully!",
                'user' => $data
            ], 201);

        } catch(Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function registerAdmin(Request $request) {
        try {
            $query = User::where('name', $request->name)->first();

             if ($query) return response()->json(['message' => 'name is already in use'], 401);

             $data = new User();
             $data->username = $request->username;
             $data->password = $request->password;
             $data->isAdmin = true;
             $data->saldo = 0;
             $data->save();

             return response()->json([
                'message' => "Register successfully!",
                'user' => $data
            ], 201);

        } catch(Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function login(Request $request) {
        try {
            $user = User::where('username', $request->username)->first();

            if (!$user) return response()->json(['message' => 'Nama Pengguna / Kata Sandi Salah!'], 401);

            if ($request->password !== $user->password) {
                return response()->json([
                    'message' => 'Nama Pengguna / Kata Sandi Salah!'
                ], 401);
            }

            $token = $user->createToken('access_token')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token,
                "message" => "Login Berhasil!"
            ], 201);
        } catch(Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        //
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
