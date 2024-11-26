sap.ui.define([
    "sap/ui/core/mvc/Controller",
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("sap.ui.demo.controller.Subcategories", {
        onInit: function () {
            const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("Subcategories").attachPatternMatched(this._onObjectMatched, this);
            
        },
      
        _onObjectMatched: function (oEvent) {
            const sCategoryId = oEvent.getParameter("arguments").categoryId;
            // Подгрузка подкатегорий (привязка к модели)
            const oModel = this.getOwnerComponent().getModel();
            const aSubcategories = oModel.getProperty("/categories").find(cat => cat.id === sCategoryId).subcategories;
            console.log(aSubcategories)
            // Устанавливаем подкатегории как текущие данные модели
            oModel.setProperty("/subcategories", aSubcategories);
            this.getView().setModel(oModel);
        },

        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("Main");
        },

        onAfterRendering: function () {
            const oFlexBox = this.getView().byId("subcategoriesFlexBox");
        
            if (oFlexBox) {
                oFlexBox.attachEventOnce("modelContextChange", function () {
                    const aVBoxItems = oFlexBox.getItems();
        
                    aVBoxItems.forEach((oVBox) => {
                        oVBox.attachBrowserEvent("click", () => this._onVBoxClick(oVBox));
                    });
                }.bind(this));
            }
        },
        
        _onVBoxClick: function (oVBox) {
            const sCategoryId = oVBox.getCustomData().find(data => data.getKey() === "id").getValue();
            this.getOwnerComponent().getRouter().navTo("Products", { categoryId: sCategoryId });
        },
    });
});