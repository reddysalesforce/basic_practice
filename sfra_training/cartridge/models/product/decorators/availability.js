'use strict';

var resource = require('dw/web/Resource');

module.exports = function (object, quantity, minOrderQuantity, availabilityModel) {
    //invoke the availability model on the base
    base.call(this, object, quantity, minOrderQuantity, availabilityModel);

    Object.defineProperty(object, 'ats', {
        enumerable: true,
        value: getATSMessage(availabilityModel)
    });
};

function getATSMessage(availabilityModel){
    var ATS = {};
    var inventoryRecord = availabilityModel.inventoryRecord;
    if(inventoryRecord) {
        ATS.messages.push(
            Resource.msgf(
                'label.quantity.in.stock',
                'common',
                null,
                inventoryRecord.ATS.value
            )
        );
    }
    return ATS;
}