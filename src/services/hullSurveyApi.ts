// API service for Hull Survey operations
import { get, post, put, del } from "@/lib/api";

// Types based on Django models
export interface Vessel {
  id: number;
  name: string;
  code: string;
  active: number;
  created_on: string;
  created_ip: string;
  modified_on: string;
  modified_ip: string | null;
  year_of_build: number;
  year_of_delivery: number;
  created_by: number;
  modified_by: number | null;
  classofvessel: {
    id: number;
    code: string;
    name: string;
  };
  vesseltype: {
    id: number;
    code: string;
    name: string;
  };
  yard: {
    id: number;
    code: string;
    name: string;
  };
  command: {
    id: number;
    code: string;
    name: string;
  };
}

export interface ApiResponse<T> {
  status: number;
  data: T;
}

export interface InternalAbovewaterHullSurveyData {
  id?: number;
  vessel?: number; // Foreign key to Vessel
  type_of_refit?: string;
  refitting_yard?: string;
  type_of_survey?: string;
  refit_started_on?: string; // Date in YYYY-MM-DD format
  refit_completion_on?: string; // Date in YYYY-MM-DD format
  place?: string;
  supervisor?: string;
  officer_in_charge?: string;
  survey_particulars?: string;
  total_area_surveyed?: number;
  area_surveyed?: number;
  area_graded_suspect?: number;
  area_graded_suspect_renewed?: number;
  area_graded_defective?: number;
  area_graded_defective_renewed?: number;
  area_graded_suspect_defective_temporary?: number;
  repair_carried_out?: number;
  total_tonnage_renewal?: number;
  condition_of_hull_material_state?: string;
  date?: string; // Date in YYYY-MM-DD format
  draft_status?: string;
  dyanamic_fields?: any;
}

export interface StrakeDeckSurveyData {
  id?: number;
  internal_abovewater_hull_survey?: number; // Foreign key to InternalAbovewaterHullSurvey
  strake_deck_no?: string;
  frame_station_from?: string;
  frame_station_to?: string;
  original_thickness?: string;
  extent_of_corrosion?: string;
  extent_of_pitting?: string;
  avg_residual_thickness_outside_t1?: string;
  avg_residual_thickness_outside_t2?: string;
  mean_thickness?: string;
  percent_reduction_in_thickness?: string;
  grading?: string;
  action_taken?: string;
  draft_status?: string;
  dyanamic_fields?: any;
}

// API service class
export class HullSurveyApiService {
  // Vessel API calls
  static async getVessels(): Promise<Vessel[]> {
    try {
      const response: ApiResponse<Vessel[]> = await get('/master/vessels/');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching vessels:', error);
      return [];
    }
  }

  // Part I - InternalAbovewaterHullSurvey API calls
  static async createInternalAbovewaterHullSurvey(data: InternalAbovewaterHullSurveyData): Promise<InternalAbovewaterHullSurveyData> {
    try {
      const response = await post('/yardmodule/internal-abovewater-hull-surveys/', data);
      console.log('Raw Part I API response:', response);
      
      // Handle different response structures
      if (response && response.data) {
        return response.data;
      } else if (response && response.id) {
        // Direct response object
        return response;
      } else {
        console.error('Unexpected response structure:', response);
        throw new Error('Unexpected API response structure');
      }
    } catch (error) {
      console.error('Part I API error:', error);
      throw error;
    }
  }

  static async updateInternalAbovewaterHullSurvey(id: number, data: InternalAbovewaterHullSurveyData): Promise<InternalAbovewaterHullSurveyData> {
    const response: ApiResponse<InternalAbovewaterHullSurveyData> = await put(`/yardmodule/internal-abovewater-hull-surveys/${id}/`, data);
    return response.data;
  }

  static async getInternalAbovewaterHullSurvey(id: number): Promise<InternalAbovewaterHullSurveyData> {
    const response: ApiResponse<InternalAbovewaterHullSurveyData> = await get(`/yardmodule/internal-abovewater-hull-surveys/${id}/`);
    return response.data;
  }

  static async getAllInternalAbovewaterHullSurveys(): Promise<InternalAbovewaterHullSurveyData[]> {
    const response: ApiResponse<InternalAbovewaterHullSurveyData[]> = await get('/yardmodule/internal-abovewater-hull-surveys/');
    return response.data;
  }

  static async deleteInternalAbovewaterHullSurvey(id: number): Promise<void> {
    await del(`/yardmodule/internal-abovewater-hull-surveys/${id}/`);
  }

