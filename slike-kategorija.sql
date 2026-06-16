-- ============================================================
-- SLIKE KATEGORIJA — pokreni u Supabase SQL Editoru
-- Postavlja sliku za sve 3 kategorije da početna ne bude prazna.
-- Ugaone = lokalna slika iz /public/products/, ostale = Unsplash.
-- Kasnije zameni svojim slikama kroz admin panel.
-- ============================================================

UPDATE categories SET image_url = '/products/ugaona-siva.jpg'
  WHERE slug = 'ugaone-garniture';

UPDATE categories SET image_url = 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80'
  WHERE slug = 'bracni-kreveti';

UPDATE categories SET image_url = 'https://images.unsplash.com/photo-1503602642458-232111445657?w=800&q=80'
  WHERE slug = 'tapacirnirane-stolice';
