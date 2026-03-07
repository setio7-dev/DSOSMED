<?php

namespace App\Http\Controllers;

use App\Models\ServiceSuntik;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Laravel\Sanctum\PersonalAccessToken;

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

    public function adaotp_cancel_order(Request $request)
    {
        $order_id = $request->order_id;
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
            'order_id' => 'required',
        ]);

        $response = Http::asForm()->post(
            'https://api.medanpedia.co.id/status',
            [
                'api_id' => '37461',
                'api_key' => 'vbsj08-btcidp-bqfnnw-k2hydl-hga8xk',
                'id' => $request->order_id,
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
            return $body;
        }

        return response()->json([
            'success' => false,
            'message' => 'Format response tidak dikenali',
        ], 500);
    }

    public function medanpedia_api_refill(Request $request)
    {
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

    public function medanpedia_api_refill_status(Request $request)
    {
        $request->validate([
            'order_id' => 'required',
        ]);

        $response = Http::asForm()->post(
            'https://api.medanpedia.co.id/refill_status',
            [
                'api_id' => '37461',
                'api_key' => 'vbsj08-btcidp-bqfnnw-k2hydl-hga8xk',
                'id_refill' => $request->refill_id,
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

    public function jasaotp_order_status(Request $request)
    {
        $orderId = $request->order_id;
        $response = Http::get('https://api.jasaotp.id/v1/sms.php', [
            'api_key' => '1bfe748360e3d244b9a76ae0e285860b',
            'id' => $orderId,
        ]);

        return response()->json($response->json());
    }

    public function jasaotp_order_cancel(Request $request)
    {
        $orderId = $request->order_id;
        $response = Http::get('https://api.jasaotp.id/v1/cancel.php', [
            'api_key' => '1bfe748360e3d244b9a76ae0e285860b',
            'id' => $orderId,
        ]);

        return response()->json($response->json());
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

    public function miraipedia_orders_status(Request $request)
    {

        $response = Http::asForm()
            ->post('https://api.mirai-pedia.com/order/status', [
                'api_key' => '12c043-0a8591-97da15-8937f4-f11a40',
                'secret_key' => 'Ikannnnn123',
                'ref_id' => $request->order_id,
            ]);

        return response()->json($response->json());
    }

    public function miraipedia_refill(Request $request)
    {
        $response = Http::asForm()
            ->post('https://api.mirai-pedia.com/order/refill/create', [
                'api_key' => '12c043-0a8591-97da15-8937f4-f11a40',
                'secret_key' => 'Ikannnnn123',
                'ref_id' => $request->order_id,
            ]);

        return response()->json($response->json());
    }

    public function miraipedia_refill_status(Request $request)
    {
        $response = Http::asForm()
            ->post('https://api.mirai-pedia.com/order/refill/status', [
                'api_key' => '12c043-0a8591-97da15-8937f4-f11a40',
                'secret_key' => 'Ikannnnn123',
                'ref_id' => $request->refill_id,
            ]);

        return response()->json($response->json());
    }

    // Popup News
    // public function news()
    // {
    //     $responseMedanPedia = $this->medanpedia_api_services();
    //     $responseMiraiPedia = $this->miraipedia_service();

    //     $medanData = $responseMedanPedia->getData(true);
    //     $miraiData = $responseMiraiPedia->getData(true);

    //     $medanServices = $medanData['data'] ?? $medanData ?? [];
    //     $miraiServices = $miraiData['data'] ?? $miraiData ?? [];

    //     $apiServices = collect($medanServices)
    //         ->merge($miraiServices)
    //         ->map(function ($item) {

    //             return [
    //                 "id" => $item['id'] ?? $item['service'] ?? null,
    //                 "name" => $item['name'] ?? null,
    //                 "price" => $item['price'] ?? $item['rate'] ?? 0,
    //                 "min" => $item['min'] ?? 0,
    //                 "max" => $item['max'] ?? 0
    //             ];
    //         })
    //         ->filter(fn($v) => $v['id'] !== null)
    //         ->values()
    //         ->toArray();

    //     $localServices = ServiceSuntik::all();
    //     $localMap = $localServices->keyBy('service_id');

    //     $price_increase = [];
    //     $price_decrease = [];
    //     $min_changed = [];
    //     $max_changed = [];
    //     $others = [];
    //     $deactivated = [];

    //     foreach ($apiServices as $api) {

    //         $apiId = $api['id'];

    //         if (!$localMap->has($apiId)) continue;

    //         $local = $localMap[$apiId];

    //         $apiPrice = (int) $api['price'];
    //         $localPrice = (int) $local->price;

    //         $apiMin = (int) $api['min'];
    //         $localMin = (int) $local->min;

    //         $apiMax = (int) $api['max'];
    //         $localMax = (int) $local->max;

    //         if ($apiPrice !== $localPrice) {

    //             $obj = [
    //                 "id" => (string) $apiId,
    //                 "name" => $api['name'] ?? $local->name,
    //                 "local" => $localPrice,
    //                 "api" => $apiPrice,
    //                 "rowNumber" => $local->id,
    //                 "apiSample" => [
    //                     "id" => (string) $apiId,
    //                     "name" => $api['name'] ?? $local->name,
    //                     "price" => $apiPrice
    //                 ]
    //             ];

    //             if ($apiPrice > $localPrice) {
    //                 $price_increase[] = $obj;
    //             } else {
    //                 $price_decrease[] = $obj;
    //             }
    //         }

    //         if ($apiMin !== $localMin) {

    //             $min_changed[] = [
    //                 "id" => (string) $apiId,
    //                 "name" => $api['name'] ?? $local->name,
    //                 "local" => $localMin,
    //                 "api" => $apiMin,
    //                 "rowNumber" => $local->id
    //             ];
    //         }

    //         if ($apiMax !== $localMax) {

    //             $max_changed[] = [
    //                 "id" => (string) $apiId,
    //                 "name" => $api['name'] ?? $local->name,
    //                 "local" => $localMax,
    //                 "api" => $apiMax,
    //                 "rowNumber" => $local->id
    //             ];
    //         }
    //     }

    //     $apiIds = collect($apiServices)
    //         ->pluck('id')
    //         ->map(fn($v) => (string) $v)
    //         ->toArray();

    //     foreach ($localServices as $local) {

    //         if (!in_array((string) $local->service_id, $apiIds)) {

    //             $deactivated[] = [
    //                 "localRowNumber" => $local->id,
    //                 "id" => (string) $local->service_id,
    //                 "reason" => "missing_in_api"
    //             ];
    //         }
    //     }

    //     $summary = [
    //         "apiTotal" => count($apiServices),
    //         "localTotal" => $localServices->count(),
    //         "price_increase" => count($price_increase),
    //         "price_decrease" => count($price_decrease),
    //         "min_changed" => count($min_changed),
    //         "max_changed" => count($max_changed),
    //         "deactivated" => count($deactivated),
    //         "others" => count($others)
    //     ];

    //     return response()->json([
    //         "status" => true,
    //         "summary" => $summary,
    //         "price_increase" => $price_increase,
    //         "price_decrease" => $price_decrease,
    //         "min_changed" => $min_changed,
    //         "max_changed" => $max_changed,
    //         "deactivated" => $deactivated,
    //         "others" => $others
    //     ]);
    // }

    public function popup_news()
    {
        $url = "https://t.me/s/medanpediaNOTICE";

        $context = stream_context_create([
            'http' => [
                'header' => "User-Agent: Mozilla/5.0\r\n"
            ]
        ]);

        $html = file_get_contents($url, false, $context);

        libxml_use_internal_errors(true);

        $dom = new \DOMDocument();
        $dom->loadHTML($html);

        $xpath = new \DOMXPath($dom);

        $nodes = $xpath->query("//*[contains(@class,'tgme_widget_message_wrap')]");

        $data = [];

        $filterDate = strtotime("2026-03-06");

        foreach ($nodes as $node) {

            $textNode = $xpath->query(".//*[contains(@class,'tgme_widget_message_text')]", $node);
            $timeNode = $xpath->query(".//time", $node);

            if ($textNode->length == 0 || $timeNode->length == 0) {
                continue;
            }

            $text = trim($textNode->item(0)->textContent);
            $date = $timeNode->item(0)->getAttribute('datetime');

            $timestamp = strtotime($date);
            if ($timestamp < $filterDate) {
                continue;
            }

            $text = preg_replace('/\s+/', ' ', $text);

            preg_match('/ID Layanan:\s*(\d+)/', $text, $id);
            preg_match('/Nama Layanan:\s*(.*?)Keterangan:/', $text, $nama);
            preg_match('/Keterangan:\s*(.*)/', $text, $ket);

            $keterangan = trim($ket[1] ?? '');

            // DETEKSI KENAIKAN HARGA
            $oldPrice = null;
            $newPrice = null;

            if (preg_match('/Rp\s?([\d\.]+).*?(?:menjadi|mejadi)\s?Rp\s?([\d\.]+)/i', $keterangan, $price)) {
                $oldPrice = str_replace('.', '', $price[1]);
                $newPrice = str_replace('.', '', $price[2]);
            }

            $data[] = [
                'tanggal' => date('Y-m-d H:i:s', $timestamp),
                'id_layanan' => $id[1] ?? null,
                'nama_layanan' => trim($nama[1] ?? ''),
                'keterangan' => $keterangan,
                'old_price' => $oldPrice,
                'new_price' => $newPrice
            ];
        }

        usort($data, function ($a, $b) {
            return strtotime($b['tanggal']) - strtotime($a['tanggal']);
        });

        return response()->json($data);
    }
}
