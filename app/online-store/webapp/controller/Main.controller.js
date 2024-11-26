sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Image",
    'sap/m/MessageToast',
    'sap/ui/model/json/JSONModel'
], function (Controller, Image, MessageToast, JSONModel) {
    "use strict";

    return Controller.extend("sap.ui.demo.controller.Main", {
      onInit: function () {
            // Создаем модель для API данных
            // const oModel = new JSONModel();
            // this.getView().setModel(oModel);

            // // Загружаем данные с CAP API
            // this._loadCategories(oModel);
        },

        _loadCategories: function (oModel) {
            const sUrl = "/Categories"; // CAP API путь
            oModel.loadData(sUrl);
        },

        onAfterRendering: function () {
            const oView = this.getView();
            const aProductCards = oView.$().find(".productCard");
            console.log(aProductCards)

            aProductCards.each((index, element) => {
                var that = this;
                jQuery(element).on("click", () => {
                    const oVBox = sap.ui.getCore().byId(jQuery(element).attr("ID"));
                    if (oVBox) {
                        const sCategoryId = oVBox.getCustomData().find(data => data.getKey() === "ID").getValue();
                        that.getOwnerComponent().getRouter().navTo("Subcategories", { categoryId: sCategoryId });
             
                    }
                });
            });
        },
    });
});
