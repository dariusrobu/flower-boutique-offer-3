const products = [
    { id: 1, name: 'Buchet Pastel Dream', price: 180, occasion: 'Aniversare', image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=600&auto=format&fit=crop', rating: 5, reviews: 12 },
    { id: 2, name: 'Trandafiri Roșii Clasici', price: 250, occasion: 'Aniversare', image: 'https://images.unsplash.com/photo-1548849171-469389279093?q=80&w=600&auto=format&fit=crop', rating: 4, reviews: 8 },
    { id: 3, name: 'Simplitate Albă', price: 120, occasion: 'Condoleanțe', image: 'https://images.unsplash.com/photo-1522673607200-164883eede4a?q=80&w=600&auto=format&fit=crop', rating: 5, reviews: 15 },
    { id: 4, name: 'Explozie de Culori', price: 200, occasion: 'Zi de naștere', image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=600&auto=format&fit=crop', rating: 4, reviews: 20 },
    { id: 5, name: 'Buchet de Primăvară', price: 150, occasion: 'Zi de naștere', image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=600&auto=format&fit=crop', rating: 5, reviews: 5 },
    { id: 6, name: 'Eleganță Pură', price: 300, occasion: 'Aniversare', image: 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?q=80&w=600&auto=format&fit=crop', rating: 5, reviews: 10 },
];

const reviews = [
    { name: 'Elena M.', text: 'Cele mai frumoase flori pe care le-am primit vreodată! Proaspete și livrate la timp.', rating: 5 },
    { name: 'Andrei S.', text: 'Serviciu impecabil. Am comandat un buchet pentru soția mea și a fost impresionată.', rating: 5 },
    { name: 'Maria D.', text: 'Recomand cu încredere. Florile au rezistat mai mult de o săptămână!', rating: 4 }
];

const app = {
    cart: [],
    currentView: 'home',
    selectedFilter: 'Toate',

    init() {
        this.navigate('home');
        this.updateCartCount();
        lucide.createIcons();
    },

    navigate(view, params = null) {
        this.currentView = view;
        const container = document.getElementById('view-container');
        window.scrollTo(0, 0);

        switch(view) {
            case 'home':
                container.innerHTML = this.renderHome();
                break;
            case 'shop':
                container.innerHTML = this.renderShop();
                break;
            case 'about':
                container.innerHTML = this.renderAbout();
                break;
            case 'product':
                container.innerHTML = this.renderProductDetail(params);
                break;
            case 'cart':
                container.innerHTML = this.renderCart();
                break;
            case 'checkout':
                container.innerHTML = this.renderCheckout();
                break;
            case 'confirmation':
                container.innerHTML = this.renderConfirmation();
                break;
        }
        lucide.createIcons();
    },

    renderHome() {
        const bestSellers = products.slice(0, 3);
        return `
            <section class="hero">
                <div class="container">
                    <div class="hero-content">
                        <h1>Flori proaspete pentru momente magice</h1>
                        <p>Descoperă colecția noastră de buchete artizanale, create special pentru a aduce zâmbete celor dragi.</p>
                        <button class="btn btn-primary" onclick="app.navigate('shop')">Cumpără acum</button>
                    </div>
                </div>
            </section>
            <section class="container">
                <div class="section-header">
                    <h2>Cele mai vândute</h2>
                </div>
                <div class="product-grid">
                    ${bestSellers.map(p => this.renderProductCard(p)).join('')}
                </div>
                <div style="text-align: center; margin-top: 40px;">
                    <button class="btn btn-outline" onclick="app.navigate('shop')">Vezi tot magazinul</button>
                </div>
            </section>
            <section class="container" style="padding: 100px 0;">
                <div class="section-header">
                    <h2>Ce spun clienții noștri</h2>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
                    ${reviews.map(r => `
                        <div style="padding: 30px; border: 1px solid var(--border-color); border-radius: 8px; text-align: center;">
                            <div style="color: var(--leaf-green); margin-bottom: 15px;">
                                ${Array(r.rating).fill('<i data-lucide="star" style="width: 16px; height: 16px; fill: currentColor;"></i>').join('')}
                            </div>
                            <p style="font-style: italic; margin-bottom: 20px;">"${r.text}"</p>
                            <p><strong>${r.name}</strong></p>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
    },

    renderAbout() {
        return `
            <div class="container" style="padding: 80px 0;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;">
                    <div>
                        <img src="https://images.unsplash.com/photo-1596199050105-6d5d32222916?q=80&w=800&auto=format&fit=crop" alt="Echipa Bloom & Co." style="width:100%; border-radius:8px; box-shadow: var(--shadow);">
                    </div>
                    <div>
                        <h1 style="font-size: 48px; margin-bottom: 20px;">Povestea noastră</h1>
                        <p style="font-size: 18px; color: var(--text-gray); margin-bottom: 20px;">
                            La <strong>Bloom & Co.</strong>, credem că fiecare floare spune o poveste. Călătoria noastră a început din pasiunea pentru natură și dorința de a aduce un strop de culoare și prospețime în casele oamenilor.
                        </p>
                        <p style="font-size: 18px; color: var(--text-gray); margin-bottom: 20px;">
                            Fiecare buchet este creat manual de floriștii noștri experți, folosind doar cele mai proaspete flori, selectate cu grijă în fiecare dimineață. Nu suntem doar o florărie; suntem mesagerii sentimentelor tale.
                        </p>
                        <div style="display: flex; gap: 30px; margin-top: 40px;">
                            <div style="text-align: center;">
                                <h3 style="color: var(--leaf-green); font-size: 32px;">10+</h3>
                                <p>Ani de experiență</p>
                            </div>
                            <div style="text-align: center;">
                                <h3 style="color: var(--leaf-green); font-size: 32px;">50k+</h3>
                                <p>Clienți fericiți</p>
                            </div>
                            <div style="text-align: center;">
                                <h3 style="color: var(--leaf-green); font-size: 32px;">100%</h3>
                                <p>Garanție prospețime</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderShop() {
        const filtered = this.selectedFilter === 'Toate' 
            ? products 
            : products.filter(p => p.occasion === this.selectedFilter);

        return `
            <div class="container shop-container">
                <aside class="filters">
                    <h3>Ocazii</h3>
                    <div class="filter-group">
                        <span class="filter-item ${this.selectedFilter === 'Toate' ? 'active' : ''}" onclick="app.setFilter('Toate')">Toate produsele</span>
                        <span class="filter-item ${this.selectedFilter === 'Zi de naștere' ? 'active' : ''}" onclick="app.setFilter('Zi de naștere')">Zi de naștere</span>
                        <span class="filter-item ${this.selectedFilter === 'Aniversare' ? 'active' : ''}" onclick="app.setFilter('Aniversare')">Aniversare</span>
                        <span class="filter-item ${this.selectedFilter === 'Condoleanțe' ? 'active' : ''}" onclick="app.setFilter('Condoleanțe')">Condoleanțe</span>
                    </div>
                </aside>
                <main>
                    <div class="section-header" style="text-align: left;">
                        <h2>${this.selectedFilter}</h2>
                    </div>
                    <div class="product-grid">
                        ${filtered.map(p => this.renderProductCard(p)).join('')}
                    </div>
                </main>
            </div>
        `;
    },

    renderProductCard(product) {
        return `
            <div class="product-card">
                <div class="product-img" onclick="app.navigate('product', ${product.id})">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">${product.price} RON</div>
                    <button class="add-to-cart" onclick="app.addToCart(${product.id})">Adaugă în coș</button>
                </div>
            </div>
        `;
    },

    renderProductDetail(id) {
        const p = products.find(x => x.id === id);
        return `
            <div class="container product-detail-grid">
                <div class="product-detail-img">
                    <img src="${p.image}" alt="${p.name}" style="width:100%; border-radius:8px;">
                </div>
                <div class="product-detail-info">
                    <h1>${p.name}</h1>
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                        <div style="color: var(--leaf-green); display: flex;">
                            ${Array(p.rating).fill('<i data-lucide="star" style="width: 16px; height: 16px; fill: currentColor;"></i>').join('')}
                        </div>
                        <span style="color: var(--text-gray); font-size: 14px;">(${p.reviews} recenzii)</span>
                    </div>
                    <div class="detail-price">${p.price} RON</div>
                    <p style="margin-bottom: 30px; color: var(--text-gray);">Un aranjament floral spectaculos, creat cu flori proaspete de sezon. Perfect pentru a exprima cele mai frumoase sentimente.</p>
                    
                    <div class="option-group">
                        <span class="option-label">Data livrării</span>
                        <input type="date" min="${new Date().toISOString().split('T')[0]}">
                    </div>

                    <div class="option-group">
                        <span class="option-label">Adaugă ceva special</span>
                        <div class="add-on-grid">
                            <div class="add-on-item" onclick="this.classList.toggle('selected')">Vază</div>
                            <div class="add-on-item" onclick="this.classList.toggle('selected')">Ciocolată</div>
                            <div class="add-on-item" onclick="this.classList.toggle('selected')">Felicitare</div>
                        </div>
                    </div>

                    <div class="quantity-selector">
                        <span class="option-label" style="margin-bottom:0">Cantitate</span>
                        <div style="display:flex; align-items:center;">
                            <button class="qty-btn">-</button>
                            <span style="padding: 0 20px;">1</span>
                            <button class="qty-btn">+</button>
                        </div>
                    </div>

                    <button class="btn btn-primary" style="width:100%;" onclick="app.addToCart(${p.id})">Adaugă în coș</button>

                    <div style="margin-top: 60px; padding-top: 40px; border-top: 1px solid var(--border-color);">
                        <h3>Recenzii</h3>
                        ${reviews.slice(0, 2).map(r => `
                            <div style="padding: 20px 0; border-bottom: 1px solid var(--border-color);">
                                <div style="color: var(--leaf-green); display: flex; margin-bottom: 5px;">
                                    ${Array(r.rating).fill('<i data-lucide="star" style="width: 12px; height: 12px; fill: currentColor;"></i>').join('')}
                                </div>
                                <p style="font-weight: 600; font-size: 14px; margin-bottom: 5px;">${r.name}</p>
                                <p style="color: var(--text-gray); font-size: 14px;">"${r.text}"</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    },

    renderCart() {
        if(this.cart.length === 0) {
            return `<div class="container" style="text-align:center; padding: 100px 0;">
                <h2>Coșul tău este gol</h2>
                <button class="btn btn-primary" onclick="app.navigate('shop')" style="margin-top:20px;">Mergi la magazin</button>
            </div>`;
        }

        const subtotal = this.cart.reduce((sum, item) => sum + item.price, 0);
        const delivery = 25;

        return `
            <div class="container">
                <h1 style="margin-top:40px;">Coșul de cumpărături</h1>
                <div class="cart-grid">
                    <div class="cart-items">
                        ${this.cart.map((item, index) => `
                            <div class="cart-item">
                                <img src="${item.image}" alt="${item.name}">
                                <div style="flex-grow:1">
                                    <h3>${item.name}</h3>
                                    <p>${item.price} RON</p>
                                </div>
                                <button onclick="app.removeFromCart(${index})" style="background:none; border:none; color:red; cursor:pointer;">Elimină</button>
                            </div>
                        `).join('')}
                    </div>
                    <div class="summary-card">
                        <h3>Rezumat comandă</h3>
                        <div class="summary-row" style="margin-top:20px;">
                            <span>Subtotal</span>
                            <span>${subtotal} RON</span>
                        </div>
                        <div class="summary-row">
                            <span>Livrare</span>
                            <span>${delivery} RON</span>
                        </div>
                        <div class="total-row summary-row">
                            <span>Total</span>
                            <span>${subtotal + delivery} RON</span>
                        </div>
                        <button class="btn btn-primary" style="width:100%; margin-top:30px;" onclick="app.navigate('checkout')">Finalizează comanda</button>
                    </div>
                </div>
            </div>
        `;
    },

    renderCheckout() {
        return `
            <div class="container">
                <h1 style="margin-top:40px;">Finalizare comandă</h1>
                <div class="checkout-grid">
                    <div class="checkout-form">
                        <h3>Informații livrare</h3>
                        <div class="form-group">
                            <label>Nume complet</label>
                            <input type="text" placeholder="Ex: Maria Popescu">
                        </div>
                        <div class="form-group">
                            <label>Adresă livrare</label>
                            <input type="text" placeholder="Strada, Număr, Oraș">
                        </div>
                        <div class="form-group">
                            <label>Telefon</label>
                            <input type="tel" placeholder="07xx xxx xxx">
                        </div>
                        <h3 style="margin-top:40px;">Metodă plată</h3>
                        <div style="padding: 20px; border: 1px solid var(--border-color); border-radius:4px; margin-bottom: 20px; background: #f9f9f9;">
                            Plată cu cardul (Placeholder)
                        </div>
                    </div>
                    <div class="summary-card">
                        <h3>Comanda ta</h3>
                        <p>${this.cart.length} produse în coș</p>
                        <button class="btn btn-primary" style="width:100%; margin-top:30px;" onclick="app.navigate('confirmation')">Plătește acum</button>
                    </div>
                </div>
            </div>
        `;
    },

    renderConfirmation() {
        this.cart = [];
        this.updateCartCount();
        return `
            <div class="container confirmation-screen">
                <i data-lucide="check-circle" style="width:80px; height:80px;"></i>
                <h1>Comandă confirmată!</h1>
                <p>Mulțumim pentru încredere. Florile tale sunt în curs de pregătire și vor ajunge la destinație în curând.</p>
                <button class="btn btn-primary" onclick="app.navigate('home')" style="margin-top:40px;">Înapoi la prima pagină</button>
            </div>
        `;
    },

    addToCart(productId) {
        const product = products.find(p => p.id === productId);
        this.cart.push(product);
        this.updateCartCount();
        alert(`${product.name} a fost adăugat în coș!`);
    },

    removeFromCart(index) {
        this.cart.splice(index, 1);
        this.navigate('cart');
        this.updateCartCount();
    },

    updateCartCount() {
        document.getElementById('cart-count').innerText = this.cart.length;
    },

    setFilter(filter) {
        this.selectedFilter = filter;
        this.navigate('shop');
    }
};

window.onload = () => app.init();
