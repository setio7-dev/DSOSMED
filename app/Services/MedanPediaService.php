<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class MedanPediaService
{
    protected string $url;
    protected string $apiKey;
    protected string $apiId;

    public function __construct()
    {
        $this->url = config('services.medanpedia.url');
        $this->apiKey = config('services.medanpedia.key');
        $this->apiId = config('services.medanpedia.id');
    }

    protected function request(array $payload)
    {
        return Http::asForm()->post($this->url, array_merge([
            'api_id' => $this->apiId,
            'api_key' => $this->apiKey,
        ], $payload))->json();
    }

    /** getProfile */
    public function getProfile()
    {
        return $this->request([
            'action' => 'profile'
        ]);
    }

    /** getServices */
    public function getServices(bool $isFav = false)
    {
        return $this->request([
            'action' => 'services',
            'favorite' => $isFav ? 1 : 0
        ]);
    }

    /** getOrder */
    public function order(
        int $serviceId,
        string $target,
        int $quantity,
        ?string $customComments = null,
        ?string $customLink = null
    ) {
        return $this->request(array_filter([
            'action' => 'order',
            'service' => $serviceId,
            'target' => $target,
            'quantity' => $quantity,
            'comments' => $customComments,
            'link' => $customLink
        ]));
    }

    /** getStatus */
    public function status(int $orderId)
    {
        return $this->request([
            'action' => 'status',
            'order_id' => $orderId
        ]);
    }

    /** refill */
    public function refill(int $orderId)
    {
        return $this->request([
            'action' => 'refill',
            'order_id' => $orderId
        ]);
    }

    /** refillStatus */
    public function refillStatus(int $refillId)
    {
        return $this->request([
            'action' => 'refill_status',
            'refill_id' => $refillId
        ]);
    }
}
