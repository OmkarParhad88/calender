
sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel","sap/ui/unified/library"
], function (Controller, JSONModel, unifiedLibrary) {
    "use strict";
    var DateTypeRange = unifiedLibrary.DateTypeRange;
    var CalendarDayType = unifiedLibrary.CalendarDayType;
    return Controller.extend("calender.controller.View1", {

        onInit: function () {
            fetch(("./data/data1.json")).then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                // console.log(response.json);
                return response.json();
            }).then(data => {
                var oModel = new JSONModel(data);
                this.getView().setModel(oModel, "data");

                this.ReRender("OmkarParhad");
                this.showEmpData(); 

                
            }).catch(error => {
                console.error("There has been a problem with your fetch operation:", error);
            });

            // var oModel = new JSONModel();
            // oModel.loadData("./data/data1.json");
            // this.getView().setModel(oModel, "data");

            // var oEmpModel = new JSONModel([]);
            // this.getView().setModel(oEmpModel, "empData");

            // oModel.attachRequestCompleted(function () {
            //     this.showEmpData();
            //     this.FirstRender("OmkarParhad");
            // }.bind(this));
        },

        onItemsButtonPress: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Employee");  
        },
        onComboBoxOnSelectionChange: function (oEvent) {
            var sSelectedKey = oEvent.getSource().getSelectedKey();
            this.ReRender(sSelectedKey);
        },

        ReRender: function (sEle) {
            var oData = this.getView().getModel("data");
            // console.log(`/${sEle}`);
            var oEmp = oData.getProperty(`/${sEle}`);
            // sEle ? sEle : "OmakrParhad";
            // console.log(oEmp);

            if (oEmp) {
                var oEmpModel = new JSONModel(oEmp);
                this.getView().setModel(oEmpModel, "empData");
                
                var oEmpModel = this.getView().getModel("empData");
                oEmpModel.setData(oEmp);
                // console.log(oEmpModel.getData());
                this.showEmpData();

            } else {
                console.error("No data found for key: " + sEle);
            }
        },

        showEmpData: function () {
            var oCalendar = this.byId("idCalendar");

            var oEmp = this.getView().getModel("empData");
            var oEmpData = oEmp.getData();
            // console.log(oEmpData);
            oCalendar.destroySpecialDates();
            oEmpData.forEach(function (oELe) {
                if (oELe.attendance === "Absent") {
                    oCalendar.addSpecialDate(new DateTypeRange({
                        startDate: new Date(oELe.date),
                        type:CalendarDayType.Type01,
                        tooltip: "Absent"
                    }));
                }

                if (oELe.attendance === "Present") {
                    oCalendar.addSpecialDate(new DateTypeRange({
                        startDate: new Date(oELe.date),
                        type: "Type08",
                        tooltip: "Present"
                    }));
                }

                if (oELe.attendance === "Half-day") {
                    oCalendar.addSpecialDate(new DateTypeRange({
                        startDate: new Date(oELe.date),
                        type: "Type10",
                        tooltip: "Half-Day"
                    }));
                }
            });
        }


    });
});
