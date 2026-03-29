// Componente Card: cria um cartão de filme/anúncio com imagem, vídeo e detalhes.
// Importa utilitários para extrair ID do YouTube e gerar valores aleatórios.
import { getYouTubeId, getRandomMatchScore, getRandomDuration, getRandomAgeBadge } from '../utils.js';

// Cria e retorna o elemento DOM do cartão a partir do objeto `item`.
export function createCard(item) {
    // elemento principal do card
    const card = document.createElement('div');
    card.className = 'movie-card';
    if (item.progress) {
        // marca cards que têm progresso (barra visível)
        card.classList.add('has-progress');
    }

    // imagem de capa do filme
    const img = document.createElement('img');
    img.src = item.img;
    img.alt = `Movie cover`;

    // iframe usado para reproduzir prévia via YouTube
    const iframe = document.createElement('iframe');
    iframe.frameBorder = "0";
    iframe.allow = "autoplay; encrypted-media";

    // extrai ID do YouTube a partir da URL do item
    const videoId = getYouTubeId(item.youtube);

    // adiciona iframe e imagem ao card (iframe fica por baixo da imagem)
    card.appendChild(iframe);
    card.appendChild(img);

    // badge de idade (gerado aleatoriamente para exemplo)
    const ageBadge = getRandomAgeBadge();

    // detalhes: botões, pontuação, duração, tags
    const details = document.createElement('div');
    details.className = 'card-details';
    details.innerHTML = `
        <div class="details-buttons">
            <div class="left-buttons">
                <button class="btn-icon btn-play-icon"><i class="fas fa-play" style="margin-left:2px;"></i></button>
                ${item.progress ? '<button class="btn-icon"><i class="fas fa-check"></i></button>' : '<button class="btn-icon"><i class="fas fa-plus"></i></button>'}
                <button class="btn-icon"><i class="fas fa-thumbs-up"></i></button>
            </div>
            <div class="right-buttons">
                <button class="btn-icon"><i class="fas fa-chevron-down"></i></button>
            </div>
        </div>
        <div class="details-info">
            <span class="match-score">${getRandomMatchScore()}% relevante</span>
            <span class="age-badge ${ageBadge.class}">${ageBadge.text}</span>
            <span class="duration">${getRandomDuration(item.progress)}</span>
            <span class="resolution">HD</span>
        </div>
        <div class="details-tags">
            <span>Empolgante</span>
            <span>Animação</span>
            <span>Ficção</span>
        </div>
    `;
    card.appendChild(details);

    // se houver progresso, cria a barra de progresso com a largura correspondente
    if (item.progress) {
        const pbContainer = document.createElement('div');
        pbContainer.className = 'progress-bar-container';
        const pbValue = document.createElement('div');
        pbValue.className = 'progress-value';
        pbValue.style.width = `${item.progress}%`;
        pbContainer.appendChild(pbValue);
        card.appendChild(pbContainer);
    }

    // controle para reproduzir vídeo ao passar o mouse (hover)
    let playTimeout;
    card.addEventListener('mouseenter', () => {
        const rect = card.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        
        // ajusta origem da animação se o card estiver perto da borda
        if (rect.left < 100) {
            card.classList.add('origin-left');
        } else if (rect.right > windowWidth - 100) {
            card.classList.add('origin-right');
        }

        // espera 600ms antes de iniciar o vídeo (evita reprodução imediata)
        playTimeout = setTimeout(() => {
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${videoId}`;
            iframe.classList.add('playing');
            img.classList.add('playing-video');
        }, 600);
    });

    // ao remover o mouse, cancela reprodução e limpa classes/atributos
    card.addEventListener('mouseleave', () => {
        clearTimeout(playTimeout);
        iframe.classList.remove('playing');
        img.classList.remove('playing-video');
        iframe.src = "";
        card.classList.remove('origin-left');
        card.classList.remove('origin-right');
    });

    return card;
}
