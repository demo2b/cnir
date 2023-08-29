/**
 * @author Jonas.Fournel
 * @fileOverview
 */
import {XHRPromisifiedRequest} from "../../../common/helpers/xhr-promisified-request";
import './reservations.scss';
import EquipmentBean from "./beans/equipment-bean";

const selectFormTemplate = `
    <fieldset id="{{name}}">
        <label for="{{name}}-select">{{label}}</label>
        <select name="{{name}}" id="{{name}}-select">
            {{#each items}}
                <option value="{{this.id}}">{{this.name}}</option>
            {{/each}}
        </select>
    </fieldset>
`;
const datePickerFormTemplate = `
    <fieldset id="{{name}}">
        <label for="{{name}}-date">{{label}}</label>
        <input type="date" id="{{name}}-date" name="{{name}}-date" />
    </fieldset>
`;

const reservationForm = document.getElementById('reservation-form');

let equipmentSelect;
let activitySelect;
let durationSelect;
let durationDatePickers = [];


/**
 * @type {[EquipmentBean]}
 */
const equipmentList = [];

/**
 *
 */
function displayEquipmentList() {
    new XHRPromisifiedRequest('/back-end/equipments', XHRPromisifiedRequest.HTTP_METHOD_GET)
        .executeRequest()
        .then((result) => {
            const jsonResult = JSON.parse(result.responseText);
            jsonResult.splice(0, 0, {id:0, name:''});
            const template = Handlebars.compile(selectFormTemplate)({name:'equipment', label:'Selectionnez une activité', items: jsonResult});
            reservationForm.insertAdjacentHTML('beforeend', template);

            equipmentSelect = document.getElementById("equipment-select")
            jsonResult.forEach((result) => {equipmentList.push(new EquipmentBean(result));});

            equipmentSelect.addEventListener('change', (event) => {
                if(activitySelect) activitySelect.parentElement.remove();
                if(durationSelect) durationSelect.parentElement.remove();
                if(durationDatePickers.length > 0) durationDatePickers.forEach((el) => el.parentElement.remove());
                if(parseInt(equipmentSelect.value) !== 0) {
                    displayActivityTypeList(parseInt(equipmentSelect.value));
                }
            })
        });

    /**
     * @param {number} selectedValue
     */
    function displayActivityTypeList(selectedValue) {
        const selectedEquipment = equipmentList.find((el) => el.id === selectedValue);
        if(selectedEquipment) {
            const activities = [{id:0,name:''}];
            if(selectedEquipment.rentPrice1d > 0) { activities.push({id:'rent', name:'Location'}) }
            if(selectedEquipment.stagePrice1d > 0) { activities.push({id:'stage', name:'Stages Collectifs'}) }
            if(selectedEquipment.privatePrice1h > 0) { activities.push({id:'private', name:'Cours Particuliers'}) }
            const template = Handlebars.compile(selectFormTemplate)({name:'activity-type', label:'Sélectionnez un type d\'activité', items: activities});
            reservationForm.insertAdjacentHTML('beforeend', template);

            activitySelect = document.getElementById("activity-type-select");
            activitySelect.addEventListener('change', (event) => {

                if(durationSelect) durationSelect.parentElement.remove();
                if(durationDatePickers.length > 0) durationDatePickers.forEach((el) => el.parentElement.remove());

                if(event.currentTarget.value === 'stage') {
                    displayStageDurationList(selectedEquipment);
                } else if(event.currentTarget.value === 'private') {
                    displayPrivateDurationList(selectedEquipment);
                } else {
                    displayRentDurationList(selectedEquipment);
                }
            })
        }
    }

    /**
     * @param {EquipmentBean} selectedEquipment
     */
    function displayStageDurationList(selectedEquipment) {
        const items = [{id:0,name:''}];
        if(selectedEquipment.stagePrice1d) items.push({id:'1d', name:'1 Jour'});
        if(selectedEquipment.stagePrice3d) items.push({id:'3d', name:'3 Jour'});
        if(selectedEquipment.stagePrice6d) items.push({id:'6d', name:'6 Jour'});
        const template = Handlebars.compile(selectFormTemplate)({name:'duration', label:'Sélectionnez le nombre de jours de stages', items: items});
        reservationForm.insertAdjacentHTML('beforeend', template);
        durationSelect = document.getElementById('duration-select');
        bindDurationSelectChange();
    }

    /**
     * @param {EquipmentBean} selectedEquipment
     */
    function displayPrivateDurationList(selectedEquipment) {
        const items = [{id:0,name:''}];
        if (selectedEquipment.privatePrice1h) items.push({id: '1h', name: '1 Heure'});
        if (selectedEquipment.privatePrice2h) items.push({id: '2h', name: '2 Heures'});
        if (selectedEquipment.privatePrice4h) items.push({id: '4h', name: '4 Heures'});
        const template = Handlebars.compile(selectFormTemplate)({name: 'duration', label: 'Sélectionnez la durée du cour particulier', items: items });
        reservationForm.insertAdjacentHTML('beforeend', template);
        durationSelect = document.getElementById('duration-select');
        bindDurationSelectChange()
    }

    /**
     * @param {EquipmentBean} selectedEquipment
     */
    function displayRentDurationList(selectedEquipment) {
        const items = [{id:0,name:''}];
        if(selectedEquipment.rentPrice1h) items.push({id:'1h', name:'1 Heure'});
        if(selectedEquipment.rentPrice2h) items.push({id:'2h', name:'2 Heures'});
        if(selectedEquipment.rentPrice3h) items.push({id:'3h', name:'3 Heures'});
        if(selectedEquipment.rentPrice1d) items.push({id:'1d', name:'1 Journée'});
        if(selectedEquipment.rentPrice6d) items.push({id:'6d', name:'6 Jours'});
        const template = Handlebars.compile(selectFormTemplate)({name:'duration', label:'Sélectionnez la durée de la location', items: items});
        reservationForm.insertAdjacentHTML('beforeend', template);
        durationSelect = document.getElementById('duration-select');
        bindDurationSelectChange();
    }

    function bindDurationSelectChange() {
        durationSelect.addEventListener('change', (event) => {
            if(durationDatePickers.length > 0) durationDatePickers.forEach((el) => el.parentElement.remove());
            displayDatePickers(durationSelect.value);
        });
    }

    function displayDatePickers(selectedDuration) {
        let datePickerNumber = 1;
        let selectLabel = 'Sélectionnez le jour de l\'activité';
        if(selectedDuration.includes('d')) {
            datePickerNumber = parseInt(selectedDuration.split('d')[0]);
            if(datePickerNumber > 1) selectLabel = `Sélectionnez le {0}e jour de l'activité`;
        }

        for (let i = 1; i <= datePickerNumber; i++) {
            const template = Handlebars.compile(datePickerFormTemplate)({name:i, label:selectLabel.replace('{0}', i)});
            reservationForm.insertAdjacentHTML('beforeend', template);
            durationDatePickers.push(document.getElementById(`${i}-date`));
        }
    }
}

displayEquipmentList();



