<?php

namespace App\Http\Controllers ;

use App\Http\Controllers\Controller;
use App\Services\MedanPediaService;
use Illuminate\Http\Request;

class MedanPediaController extends Controller
{
    public function profile(MedanPediaService $mp)
    {
        return response()->json($mp->getProfile());
    }

    public function services(MedanPediaService $mp)
    {
        return response()->json($mp->getServices());
    }

    public function order(Request $request, MedanPediaService $mp)
    {
        $data = $request->validate([
            'service_id' => 'required|integer',
            'target' => 'required|string',
            'quantity' => 'required|integer',
            'comments' => 'nullable|string',
            'link' => 'nullable|string'
        ]);

        return response()->json(
            $mp->order(
                $data['service_id'],
                $data['target'],
                $data['quantity'],
                $data['comments'] ?? null,
                $data['link'] ?? null
            )
        );
    }

    public function status($orderId, MedanPediaService $mp)
    {
        return response()->json($mp->status($orderId));
    }

    public function refill($orderId, MedanPediaService $mp)
    {
        return response()->json($mp->refill($orderId));
    }

    public function refillStatus($refillId, MedanPediaService $mp)
    {
        return response()->json($mp->refillStatus($refillId));
    }
}
