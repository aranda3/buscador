const tiendas = [
    // MÉXICO 🇲🇽
    { title: "Bodegón La Esquina", url: "https://api.changarrito.mx/bodegon-la-esquina",
      description: "Todo lo que necesitas para tu hogar: alimentos, aceites, arroz, café y más.",
      keywords: ["bodega","aceite","arroz","café","hogar"], rating: 4.2,
      country: "México", city: "CDMX", zona: "Iztapalapa" },

    { title: "TechExpress MX", url: "https://api.changarrito.mx/techexpress",
      description: "Gadgets y tecnología de última generación.",
      keywords: ["tecnología","gadgets","mouse","audífonos"], rating: 4.8,
      country: "México", city: "Guadalajara", zona: "Zapopan" },

    { title: "Mercadito Santa Ana", url: "https://api.changarrito.mx/mercadito-santa-ana",
      description: "Frutas, verduras y abarrotes frescos todos los días.",
      keywords: ["frutas","verduras","abarrotes"], rating: 4.1,
      country: "México", city: "Monterrey", zona: "San Nicolás" },

    // PERÚ 🇵🇪
    { title: "La Frutería Feliz", url: "https://api.changarrito.mx/la-fruteria-feliz",
      description: "Frutas frescas y jugos naturales.",
      keywords: ["frutas","jugos","saludable"], rating: 4.6,
      country: "Perú", city: "Lima", zona: "San Miguel" },

    { title: "ElectroHogar Perú", url: "#",
      description: "Electrodomésticos y artículos para tu hogar.",
      keywords: ["electrodomésticos","hogar"], rating: 4.4,
      country: "Perú", city: "Arequipa", zona: "Cercado" },

    { title: "Moda Andina", url: "#",
      description: "Ropa moderna con estilo andino.",
      keywords: ["ropa","moda","andina"], rating: 4.2,
      country: "Perú", city: "Cusco", zona: "Wanchaq" },

    // COLOMBIA 🇨🇴
    { title: "Café Tierra Viva", url: "#",
      description: "Café colombiano artesanal.",
      keywords: ["café","artesanal","colombiano"], rating: 4.9,
      country: "Colombia", city: "Medellín", zona: "El Poblado" },

    { title: "Ropa Urbana CO", url: "#",
      description: "Moda urbana juvenil y accesorios.",
      keywords: ["ropa","urbano","accesorios"], rating: 4.0,
      country: "Colombia", city: "Bogotá", zona: "Chapinero" },

    { title: "Mercado Verde", url: "#",
      description: "Productos orgánicos certificados.",
      keywords: ["orgánico","saludable","vegano"], rating: 4.7,
      country: "Colombia", city: "Cali", zona: "San Fernando" },

    // ARGENTINA 🇦🇷
    { title: "TechZone AR", url: "#",
      description: "Computación y electrónica.",
      keywords: ["tecnología","computadoras"], rating: 4.5,
      country: "Argentina", city: "Buenos Aires", zona: "Palermo" },

    { title: "Panadería El Molino", url: "#",
      description: "Pan artesanal, bollería y dulces.",
      keywords: ["pan","dulces","artesanal"], rating: 4.3,
      country: "Argentina", city: "Rosario", zona: "Centro" },

    { title: "La Feria Natural", url: "#",
      description: "Tienda naturista y suplementos.",
      keywords: ["natural","salud","suplementos"], rating: 4.6,
      country: "Argentina", city: "Córdoba", zona: "Nueva Córdoba" },

    // CHILE 🇨🇱
    { title: "ElectroCenter CL", url: "#",
      description: "Artículos electrónicos de calidad.",
      keywords: ["electrónica","hogar"], rating: 4.4,
      country: "Chile", city: "Santiago", zona: "Providencia" },

    { title: "Frutas del Sur", url: "#",
      description: "Frutas y verduras seleccionadas.",
      keywords: ["frutas","verduras"], rating: 4.2,
      country: "Chile", city: "Valparaíso", zona: "Placeres" },

    { title: "Moda Patagonia", url: "#",
      description: "Ropa con influencia patagónica.",
      keywords: ["ropa","moda","patagonia"], rating: 4.8,
      country: "Chile", city: "Concepción", zona: "Talcahuano" },

    // EXTRA PARA COMPLETAR 20
    { title: "BabyStore MX", url: "#",
      description: "Todo para bebés y mamás.",
      keywords: ["bebés","pañales","cuidado"], rating: 4.5,
      country: "México", city: "Querétaro", zona: "Juriquilla" },

    { title: "GamerPro", url: "#",
      description: "Accesorios y componentes gamer.",
      keywords: ["gaming","pc","teclados"], rating: 4.9,
      country: "Perú", city: "Lima", zona: "Miraflores" },

    { title: "Casa Dulce", url: "#",
      description: "Repostería artesanal y pasteles.",
      keywords: ["pasteles","dulces"], rating: 4.7,
      country: "Colombia", city: "Bogotá", zona: "Usaquén" },

    { title: "EcoHogar", url: "#",
      description: "Productos ecológicos y biodegradables.",
      keywords: ["eco","biodegradable","hogar"], rating: 4.6,
      country: "Chile", city: "Santiago", zona: "La Florida" }
];

