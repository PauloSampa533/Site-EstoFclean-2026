// Smooth Scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect - adiciona classe quando rolar a página
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Active nav link on scroll - marca link ativo conforme seção visível
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer para animações ao rolar
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observa todos os elementos com classe fade-in
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Form submission - integração com WhatsApp
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Pega os valores do formulário
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;
    const email = document.getElementById('email').value;
    const servico = document.getElementById('servico').selectedOptions[0].text;
    const mensagem = document.getElementById('mensagem').value;
    
    // Monta a mensagem para o WhatsApp
    let whatsappMsg = `Olá! Meu nome é *${nome}*.%0A%0A`;
    whatsappMsg += ` *Serviço de interesse:* ${servico}%0A%0A`;
    whatsappMsg += ` *Endereço para realização do serviço:* ${endereco}%0A%0A`;
    
    if (mensagem) {
        whatsappMsg += ` *Mensagem:* ${mensagem}%0A%0A`;
    }
    
    whatsappMsg += ` *Telefone:* ${telefone}`;
    
    if (email) {
        whatsappMsg += `%0A *E-mail:* ${email}`;
    }
    
    // Abre o WhatsApp em nova aba
    // IMPORTANTE: Substitua 5547999999999 pelo seu número real
    window.open(`https://wa.me/5547992625195?text=${whatsappMsg}`, '_blank');
    
    // Limpa o formulário
    this.reset();
    
    // Mostra mensagem de confirmação
    alert('Redirecionando para o WhatsApp... Obrigado pelo contato!');
});

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '80px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'var(--white)';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        navLinks.style.borderRadius = '0 0 20px 20px';
    }
}

// Fecha menu mobile ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
            const navLinks = document.querySelector('.nav-links');
            navLinks.style.display = 'none';
        }
    });
});

// Tracking de interações (CTAs)
// Útil para integrar com Google Analytics, Facebook Pixel, etc.
document.querySelectorAll('.btn-primary, .btn-service, .cta-nav, .btn-submit, .whatsapp-float').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim() || this.title || 'WhatsApp Float';
        console.log('CTA clicado:', buttonText);
        
        // Aqui você pode adicionar código de tracking:
        // Google Analytics exemplo:
        // gtag('event', 'click', {
        //     'event_category': 'CTA',
        //     'event_label': buttonText
        // });
        
        // Facebook Pixel exemplo:
        // fbq('track', 'Lead', {
        //     content_name: buttonText
        // });
    });
});

// Animação de números (contador) para as estatísticas
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.innerHTML = value.toLocaleString('pt-BR');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.innerHTML = end.toLocaleString('pt-BR') + (element.dataset.suffix || '');
        }
    };
    window.requestAnimationFrame(step);
}

// Observa quando as estatísticas entram na tela e anima
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const text = entry.target.textContent.trim();
            const num = parseInt(text.replace(/\D/g, ''));
            const suffix = text.replace(/[\d\s]/g, '');
            entry.target.dataset.suffix = suffix;
            animateValue(entry.target, 0, num, 2000);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// Previne envio do formulário se campos obrigatórios estiverem vazios
document.querySelectorAll('input[required], select[required]').forEach(field => {
    field.addEventListener('invalid', function(e) {
        e.preventDefault();
        this.classList.add('error');
    });
    
    field.addEventListener('input', function() {
        this.classList.remove('error');
    });
});

// Adiciona estilo de erro para campos inválidos
const style = document.createElement('style');
style.textContent = `
    input.error, select.error {
        border-color: #ef4444 !important;
        animation: shake 0.3s;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Log quando a página carrega completamente
window.addEventListener('load', () => {
    console.log('Site Estofclean carregado com sucesso! 🚀');
    console.log('Desenvolvido para alta conversão e performance.');
});