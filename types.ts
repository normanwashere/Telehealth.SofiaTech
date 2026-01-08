export interface LguData {
    province: string;
    scope_level: string;
    scope_name: string;
    "All Ages Both Sexes": number;
    "All Ages Male": number;
    "All Ages Female": number;
    [key: string]: string | number; // For the age/demographic keys
}

export interface AgeGroup {
    range: string;
    male: number;
    female: number;
}

export interface GenGroup {
    name: string;
    value: number;
}

export interface SexGroup {
    name: string;
    value: number;
}

export interface ProposalState {
    beneficiaries: number;
    additionalSites: number;
    medicalKits: number;
    bundlePrice: number;
    isPriceOverridden: boolean;
}

export type SectionId = 'vision' | 'gap' | 'solution' | 'proposal' | 'justification' | 'roadmap' | 'win';