const paises = ["Argentina", "Chile", "Colombia", "Costa Rica", "México", "Perú", "Paraguay"];

	
const paisSelect = document.getElementById("pais-filter");
	
// Agregar opción por defecto UNA sola vez
const optionDefault = document.createElement("option");
optionDefault.value = "";
optionDefault.textContent = "Todos los países";
paisSelect.appendChild(optionDefault);
	
const grupos = {};

paises.forEach(p => {
    const letra = p[0].toUpperCase();
    if (!grupos[letra]) {
        grupos[letra] = [];
    }
    grupos[letra].push(p);
});

for (const letra in grupos) {
    const optgroup = document.createElement("optgroup");
    optgroup.label = letra;

    grupos[letra].forEach(p => {
        const option = document.createElement("option");
        option.value = p;
        option.textContent = p;
        optgroup.appendChild(option);
    });

    paisSelect.appendChild(optgroup);
}

const resultsContainer = document.getElementById("results");
const searchInput = document.getElementById("search-input");

function highlightText(text, query) {
    if(!query) return text;
    const regex = new RegExp(`(${query.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

// ⭐ Genera estrellas visuales según el rating
function generarEstrellas(rating) {
    let html = '<span class="stars">';
    const filled = Math.round(rating);

    for (let i = 1; i <= 5; i++) {
        html += `<span class="${i <= filled ? 'star-filled' : ''}">★</span>`;
    }

    html += `</span> <span style="font-size:13px;color:#555;">(${rating.toFixed(1)})</span>`;
    return html;
}
	
document.getElementById("pais-filter").addEventListener("change", buscarTiendas);

function buscarTiendas() {
    const query = searchInput.value.toLowerCase().trim();
	const selectedPais = document.getElementById("pais-filter").value;
	
    resultsContainer.innerHTML = "";
    let encontrados = false;

    tiendas.forEach(tienda => {
		
		// Filtro por país
        if (selectedPais !== "" && tienda.country !== selectedPais) {
            return; // no coincide → no se muestra
        }
		
		// Filtro por búsqueda
        const matchTitle = tienda.title.toLowerCase().includes(query);
        const matchDesc = tienda.description.toLowerCase().includes(query);
        const matchKeywords = tienda.keywords.some(k => k.includes(query));

        if (matchTitle || matchDesc || matchKeywords) {
            encontrados = true;

            const div = document.createElement("div");
            div.className = "result p-3 mb-2 bg-light rounded shadow-sm";

            div.innerHTML = `
                <div class="fw-bold">${highlightText(tienda.title, query)}</div>
                <div>${generarEstrellas(tienda.rating)}</div>
                <div class="text-muted">${highlightText(tienda.description, query)}</div>
				<div style="font-size:13px;color:#00BCD4;">
                    🌍 ${tienda.country} — 📍 ${tienda.zona}
                </div>
            `;

            div.addEventListener("click", () => {
                window.location.href = tienda.url;
            });

            resultsContainer.appendChild(div);
        }
    });

    if (!encontrados) {
        resultsContainer.innerHTML = '<div class="text-muted"><em>No se encontraron resultados</em></div>';
    }
}

searchInput.addEventListener("keypress", (e) => { 
    if (e.key === "Enter") buscarTiendas(); 
});
