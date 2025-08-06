'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CategoryDto, CategoryState, CategoryAction } from '@/types/category';
import { CategoryService } from '@/services/categoryService';
import { useAuth } from './AuthContext';

// Initial state
const initialState: CategoryState = {
  categories: [],
  inactiveCategories: [],
  selectedCategory: null,
  loading: false,
  error: null
};

// Reducer function
function categoryReducer(state: CategoryState, action: CategoryAction): CategoryState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload, loading: false, error: null };
    
    case 'SET_INACTIVE_CATEGORIES':
      return { ...state, inactiveCategories: action.payload, loading: false, error: null };
    
    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload, loading: false, error: null };
    
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, action.payload],
        loading: false,
        error: null
      };
    
    case 'UPDATE_CATEGORY':
      return {
        ...state,
        categories: state.categories.map(cat => 
          cat.categoryId === action.payload.categoryId ? action.payload : cat
        ),
        selectedCategory: state.selectedCategory?.categoryId === action.payload.categoryId 
          ? action.payload 
          : state.selectedCategory,
        loading: false,
        error: null
      };
    
    case 'REMOVE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(cat => cat.categoryId !== action.payload),
        selectedCategory: state.selectedCategory?.categoryId === action.payload 
          ? null 
          : state.selectedCategory,
        loading: false,
        error: null
      };
    
    default:
      return state;
  }
}

// Context type
interface CategoryContextType {
  state: CategoryState;
  
  // Category operations
  fetchCategories: () => Promise<void>;
  fetchInactiveCategories: () => Promise<void>;
  fetchCategoryById: (categoryId: string) => Promise<void>;
  createCategory: (categoryData: { name: string; description?: string }) => Promise<void>;
  updateCategory: (categoryData: { categoryId: string; name: string; description?: string }) => Promise<void>;
  deleteCategory: (categoryId: string, isHardDelete?: boolean) => Promise<void>;
  
  // UI helpers
  clearError: () => void;
  clearSelectedCategory: () => void;
  
  // Role-based helpers
  canCreateCategory: () => boolean;
  canDeleteCategory: () => boolean;
}

// Create context
const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

// Provider component
export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(categoryReducer, initialState);
  const { user } = useAuth();

  // Role-based permission checks
  const canCreateCategory = () => {
    console.log('Checking canCreateCategory - User:', user);
    console.log('User role:', user?.role);
    const canCreate = user?.role === 'super-admin';
    console.log('Can create category:', canCreate);
    return canCreate;
  };

  const canDeleteCategory = () => {
    console.log('Checking canDeleteCategory - User:', user);
    console.log('User role:', user?.role);
    const canDelete = user?.role === 'super-admin';
    console.log('Can delete category:', canDelete);
    return canDelete;
  };

  // Fetch all active categories
  const fetchCategories = async (): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const categories = await CategoryService.getAllCategories();
      dispatch({ type: 'SET_CATEGORIES', payload: categories });
    } catch (error: any) {
      console.error('Fetch categories error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  // Fetch all inactive categories
  const fetchInactiveCategories = async (): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const inactiveCategories = await CategoryService.getInactiveCategories();
      dispatch({ type: 'SET_INACTIVE_CATEGORIES', payload: inactiveCategories });
    } catch (error: any) {
      console.error('Fetch inactive categories error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  // Fetch category by ID
  const fetchCategoryById = async (categoryId: string): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const category = await CategoryService.getCategoryById(categoryId);
      dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category });
    } catch (error: any) {
      console.error('Fetch category by ID error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  // Create new category (Super Admin only)
  const createCategory = async (categoryData: { name: string; description?: string }): Promise<void> => {
    try {
      console.log('CategoryContext createCategory called with:', categoryData);
      console.log('Current user in CategoryContext:', user);
      
      // Check permissions
      const hasPermission = canCreateCategory();
      console.log('Permission check result:', hasPermission);
      
      if (!hasPermission) {
        throw new Error('Bu işlem için yetkiniz bulunmamaktadır. Sadece süper yöneticiler kategori oluşturabilir.');
      }

      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      console.log('Calling CategoryService.createCategory...');
      
      // Call API to create category
      await CategoryService.createCategory({
        name: categoryData.name,
        description: categoryData.description
      });
      
      console.log('Category created successfully, refreshing list...');
      
      // Refresh categories list after successful creation
      await fetchCategories();
      
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error: any) {
      console.error('Create category error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error; // Re-throw to allow UI to handle success/error states
    }
  };

  // Update existing category
  const updateCategory = async (categoryData: { categoryId: string; name: string; description?: string }): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      await CategoryService.updateCategory(categoryData);
      
      // Refresh categories list after successful update
      await fetchCategories();
      
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error: any) {
      console.error('Update category error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error; // Re-throw to allow UI to handle success/error states
    }
  };

  // Delete category (Super Admin only)
  const deleteCategory = async (categoryId: string, isHardDelete: boolean = false): Promise<void> => {
    try {
      // Check permissions
      if (!canDeleteCategory()) {
        throw new Error('Bu işlem için yetkiniz bulunmamaktadır. Sadece süper yöneticiler kategori silebilir.');
      }

      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      if (isHardDelete) {
        await CategoryService.hardDeleteCategory(categoryId);
      } else {
        await CategoryService.deleteCategory(categoryId);
      }
      
      // Refresh categories list after successful deletion
      await fetchCategories();
      
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error: any) {
      console.error('Delete category error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error; // Re-throw to allow UI to handle success/error states
    }
  };

  // Clear error state
  const clearError = (): void => {
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  // Clear selected category
  const clearSelectedCategory = (): void => {
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: null });
  };

  const contextValue: CategoryContextType = {
    state,
    fetchCategories,
    fetchInactiveCategories,
    fetchCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    clearError,
    clearSelectedCategory,
    canCreateCategory,
    canDeleteCategory
  };

  return (
    <CategoryContext.Provider value={contextValue}>
      {children}
    </CategoryContext.Provider>
  );
};

// Custom hook to use category context
export const useCategory = (): CategoryContextType => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};

export default CategoryContext;