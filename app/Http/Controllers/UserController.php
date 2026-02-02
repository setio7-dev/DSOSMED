<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\PersonalAccessToken;

class UserController extends Controller
{
    public function register(Request $request) {
        try {
            // $validateData = Validator::make($request->all(), [
            //     "username" => "required",
            //     "password" => "required",
            // ]);

            // if ($validateData->fails()) {
            //     return response()->json([
            //         "message" => "Nama pengguna / kata sandi harus diisi!"
            //     ], 422);
            // }

            // $userCheck = User::where('username', $request->username)->first();
            //  if ($userCheck) {
            //     return response()->json([
            //         'message' => 'Nama Pegguna sudah digunakan!'
            //     ], 401);
            //  }

             $data = User::create([
                "username" => $request->username,
                "password" => $request->password,
                "isAdmin" => false,
                "saldo" => 0
             ]);

             return response()->json([
                'message' => "Daftar akun berhasil!",
                'data' => $data
            ], 201);

        } catch(Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function registerAdmin(Request $request) {
        try {
            $validateData = Validator::make($request->all(), [
                "username" => "required",
                "password" => "required",
            ]);

            if ($validateData->fails()) {
                return response()->json([
                    "message" => "Nama pengguna / kata sandi harus diisi!"
                ], 422);
            }

            $userCheck = User::where('username', $request->username)->first();
             if ($userCheck) {
                return response()->json([
                    'message' => 'Nama Pegguna sudah digunakan!'
                ], 401);
             }

             $data = User::create([
                "username" => $request->username,
                "password" => $request->password,
                "isAdmin" => true,
                "saldo" => 0
             ]);

             return response()->json([
                'message' => "Daftar akun berhasil!",
                'data' => $data
            ], 201);

        } catch(Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function login(Request $request) {
        try {
            $validateData = Validator::make($request->all(), [
                "username" => "required",
                "password" => "required",
            ]);

            if ($validateData->fails()) {
                return response()->json([
                    "message" => "Nama pengguna / kata sandi harus diisi!"
                ], 422);
            }

            $user = User::where('username', $request->username)->first();
            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    "message" => "Nama pengguna / kata sandi salah!"
                ], 401);
            }

            $token = $user->createToken('access_token')->plainTextToken;
            return response()->json([
                'data' => $user,
                'token' => $token,
                "message" => "Masuk akun Berhasil!"
            ], 200);
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
                'data' => $user
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
                'message' => 'Logout Berhasil!'
            ], 200);
        } catch(Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function index()
    {
        $data = User::all();
        return response()->json([
            "message" => "Mengambil data berhasil!",
            "data" => $data
        ]);
    }

    public function update(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);
            $data = $user->update([
                "username" => $request->username ?: $user->username,
                "password" => $request->password ? Hash::make($request->password) : $user->password,
                "isAdmin" => $request->isAdmin,
                "saldo" => $request->saldo ?: $user->saldo
            ]);

            return response()->json([
                "message" => "Update data berhasil!",
                "data" => $data
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function updateSaldo(Request $request) {
        try {
            $user = Auth::user();

            $data = User::findOrFail($user->id);
            $data->saldo += $request->saldo;
            $data->save();

            return response()->json([
                "message" => "Berhasil memperbarui saldo",
                "data" => $data
            ], 200);
        } catch(Exception $e) {
              return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
