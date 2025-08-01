import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import apiClient from '../lib/axios';
import { Category, CreateCategoryData, UpdateCategoryData } from '../types/category';

// Get category by ID
export const useCategory = (id: string) => {
  return useQuery<Category>({
    queryKey: ['category', id],
    queryFn: async () => {
      const response = await apiClient.get(`/categories/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });
};

// Get all categories
export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await apiClient.get('/categories');
      return Array.isArray(response.data) ? response.data : [];
    },
  });
};

// Get categories by type
export const useCategoriesByType = (type: number) => {
  return useQuery<Category[]>({
    queryKey: ['categories', type === 1 ? 'expense' : 'income'],
    queryFn: async () => {
      const endpoint = type === 1 ? '/categories/expense' : '/categories/income';
      const response = await apiClient.get(endpoint);
      return Array.isArray(response.data.data) ? response.data.data : [];
    },
  });
};

// Get default category
export const useDefaultCategory = (type: number) => {
  return useQuery<Category>({
    queryKey: ['categories', type === 1 ? 'expense-default' : 'income-default'],
    queryFn: async () => {
      const endpoint = type === 1 ? '/categories/expense-default' : '/categories/income-default';
      const response = await apiClient.get(endpoint);
      return response.data.data;
    },
  });
};

// Create category
export const useCreateCategory = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async (data: CreateCategoryData) => {
      const response = await apiClient.post('/categories', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      addToast({
        type: 'success',
        title: 'Category created',
        message: 'Your category has been created successfully.',
      });
      navigate('/categories');
    },
    onError: () => {
      addToast({
        type: 'error',
        title: 'Failed to create category',
        message: 'Please try again.',
      });
    },
  });
};

// Update category
export const useUpdateCategory = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateCategoryData }) => {
      const response = await apiClient.put(`/categories/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      addToast({
        type: 'success',
        title: 'Category updated',
        message: 'Your category has been updated successfully.',
      });
      navigate('/categories');
    },
    onError: () => {
      addToast({
        type: 'error',
        title: 'Failed to update category',
        message: 'Please try again.',
      });
    },
  });
};

// Delete category
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      addToast({
        type: 'success',
        title: 'Category deleted',
        message: 'The category has been deleted successfully.',
      });
    },
    onError: () => {
      addToast({
        type: 'error',
        title: 'Failed to delete category',
        message: 'Please try again.',
      });
    },
  });
};

// Set default category
export const useSetDefaultCategory = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async ({ id, type }: { id: string; type: number }) => {
      const endpoint = type === 1 ? `/categories/${id}/expense-default` : `/categories/${id}/income-default`;
      const response = await apiClient.put(endpoint);
      return response.data;
    },
    onSuccess: (_, { type }) => {
      queryClient.invalidateQueries({ 
        queryKey: ['categories', type === 1 ? 'expense-default' : 'income-default'] 
      });
      addToast({
        type: 'success',
        title: 'Default category updated',
        message: 'Your default category has been set successfully.',
      });
    },
    onError: () => {
      addToast({
        type: 'error',
        title: 'Failed to set default category',
        message: 'Please try again.',
      });
    },
  });
};