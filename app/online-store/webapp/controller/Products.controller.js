sap.ui.define([
    "sap/ui/core/mvc/Controller",
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("sap.ui.demo.controller.Products", {
        onInit: function () {
            const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("Products").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {

        },
    });
});