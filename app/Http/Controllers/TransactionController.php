<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    public function index()
    {
        $data = Transaction::orderByDesc("created_at")->get();
        return response()->json([
            "data" => $data
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $data = Transaction::create($request->all());
        $data["user_id"] = $user->id;

        $updateUser = User::where("id", $user->id)->first();
        $updateUser->update([
            "saldo" => $user->saldo - $data->price
        ]);
        
        return response()->json([
            "message"=> "Transaksi Berhasil!"
        ]);
    }
}
