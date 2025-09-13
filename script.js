// Funcionalidad principal de la aplicación Instagram Clone

// Función para alternar el estado de "me gusta"
function toggleLike(button) {
    const isLiked = button.classList.contains('liked');
    const post = button.closest('.post');
    const likesCountElement = post.querySelector('.likes-count');
    
    if (isLiked) {
        button.classList.remove('liked');
        // Reducir el contador de likes
        const currentLikes = parseInt(likesCountElement.textContent.replace(/[^\d]/g, ''));
        likesCountElement.textContent = `${(currentLikes - 1).toLocaleString()} Me gusta`;
    } else {
        button.classList.add('liked', 'animate');
        // Aumentar el contador de likes
        const currentLikes = parseInt(likesCountElement.textContent.replace(/[^\d]/g, ''));
        likesCountElement.textContent = `${(currentLikes + 1).toLocaleString()} Me gusta`;
        
        // Remover la clase de animación después de que termine
        setTimeout(() => {
            button.classList.remove('animate');
        }, 300);
    }
}

// Función para descargar imágenes
async function downloadImage(imageUrl, filename) {
    try {
        // Mostrar indicador de carga
        const downloadBtn = event.target.closest('.download-btn');
        const originalContent = downloadBtn.innerHTML;
        downloadBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 6v6l4-3"></path>
            </svg>
        `;
        downloadBtn.style.animation = 'spin 1s linear infinite';
        
        // Crear un elemento temporal para la descarga
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Limpiar la URL del objeto
        window.URL.revokeObjectURL(url);
        
        // Restaurar el botón
        downloadBtn.innerHTML = originalContent;
        downloadBtn.style.animation = '';
        
        // Mostrar mensaje de éxito
        showNotification('Imagen descargada exitosamente', 'success');
        
    } catch (error) {
        console.error('Error al descargar la imagen:', error);
        
        // Restaurar el botón
        const downloadBtn = event.target.closest('.download-btn');
        downloadBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7,10 12,15 17,10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
        `;
        downloadBtn.style.animation = '';
        
        showNotification('Error al descargar la imagen', 'error');
    }
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos de la notificación
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background-color: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Función para alternar el estado de guardado
function toggleSave(button) {
    const isSaved = button.classList.contains('saved');
    
    if (isSaved) {
        button.classList.remove('saved');
        showNotification('Publicación eliminada de guardados', 'info');
    } else {
        button.classList.add('saved');
        showNotification('Publicación guardada', 'success');
    }
}

// Función para manejar la búsqueda
function handleSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        showAllPosts();
        return;
    }
    
    const posts = document.querySelectorAll('.post');
    let visiblePosts = 0;
    
    posts.forEach(post => {
        const username = post.querySelector('.post-username').textContent.toLowerCase();
        const caption = post.querySelector('.caption-text').textContent.toLowerCase();
        
        if (username.includes(searchTerm) || caption.includes(searchTerm)) {
            post.style.display = 'block';
            visiblePosts++;
        } else {
            post.style.display = 'none';
        }
    });
    
    if (visiblePosts === 0) {
        showNoResultsMessage();
    } else {
        hideNoResultsMessage();
    }
}

// Función para mostrar todas las publicaciones
function showAllPosts() {
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        post.style.display = 'block';
    });
    hideNoResultsMessage();
}

