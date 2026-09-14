# Presencia Real

Web de la agencia **Presencia Real** — diseño y desarrollo web para negocios físicos que merecen una presencia digital a la altura de su trabajo.

El sitio presenta la marca con una narrativa editorial en una sola página: el problema de las webs genéricas, la propuesta, los servicios, el proceso, ejemplos de proyectos y un formulario de contacto.

## Qué representa

Una agencia web con identidad propia, orientada a personas con negocios físicos (restaurantes, talleres, oficios) que valoran la autenticidad por encima de las plantillas. El diseño refleja esta idea: paleta cálida y profunda (petrol y terracota), tipografía Poppins, secciones editoriales sin relleno decorativo y microinteracciones sutiles.

## Tecnologías

- **HTML5** semántico con `aria` para accesibilidad
- **CSS3** con variables de diseño, sistema de espaciado/colores y diseño responsive
- **JavaScript** vanilla: menú móvil, navegación suave, scroll `IntersectionObserver`
- **Google Fonts** (Poppins)
- Imágenes externas de Unsplash (placeholder hasta disponer de fotos reales)

Sin frameworks ni dependencias. Estático, listo para cualquier hosting.

## Estructura

```
├── index.html          # Página única con todas las secciones
├── css/
│   └── style.css       # Sistema de diseño y estilos completos
├── js/
│   └── main.js         # Interacciones (menú móvil, scroll, reveals)
└── assets/
    ├── images/         # (reservado) fotos locales del negocio
    └── icons/          # (reservado) iconografía local
```

## Ejecutar en local

Con Python (sin dependencias):

```bash
cd web_alv
python3 -m http.server 8125
```

O cualquier servidor estático:

```bash
npx serve .
```

Abre `http://localhost:8125`.

## Publicación

Desplegado con **GitHub Pages** desde la rama `main`, carpeta raíz:

https://thorrijadev.github.io/presencia-real/