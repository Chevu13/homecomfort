-- ============================================================
-- HOME COMFORT NAMEŠTAJ — SUPABASE SCHEMA
-- Pokreni u Supabase SQL Editoru (Project → SQL Editor → New query)
-- Projekat: jefkcpiqrpsbaunfmxsx
-- ============================================================

-- ── TABLES ──────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  price NUMERIC(10,2) NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  material TEXT,
  dimensions TEXT,
  color TEXT,
  availability TEXT NOT NULL DEFAULT 'in_stock'
    CHECK (availability IN ('in_stock','out_of_stock','on_order')),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  notes TEXT,
  total_amount NUMERIC(10,2) NOT NULL,
  delivery_cost NUMERIC(10,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'nova'
    CHECK (status IN ('nova','u_obradi','poslato','isporuceno','otkazano')),
  source TEXT NOT NULL DEFAULT 'website'
    CHECK (source IN ('website','instagram','telefon','salon')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_price NUMERIC(10,2) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── AUTO-UPDATE updated_at ───────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── ROW LEVEL SECURITY ───────────────────────────────────────
-- Write operacije (admin, upload, kreiranje porudžbina iz API ruta)
-- idu preko service_role key-a sa servera i ZAOBILAZE RLS.
-- Zato anon key dobija samo ono što sme javno: čitanje kataloga
-- + kreiranje porudžbine na checkout-u.

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Javno čitanje kataloga
CREATE POLICY "public_read_categories" ON categories
  FOR SELECT USING (true);
CREATE POLICY "public_read_products" ON products
  FOR SELECT USING (true);
CREATE POLICY "public_read_product_images" ON product_images
  FOR SELECT USING (true);

-- Javno kreiranje porudžbine (checkout sa anon key-em u browseru)
CREATE POLICY "public_insert_orders" ON orders
  FOR INSERT WITH CHECK (true);
CREATE POLICY "public_insert_order_items" ON order_items
  FOR INSERT WITH CHECK (true);

-- NAPOMENA: namerno NEMA public read/update/delete na orders za anon.
-- Admin panel čita i menja porudžbine preko service_role key-a (server),
-- pa mu RLS ne smeta. Tako podaci kupaca nisu javno čitljivi.

-- ── STORAGE BUCKET (slike proizvoda) ─────────────────────────

INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Javno čitanje slika
CREATE POLICY "public_read_product_images_bucket"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

-- Upload ide preko service_role-a sa servera (zaobilazi RLS),
-- pa dodatne insert/update policies za anon nisu potrebne.

-- ── SEED: KATEGORIJE (demo — 3 kategorije) ──────────────────
-- Slike zameni svojim iz storage-a kad ih ubaciš.

INSERT INTO categories (name, slug, description, image_url) VALUES
  ('Bračni kreveti', 'bracni-kreveti',
   'Bračni kreveti izrađeni po meri — klasični i moderni modeli.', NULL),
  ('Tapacirnirane stolice', 'tapacirnirane-stolice',
   'Udobne tapacirnirane stolice u raznim bojama i materijalima.', NULL),
  ('Ugaone garniture', 'ugaone-garniture',
   'Ugaone garniture za dnevni boravak, prilagodljive vašem prostoru.', NULL)
ON CONFLICT (slug) DO NOTHING;

-- Slika za kategoriju "Ugaone garniture" (iz /public/products/)
UPDATE categories
  SET image_url = '/products/ugaona-siva.jpg'
  WHERE slug = 'ugaone-garniture' AND image_url IS NULL;

-- ── SEED: PROIZVOD (Ugaona garnitura — siva) ────────────────
INSERT INTO products (name, slug, description, price, category_id, material, dimensions, color, availability, featured)
SELECT
  'Siva ugaona garnitura',
  'siva-ugaona-garnitura',
  E'Premium ugaona garnitura sa podesivim naslonima za glavu. Maksimalna udobnost, moderan dizajn i kvalitet bez kompromisa. Izaberi dimenzije, boju i stil — pravimo po tvojoj meri.\n\nDostava širom Srbije.',
  0,
  c.id,
  'Premium tkanina (somot)',
  'Po meri',
  'Siva',
  'on_order',
  true
FROM categories c
WHERE c.slug = 'ugaone-garniture'
ON CONFLICT (slug) DO NOTHING;

-- Slika proizvoda
INSERT INTO product_images (product_id, url, alt, sort_order)
SELECT p.id, '/products/ugaona-siva.jpg', 'Siva ugaona garnitura', 0
FROM products p
WHERE p.slug = 'siva-ugaona-garnitura'
  AND NOT EXISTS (
    SELECT 1 FROM product_images pi WHERE pi.product_id = p.id
  );

-- ============================================================
-- GOTOVO. Ostale proizvode dodaj kroz admin panel (Proizvodi → Dodaj).
-- Cena ugaone je 0 (DM za cenu) — promeni u admin panelu ako želiš fiksnu.
-- ============================================================
