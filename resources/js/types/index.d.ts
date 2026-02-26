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

interface AdaOtpOrderApiProps {
    id: number;
    number: string;
    service: {
        id: number;
        name: string;
    };
    has_sms: boolean;
    sms: string | null;
    status: string;
    remaining_time: number;
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
    api_type: string;
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
    target: string;
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

export interface JasaOtpCountryProps {
    id_negara: number;
    nama_negara: string;
}

export interface JasaOtpServiceDetailProps {
    harga: number;
    stok: number;
    layanan: string;
}

export interface CountryServicesProps {
    [serviceCode: string]: ServiceDetail;
}

export interface JasaOtpServiceProps {
    operator: {
        [countryId: string]: string[];
    };
    service: {
        [countryId: string]: CountryServices;
    };
}

export interface JasaOtpCountryProps {
    id_negara: number;
    nama_negara: string;
}

export interface JasaOtpServiceChildProps {
  id: number;
  parent_id: number;
  code: string;
  price: number;
  service: string;
  operator: string;
  stock: number;
  created_at?: string;
  updated_at?: string;
}

export interface JasaOtpServiceProps {
  id: number;
  country_id: number;
  country: string;
  children: JasaOtpServiceChildProps[];
  created_at?: string;
  updated_at?: string;
}

export interface MiraiServiceProps {
  id: number;
  type: "primary" | "secondary" | string;
  category: string;
  name: string;
  price: number;
  min: number;
  max: number;
  refill: boolean;
  cancel: boolean;
  refill_days: number;
  description: string;
  avg_quantity: number;
  avg_time_in_seconds: number;
  avg_time_in_human: string;
  created_at: string;
  updated_at: string;
}
