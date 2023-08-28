/**
 * @author Jonas.Fournel
 * @fileOverview
 */

export default class SwiperHelper {

    constructor() {
        this.initializeSwiper();
        this.initializeAutoPlaySwiper();
    }

    initializeAutoPlaySwiper() {
        new Swiper(".swiper.auto-play", {
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                dynamicBullets: true,
            },
            autoplay: {
                delay: 3000
            }
        });
    }

    initializeSwiper() {
        new Swiper(".swiper.no-auto-play", {
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                dynamicBullets: true,
            }
        })
    }

}
