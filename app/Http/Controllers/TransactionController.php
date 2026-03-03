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

    public function indexAdmin()
    {
        $data = Transaction::orderByDesc("created_at")->with("user")->get();
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
            "status" => $request->status ?? "pending",
            "target" => $request->target,
            "result" => $request->result,
            "api_type" => $request->api_type,
            "refill_id" => $request->refill_id,
        ]);

        $updateUser = User::where("id", $user->id)->first();
        $updateUser->update([
            "saldo" => $user->saldo - $data->price
        ]);
        
        return response()->json([
            "message"=> "Transaksi Berhasil!"
        ]);
    }

    public function update(Request $request, string $id)
    {
        $data = Transaction::find($id);
        $data->update($request->all());
        return response()->json([
            "data" => $data,
            "message" => "Ubah data berhasil!"
        ]);
    }
}
