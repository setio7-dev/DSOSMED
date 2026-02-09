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
        $user = Auth::user();
        $data = Transaction::orderByDesc("created_at")->where("user_id", $user->id)->get();
        return response()->json([
            "data" => $data
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $data = Transaction::create([
            "name" => $request->name,
            "user_id" => $user->id,
            "service_id" => $request->service_id,
            "quantity" => $request->quantity,
            "type" => $request->type,
            "order_id" => $request->order_id,
            "price" => $request->price,
            "status" => "berhasil",
            "result" => $request->result,
        ]);

        $updateUser = User::where("id", $user->id)->first();
        $updateUser->update([
            "saldo" => $user->saldo - $data->price
        ]);
        
        return response()->json([
            "message"=> "Transaksi Berhasil!"
        ]);
    }
}
