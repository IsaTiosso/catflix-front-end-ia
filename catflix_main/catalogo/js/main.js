// Importa dados estáticos e função para criar cada carrossel.
import { categories } from './data.js';
import { createCarousel } from './components/Carousel.js';

// Executa quando o DOM estiver pronto.
document.addEventListener('DOMContentLoaded', () => {
    // recupera perfil ativo salvo no localStorage.
    const nomePerfil = localStorage.getItem('perfilAtivoNome');
    const imagemPerfil = localStorage.getItem('perfilAtivoImagem');

    if (nomePerfil && imagemPerfil) {
        const kidsLink = document.querySelector('.kids-link');
        const profileIcon = document.querySelector('.profile-icon');
        
        if (kidsLink) kidsLink.textContent = nomePerfil; // atualiza nome do perfil exibido
        if (profileIcon) profileIcon.src = imagemPerfil; // atualiza imagem de perfil
    }

    const container = document.getElementById('main-content');
    
    if (container) {
        // monta todos os carrosseis de categorias no container principal
        categories.forEach(category => {
            const carousel = createCarousel(category);
            container.appendChild(carousel);
        });
    }
});
