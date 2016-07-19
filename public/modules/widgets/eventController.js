angular.module('alisthub').controller('eve_widgetscontroller', function($scope, $state, $localStorage, $injector, ngTableParams, $uibModal, $rootScope, $filter, $timeout, $sce, $location, $stateParams) {

    var $servicewidget = $injector.get("widget");

    $scope.data = {};
    $scope.data.seller_id = $localStorage.userId;
    $scope.ticket_uri = "http://tickets.alistixs.com/events/" + $scope.data.seller_id;
    $scope.data = {};
    $scope.data.title = "Upcoming Events";
    $scope.data.max_number_of_events = 4;
    $scope.data.group_series_events = false;
    $scope.data.display_title_bar = false;
    $scope.data.display_date_block = false;
    $scope.data.display_image = false;
    $scope.data.display_full_date = false;
    $scope.data.display_time = false;
    $scope.data.display_ticket_link = false;
    $scope.data.display_venue = false;
    $scope.data.width = "100%";
    $scope.data.height = "auto";
    $scope.data.background_color = "#1c152d";
    $scope.data.header_color = "#FFFFFF";
    $scope.data.row_background_color = "#FFFFFF";
    $scope.data.text_color = "#333";
    $scope.data.link_color = "#fe1e5a";

    $scope.title_text = function() {
     $scope.embed_code = '<script type="text/javascript">var EventsWidgetDisplayPreferences = {seller_id: ' + $scope.data.seller_id + ',uri: "' + $scope.ticket_uri + '",domain: "tickets.alistixs.com",  white_label: "ALIST Solutions LLC",title_text: "' + $scope.data.title + '",height: "' + $scope.data.height + '",width: "' + $scope.data.width + '",background_color: "' + $scope.data.background_color + '",header_color: "' + $scope.data.header_color + '",row_background_color:"' + $scope.data.row_background_color + '",text_color: "' + $scope.data.text_color + '",link_color:"' + $scope.data.link_color + '",max_number_of_events:"' + $scope.data.max_number_of_events + '",group_series_events:"' + $scope.data.group_series_events + '",display_title_bar:"' + $scope.data.display_title_bar + '",include_scrollbar: "auto", display_date_block: "' + $scope.data.display_date_block + '",display_image:"' + $scope.data.display_image + '",display_full_date: "' + $scope.data.display_full_date + '",display_time: "' + $scope.data.display_time + '",display_venue: "' + $scope.data.display_venue + '", display_ticket_link:"' + $scope.data.display_ticket_link + '}</script><script id="EventsWidgetScript" type="text/javascript" src="https://tickets.alistixs.com/js/events_widget.js"></script>';
    }
    $scope.picCol = function(els) {
        var ele = document.querySelector("#i_" + els).getElementsByClassName('color-picker-grid-inner')[0];
        ele.onclick = function() {
            setColor(els, $scope);
        }
    }

    $scope.data.auto = 1;
    $scope.data.auto = 0;
    $scope.saveEventWidgets = function() {
        if ($localStorage.userId != undefined)

        {
            $scope.data.seller_id = $localStorage.userId;
            for (is in $scope.data) {
                if ($scope.data[is] === true) {
                    $scope.data[is] = 1;

                } else if ($scope.data[is] === false) {
                    $scope.data[is] = 0;
                }
            }
            $scope.loader = true;
            $servicewidget.saveEventWidgets($scope.data, function(response) {
                $scope.loader = false;
                if (response.code == 200) {

                    $location.path("/widgets");
                } else {
                    $scope.activation_message = global_message.ErrorInActivation;
                }

            })
        }
    }
    $scope.getWidgetEvents = function() {
            if ($localStorage.userId != undefined) {
                $scope.data.seller_id = $localStorage.userId;
                $scope.loader = true;
                $servicewidget.getWidgetEvents($scope.data, function(response) {
                    $scope.loader = false;
                    if (response.code == 200) {

                        $scope.eveData = response.result;

                        $scope.tableParams1 = new ngTableParams({
                            page: 1, // show first page
                            count: 3, // count per page
                            sorting: { id: 'asc' }
                        }, {
                            data: $scope.eveData
                        });

                    } else {
                        $scope.error_message = response.error;
                    }

                });

            }

        }
        /////////////////////////////////////////
    if ($state.params.id) {
        // $scope.page_title = 'EDIT';
        $scope.editEvent_widgets = function() {
            $scope.data = {};

            if ($localStorage.userId != undefined) {
                $scope.data.id = $state.params.id;
                $scope.loader = true;
                $servicewidget.editEvent_widgets($scope.data, function(response) {

                    $scope.loader = false;
                    if (response.code == 200) {


                        $scope.data = response.result[0];
                        if ($scope.data.group_series_events === 1) {
                            $scope.data.group_series_events = true;
                        }
                        if ($scope.data.display_title_bar === 1) {
                            $scope.data.display_title_bar = true;
                        }
                        if ($scope.data.display_date_block === 1) {
                            $scope.data.display_date_block = true;
                        }
                        if ($scope.data.display_image === 1) {
                            $scope.data.display_image = true;
                        }
                        if ($scope.data.display_time === 1) {
                            $scope.data.display_time = true;
                        }
                        if ($scope.data.display_ticket_link === 1) {
                            $scope.data.display_ticket_link = true;
                        }
                        if ($scope.data.display_venue === 1) {
                            $scope.data.display_venue = true;
                        }
                        if ($scope.data.display_full_date === 1) {
                            $scope.data.display_full_date = true;
                        }
                    } else {
                        $scope.error_message = response.error;
                    }

                    $scope.title_text();

                });
            }
        };
        $scope.editEvent_widgets();
    }
});

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function setColor(els, $scope) {
    setTimeout(function() {
        var ele1 = document.querySelector("#i_" + els).getElementsByClassName('color-picker-swatch');
        var col = ele1[0].style.backgroundColor.replace('rgb(', '');
        col = col.replace(')', '');
        var re = col.split(',');
        document.querySelector("#d_" + els).style.backgroundColor = ele1[0].style.backgroundColor;

        if (els == 1) {
            $scope.data.background_color = rgbToHex(parseInt(re[0]), parseInt(re[1]), parseInt(re[2]));
            EventsWidgetDisplayPreferences.background_color = $scope.data.background_color;
        } else if (els == 2) {
            $scope.data.header_color = rgbToHex(parseInt(re[0]), parseInt(re[1]), parseInt(re[2]));
            EventsWidgetDisplayPreferences.header_color = $scope.data.header_color;
        } else if (els == 3) {
            $scope.data.row_background_color = rgbToHex(parseInt(re[0]), parseInt(re[1]), parseInt(re[2]));
            EventsWidgetDisplayPreferences.row_background_color = $scope.data.row_background_color;
        } else if (els == 4) {
            $scope.data.text_color = rgbToHex(parseInt(re[0]), parseInt(re[1]), parseInt(re[2]));
            EventsWidgetDisplayPreferences.text_color = $scope.data.text_color;
        } else if (els == 5) {
            $scope.data.link_color = rgbToHex(parseInt(re[0]), parseInt(re[1]), parseInt(re[2]));
            EventsWidgetDisplayPreferences.link_color = $scope.data.link_color;
        }
        EventsWidgetAPI.event_panel_elems.set_options(EventsWidgetDisplayPreferences);
        EventsWidgetAPI.build_event_panel();

        $scope.embed_code = '<script id="EventsWidgetScript" type="text/javascript" src="https://tickets.alistixs.com/js/events_widget.js"></script><script type="text/javascript">var EventsWidgetDisplayPreferences =' + JSON.stringify(EventsWidgetDisplayPreferences) + ';</script>';

    }, 2);
}
