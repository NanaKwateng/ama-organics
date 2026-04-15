// types/market.ts
import { ReactNode } from "react";

export interface NutritionalBenefit {
    icon: ReactNode;
    title: string;
    detail: string;
}

export interface FoodVarietyItem {
    id: string;
    name: string;
    scientificName: string;
    mainImage: string;
    description: string;
    nutritionalBenefits: NutritionalBenefit[];
    sourceOrigin: string;
    peakSeason: string;
    texture: string;
    shelfLife: string;
}

export interface FoodCategory {
    categoryId: string;
    categoryLabel: string;
    items: FoodVarietyItem[];
}