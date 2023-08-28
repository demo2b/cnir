/**
 * @author Jonas.Fournel
 * @fileOverview
 */

async function initializeGoogleMap() {
    // The location of Uluru
    const position = { lat: 42.63757411735154, lng: 8.935914001570248 };
    // Request needed libraries.
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

    // The map, centered at Uluru
    constmap = new Map(document.getElementById("map"), {
        zoom: 18,
        center: position,
        mapTypeId: 'satellite',
        mapId: "DEMO_MAP_ID",
    });

    // The marker, positioned at Uluru
    new AdvancedMarkerView({
        map: map,
        position: position,
        title: "Uluru",
    });
}


initializeGoogleMap();
