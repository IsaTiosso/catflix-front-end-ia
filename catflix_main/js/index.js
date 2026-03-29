// Script para a página de seleção de perfil (index.html)
// Guarda perfil ativo em localStorage e ajusta caminhos de imagem.
document.addEventListener('DOMContentLoaded', () => {
	const perfilLinks = document.querySelectorAll('.perfil');

	perfilLinks.forEach(link => {
		link.addEventListener('click', (event) => {
			event.preventDefault(); // impede navegação imediata

			// encontra nome e imagem do perfil clicado
			const item = link.closest('.item-perfil');
			if (!item) return;

			const nomeEl = item.querySelector('.nome-perfil');
			const imgEl = item.querySelector('img');

			const nome = nomeEl ? nomeEl.textContent.trim() : '';
			let imgSrc = imgEl ? imgEl.getAttribute('src') : '';

			// ajusta caminho relativo para catálogo
			if (imgSrc && !imgSrc.startsWith('http') && !imgSrc.startsWith('/') && !imgSrc.startsWith('..')) {
				imgSrc = '../' + imgSrc;
			}

			try {
				localStorage.setItem('perfilAtivoNome', nome);
				localStorage.setItem('perfilAtivoImagem', imgSrc);
			} catch (e) {
				// ignora erros de localStorage (modo privado)
				console.warn('Erro ao salvar perfil no localStorage', e);
			}

			// mostra tela de carregamento
			const loadingScreen = document.getElementById('loading-screen');
			loadingScreen.classList.add('show');

			// simula carregamento e navega após 2 segundos
			setTimeout(() => {
				window.location.href = 'catalogo/catalogo.html';
			}, 2000);
		});
	});
});
