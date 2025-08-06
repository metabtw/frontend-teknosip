import { apiClient } from '@/utils/apiClient';
import {
  CategoryDto,
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryListResponse,
  CategoryResponse,
  CategoryCreateResponse,
  CategoryUpdateResponse,
  CategoryDeleteResponse
} from '@/types/category';

/**
 * Category API Service
 * Provides CRUD operations for categories with role-based authorization
 */
export class CategoryService {
  private static readonly ENDPOINTS = {
    GET_ALL: '/Category/GetAllCategory',
    GET_ALL_INACTIVE: '/Category/GetAllCategory_WithFalse',
    GET_BY_ID: '/Category/GetByIdCategory',
    CREATE: '/Category/CreateCategory',
    UPDATE: '/Category/UpdateCategory',
    DELETE: '/Category/DeleteCategory',
    HARD_DELETE: '/Category/HardDeleteCategory'
  } as const;

  /**
   * Get all active categories
   * @returns Promise<CategoryDto[]>
   */
  static async getAllCategories(): Promise<CategoryDto[]> {
    try {
      const response: CategoryListResponse = await apiClient.get(this.ENDPOINTS.GET_ALL);
      
      if (response.isSuccess) {
        return response.data || [];
      } else {
        throw new Error(response.message || 'Kategoriler alınırken hata oluştu');
      }
    } catch (error: any) {
      console.error('Get all categories error:', error);
      throw new Error(error.message || 'Kategoriler alınırken hata oluştu');
    }
  }

  /**
   * Get all inactive categories
   * @returns Promise<CategoryDto[]>
   */
  static async getInactiveCategories(): Promise<CategoryDto[]> {
    try {
      const response: CategoryListResponse = await apiClient.get(this.ENDPOINTS.GET_ALL_INACTIVE);
      
      if (response.isSuccess) {
        return response.data || [];
      } else {
        throw new Error(response.message || 'Pasif kategoriler alınırken hata oluştu');
      }
    } catch (error: any) {
      console.error('Get inactive categories error:', error);
      throw new Error(error.message || 'Pasif kategoriler alınırken hata oluştu');
    }
  }

  /**
   * Get category by ID
   * @param categoryId - Category ID
   * @returns Promise<CategoryDto>
   */
  static async getCategoryById(categoryId: string): Promise<CategoryDto> {
    try {
      if (!categoryId) {
        throw new Error('Kategori ID gereklidir');
      }

      const response: CategoryResponse = await apiClient.get(
        `${this.ENDPOINTS.GET_BY_ID}?id=${encodeURIComponent(categoryId)}`
      );
      
      if (response.isSuccess && response.data) {
        return response.data;
      } else {
        throw new Error(response.message || 'Kategori bulunamadı');
      }
    } catch (error: any) {
      console.error('Get category by ID error:', error);
      throw new Error(error.message || 'Kategori alınırken hata oluştu');
    }
  }

