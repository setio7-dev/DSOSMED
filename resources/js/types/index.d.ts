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

export interface ServicesAdaOtpProps {
    id: number;
    parent_service_id: number;
    text: string;
    description: string;
    icon: string;
    children: ServiceCountryAdaOtpProps[];
}

export interface ServiceCountryAdaOtpProps {
    id: number;
    service_id: number;
    parent_id: number;
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
    metrics: {
        total_success: number;
        today_success: number;
        total_order: number;
        today_order: number;
        complete_currently: number;
    };
    labels: string[];
}

export interface ServiceVirtusimListCountryProps {
    id: string;
    country_code: string;
    country_name: string;
    img_link: string;
    children: ServiceVirtusimListServiceProps[];
    service_id: number;
}

export interface ServiceVirtusimListServiceProps {
    id: string;
    parent_id: number;
    name: string;
    price: string;
    is_promo: "0" | "1";
    tersedia: string;
    provider_service_id: string;
    country: string;
    status: "0" | "1";
    category: string;
}

export interface MedanPediaServiceProps {
    id: number;
    service_id: number;
    name: string;
    type: string;
    category: string;
    price: number;
    min: number;
    max: number;
    description: string;
    refill: number;
    average_time: string;
}

export interface TransactionProps {
    name: string;
    service_id: string;
    type: string;
    user_id: number;
    order_id: number;
    price: number;
    quantity: string | number;
    status: string;
    result: number;
    user: UserProps;
    created_at: Date;
}

export interface DepositProps {
    merchant_order_id: string;
    payment_method: string;
    amount: number;
    created_at: string;
    user: UserProps;
}

export type MedanPediaOrderStatus =
    | "Pending"
    | "Processing"
    | "Success"
    | "Error"
    | "Partial";

export interface MedanPediaStatusData {
    order_id: number;
    status: MedanPediaOrderStatus;
    charge: number;
    start_count: number;
    remains: number;
}

export interface GuideProps {
    id: number;
    name: string;
    desc: string;
    type: string;
}

export interface CustomerServiceProps {
    id: number;
    name: string;
    desc: string;
    phone: string;
}