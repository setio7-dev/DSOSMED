<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

class UserController extends Controller
{

    public function register(Request $request) {
        try {
            $query = User::where('username', $request->name)->first();

             if ($query) return response()->json(['message' => 'Username sudah digunakan!'], 401);

             $data = new User();
             $data->username = $request->username;
             $data->password = $request->password;
             $data->isAdmin = false;
             $data->saldo = 0;
             $data->save();

             return response()->json([
                'message' => "Daftar akun berhasil!",
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

             if ($query) return response()->json(['message' => 'Username sudah digunakan'], 401);

             $data = new User();
             $data->username = $request->username;
             $data->password = $request->password;
             $data->isAdmin = true;
             $data->saldo = 0;
             $data->save();

             return response()->json([
                'message' => "Daftar akun admin bergasil!",
                'admin' => $data
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
                "message" => "Masuk akun Berhasil!"
            ], 201);
        } catch(Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function me() {
        try {
            $user = Auth::user();
            return response()->json([
                'message' => "Mengambil data behasil!",
                'user' => $user
            ]);
        } catch(Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        } 
    }

    public function logout(Request $request) {
        try {
            $token = PersonalAccessToken::findToken($request->bearerToken());
            $token->delete();

            return response()->json([
                'message' => 'Logout successfully'
            ], 200);
        } catch(Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
