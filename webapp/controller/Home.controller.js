sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
	"sap/m/MessageToast"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, History, UIComponent, MessageToast) {
		"use strict";

		return Controller.extend("demorounting.controller.Home", {
			onInit: function () {
				// Instantiate ODATA Model
				//var oDataModel = new sap.ui.model.odata.v2.ODataModel("proxy/https/services.odata.org/Northwind/Northwind.svc/");
				var oDataModel = new sap.ui.model.odata.v2.ODataModel("https://cors-anywhere.herokuapp.com/https://services.odata.org/V2/(S(frik5l2zde0sxh4jiifyhqo4))/OData/OData.svc/");
				// Set Model at the view level
				this.getView().setModel(oDataModel);

			},

			onItemPressed: function (oEvent) {
				var oItem, oCtx, oProp;

				oItem = oEvent.getSource();
				oCtx  = oItem.getBindingContext();
				//oProp = oCtx.getProperty();

				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("detail", { 
								ID : oCtx.getProperty("ID") 
							});
			}
		});
	});
