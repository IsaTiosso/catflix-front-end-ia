// Retorna ID do vídeo no formato utilizado pelo embed do YouTube.
// Suporta URLs com `?v=` ou '/id'.
export function getYouTubeId(url) {
    if (!url) return "7RUA0IOfar8"; // fallback genérico
    if (url.includes('v=')) {
        return url.split('v=')[1].split('&')[0];
    }
    return url.split('/').pop();
}

// Gera pontuação de correspondência entre 80 e 99.
export function getRandomMatchScore() {
    return Math.floor(Math.random() * 20 + 80);
}

// Duração do conteúdo: se já tem progresso mostra lançamento, senão mostra tempo em horas e minutos.
export function getRandomDuration(hasProgress) {
    return hasProgress ? 'Novo Lançamento' : '2h ' + Math.floor(Math.random() * 59) + 'm';
}

// Badge de idade aleatório para o cartão.
export function getRandomAgeBadge() {
    return Math.random() > 0.5 ? { text: 'A16', class: 'red-accent' } : { text: '16', class: '' };
}
