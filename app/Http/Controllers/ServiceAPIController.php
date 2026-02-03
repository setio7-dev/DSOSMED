<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class ServiceAPIController extends Controller
{
    // Virtusim
    public function virtusim_api_listcountry()
    {
        $response = Http::get('https://virtusim.com/api/v2/json.php', [
            'api_key' => 'CkLMBwcFoORWm0P5iThVqJf1Drsbyj',
            'action' => 'list_country',
        ]);

        return response()->json($response->json());
    }

    public function virtusim_api_listservice(string $country)
    {
        $response = Http::get('https://virtusim.com/api/v2/json.php', [
            'api_key' => 'CkLMBwcFoORWm0P5iThVqJf1Drsbyj',
            'action' => 'services',
            'country' => $country,
        ]);

        return response()->json($response->json());
    }

    // Ada OTP
    public function adaotp_api_listservice()
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer Wwnpfj17qfJERz7uDhAIC28rTw779RRE',
        ])->get('https://adaotp.com/api/v1/services');

        return response()->json($response->json());
    }

    public function adaotp_api_listcountry($id)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer Wwnpfj17qfJERz7uDhAIC28rTw779RRE',
        ])->get("https://adaotp.com/api/v1/services/{$id}/countries");

        return response()->json($response->json());
    }

    public function adaotp_api_order(Request $request)
    {
        $user = Auth::user();
        if ($user->saldo < $request->price) {
            return response()->json([
                'message' => 'Saldo Anda Tidak Cukup!',
            ], 422);
        }

        $response = Http::withHeaders([
            'Authorization' => 'Bearer Wwnpfj17qfJERz7uDhAIC28rTw779RRE',
            'Accept' => 'application/json',
        ])->withOptions([
            'query' => [
                'country' => (int) $request->country,
                'service_id' => (int) $request->service_id,
            ],
        ])->post('https://adaotp.com/api/v1/orders');

        return response()->json([
            'data' => $response->json(),
            'status' => $response->status(),
        ]);
    }

    public function ada_otp_getorders()
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer Wwnpfj17qfJERz7uDhAIC28rTw779RRE',
        ])->get('https://adaotp.com/api/v1/orders/active');

        return response()->json($response->json());
    }

    // MedanPedia
    public function medanpedia_api_services()
    {
        $response = Http::asForm()
            ->post('https://api.medanpedia.co.id/services', [
                'api_id' => '37461',
                'api_key' => 'vbsj08-btcidp-bqfnnw-k2hydl-hga8xk',
            ]);

        return response()->json($response->json());

    }

    public function medanpedia_api_profile()
    {
        $response = Http::asForm()
            ->post('https://api.medanpedia.co.id/profile', [
                'api_id' => '37461',
                'api_key' => 'vbsj08-btcidp-bqfnnw-k2hydl-hga8xk',
            ]);

        return response()->json($response->json());
    }

    public function medanpedia_api_order(Request $request)
{

    $response = Http::asForm()->post(
        'https://api.medanpedia.co.id/order',
        [
            'api_id' => '37461',
            'api_key' => 'vbsj08-btcidp-bqfnnw-k2hydl-hga8xk',
            'service' => $request->service,
            'target' => $request->target,
            'quantity' => $request->quantity,
        ]
    );

    $body = $response->json();

    if (!isset($body['status']) || $body['status'] === false) {
        return response()->json([
            'success' => false,
            'message' => $body['msg'] ?? 'Order gagal',
        ], 422);
    }

    return response()->json([
        'success' => true,
        'message' => $body['msg'],
        'order_id' => $body['data']['id'] ?? null,
    ]);
}

    // iskapay
    public function iskapay_create_payment(Request $request)
    {
        $response = Http::withHeaders([
            'X-API-Key' => 'isk_Z7kyQZMSFYdeMx4iAmISOiseAmflEMHM',
            'Accept' => 'application/json',
        ])->post('https://wallet.iskapay.com/api/gateway/payments', [
            'amount' => (int) $request->amount,
            'customer_name' => $request->customer_name,
            'customer_email' => $request->customer_email,
            'customer_phone' => $request->customer_phone,
            'description' => $request->description,
            'callback_url' => $request->callback_url,
        ]);

        return response()->json(
            $response->json()
        );
    }

    public function iskapay_payment_status($merchant_order_id)
    {
        $response = Http::withHeaders([
            'X-API-Key' => 'isk_Z7kyQZMSFYdeMx4iAmISOiseAmflEMHM',
        ])->get('https://wallet.iskapay.com/api/gateway/payments/'.$merchant_order_id);

        return response()->json($response->json());
    }

    public function iskapay_cancel_payment($merchant_order_id)
    {
        $response = Http::withHeaders([
            'X-API-Key' => 'isk_Z7kyQZMSFYdeMx4iAmISOiseAmflEMHM',
        ])->post('https://wallet.iskapay.com/api/gateway/payments/'.$merchant_order_id.'/cancel');

        return response()->json($response->json());
    }

    public function iskapay_list_payments(Request $request)
    {
        $response = Http::withHeaders([
            'X-API-Key' => 'isk_Z7kyQZMSFYdeMx4iAmISOiseAmflEMHM',
        ])->get('https://wallet.iskapay.com/api/gateway/payments', [
            'status' => $request->status,
            'date_from' => $request->date_from,
            'date_to' => $request->date_to,
            'limit' => $request->limit,
            'page' => $request->page,
        ]);

        return response()->json($response->json());
    }

    public function iskapay_balance()
    {
        $response = Http::withHeaders([
            'X-API-Key' => 'isk_Z7kyQZMSFYdeMx4iAmISOiseAmflEMHM',
        ])->get('https://wallet.iskapay.com/api/gateway/balance');

        return response()->json($response->json());
    }

    public function iskapay_statistics()
    {
        $response = Http::withHeaders([
            'X-API-Key' => 'isk_Z7kyQZMSFYdeMx4iAmISOiseAmflEMHM',
        ])->get('https://wallet.iskapay.com/api/gateway/payments/statistics');

        return response()->json($response->json());
    }
}
