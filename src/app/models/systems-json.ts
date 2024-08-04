export type SystemsJson = {
    meta:     Meta;
    data:     Datum[];
    included: Included[];
}

export interface Datum {
    type:          string;
    id:            string;
    attributes:    DatumAttributes;
    relationships: Relationships;
}

export interface DatumAttributes {
    name:                     string;
    replacement_system_id:    string;
    alternative_name:         string;
    amount:                   null;
    currency:                 string;
    default_network_id:       null;
    decimal_places:           number;
    can_send:                 boolean;
    can_receive:              boolean;
    fee_send:                 number;
    fee_receive:              number;
    fixed_fee_send:           number;
    fixed_fee_receive:        number;
    account_required_send:    boolean;
    account_required_receive: boolean;
    minimum_amount_send:      number;
    minimum_amount_receive:   number;
    maximum_amount_send:      number;
    maximum_amount_receive:   number;
    account_type:             string;
    group_id:                 string;
    market:                   string;
    trend:                    number;
}

export interface Relationships {
    rates:              Networks;
    system_information: Networks;
    currency:           Currency;
    networks:           Networks;
}

export interface Currency {
    data: DAT;
}

export interface DAT {
    type: Type;
    id:   string;
}

export enum Type {
    Currencies = "currencies",
    Rates = "rates",
    SystemInformation = "system_information",
}

export interface Networks {
    data: DAT[];
}

export interface Included {
    type:       Type;
    id:         string;
    attributes: IncludedAttributes;
    links:      Links;
}

export interface IncludedAttributes {
    description:                 string;
    pros:                        string;
    cons:                        string;
    time_average:                number;
    trend_by_day:                string;
    trend_by_weekday:            string;
    alternative_system_ids:      string;
    on_time_percent:             number;
    volume:                      number;
    alternative_name:            string;
    qty_user_per_system:         number;
    qty_sent_transaction:        number;
    qty_coordinated_transaction: number;
    tags:                        string;
}

export interface Links {
    self: string;
}

export interface Meta {
    page:               number;
    resources_per_page: number;
    total_resources:    number;
}

