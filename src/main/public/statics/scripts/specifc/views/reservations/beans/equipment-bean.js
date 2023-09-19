/**
 * @author Jonas.Fournel
 * @fileOverview
 */

export default class EquipmentBean {

    constructor(jsonObject) {
        this.id = jsonObject.id;
        this.name = jsonObject.name;
        this.quantity = jsonObject.quantity;

        this.rentPrice1h = jsonObject.rent_price_1;
        this.rentPrice2h = jsonObject.rent_price_2;
        this.rentPrice3h = jsonObject.rent_price_1;

        this.rentPrice1d = jsonObject.rent_price_daily;
        this.rentPrice1w = jsonObject.rent_price_weekly;

        this.stagePrice1d = jsonObject.stage_price_1;
        this.stagePrice3d = jsonObject.stage_price_3;
        this.stagePrice6d = jsonObject.stage_price_6;

        this.privatePrice1h = jsonObject.private_price_1;
        this.privatePrice2h = jsonObject.private_price_2;
        this.privatePrice4h = jsonObject.private_price_4;
    }

}
