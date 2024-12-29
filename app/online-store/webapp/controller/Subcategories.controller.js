sap.ui.define([
    "sap/ui/core/mvc/Controller",
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("sap.ui.demo.controller.Subcategories", {
        onInit: function () {        
            // const oModel = new sap.ui.model.json.JSONModel();
            // oModel.loadData("model/categories.json", null, false); // Синхронная загрузка данных
            // this.getView().setModel(oModel);
        
            const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("Subcategories").attachPatternMatched(this._onObjectMatched, this);
        },
        
        // fixed by binding element from parent to child node
        _onObjectMatched: function (oEvent) {
            const sId = oEvent.getParameter("arguments").id;
			this.getView().bindElement({
			    path : `/Categories(${sId})`});
        },

        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("Main");
        },

        onItemPress: function(oEvent) {
            var oItem = oEvent.getSource();
            var oBindingContext = oItem.getBindingContext();
            var sId = oBindingContext.getProperty("ID");
            this.getOwnerComponent().getRouter().navTo("Products", { id: sId });
        }
    });
});