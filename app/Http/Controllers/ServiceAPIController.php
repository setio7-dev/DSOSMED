<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ServiceAPIController extends Controller
{
    // Virtusim
    public function virtusim_api_listcountry()
    {
        $response = Http::get('https://virtusim.com/api/v2/json.php', [
            'api_key' => 'CkLMBwcFoORWm0P5iThVqJf1Drsbyj',
            'action' => 'list_country'
        ]);

        return response()->json($response->json());
    }

    public function virtusim_api_listservice(string $country)
    {
        $response = Http::get('https://virtusim.com/api/v2/json.php', [
            'api_key' => 'CkLMBwcFoORWm0P5iThVqJf1Drsbyj',
            'action' => 'services',
            'country' => $country
        ]);

        return response()->json($response->json());
    }

    // Ada OTP
    public function adaotp_api_listservice()
    {
        $response = Http::withHeaders([
            "Authorization" => "Bearer IgxdTIq7LtuwgsmSWDATZyayL8S66Dx9",
        ])->get("https://adaotp.com/api/v1/services");

        return response()->json($response->json());
    }
    
    public function adaotp_api_listcountry($id)
    {
        $response = Http::withHeaders([
            "Authorization" => "Bearer IgxdTIq7LtuwgsmSWDATZyayL8S66Dx9",
        ])->get("https://adaotp.com/api/v1/services/{$id}/countries");

        return response()->json($response->json());
    }
}
