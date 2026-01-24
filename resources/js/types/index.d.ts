import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface UserProps {
    id: number;
    username: string;
    saldo: number;
    isAdmin: string;
    created_at: string;
    updated_at: string;
}

export interface ServicesProps {
    id: number;
    text: string;
    description: string;
    icon: string;
}

export interface Metrics {
    total_success: number;
    today_success: number;
    total_order: number;
    today_order: number;
    complete_currently: number;
}

export interface CountryProps {
    id: number;
    name: string;
    iso: string;
    prefix: string;
    price: number;
    price_formatted: string;
    available: boolean;
    provider_id: number;
    provider_name: string;
    stock: number;
    stock_formatted: string;
    delivery_percent: number;
    delivery_formatted: string;
    operator: string;
    quality_score: string;
    provider_rate: string;
    order_count_today: number;
    can_order: boolean;
    current_demand_status: string;
    avg_delivery_time: number;
    avg_delivery_time_formatted: string;
    metrics: Metrics;
    labels: string[];
}

export interface ServiceOrderAdaOtpProps {
    id: number;
    name: string;
    image: string;
    child: [
        {
            id: number;
            nokos_parent_id: number;
            country: string;
            stock: string;
            price: string;
        }
    ]
}

export interface ServiceVirtusimListCountryProps {
    id: string;
    country_code: string;
    country_name: string;
    img_link: string;
}

export interface ServiceVirtusimListServiceProps {
    id: string;
    name: string;
    price: string;
    is_promo: "0" | "1";
    tersedia: string;
    provider_service_id: string;
    country: string;
    status: "0" | "1";
    category: string;
}

