// Pyth Network Hermes feed IDs for all tokens in TokenTicker
export const PYTH_FEED_IDS = {
  BTC: "e62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43",
  ETH: "ff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
  USDT: "2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b",
  BNB: "2f95862b045670cd22bee3114c39763a4a08beeb663b145d283c31d7d1101c4f",
  XRP: "ec5d399846a9209f3fe5881d70aae9268c94339ff9817e8d18ff19fa05eea1c8",
  ADA: "2a01deaec9e51a579277b34b122399984d0bbf57e2458a7e42fecd2829867a0d",
  SOL: "ef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d",
  DOT: "ca3eed9b267293f6595901c734c7525ce8ef49adafe8284606ceb307afa2ca5b",
  USDC: "eaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a",
  MATIC: "ffd11c5a1cfd42f80afb2df4d9f264c15f956d68153335374ec10722edd70472",
  SHIB: "f0d57deca57b3da2fe63a493f4c25925fdfd8edf834b20f93e1f84dbd1504d4a",
  TRX: "67aed5a24fdad045475e7195c98a98aea119c763f272d4523f5bac93a4f33c2b",
  AVAX: "93da3352f9f1d105fdfe4971cfa80e9dd777bfc5d0f683ebb6e1294b92137bb7",
  UNI: "78d185a741d07edb3412b09008b7c5cfb9bbbd7d568bf00ba737b456ba171501",
} as const;

export const HERMES_URL = "https://hermes.pyth.network/v2/updates/price/latest";
export const HERMES_SSE_URL = "https://hermes.pyth.network";
