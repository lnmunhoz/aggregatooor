export interface Stats {
  asset_usd_value: number;
  debt_usd_value: number;
  net_usd_value: number;
  daily_yield_usd_value: number;
  daily_cost_usd_value: number;
  daily_net_yield_usd_value: number;
}

export interface SupplyTokenList {
  id: string;
  chain: string;
  name: string;
  symbol: string;
  display_symbol: string;
  optimized_symbol: string;
  decimals: number;
  logo_url: string;
  protocol_id: string;
  price: number;
  is_verified?: boolean;
  is_core?: boolean;
  is_wallet: boolean;
  time_at: number;
  amount: number;
  is_collateral: boolean;
}

export interface BorrowTokenList {
  id: string;
  chain: string;
  name: string;
  symbol: string;
  display_symbol?: any;
  optimized_symbol: string;
  decimals: number;
  logo_url: string;
  protocol_id: string;
  price: number;
  is_verified: boolean;
  is_core: boolean;
  is_wallet: boolean;
  time_at: number;
  amount: number;
  category: string;
}

export interface TokenList {
  id: string;
  chain: string;
  name: string;
  symbol: string;
  display_symbol: string;
  optimized_symbol: string;
  decimals: number;
  logo_url: string;
  protocol_id: string;
  price: number;
  is_verified: boolean;
  is_core: boolean;
  is_wallet: boolean;
  time_at: number;
  amount: number;
}

export interface RewardTokenList {
  id: string;
  chain: string;
  name: string;
  symbol: string;
  display_symbol: string;
  optimized_symbol: string;
  decimals: number;
  logo_url: string;
  protocol_id: string;
  price: number;
  is_verified: boolean;
  is_core: boolean;
  is_wallet: boolean;
  time_at: number;
  amount: number;
}

export interface Detail {
  supply_token_list: SupplyTokenList[];
  borrow_token_list: BorrowTokenList[];
  health_rate: number;
  token_list: TokenList[];
  reward_token_list: RewardTokenList[];
  description: string;
}

export interface ProxyDetail {}

export interface PortfolioItemList {
  stats: Stats;
  update_at: number;
  name: string;
  detail_types: string[];
  detail: Detail;
  proxy_detail: ProxyDetail;
}

export interface ComplexProtocolListResponse {
  id: string;
  chain: string;
  name: string;
  site_url: string;
  logo_url: string;
  has_supported_portfolio: boolean;
  tvl: number;
  portfolio_item_list: PortfolioItemList[];
}
