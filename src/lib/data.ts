import { supabase } from './supabase'
import { Category, Product } from '@/types'

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: true })
  if (error) { console.error(error); return [] }
  return data || []
}

export async function getProducts(categorySlug?: string): Promise<Product[]> {
  let query = supabase
    .from('products')
    .select(`*, category:categories(*), images:product_images(*)`)
    .order('created_at', { ascending: false })

  if (categorySlug) {
    const { data: cat } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', categorySlug)
      .single()
    if (cat) query = query.eq('category_id', cat.id)
  }

  const { data, error } = await query
  if (error) { console.error(error); return [] }
  return (data || []).map((p: any) => ({
    ...p,
    images: (p.images || []).sort((a: any, b: any) => a.sort_order - b.sort_order),
  }))
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select(`*, category:categories(*), images:product_images(*)`)
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(4)
  if (error) { console.error(error); return [] }
  return (data || []).map((p: any) => ({
    ...p,
    images: (p.images || []).sort((a: any, b: any) => a.sort_order - b.sort_order),
  }))
}

export async function getProduct(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select(`*, category:categories(*), images:product_images(*)`)
    .eq('slug', slug)
    .single()
  if (error) { console.error(error); return null }
  if (!data) return null
  return {
    ...data,
    images: (data.images || []).sort((a: any, b: any) => a.sort_order - b.sort_order),
  }
}

// Napomena: čitanja porudžbina (getOrders, getDashboardStats) prebačena su u
// src/lib/admin-data.ts jer anon klijent po RLS-u ne sme da čita orders.
// Pojedinačna porudžbina za kupca ide preko /api/orders rute (service role).
