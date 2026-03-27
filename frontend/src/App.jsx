import { useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes, useNavigate, useParams } from 'react-router-dom';

function toSvgDataUri(svg) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function createFashionImage({
  label,
  type,
  bg = '#f5f5f3',
  primary = '#111111',
  secondary = '#d9d9d9'
}) {
  let shape = '';

  if (type === 'tee') {
    shape = `
      <path d="M370 330 L500 240 L700 240 L830 330 L775 470 L700 430 L700 1040 L500 1040 L500 430 L425 470 Z" fill="${primary}" />
      <path d="M555 240 Q600 310 645 240" fill="none" stroke="${secondary}" stroke-width="16" stroke-linecap="round" />
    `;
  }

  if (type === 'shirt') {
    shape = `
      <path d="M410 320 L505 235 L695 235 L790 320 L750 1040 L450 1040 Z" fill="${primary}" />
      <polygon points="505,235 600,355 695,235" fill="${secondary}" />
      <line x1="600" y1="355" x2="600" y2="1040" stroke="${secondary}" stroke-width="8" />
      <circle cx="600" cy="500" r="8" fill="#ffffff" />
      <circle cx="600" cy="600" r="8" fill="#ffffff" />
      <circle cx="600" cy="700" r="8" fill="#ffffff" />
    `;
  }

  if (type === 'jacket') {
    shape = `
      <path d="M430 315 L525 225 L675 225 L770 315 L725 1040 L620 1040 L600 520 L580 1040 L475 1040 Z" fill="${primary}" />
      <line x1="600" y1="225" x2="600" y2="1040" stroke="${secondary}" stroke-width="8" />
      <rect x="500" y="500" width="78" height="88" rx="12" fill="${secondary}" opacity="0.25" />
      <rect x="622" y="500" width="78" height="88" rx="12" fill="${secondary}" opacity="0.25" />
    `;
  }

  if (type === 'trouser') {
    shape = `
      <path d="M500 235 L700 235 L745 1040 L635 1040 L600 540 L565 1040 L455 1040 Z" fill="${primary}" />
      <line x1="600" y1="235" x2="600" y2="540" stroke="${secondary}" stroke-width="8" />
    `;
  }

  if (type === 'hoodie') {
    shape = `
      <path d="M470 320 Q600 145 730 320 L700 410 Q650 360 600 360 Q550 360 500 410 Z" fill="${primary}" />
      <path d="M420 395 L500 340 L700 340 L780 395 L740 1040 L460 1040 Z" fill="${primary}" />
      <rect x="525" y="740" width="150" height="90" rx="18" fill="${secondary}" opacity="0.2" />
      <line x1="560" y1="415" x2="550" y2="525" stroke="${secondary}" stroke-width="8" stroke-linecap="round" />
      <line x1="640" y1="415" x2="650" y2="525" stroke="${secondary}" stroke-width="8" stroke-linecap="round" />
    `;
  }

  if (type === 'polo') {
    shape = `
      <path d="M380 335 L500 240 L700 240 L820 335 L770 470 L700 430 L700 1040 L500 1040 L500 430 L430 470 Z" fill="${primary}" />
      <polygon points="530,240 600,340 670,240" fill="${secondary}" />
      <line x1="600" y1="340" x2="600" y2="460" stroke="${bg}" stroke-width="8" />
    `;
  }

  return toSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1500" viewBox="0 0 1200 1500">
      <rect width="1200" height="1500" fill="${bg}" />
      <rect x="70" y="70" width="1060" height="1360" fill="${bg}" stroke="#e6e6e6" stroke-width="2" />
      ${shape}
      <text x="600" y="1190" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="32" fill="#808080" letter-spacing="6">VICTOR &amp; DARK</text>
      <text x="600" y="1250" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="46" font-weight="700" fill="#111111">${label}</text>
    </svg>
  `);
}

const products = [
  {
    id: 1,
    name: 'Midnight Utility Jacket',
    color: 'Black',
    price: 6999,
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Structured premium jacket with clean utility styling and a sharp modern silhouette.',
    images: [
      createFashionImage({ label: 'UTILITY JACKET', type: 'jacket', primary: '#111111', secondary: '#dbdbdb' }),
      createFashionImage({ label: 'UTILITY JACKET', type: 'jacket', primary: '#2c2c2c', secondary: '#efefef' })
    ]
  },
  {
    id: 2,
    name: 'Essential Heavy Tee',
    color: 'Deep Navy',
    price: 2499,
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Heavyweight cotton tee with relaxed proportions and a premium clean fall.',
    images: [
      createFashionImage({ label: 'HEAVY TEE', type: 'tee', primary: '#1b2d58', secondary: '#d5def2' }),
      createFashionImage({ label: 'HEAVY TEE', type: 'tee', primary: '#111111', secondary: '#d9d9d9' })
    ]
  },
  {
    id: 3,
    name: 'Tailored Stripe Shirt',
    color: 'Sky Blue',
    price: 3899,
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Relaxed premium shirt with a crisp stripe mood and a polished city finish.',
    images: [
      createFashionImage({ label: 'STRIPE SHIRT', type: 'shirt', primary: '#bed6fa', secondary: '#ffffff' }),
      createFashionImage({ label: 'STRIPE SHIRT', type: 'shirt', primary: '#d1e2ff', secondary: '#ffffff' })
    ]
  },
  {
    id: 4,
    name: 'Pleated Wide Trousers',
    color: 'Beige',
    price: 3599,
    sizes: ['30', '32', '34', '36'],
    description: 'Wide premium trousers with front pleats and a refined fluid drape.',
    images: [
      createFashionImage({ label: 'WIDE TROUSERS', type: 'trouser', primary: '#d7cab6', secondary: '#f6f0e8' }),
      createFashionImage({ label: 'WIDE TROUSERS', type: 'trouser', primary: '#cbbfaa', secondary: '#eee7dd' })
    ]
  },
  {
    id: 5,
    name: 'Soft Knit Hoodie',
    color: 'Powder Blue',
    price: 4299,
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Premium hoodie with a soft luxe palette and clean elevated shape.',
    images: [
      createFashionImage({ label: 'SOFT HOODIE', type: 'hoodie', primary: '#c8dcf5', secondary: '#eef5ff' }),
      createFashionImage({ label: 'SOFT HOODIE', type: 'hoodie', primary: '#b8d0ef', secondary: '#eef5ff' })
    ]
  },
  {
    id: 6,
    name: 'Contrast Polo Shirt',
    color: 'Black / Ice Blue',
    price: 2899,
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Modern polo with sharp contrast detailing and a premium sports-luxe look.',
    images: [
      createFashionImage({ label: 'POLO SHIRT', type: 'polo', primary: '#111111', secondary: '#d7e6fa' }),
      createFashionImage({ label: 'POLO SHIRT', type: 'polo', primary: '#1c1c1c', secondary: '#c4d8f6' })
    ]
  }
];

function formatPrice(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
}

function Header() {
  return (
    <header className="site-header">
      <div className="topbar">
        <Link to="/" className="brand">
          Victor &amp; Dark
        </Link>

        <nav className="main-nav">
          <NavLink to="/" end>
            New In
          </NavLink>
          <a href="#catalog">Menswear</a>
          <a href="#catalog">Essentials</a>
          <a href="#catalog">Outerwear</a>
          <a href="#catalog">Premium</a>
        </nav>

        <div className="nav-tools">
          <span>Search</span>
          <span>Account</span>
          <span>Bag</span>
        </div>
      </div>
    </header>
  );
}

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link to={`/payment/${product.id}`} className="product-stage">
        <img src={product.images[0]} alt={product.name} className="product-image" />
      </Link>

      <div className="product-meta">
        <Link to={`/payment/${product.id}`} className="product-name">
          {product.name}
        </Link>
        <div className="product-price">{formatPrice(product.price)}</div>
        <div className="product-color">{product.color}</div>
      </div>
    </article>
  );
}

function HomePage() {
  return (
    <main className="catalog-page">
      <section className="intro">
        <div>
          <p className="eyebrow">Victor &amp; Dark Stores</p>
          <h1>Fresh white premium menswear.</h1>
        </div>

        <p className="intro-copy">
          Clean image alignment, proper sizes, and direct payment flow from every product.
        </p>
      </section>

      <section className="catalog-grid" id="catalog">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}

function PaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = useMemo(
    () => products.find((item) => String(item.id) === String(id)),
    [id]
  );

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [selectedImage, setSelectedImage] = useState(product?.images?.[0] || '');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  if (!product) {
    return (
      <main className="status-page">
        <div className="status-card">
          <p className="eyebrow">Not found</p>
          <h2>Product not found</h2>
          <Link to="/" className="button-link">
            Back to shopping
          </Link>
        </div>
      </main>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    navigate(`/success/${product.id}?size=${encodeURIComponent(selectedSize)}`);
  }

  return (
    <main className="payment-layout">
      <section className="gallery-panel">
        <div className="main-image-box">
          <img src={selectedImage} alt={product.name} className="main-image" />
        </div>

        <div className="thumb-row">
          {product.images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              className={`thumb-button ${selectedImage === image ? 'active' : ''}`}
              onClick={() => setSelectedImage(image)}
            >
              <img src={image} alt={`${product.name} ${index + 1}`} className="thumb-image" />
            </button>
          ))}
        </div>
      </section>

      <section className="payment-panel">
        <p className="eyebrow">Payment page</p>
        <h2 className="payment-title">{product.name}</h2>
        <p className="payment-price">{formatPrice(product.price)}</p>
        <p className="payment-description">{product.description}</p>

        <div className="info-group">
          <span className="label">Color</span>
          <p className="plain-text">{product.color}</p>
        </div>

        <div className="info-group">
          <span className="label">Choose size</span>
          <div className="size-grid">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                className={`size-button ${selectedSize === size ? 'active' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <form className="payment-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Full name</span>
            <input
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Enter your full name"
              required
            />
          </label>

          <label className="field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              required
            />
          </label>

          <label className="field">
            <span>Shipping address</span>
            <textarea
              rows="4"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Enter delivery address"
              required
            />
          </label>

          <div className="summary-box">
            <div className="summary-row">
              <span>Product</span>
              <strong>{product.name}</strong>
            </div>
            <div className="summary-row">
              <span>Size</span>
              <strong>{selectedSize}</strong>
            </div>
            <div className="summary-row">
              <span>Total</span>
              <strong>{formatPrice(product.price)}</strong>
            </div>
          </div>

          <button type="submit" className="pay-button">
            Continue to payment
          </button>
        </form>
      </section>
    </main>
  );
}

function SuccessPage() {
  const { id } = useParams();
  const product = products.find((item) => String(item.id) === String(id));

  return (
    <main className="status-page">
      <div className="status-card">
        <p className="eyebrow">Order created</p>
        <h2>Payment completed</h2>
        <p className="status-copy">
          Your order for {product ? product.name : 'the selected product'} was created successfully.
        </p>
        <Link to="/" className="button-link">
          Back to shopping
        </Link>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/payment/:id" element={<PaymentPage />} />
        <Route path="/success/:id" element={<SuccessPage />} />
      </Routes>
    </>
  );
}