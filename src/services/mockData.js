export const mockData = {
  tags: ["TEST", "MAIN"],

  projects: [
    "ethereum_defi",
    "bitcoin_mining",
    "solana_nft",
    "polygon_gaming",
    "avalanche_yield",
    "bsc_trading",
    "arbitrum_lending",
    "optimism_bridge",
  ],

  modules: {
    ethereum_defi: [
      "uniswap_v3_liquidity",
      "compound_lending",
      "aave_borrowing",
      "curve_staking",
      "balancer_pools",
    ],
    bitcoin_mining: [
      "mining_pool_optimization",
      "hashrate_monitoring",
      "profit_calculation",
      "pool_switching",
    ],
    solana_nft: [
      "magic_eden_trading",
      "metaplex_minting",
      "rarity_analysis",
      "floor_price_tracking",
    ],
    polygon_gaming: [
      "axie_infinity_battles",
      "sandbox_land_trading",
      "decentraland_events",
      "gaming_nft_farming",
    ],
    avalanche_yield: [
      "pangolin_farming",
      "trader_joe_liquidity",
      "benqi_lending",
      "yield_optimization",
    ],
    bsc_trading: [
      "pancakeswap_arbitrage",
      "venus_lending",
      "alpaca_farming",
      "autofarm_compounding",
    ],
    arbitrum_lending: [
      "aave_v3_arbitrum",
      "compound_v3_arbitrum",
      "dopex_options",
      "gmx_trading",
    ],
    optimism_bridge: [
      "optimism_bridge",
      "hop_protocol",
      "synapse_bridge",
      "across_protocol",
    ],
  },

  moduleSettings: {
    uniswap_v3_liquidity: {
      network: {
        type: ["list", "str"],
        default: ["ethereum_mainnet"],
        description: "Network to use for Uniswap V3",
      },
      pool_fee: {
        type: ["int"],
        default: 3000,
        description: "Pool fee tier (500, 3000, 10000)",
      },
      min_tick: {
        type: ["int"],
        default: -887220,
        description: "Minimum tick for liquidity range",
      },
      max_tick: {
        type: ["int"],
        default: 887220,
        description: "Maximum tick for liquidity range",
      },
      percentage_boundaries: {
        type: ["str"],
        default: "0.1,0.5,1.0,2.0,5.0",
        description: "Percentage boundaries for position sizing",
      },
      slippage_tolerance: {
        type: ["float"],
        default: 0.5,
        description: "Slippage tolerance percentage",
      },
    },
    compound_lending: {
      network: {
        type: ["list", "str"],
        default: ["ethereum_mainnet"],
        description: "Network to use for Compound",
      },
      ctoken_address: {
        type: ["str"],
        default: "",
        description: "cToken contract address",
      },
      amount_boundaries: {
        type: ["str"],
        default: "100,500,1000,5000,10000",
        description: "Amount boundaries for lending",
      },
      interest_rate_model: {
        type: ["jump_rate", "white_paper"],
        default: "jump_rate",
        description: "Interest rate model type",
      },
    },
    aave_borrowing: {
      network: {
        type: ["list", "str"],
        default: ["ethereum_mainnet"],
        description: "Network to use for Aave",
      },
      asset_address: {
        type: ["str"],
        default: "",
        description: "Asset contract address",
      },
      interest_rate_strategy: {
        type: ["stable", "variable"],
        default: "variable",
        description: "Interest rate strategy",
      },
      percentage_boundaries: {
        type: ["str"],
        default: "0.1,0.3,0.5,1.0,2.0",
        description: "Percentage boundaries for borrowing",
      },
      health_factor_threshold: {
        type: ["float"],
        default: 1.5,
        description: "Minimum health factor",
      },
    },
    magic_eden_trading: {
      network: {
        type: ["list", "str"],
        default: ["solana_mainnet"],
        description: "Network to use for Magic Eden",
      },
      collection_address: {
        type: ["str"],
        default: "",
        description: "NFT collection address",
      },
      floor_price_threshold: {
        type: ["float"],
        default: 0.1,
        description: "Minimum floor price in SOL",
      },
      max_price: {
        type: ["float"],
        default: 10.0,
        description: "Maximum price to pay in SOL",
      },
      rarity_filter: {
        type: ["common", "uncommon", "rare", "epic", "legendary"],
        default: "rare",
        description: "Minimum rarity filter",
      },
    },
    mining_pool_optimization: {
      network: {
        type: ["list", "str"],
        default: ["bitcoin_mainnet"],
        description: "Network to use for mining",
      },
      pool_url: {
        type: ["str"],
        default: "",
        description: "Mining pool URL",
      },
      worker_name: {
        type: ["str"],
        default: "worker1",
        description: "Mining worker name",
      },
      hash_rate_threshold: {
        type: ["float"],
        default: 100.0,
        description: "Minimum hash rate in TH/s",
      },
      profit_margin: {
        type: ["float"],
        default: 0.05,
        description: "Minimum profit margin",
      },
    },
    hashrate_monitoring: {
      network: {
        type: ["list", "str"],
        default: ["bitcoin_mainnet"],
        description: "Network to monitor",
      },
      monitoring_interval: {
        type: ["int"],
        default: 60,
        description: "Monitoring interval in seconds",
      },
      alert_threshold: {
        type: ["float"],
        default: 0.8,
        description: "Alert threshold for hash rate drop",
      },
    },
    profit_calculation: {
      network: {
        type: ["list", "str"],
        default: ["bitcoin_mainnet"],
        description: "Network for profit calculation",
      },
      electricity_cost: {
        type: ["float"],
        default: 0.1,
        description: "Electricity cost per kWh",
      },
      pool_fee: {
        type: ["float"],
        default: 0.01,
        description: "Pool fee percentage",
      },
    },
    pool_switching: {
      network: {
        type: ["list", "str"],
        default: ["bitcoin_mainnet"],
        description: "Network for pool switching",
      },
      switch_threshold: {
        type: ["float"],
        default: 0.05,
        description: "Profit threshold for switching pools",
      },
      min_switch_interval: {
        type: ["int"],
        default: 3600,
        description: "Minimum time between switches (seconds)",
      },
    },
    metaplex_minting: {
      network: {
        type: ["list", "str"],
        default: ["solana_mainnet"],
        description: "Network for Metaplex minting",
      },
      collection_size: {
        type: ["int"],
        default: 1000,
        description: "Number of NFTs to mint",
      },
      mint_price: {
        type: ["float"],
        default: 0.1,
        description: "Mint price in SOL",
      },
    },
    rarity_analysis: {
      network: {
        type: ["list", "str"],
        default: ["solana_mainnet"],
        description: "Network for rarity analysis",
      },
      collection_address: {
        type: ["str"],
        default: "",
        description: "Collection contract address",
      },
      analysis_depth: {
        type: ["int"],
        default: 100,
        description: "Number of traits to analyze",
      },
    },
    floor_price_tracking: {
      network: {
        type: ["list", "str"],
        default: ["solana_mainnet"],
        description: "Network for floor price tracking",
      },
      collection_address: {
        type: ["str"],
        default: "",
        description: "Collection contract address",
      },
      update_interval: {
        type: ["int"],
        default: 300,
        description: "Update interval in seconds",
      },
    },
    axie_infinity_battles: {
      network: {
        type: ["list", "str"],
        default: ["polygon_mainnet"],
        description: "Network for Axie Infinity",
      },
      battle_energy: {
        type: ["int"],
        default: 20,
        description: "Battle energy to use",
      },
      team_composition: {
        type: ["str"],
        default: "balanced",
        description: "Team composition strategy",
      },
    },
    sandbox_land_trading: {
      network: {
        type: ["list", "str"],
        default: ["ethereum_mainnet"],
        description: "Network for Sandbox trading",
      },
      land_size: {
        type: ["int"],
        default: 1,
        description: "Land size in parcels",
      },
      max_price: {
        type: ["float"],
        default: 1.0,
        description: "Maximum price in ETH",
      },
    },
    decentraland_events: {
      network: {
        type: ["list", "str"],
        default: ["ethereum_mainnet"],
        description: "Network for Decentraland",
      },
      event_type: {
        type: ["str"],
        default: "concert",
        description: "Type of event to attend",
      },
      duration: {
        type: ["int"],
        default: 60,
        description: "Event duration in minutes",
      },
    },
    gaming_nft_farming: {
      network: {
        type: ["list", "str"],
        default: ["polygon_mainnet"],
        description: "Network for gaming NFT farming",
      },
      farming_duration: {
        type: ["int"],
        default: 3600,
        description: "Farming duration in seconds",
      },
      nft_rarity: {
        type: ["str"],
        default: "rare",
        description: "Target NFT rarity",
      },
    },
    pangolin_farming: {
      network: {
        type: ["list", "str"],
        default: ["avalanche_mainnet"],
        description: "Network for Pangolin farming",
      },
      pool_address: {
        type: ["str"],
        default: "",
        description: "Farming pool address",
      },
      stake_amount: {
        type: ["float"],
        default: 100.0,
        description: "Amount to stake in AVAX",
      },
    },
    trader_joe_liquidity: {
      network: {
        type: ["list", "str"],
        default: ["avalanche_mainnet"],
        description: "Network for Trader Joe",
      },
      token_pair: {
        type: ["str"],
        default: "AVAX/USDC",
        description: "Token pair for liquidity",
      },
      liquidity_amount: {
        type: ["float"],
        default: 1000.0,
        description: "Liquidity amount",
      },
    },
    benqi_lending: {
      network: {
        type: ["list", "str"],
        default: ["avalanche_mainnet"],
        description: "Network for Benqi lending",
      },
      asset_address: {
        type: ["str"],
        default: "",
        description: "Asset contract address",
      },
      lending_amount: {
        type: ["float"],
        default: 100.0,
        description: "Amount to lend",
      },
    },
    yield_optimization: {
      network: {
        type: ["list", "str"],
        default: ["avalanche_mainnet"],
        description: "Network for yield optimization",
      },
      optimization_strategy: {
        type: ["str"],
        default: "compound",
        description: "Yield optimization strategy",
      },
      rebalance_frequency: {
        type: ["int"],
        default: 86400,
        description: "Rebalance frequency in seconds",
      },
    },
    pancakeswap_arbitrage: {
      network: {
        type: ["list", "str"],
        default: ["bsc_mainnet"],
        description: "Network for PancakeSwap",
      },
      token_pair: {
        type: ["str"],
        default: "BNB/BUSD",
        description: "Token pair for arbitrage",
      },
      min_profit: {
        type: ["float"],
        default: 0.01,
        description: "Minimum profit threshold",
      },
    },
    venus_lending: {
      network: {
        type: ["list", "str"],
        default: ["bsc_mainnet"],
        description: "Network for Venus lending",
      },
      asset_address: {
        type: ["str"],
        default: "",
        description: "Asset contract address",
      },
      lending_amount: {
        type: ["float"],
        default: 100.0,
        description: "Amount to lend",
      },
    },
    alpaca_farming: {
      network: {
        type: ["list", "str"],
        default: ["bsc_mainnet"],
        description: "Network for Alpaca farming",
      },
      farm_address: {
        type: ["str"],
        default: "",
        description: "Farm contract address",
      },
      stake_amount: {
        type: ["float"],
        default: 100.0,
        description: "Amount to stake",
      },
    },
    autofarm_compounding: {
      network: {
        type: ["list", "str"],
        default: ["bsc_mainnet"],
        description: "Network for AutoFarm",
      },
      vault_address: {
        type: ["str"],
        default: "",
        description: "Vault contract address",
      },
      compound_frequency: {
        type: ["int"],
        default: 3600,
        description: "Compound frequency in seconds",
      },
    },
    aave_v3_arbitrum: {
      network: {
        type: ["list", "str"],
        default: ["arbitrum_mainnet"],
        description: "Network for Aave V3",
      },
      asset_address: {
        type: ["str"],
        default: "",
        description: "Asset contract address",
      },
      lending_amount: {
        type: ["float"],
        default: 100.0,
        description: "Amount to lend",
      },
    },
    compound_v3_arbitrum: {
      network: {
        type: ["list", "str"],
        default: ["arbitrum_mainnet"],
        description: "Network for Compound V3",
      },
      market_address: {
        type: ["str"],
        default: "",
        description: "Market contract address",
      },
      supply_amount: {
        type: ["float"],
        default: 100.0,
        description: "Amount to supply",
      },
    },
    dopex_options: {
      network: {
        type: ["list", "str"],
        default: ["arbitrum_mainnet"],
        description: "Network for Dopex options",
      },
      option_type: {
        type: ["str"],
        default: "call",
        description: "Option type (call/put)",
      },
      strike_price: {
        type: ["float"],
        default: 100.0,
        description: "Strike price",
      },
    },
    gmx_trading: {
      network: {
        type: ["list", "str"],
        default: ["arbitrum_mainnet"],
        description: "Network for GMX trading",
      },
      trading_pair: {
        type: ["str"],
        default: "ETH/USD",
        description: "Trading pair",
      },
      position_size: {
        type: ["float"],
        default: 100.0,
        description: "Position size in USD",
      },
    },
    optimism_bridge: {
      network: {
        type: ["list", "str"],
        default: ["optimism_mainnet"],
        description: "Network for Optimism bridge",
      },
      bridge_amount: {
        type: ["float"],
        default: 1.0,
        description: "Amount to bridge in ETH",
      },
      destination_chain: {
        type: ["str"],
        default: "ethereum",
        description: "Destination chain",
      },
    },
    hop_protocol: {
      network: {
        type: ["list", "str"],
        default: ["optimism_mainnet"],
        description: "Network for Hop Protocol",
      },
      token_address: {
        type: ["str"],
        default: "",
        description: "Token contract address",
      },
      bridge_amount: {
        type: ["float"],
        default: 100.0,
        description: "Amount to bridge",
      },
    },
    synapse_bridge: {
      network: {
        type: ["list", "str"],
        default: ["optimism_mainnet"],
        description: "Network for Synapse bridge",
      },
      token_address: {
        type: ["str"],
        default: "",
        description: "Token contract address",
      },
      bridge_amount: {
        type: ["float"],
        default: 100.0,
        description: "Amount to bridge",
      },
    },
    across_protocol: {
      network: {
        type: ["list", "str"],
        default: ["optimism_mainnet"],
        description: "Network for Across Protocol",
      },
      token_address: {
        type: ["str"],
        default: "",
        description: "Token contract address",
      },
      bridge_amount: {
        type: ["float"],
        default: 100.0,
        description: "Amount to bridge",
      },
    },
  },

  networks: [
    "ethereum_mainnet",
    "ethereum_goerli",
    "ethereum_sepolia",
    "bitcoin_mainnet",
    "bitcoin_testnet",
    "solana_mainnet",
    "solana_devnet",
    "polygon_mainnet",
    "polygon_mumbai",
    "avalanche_mainnet",
    "avalanche_fuji",
    "bsc_mainnet",
    "bsc_testnet",
    "arbitrum_mainnet",
    "arbitrum_goerli",
    "optimism_mainnet",
    "optimism_goerli",
  ],

  reports: [
    {
      project_name: "ethereum_defi",
      module_name: "uniswap_v3_liquidity",
      tags: ["TEST", "MAIN"],
      success: 15,
      failed: 2,
      start: 1704067200,
      end: 1704070800,
    },
    {
      project_name: "bitcoin_mining",
      module_name: "mining_pool_optimization",
      tags: ["TEST", "MAIN"],
      success: 8,
      failed: 1,
      start: 1704063600,
      end: 1704067200,
    },
    {
      project_name: "solana_nft",
      module_name: "magic_eden_trading",
      tags: ["TEST", "MAIN"],
      success: 23,
      failed: 3,
      start: 1704056400,
      end: 1704063600,
    },
    {
      project_name: "polygon_gaming",
      module_name: "axie_infinity_battles",
      tags: ["TEST"],
      success: 12,
      failed: 0,
      start: 1704049200,
      end: 1704056400,
    },
    {
      project_name: "avalanche_yield",
      module_name: "pangolin_farming",
      tags: ["TEST", "MAIN"],
      success: 19,
      failed: 1,
      start: 1704042000,
      end: 1704049200,
    },
    {
      project_name: "bsc_trading",
      module_name: "pancakeswap_arbitrage",
      tags: ["MAIN"],
      success: 7,
      failed: 2,
      start: 1704034800,
      end: 1704042000,
    },
    {
      project_name: "arbitrum_lending",
      module_name: "aave_v3_arbitrum",
      tags: ["MAIN"],
      success: 11,
      failed: 1,
      start: 1704027600,
      end: 1704034800,
    },
  ],

  presetResponses: {
    success: {
      status: "success",
      message: "Preset started successfully",
      task_id: "task_12345",
      estimated_duration: "2-5 minutes",
    },
    error: {
      status: "error",
      message: "Failed to start preset: Invalid configuration",
    },
  },

  envUpdateResponse: {
    status: "success",
    message: "Environment variables updated successfully",
  },

  encodeResponse: {
    status: "success",
    message: "Accounts encoded successfully",
    encoded_count: 10,
  },

  clearReportsResponse: {
    status: "success",
    message: "All reports cleared successfully",
  },

  clearFailedCSVResponse: {
    status: "success",
    message: "Failed CSV files cleared successfully",
  },
};