  /**
   * Create new category (Super Admin only)
   * @param categoryData - Category creation data
   * @returns Promise<void>
   */
  static async createCategory(categoryData: CreateCategoryDto): Promise<void> {
    try {
      console.log('Creating category with data:', categoryData);
      
      // Validation
      if (!categoryData.name || categoryData.name.trim() === '') {
        throw new Error('Kategori adı gereklidir');
      }

      if (categoryData.name.length < 2) {
        throw new Error('Kategori adı en az 2 karakter olmalıdır');
      }

      if (categoryData.name.length > 100) {
        throw new Error('Kategori adı en fazla 100 karakter olabilir');
      }

      if (categoryData.description && categoryData.description.length > 500) {
        throw new Error('Kategori açıklaması en fazla 500 karakter olabilir');
      }

      const requestData = {
        name: categoryData.name.trim(),
        description: categoryData.description?.trim() || null
      };
      
      console.log('Sending request to:', this.ENDPOINTS.CREATE);
      console.log('Request data:', requestData);
      
      const response: CategoryCreateResponse = await apiClient.post(
        this.ENDPOINTS.CREATE,
        requestData
      );
      
      console.log('Create category response:', response);
      
      if (!response.isSuccess) {
        throw new Error(response.message || 'Kategori oluşturulurken hata oluştu');
      }
    } catch (error: any) {
      console.error('Create category error:', error);
      
      // Handle specific authorization errors
      if (error.message.includes('403') || error.message.includes('yetki')) {
        throw new Error('Bu işlem için yetkiniz bulunmamaktadır. Sadece süper yöneticiler kategori oluşturabilir.');
      }
      
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        throw new Error('Oturum süresi dolmuş. Lütfen tekrar giriş yapın.');
      }
      
      throw new Error(error.message || 'Kategori oluşturulurken hata oluştu');
    }
  }

  /**
   * Update existing category
   * @param categoryData - Category update data
   * @returns Promise<void>
   */
  static async updateCategory(categoryData: UpdateCategoryDto): Promise<void> {
    try {
      // Validation
      if (!categoryData.categoryId) {
        throw new Error('Kategori ID gereklidir');
      }

      if (!categoryData.name || categoryData.name.trim() === '') {
        throw new Error('Kategori adı gereklidir');
      }

      if (categoryData.name.length < 2) {
        throw new Error('Kategori adı en az 2 karakter olmalıdır');
      }

      if (categoryData.name.length > 100) {
        throw new Error('Kategori adı en fazla 100 karakter olabilir');
      }

      if (categoryData.description && categoryData.description.length > 500) {
        throw new Error('Kategori açıklaması en fazla 500 karakter olabilir');
      }

      const response: CategoryUpdateResponse = await apiClient.put(
        this.ENDPOINTS.UPDATE,
        {
          categoryId: categoryData.categoryId,
          name: categoryData.name.trim(),
          description: categoryData.description?.trim() || null
        }
      );
      
      if (!response.isSuccess) {
        throw new Error(response.message || 'Kategori güncellenirken hata oluştu');
      }
    } catch (error: any) {
      console.error('Update category error:', error);
      
      // Handle specific authorization errors
      if (error.message.includes('403') || error.message.includes('yetki')) {
        throw new Error('Bu işlem için yetkiniz bulunmamaktadır.');
      }
      
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        throw new Error('Oturum süresi dolmuş. Lütfen tekrar giriş yapın.');
      }
      
      throw new Error(error.message || 'Kategori güncellenirken hata oluştu');
    }
  }

  /**
   * Soft delete category (Super Admin only)
   * @param categoryId - Category ID to delete
   * @returns Promise<void>
   */
  static async deleteCategory(categoryId: string): Promise<void> {
    try {
      if (!categoryId) {
        throw new Error('Kategori ID gereklidir');
      }

      const response: CategoryDeleteResponse = await apiClient.delete(
        `${this.ENDPOINTS.DELETE}?id=${encodeURIComponent(categoryId)}`
      );
      
      if (!response.isSuccess) {
        throw new Error(response.message || 'Kategori silinirken hata oluştu');
      }
    } catch (error: any) {
      console.error('Delete category error:', error);
      
      // Handle specific authorization errors
      if (error.message.includes('403') || error.message.includes('yetki')) {
        throw new Error('Bu işlem için yetkiniz bulunmamaktadır. Sadece süper yöneticiler kategori silebilir.');
      }
      
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        throw new Error('Oturum süresi dolmuş. Lütfen tekrar giriş yapın.');
      }
      
      throw new Error(error.message || 'Kategori silinirken hata oluştu');
    }
  }

  /**
   * Hard delete category (Super Admin only)
   * @param categoryId - Category ID to permanently delete
   * @returns Promise<void>
   */
  static async hardDeleteCategory(categoryId: string): Promise<void> {
    try {
      if (!categoryId) {
        throw new Error('Kategori ID gereklidir');
      }

      const response: CategoryDeleteResponse = await apiClient.delete(
        `${this.ENDPOINTS.HARD_DELETE}?id=${encodeURIComponent(categoryId)}`
      );
      
      if (!response.isSuccess) {
        throw new Error(response.message || 'Kategori kalıcı olarak silinirken hata oluştu');
      }
    } catch (error: any) {
      console.error('Hard delete category error:', error);
      
      // Handle specific authorization errors
      if (error.message.includes('403') || error.message.includes('yetki')) {
        throw new Error('Bu işlem için yetkiniz bulunmamaktadır. Sadece süper yöneticiler kategori kalıcı olarak silebilir.');
      }
      
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        throw new Error('Oturum süresi dolmuş. Lütfen tekrar giriş yapın.');
      }
      
      throw new Error(error.message || 'Kategori kalıcı olarak silinirken hata oluştu');
    }
  }
}

export default CategoryService;