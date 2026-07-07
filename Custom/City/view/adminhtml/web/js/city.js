require(["jquery", "ko", "domReady!"], function($, ko){
    /**
     * Adminhtml cases
     */
    if(/(\/customer\/)/i.test(window.location.pathname)){
        var ajaxLoading = false;
        $('#container').on('change', 'select[name^=address]', function (e) {
            /**
             * Get Cities
             * @type {*|jQuery|HTMLElement}
             */
            var $this = $(e.target);
            var name  = $this.prop('name');
            if(/region_id/i.test(name)){
                var regoin_id = $this.val();

                var address_arr_key = name.match(/address\[(.*)]\[region_id]/)[1];
                var $input_city = null;
                if($('input[name="address['+address_arr_key+'][city]"]').length){
                    $input_city = $('input[name="address['+address_arr_key+'][city]"]');
                }else{
                    if($('select[name="address['+address_arr_key+'][city]"]').length){
                        $input_city = $('select[name="address['+address_arr_key+'][city]"]');
                    }
                }

                if(regoin_id && $input_city){
                    $input_city.hide();
                    if(!ajaxLoading) {
                        ajaxLoading = true;
                        var url = window.data_url;
                        jQuery.ajax({
                            url : url,
                            type: "get",
                            data: "state="+regoin_id,
                            showLoader: true,
                            beforeSend: function(xhr){
                                //Empty to remove magento's default handler
                            }
                        }).done(function (response) {
                            ajaxLoading = false;
                            var availableCities = [];
                            var City = function(name, population) {
                                this.cityName = name;
                                this.cityPopulation = population;
                            };
                            for (var i = 0; i < response.length; i++) {
                                availableCities.push(new City(response[i], response[i]));
                            }
                            var viewModel = {
                                availableCities : ko.observableArray(availableCities),
                                selectedCity : ko.observable(),
                                focused : ko.observable(),
                                disabled : ko.observable()
                            };

                            if (response.length > 0) {
                                if(!$input_city.parent().find('#custom_city_cities').length){
                                    $input_city.after('<select class="admin__control-select" id="custom_city_cities_'+address_arr_key+'" data-bind="options: availableCities,optionsText: \'cityName\',value: selectedCity,hasFocus: focused,attr: {name: \'custom_city_cities\',disabled: disabled},optionsCaption: \'Choose...\'"></select>');
                                    ko.applyBindings(viewModel, $('#custom_city_cities_'+address_arr_key)[0]);
                                }

                                $('#custom_city_cities_'+address_arr_key).change(function() {
                                    var selected  = ko.dataFor(this).selectedCity().cityPopulation;
                                    ko.dataFor($input_city[0]).value(selected);
                                });
                            }
                        }).fail( function ( error ) {
                            ajaxLoading = false;
                            $input_city.show();
                            console.log(error);
                        });

                    }
                }

            }
        });

        $('#container').on('change', 'select[name=custom_city_cities]', function (e) {
            /**
             * Get zip codes
             */
            var $this = $(e.target);
            var city_id = $this.find("option:selected").text();
            var address_arr_key = $this.prop('id').match(/custom_city_cities_(\d+)$/)[1];
            var regoin_id = $('input[name="address['+address_arr_key+'][region_id]"]').val();

            var $input_postcode = null;
            if($('input[name="address['+address_arr_key+'][postcode]"]').length){
                $input_postcode = $('input[name="address['+address_arr_key+'][postcode]"]');
            }else{
                if($('select[name="address['+address_arr_key+'][postcode]"]').length){
                    $input_postcode = $('select[name="address['+address_arr_key+'][postcode]"]');
                }
            }

            if(city_id && $input_postcode){
                $input_postcode.hide();
                if(!ajaxLoading) {
                    ajaxLoading = true;
                    var url = window.data_zip_url;
                    jQuery.ajax({
                        url : url,
                        type: "get",
                        data: "city="+city_id+"&state="+regoin_id,
                        showLoader: true,
                        beforeSend: function(xhr){
                            //Empty to remove magento's default handler
                        }
                    }).done(function (response) {
                        ajaxLoading = false;
                        var availableZips = [];
                        var Zip = function(name, population) {
                            this.zipName = name;
                            this.zipPopulation = population;
                        };
                        for (var i = 0; i < response.length; i++) {
                            availableZips.push(new Zip(response[i], response[i]));
                        }
                        var viewModel = {
                            availableZips : ko.observableArray(availableZips),
                            selectedZip : ko.observable(),
                            focused : ko.observable(),
                            disabled : ko.observable()
                        };

                        if (response.length > 0) {
                            if(!$input_postcode.parent().find('#custom_zip_zips').length){
                                $input_postcode.after('<select class="admin__control-select" id="custom_zip_zips_'+address_arr_key+'" data-bind="options: availableZips,optionsText: \'zipName\',value: selectedZip,hasFocus: focused,attr: {name: \'custom_zip_zips\',disabled: disabled},optionsCaption: \'Choose...\'"></select>');
                                ko.applyBindings(viewModel, $('#custom_zip_zips_'+address_arr_key)[0]);
                            }

                            $('#custom_zip_zips_'+address_arr_key).change(function() {
                                var selected  = ko.dataFor(this).selectedZip().zipPopulation;
                                ko.dataFor($input_postcode[0]).value(selected);
                            });
                        }else{
                            $input_postcode.show();
                        }
                    }).fail( function ( error ) {
                        ajaxLoading = false;
                        $input_postcode.show();
                        console.log(error);
                    });

                }
            }
        });
    }

});