// Función para mostrar mensaje de "sin resultados"
function showNoResultsMessage() {
    let noResultsMsg = document.querySelector('.no-results-message');
    
    if (!noResultsMsg) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.className = 'no-results-message';
        noResultsMsg.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; color: #8e8e8e;">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" style="margin-bottom: 16px;">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
                <h3 style="margin-bottom: 8px; color: #262626;">No se encontraron resultados</h3>
                <p>Intenta buscar algo diferente.</p>
            </div>
        `;
        document.querySelector('.posts-feed').appendChild(noResultsMsg);
    }
    
    noResultsMsg.style.display = 'block';
}

// Función para ocultar mensaje de "sin resultados"
function hideNoResultsMessage() {
    const noResultsMsg = document.querySelector('.no-results-message');
    if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
    }
}

// Función para simular carga de más contenido
function loadMoreContent() {
    const postsContainer = document.querySelector('.posts-feed');
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-indicator';
    loadingIndicator.innerHTML = `
        <div style="text-align: center; padding: 20px; color: #8e8e8e;">
            <div style="width: 32px; height: 32px; border: 3px solid #f3f3f3; border-top: 3px solid #3498db; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 12px;"></div>
            <p>Cargando más publicaciones...</p>
        </div>
    `;
    
    postsContainer.appendChild(loadingIndicator);
    
    // Simular carga después de 2 segundos
    setTimeout(() => {
        postsContainer.removeChild(loadingIndicator);
        showNotification('No hay más publicaciones para mostrar', 'info');
    }, 2000);
}

// Función para manejar el scroll infinito
function handleInfiniteScroll() {
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.offsetHeight;
    
    if (scrollPosition >= documentHeight - 1000) {
        // Evitar múltiples cargas
        if (!document.querySelector('.loading-indicator')) {
            loadMoreContent();
        }
    }
}

// Función para manejar doble tap en móviles (like)
function handleDoubleTap(element, callback) {
    let lastTap = 0;
    
    element.addEventListener('touchend', function(e) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        
        if (tapLength < 500 && tapLength > 0) {
            callback(e);
            e.preventDefault();
        }
        
        lastTap = currentTime;
    });
}

// Función para crear efecto de corazón al hacer doble tap
function createHeartEffect(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.cssText = `
        position: fixed;
        left: ${x - 15}px;
        top: ${y - 15}px;
        font-size: 30px;
        pointer-events: none;
        z-index: 1000;
        animation: heartFloat 1s ease-out forwards;
    `;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        document.body.removeChild(heart);
    }, 1000);
}

// Función para inicializar la aplicación
function initializeApp() {
    // Configurar búsqueda
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
    
    // Configurar botones de guardado
    const saveButtons = document.querySelectorAll('.save-btn');
    saveButtons.forEach(button => {
        button.addEventListener('click', function() {
            toggleSave(this);
        });
    });
    
    // Configurar scroll infinito
    window.addEventListener('scroll', handleInfiniteScroll);
    
    // Configurar doble tap para like en imágenes
    const postImages = document.querySelectorAll('.post-image');
    postImages.forEach(image => {
        handleDoubleTap(image, function(e) {
            const post = image.closest('.post');
            const likeButton = post.querySelector('.like-btn');
            
            if (!likeButton.classList.contains('liked')) {
                toggleLike(likeButton);
                
                // Crear efecto de corazón
                const rect = image.getBoundingClientRect();
                const x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
                const y = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
                createHeartEffect(x, y);
            }
        });
        
        // También para clics normales en desktop
        image.addEventListener('dblclick', function(e) {
            const post = image.closest('.post');
            const likeButton = post.querySelector('.like-btn');
            
            if (!likeButton.classList.contains('liked')) {
                toggleLike(likeButton);
                createHeartEffect(e.clientX, e.clientY);
            }
        });
    });
    
    // Configurar navegación inferior
    const bottomNavButtons = document.querySelectorAll('.bottom-nav-btn');
    bottomNavButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase activa de todos los botones
            bottomNavButtons.forEach(btn => btn.classList.remove('active'));
            // Agregar clase activa al botón clickeado
            this.classList.add('active');
        });
    });
    
    // Mostrar mensaje de bienvenida
   
}

// Agregar estilos CSS para animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes heartFloat {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.2) rotate(10deg);
            opacity: 0.8;
        }
        100% {
            transform: scale(0.8) rotate(20deg) translateY(-50px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initializeApp);

// Función para manejar el redimensionamiento de la ventana
window.addEventListener('resize', function() {
    // Ajustar el layout si es necesario
    const isMobile = window.innerWidth <= 768;
    const header = document.querySelector('.header');
    const mainContent = document.querySelector('.main-content');
    
    if (isMobile) {
        mainContent.style.paddingTop = '60px';
        mainContent.style.paddingBottom = '60px';
    } else {
        mainContent.style.paddingTop = '84px';
        mainContent.style.paddingBottom = '80px';
    }
});

// Función para manejar la visibilidad de la página (pausar/reanudar animaciones)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pausar animaciones cuando la página no es visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Reanudar animaciones cuando la página es visible
        document.body.style.animationPlayState = 'running';
    }
});

// Exportar funciones para uso global
window.toggleLike = toggleLike;
window.downloadImage = downloadImage;
window.toggleSave = toggleSave;

