// importa fábrica de cartões para cada item do carrossel
import { createCard } from './Card.js';

// Cria um carrossel de filmes com título e lista de cards.
export function createCarousel(category) {
    const section = document.createElement('div');
    section.className = 'slider-section';

    // cabeçalho com título e seções de indicadores (pontos)
    const header = document.createElement('div');
    header.className = 'slider-header';

    const title = document.createElement('h2');
    title.className = 'slider-title';
    title.innerText = category.title;

    const indicators = document.createElement('div');
    indicators.className = 'slider-indicators';

    header.appendChild(title);
    header.appendChild(indicators);
    section.appendChild(header);

    // linha que contém os cards do carrossel
    const row = document.createElement('div');
    row.className = 'movie-row';

    // para cada item da categoria, cria um card e adiciona na linha
    category.items.forEach(item => {
        const card = createCard(item);
        row.appendChild(card);
    });

    section.appendChild(row);
    return section;
}
