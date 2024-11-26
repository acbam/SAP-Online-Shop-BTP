sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("sap.ui.demo.controller.App", {
        onNavToMain: function () {
            this.getOwnerComponent().getRouter().navTo("Main");
        },

        onNavToCart: function () {
            this.getOwnerComponent().getRouter().navTo("Cart");
        },

        onNavBack: function () {
            const oHistory = sap.ui.core.routing.History.getInstance();
            const sPreviousHash = oHistory.getPreviousHash();
        
            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("main", {}, true);
            }
        },

        onLoginPress: function () {
            var oDialog = this.getView().byId("loginDialog");
            oDialog.open();
        },

        onLoginCancel: function () {
            this.getView().byId("loginDialog").close();
        },

        onLoginSubmit: function () {
            var sUsername = this.getView().byId("username").getValue();
            var sPassword = this.getView().byId("password").getValue();

            if (sUsername === "admin" && sPassword === "password") {
                MessageToast.show("Login successful!");
                this.getView().byId("loginDialog").close();
            } else {
                MessageToast.show("Invalid username or password");
            }
        }
    });
});