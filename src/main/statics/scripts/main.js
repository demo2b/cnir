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

let map;
async function initMap() {
    // The location of Uluru
    const position = { lat: 42.63757411735154, lng: 8.935914001570248 };
    // Request needed libraries.
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

    // The map, centered at Uluru
    map = new Map(document.getElementById("map"), {
        zoom: 18,
        center: position,
        mapTypeId: 'satellite',
        mapId: "DEMO_MAP_ID",
    });

    // The marker, positioned at Uluru
    const marker = new AdvancedMarkerView({
        map: map,
        position: position,
        title: "Uluru",
    });
}

initMap();
