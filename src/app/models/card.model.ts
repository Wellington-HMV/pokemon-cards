import { Typesenum } from "./types.model";

export interface IApiResponseCards{
  count:number;
  data:ICard[];
  page:number;
  pageSize:number;
  totalCount:number
}

export interface ICard {
    id: string;
    name: string;
    supertype: string;
    subtypes: string[];
    hp: string;
    types: Typesenum[];
    evolvesFrom: string;
    abilities: Ability[];
    attacks: Attack[];
    weaknesses: Weakness[];
    retreatCost: string[];
    convertedRetreatCost: number;
    set: ISet;
    number: string;
    artist: string;
    rarity: string;
    flavorText: string;
    nationalPokedexNumbers: number[];
    legalities: Legalities;
    images: Images2;
    tcgplayer: Tcgplayer;
    cardmarket: Cardmarket;
  }
  
  interface Cardmarket {
    url: string;
    updatedAt: string;
    prices: Prices2;
  }
  
  interface Prices2 {
    averageSellPrice: number;
    lowPrice: number;
    trendPrice: number;
    germanProLow?: any;
    suggestedPrice?: any;
    reverseHoloSell?: any;
    reverseHoloLow?: any;
    reverseHoloTrend?: any;
    lowPriceExPlus: number;
    avg1: number;
    avg7: number;
    avg30: number;
    reverseHoloAvg1?: any;
    reverseHoloAvg7?: any;
    reverseHoloAvg30?: any;
  }
  
  interface Tcgplayer {
    url: string;
    updatedAt: string;
    prices: Prices;
  }
  
  interface Prices {
    normal: Normal;
    reverseHolofoil: Normal;
  }
  
  interface Normal {
    low: number;
    mid: number;
    high: number;
    market: number;
    directLow: number;
  }
  
  interface Images2 {
    small: string;
    large: string;
  }
  
  interface ISet {
    id: string;
    name: string;
    series: string;
    printedTotal: number;
    total: number;
    legalities: Legalities;
    ptcgoCode: string;
    releaseDate: string;
    updatedAt: string;
    images: Images;
  }
  
  interface Images {
    symbol: string;
    logo: string;
  }
  
  interface Legalities {
    unlimited: string;
    standard: string;
    expanded: string;
  }
  
  interface Weakness {
    type: string;
    value: string;
  }
  
  interface Attack {
    name: string;
    cost: string[];
    convertedEnergyCost: number;
    damage: string;
    text: string;
  }
  
  interface Ability {
    name: string;
    text: string;
    type: string;
  }