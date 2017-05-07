/// <reference path="node_modules/vss-web-extension-sdk/typings/tfs.d.ts" />
/// <reference path="node_modules/vss-web-extension-sdk/typings/vss.d.ts" />

declare function require(path: string): any;
import RestClient = require("TFS/Core/RestClient");
import Controls = require("VSS/Controls");
import Grids = require("VSS/Controls/Grids");
import VSS_Service = require("VSS/Service");

var container = $("#Projects");
var client = RestClient.getClient();

VSS.require(["VSS/Service", "TFS/Core/RestClient"],
    function (VSS_Service, RestClient) {
        retrieveActive();
    });

function retrieveActive(): void {
    client.getProjectCollections().then(
        function (allProj) {
            // Access all the projects
            var options = {
                width: "100%",
                height: "80%",
                source: allProj.map(function (w) {
                    return [
                        w.id,
                        w.name];
                }),
                columns: [
                    { text: " ", index: 1, width: 150 }
                ]
            };
            Controls.create<Grids.Grid, Grids.IGridOptions>(Grids.Grid, container, options);
            VSS.notifyLoadSucceeded();
        });
}

