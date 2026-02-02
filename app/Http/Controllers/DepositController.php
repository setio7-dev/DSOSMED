<?php

namespace App\Http\Controllers;

use App\Models\Deposit;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DepositController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $data = Deposit::with("user")->all();

        return response()->json([
            'message' => 'Berhasil mengambil data',
            'data' => $data,
        ], 200);
    }

    public function indexByUser()
    {
        try {
            $user = Auth::user();
            $data = Deposit::where('user_id', $user->id)
                ->with("user")
                ->get();

            return response()->json([
                'message' => 'Berhasil mengambil data',
                'data' => $data,
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
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
        try {
            $user = Auth::user();

            if (! $user) {
                return response()->json([
                    'message' => 'Unauthenticated',
                ], 401);
            }

            $data = new Deposit;
            $data->merchant_order_id = $request->merchant_order_id;
            $data->amount = $request->amount;
            $data->payment_method = $request->payment_method;
            $data->user_id = $user->id;
            $data->save();

            return response()->json([
                'message' => 'berhasil store data histori',
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Deposit $deposit)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Deposit $deposit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Deposit $deposit)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        try {
            $data = Deposit::findOrFail($id);
            $data->delete();

            return response()->json([
                'message' => 'Berhasil menghapus data',
                'data' => $data,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
