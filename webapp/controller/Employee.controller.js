sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("calender.controller.Employee", {
        onInit: function () {

            var oModel = new JSONModel();
            oModel.loadData("./data/data.json");
            this.getView().setModel(oModel,"data");

            oModel.attachRequestCompleted(function () {
                // Data has been successfully loaded
                var oData = this.getView().getModel("data");
                console.log(oData.getData());
            }.bind(this));


            // var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            // oRouter.getRoute("Employee").attachPatternMatched(this._onRouteMatched, this);

        },
        // _onRouteMatched: function (oEvent) {
        //     var oArgs = oEvent.getParameter("arguments");
        //     var sParam = oArgs.param;  

        //     console.log("Received parameter:", sParam);
        // },

        onCalendarButtonPress: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("View1");
        }


    });
});
