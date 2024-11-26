sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("sap.ui.demo.controller.Cart", {
        onInit: function () {
            var oCartModel = new sap.ui.model.json.JSONModel({
                cartItems: [],
                totalPrice: 0
            });
            this.getView().setModel(oCartModel, "cartModel");
        },

        onRemoveFromCart: function (oEvent) {
            var oItem = oEvent.getSource().getParent();
            var oContext = oItem.getBindingContext("cartModel");
            var iIndex = oContext.getPath().split("/")[2];

            var oCartModel = this.getView().getModel("cartModel");
            var aCartItems = oCartModel.getProperty("/cartItems");

            // Удаляем элемент из массива
            aCartItems.splice(iIndex, 1);

            // Пересчитываем общую стоимость
            this._calculateTotal();

            // Обновляем модель
            oCartModel.setProperty("/cartItems", aCartItems);
        },

        onCheckoutPress: function () {
            MessageToast.show("Proceeding to checkout...");
        },

        _calculateTotal: function () {
            var oCartModel = this.getView().getModel("cartModel");
            var aCartItems = oCartModel.getProperty("/cartItems");
            var fTotal = 0;

            // Рассчитываем общую стоимость товаров в корзине
            aCartItems.forEach(function (oItem) {
                fTotal += oItem.price;
            });

            // Обновляем общую стоимость в модели
            oCartModel.setProperty("/totalPrice", fTotal.toFixed(2));
        }
    });
});