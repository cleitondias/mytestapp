sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, History, UIComponent) {
		"use strict";

		return Controller.extend("demorounting.controller.Detail", {
			onInit: function () {
				debugger
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.getRoute("detail").attachPatternMatched(this._RouterMatched, this);

			},

			_onRouterMatched: function (oEvent) {
				var oArgs, oView;
				debugger
				oArgs = oEvent.getParameter("arguments");
				oView = this.getView();

				oView.bindElement({
					path: "/Products(" + oArgs.ID + ")",
					events: {
						change: this._onBindingChange.bind(this),
						dataRequested: function (oEvent) {
							oView.setBusy(true);
						},
						dataReceived: function (oEvent) {
							oView.setBusy(false);
						}
					}
				});
			},

			_onBindingChange: function (oEvent) {
				// No data for the binding
				if (!this.getView().getBindingContext()) {
					this.getRouter().getTargets().display("notFound");
				}
			},

			// Event NavBack
			onNavBack: function () {
				var oHistory, sPreviousHash;

				oHistory = History.getInstance();
				sPreviousHash = oHistory.getPreviousHash();

				if (sPreviousHash !== undefined) {
					window.history.go(-1);
				} else {
					var oRouter = UIComponent.getRouterFor(this);
					oRouter().navTo("home", {}, true /*no history*/);
				}
			}			

		});
	});
