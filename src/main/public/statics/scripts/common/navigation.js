/**
 * @author Jonas.Fournel
 * @fileOverview
 */

export default class Navigation {

    constructor() {
        this.initializeMobileBurgerMenu();
    }

    initializeMobileBurgerMenu() {
        document.querySelector('nav > button').addEventListener('click', () => {
            document.querySelector('div.mobile-menu-content').classList.toggle('hidden');
        });
    }

}