  // Part II - StrakeDeckSurveyInternalAbovewaterHull API calls
  static async createStrakeDeckSurvey(data: StrakeDeckSurveyData): Promise<StrakeDeckSurveyData> {
    try {
      const response = await post('/yardmodule/strake-deck-surveys-internal-abovewater/', data);
      console.log('Raw Part II API response:', response);
      
      // Handle different response structures
      if (response && response.data) {
        return response.data;
      } else if (response && response.id) {
        // Direct response object
        return response;
      } else {
        console.error('Unexpected Part II response structure:', response);
        throw new Error('Unexpected Part II API response structure');
      }
    } catch (error) {
      console.error('Part II API error:', error);
      throw error;
    }
  }

  static async updateStrakeDeckSurvey(id: number, data: StrakeDeckSurveyData): Promise<StrakeDeckSurveyData> {
    const response: ApiResponse<StrakeDeckSurveyData> = await put(`/yardmodule/strake-deck-surveys-internal-abovewater/${id}/`, data);
    return response.data;
  }

  static async getStrakeDeckSurvey(id: number): Promise<StrakeDeckSurveyData> {
    const response: ApiResponse<StrakeDeckSurveyData> = await get(`/yardmodule/strake-deck-surveys-internal-abovewater/${id}/`);
    return response.data;
  }

  static async getAllStrakeDeckSurveys(): Promise<StrakeDeckSurveyData[]> {
    const response: ApiResponse<StrakeDeckSurveyData[]> = await get('/yardmodule/strake-deck-surveys-internal-abovewater/');
    return response.data;
  }

  static async deleteStrakeDeckSurvey(id: number): Promise<void> {
    await del(`/yardmodule/strake-deck-surveys-internal-abovewater/${id}/`);
  }

  // Individual creation for Part II (no batch endpoint needed)
  static async createMultipleStrakeDeckSurveys(surveys: StrakeDeckSurveyData[]): Promise<StrakeDeckSurveyData[]> {
    const results = [];
    for (const survey of surveys) {
      const response: ApiResponse<StrakeDeckSurveyData> = await post('/yardmodule/strake-deck-surveys-internal-abovewater/', survey);
      results.push(response.data);
    }
    return results;
  }

  // Draft operations
  static async saveDraft(data: { part1: InternalAbovewaterHullSurveyData; part2: StrakeDeckSurveyData[] }): Promise<any> {
    // For now, we'll use localStorage for drafts, but this could be replaced with API calls
    const draftId = Date.now().toString();
    const draftData = {
      id: draftId,
      timestamp: new Date().toISOString(),
      data,
    };
    
    const existingDrafts = JSON.parse(localStorage.getItem('hullSurveyDrafts') || '[]');
    existingDrafts.push(draftData);
    localStorage.setItem('hullSurveyDrafts', JSON.stringify(existingDrafts));
    
    return draftData;
  }

  static async getDrafts(): Promise<any[]> {
    const drafts = JSON.parse(localStorage.getItem('hullSurveyDrafts') || '[]');
    return drafts;
  }

  static async deleteDraft(draftId: string): Promise<void> {
    const existingDrafts = JSON.parse(localStorage.getItem('hullSurveyDrafts') || '[]');
    const updatedDrafts = existingDrafts.filter((draft: any) => draft.id !== draftId);
    localStorage.setItem('hullSurveyDrafts', JSON.stringify(updatedDrafts));
  }
}

// Static data for dropdowns based on Django model choices
export const DROPDOWN_CHOICES = {
  TYPE_OF_REFIT: [
    { value: 'enr', label: 'ENR' },
    { value: 'esr', label: 'ESR' },
    { value: 'mr-mlu', label: 'MR-MLU' },
    { value: 'nr-mlu', label: 'NR-MLU' },
    { value: 'srgd', label: 'SRGD' },
  ],
  TYPE_OF_SURVEY: [
    { value: 'live', label: 'Live' },
    { value: 'usg', label: 'USG' },
  ],
  REFITTING_YARD: [
    { value: 'nd_mumbai', label: 'ND Mumbai' },
    { value: 'nsry_kochin', label: 'NSRY Kochin' },
    { value: 'nd_visakhapatnam', label: 'ND Visakhapatnam' },
  ],
  CONDITION_OF_HULL_MATERIAL_STATE: [
    { value: 'mfab', label: 'MFAB' },
    { value: 'naval_constructor', label: 'Naval Constructor' },
  ],
};

export default HullSurveyApiService;
