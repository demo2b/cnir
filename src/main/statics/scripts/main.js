/**
 * @author Jonas.Fournel
 * @fileOverview
 */

const swiperAutoplay = new Swiper(".swiper.auto-play", {
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
    },
    autoplay: {
        delay: 3000
    }
});

const swiperNoAutoplay = new Swiper(".swiper.no-auto-play", {
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
    }
});


document.querySelector('nav > button').addEventListener('click', () => {
    document.querySelector('div.mobile-menu-content').classList.toggle('hidden');
});
