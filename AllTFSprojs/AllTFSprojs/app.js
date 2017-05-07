/// <reference path="node_modules/vss-web-extension-sdk/typings/tfs.d.ts" />
/// <reference path="node_modules/vss-web-extension-sdk/typings/vss.d.ts" />
define(["require", "exports", "TFS/Core/RestClient", "VSS/Controls", "VSS/Controls/Grids"], function (require, exports, RestClient, Controls, Grids) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var container = $("#Projects");
    var client = RestClient.getClient();
    VSS.require(["VSS/Service", "TFS/Core/RestClient"], function (VSS_Service, RestClient) {
        retrieveActive();
    });
    function retrieveActive() {
        client.getProjectCollections().then(function (allProj) {
            // Access all the projects
            var options = {
                width: "100%",
                height: "80%",
                source: allProj.map(function (w) {
                    return [
                        w.id,
                        w.name
                    ];
                }),
                columns: [
                    { text: " ", index: 1, width: 150 }
                ]
            };
            Controls.create(Grids.Grid, container, options);
            VSS.notifyLoadSucceeded();
        });
    }
});
