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

const reservationForm = document.getElementById('reservation-form');

let equipmentSelect;
let activitySelect;

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
                if(activitySelect) { activitySelect.parentElement.remove(); }
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
            const activities = [];
            if(selectedEquipment.rentPrice1d > 0) { activities.push({id:'rent', name:'Location'}) }
            if(selectedEquipment.stagePrice1d > 0) { activities.push({id:'stage', name:'Stages Collectifs'}) }
            if(selectedEquipment.privatePrice1h > 0) { activities.push({id:'private', name:'Cours Particuliers'}) }
            const template = Handlebars.compile(selectFormTemplate)({name:'activity-type', label:'Sélectionnez un type d\'activité', items: activities});
            reservationForm.insertAdjacentHTML('beforeend', template);

            activitySelect = document.getElementById("activity-type-select");
        }
    }

    function displayActivityDurationList(selectedValue) {

    }
}

displayEquipmentList();



