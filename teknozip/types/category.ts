// Category API Types
export interface CategoryDto {
  categoryId: string;
  name: string;
  description?: string;
}

export interface CreateCategoryDto {
  name: string;
  description?: string;
}

export interface UpdateCategoryDto {
  categoryId: string;
  name: string;
  description?: string;
}

export interface DeleteCategoryDto {
  categoryId: string;
}

// API Response Types
export interface ResponseDto<T> {
  data: T;
  message: string;
  isSuccess: boolean;
  statusCode: number;
  errors?: string[];
}

// Category API Response Types
export type CategoryListResponse = ResponseDto<CategoryDto[]>;
export type CategoryResponse = ResponseDto<CategoryDto>;
export type CategoryCreateResponse = ResponseDto<object>;
export type CategoryUpdateResponse = ResponseDto<object>;
export type CategoryDeleteResponse = ResponseDto<object>;

// Category State Types
export interface CategoryState {
  categories: CategoryDto[];
  inactiveCategories: CategoryDto[];
  selectedCategory: CategoryDto | null;
  loading: boolean;
  error: string | null;
}

// Category Action Types
export type CategoryAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CATEGORIES'; payload: CategoryDto[] }
  | { type: 'SET_INACTIVE_CATEGORIES'; payload: CategoryDto[] }
  | { type: 'SET_SELECTED_CATEGORY'; payload: CategoryDto | null }
  | { type: 'ADD_CATEGORY'; payload: CategoryDto }
  | { type: 'UPDATE_CATEGORY'; payload: CategoryDto }
  | { type: 'REMOVE_CATEGORY'; payload: string };