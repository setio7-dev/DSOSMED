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

    public function virtusim_api_order(Request $request)
    {
        $user = Auth::user();
        if ($user->saldo < $request->price) {
            return response()->json([
                'message' => 'Saldo Anda Tidak Cukup!',
            ], 422);
        }

        $response = Http::timeout(30)->get('https://virtusim.com/api/json.php', [
            'api_key' => 'CkLMBwcFoORWm0P5iThVqJf1Drsbyj',
            'action' => 'order',
            'service' => $request->service_id,
            'operator' => 'any',
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

        $query = http_build_query([
            'apikey' => "Wwnpfj17qfJERz7uDhAIC28rTw779RRE",
            'country' => (int) $request->country,
            'service_id' => (int) $request->service_id,
        ]);

        $response = Http::asForm()->post(
            "https://adaotp.com/api/v1/orders?$query"
        );

        return response()->json($response->json(), $response->status());
    }

    public function ada_otp_getorders()
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer Wwnpfj17qfJERz7uDhAIC28rTw779RRE',
            'Accept' => 'application/json',
        ])->get('https://adaotp.com/api/v1/orders/active');

        return response()->json($response->json());
    }

    public function adaotp_cancel_order($order_id)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer Wwnpfj17qfJERz7uDhAIC28rTw779RRE',
            'Accept' => 'application/json',
        ])->delete("https://adaotp.com/api/v1/orders/{$order_id}");

        return response()->json($response->json());
    }

    public function adaotp_finish_order($order_id)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer Wwnpfj17qfJERz7uDhAIC28rTw779RRE',
        ])->post("https://adaotp.com/api/v1/orders/{$order_id}/finish");

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
        $user = Auth::user();
        if ($user->saldo < $request->price) {
            return response()->json([
                'message' => 'Saldo Anda Tidak Cukup!',
            ], 422);
        }

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

        if (! isset($body['status']) || $body['status'] === false) {
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

    public function medanpedia_api_status(Request $request)
    {
        $request->validate([
            'id' => 'required',
        ]);

        $response = Http::asForm()->post(
            'https://api.medanpedia.co.id/status',
            [
                'api_id' => '37461',
                'api_key' => 'vbsj08-btcidp-bqfnnw-k2hydl-hga8xk',
                'id' => $request->id,
            ]
        );

        $body = $response->json();

        if (! isset($body['status']) || $body['status'] === false) {
            return response()->json([
                'success' => false,
                'message' => $body['msg'] ?? 'Pesanan tidak ditemukan',
            ], 422);
        }

        if (isset($body['data'])) {
            return response()->json([
                'success' => true,
                'message' => $body['msg'],
                'data' => [
                    'order_id' => $body['data']['id'] ?? null,
                    'status' => $body['data']['status'] ?? null,
                    'charge' => $body['data']['charge'] ?? 0,
                    'start_count' => $body['data']['start_count'] ?? 0,
                    'remains' => $body['data']['remains'] ?? 0,
                ],
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Format response tidak dikenali',
        ], 500);
    }

    public function medanpedia_api_refill(Request $request)
    {
        $user = Auth::user();
        if ($user->saldo < $request->price) {
            return response()->json([
                'message' => 'Saldo Anda Tidak Cukup!',
            ], 422);
        }

        $request->validate([
            'order_id' => 'required',
        ]);

        $response = Http::asForm()->post(
            'https://api.medanpedia.co.id/refill',
            [
                'api_id' => '37461',
                'api_key' => 'vbsj08-btcidp-bqfnnw-k2hydl-hga8xk',
                'id_order' => $request->order_id,
            ]
        );

        $body = $response->json();
        if (isset($body['data'])) {
            return response()->json([
                'success' => true,
                'message' => $body['msg'],
                'data' => $body,
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Order tidak ditemukan/tidak valid',
        ], 500);
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
        ])->get('https://wallet.iskapay.com/api/gateway/payments/' . $merchant_order_id);

        return response()->json($response->json());
    }

    public function iskapay_cancel_payment($merchant_order_id)
    {
        $response = Http::withHeaders([
            'X-API-Key' => 'isk_Z7kyQZMSFYdeMx4iAmISOiseAmflEMHM',
        ])->post('https://wallet.iskapay.com/api/gateway/payments/' . $merchant_order_id . '/cancel');

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

    // Jasa OTP
    public function jasaotp_country()
    {
        $response = Http::get('https://api.jasaotp.id/v1/negara.php');

        return response()->json($response->json());
    }

    public function jasaotp_operator(Request $request)
    {
        $country = $request->query('country');
        $response = Http::get('https://api.jasaotp.id/v1/operator.php', [
            'negara' => $country,
        ]);

        return response()->json($response->json());
    }

    public function jasaotp_service(Request $request)
    {
        $country = $request->query('country');
        $response = Http::get('https://api.jasaotp.id/v1/layanan.php', [
            'negara' => $country,
        ]);

        return response()->json($response->json());
    }

    public function jasaotp_order(Request $request)
    {
        $user = Auth::user();

        if ($user->saldo < $request->price) {
            return response()->json([
                'success' => false,
                'message' => 'Saldo Anda Tidak Cukup!',
            ], 422);
        }

        $response = Http::get(
            'https://api.jasaotp.id/v1/order.php',
            [
                'api_key' => '1bfe748360e3d244b9a76ae0e285860b',
                'negara' => $request->country,
                'layanan' => $request->service,
                'operator' => $request->operator,
            ]
        );
        
        $body = $response->json();
        if (! isset($body['success']) || $body['success'] !== true) {
            return response()->json([
                'success' => false,
                'message' => 'Order gagal. Silahkan hubungi admin untuk info lebih lanjut!',
            ], 422);
        }

        return response()->json([
            'success' => true,
            'message' => $body['message'],
            'order_id' => $body['data']['order_id'] ?? null,
            'number' => $body['data']['number'] ?? null,
        ]);
    }

    // MiraiPedia
    public function miraipedia_service()
    {
        $response = Http::asForm()
            ->post('https://api.mirai-pedia.com/services', [
                'api_key' => '12c043-0a8591-97da15-8937f4-f11a40',
                'secret_key' => 'Ikannnnn123',
            ]);

        return response()->json($response->json());
    }

    public function miraipedia_order(Request $request)
    {
        $user = Auth::user();

        if ($user->saldo < $request->price) {
            return response()->json([
                'success' => false,
                'message' => 'Saldo Anda Tidak Cukup!',
            ], 422);
        }

        $response = Http::asForm()
            ->post('https://api.mirai-pedia.com/order/create', [
                'api_key' => '12c043-0a8591-97da15-8937f4-f11a40',
                'secret_key' => 'Ikannnnn123',
                'service_id' => $request->service,
                'target' => $request->target,
                'quantity' => $request->quantity,
            ]);

        return response()->json($response->json());
    }

    public function miraipedia_refill(Request $request)
    {
        $user = Auth::user();

        if ($user->saldo < $request->price) {
            return response()->json([
                'success' => false,
                'message' => 'Saldo Anda Tidak Cukup!',
            ], 422);
        }

        $response = Http::asForm()
            ->post('https://api.mirai-pedia.com/order/refill/create', [
                'api_key' => '12c043-0a8591-97da15-8937f4-f11a40',
                'secret_key' => 'Ikannnnn123',
                'ref_id' => $request->order_id,
            ]);

        return response()->json($response->json());
    }
}
