require(["jquery", "ko", "domReady!"], function($, ko){
    /**
     * Checkout cases
     */
    if(/(\/checkout\/cart\/)/i.test(window.location.pathname)){
        var ajaxLoading = false;
        var regoinWatch = setInterval(function(){
            if(jQuery('select[name=region_id]').length != 0){
                jQuery('select[name=region_id]').change();
                clearInterval(regoinWatch);
            }
        }, 250);
        $('.container').on('change', 'select[name=region_id]', function (e) {
            /**
             * Get Cities
             * @type {*|jQuery|HTMLElement}
             */
            var $this = $(e.target);
            var name  = $this.prop('name');
            if(/region_id/i.test(name)){
                var regoin_id   = $this.val();
                var $input_city = null;
                var $initCity   = null;
                if($('input[name="city"]').length){
                    $input_city = $('input[name="city"]');
                    $init_city  = $('input[name="city"]').val();
                    if(!$init_city){
                        $('input[name="postcode"]').val("");
                    }
                }else{
                    if($('select[name="city-select]"]').length){
                        $input_city = $('select[name="city-select]"]');
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
                                regoinId : ko.observable(regoin_id),
                                disabled : ko.observable()
                            };

                            if (response.length > 0) {
                                if(!$input_city.parent().find('#custom_city_cities').length){
                                    $input_city.after('<select id="custom_city_cities" data-bind="options: availableCities,optionsText: \'cityName\',value: selectedCity,hasFocus: focused,attr: {name: \'city-select\',disabled: disabled},optionsCaption: \'Choose...\'"></select>');
                                    ko.applyBindings(viewModel, $('#custom_city_cities')[0]);

                                    viewModel.selectedCity($init_city);
                                    if($init_city){
                                        $('input[name="postcode"]').change();
                                    }
                                }

                                $('#custom_city_cities').change(function() {
                                    var selected  = ko.dataFor(this).selectedCity().cityPopulation;
                                    ko.dataFor($input_city[0]).value(selected);
                                });
                            }else{
                                $input_city.show();
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

        /*var cityWatch = setInterval(function(){
            if(jQuery('select[name=city-select]').length != 0){
                jQuery('select[name=city-select]').change();
                clearInterval(cityWatch);
            }
        }, 250);*/
        $('.container').on('change', 'select[name=city-select]', function (e) {
            /**
             * Get zip codes
             */
            var $this = $(e.target);
            var city_id = $this.find("option:selected").text();
            var regoin_id = ko.dataFor(this).regoinId();

            var $input_postcode = null;
            if($('input[name="postcode"]').length){
                $input_postcode = $('input[name="postcode"]');
                $init_postcode  = $('input[name="postcode"]').val();
            }else{
                if($('select[name="postcode-select"]').length){
                    $input_postcode = $('select[name="postcode-select"]');
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
                        data: "city="+city_id+"&state="+regoin_id+"&country_id="+$('select[name="country_id"]').val(),
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
                        var zipViewModel = {
                            availableZips : ko.observableArray(availableZips),
                            selectedZip : ko.observable(),
                            focused : ko.observable(),
                            disabled : ko.observable()
                        };

                        if (response.length > 0) {
                            if(!$input_postcode.parent().find('#custom_zip_zips').length){
                                zipViewModel.selectedZip($init_postcode);
                                $input_postcode.after('<select id="custom_zip_zips" data-bind="options: availableZips,optionsText: \'zipName\',value: selectedZip,hasFocus: focused,attr: {name: \'postcode-select\',disabled: disabled},optionsCaption: \'Choose...\'"></select>');
                                ko.applyBindings(zipViewModel,  $("#custom_zip_zips").get(0));
                            }

                            $('#custom_zip_zips').change(function() {
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


    var inp = '';
    window.addressPageCall = function(page){
        var region_id = jQuery('#region_id');
        if (typeof(region_id) != 'undefined' && region_id != null) {
            inp = document.getElementById('#city');
            var value = jQuery('#region_id').val();
            if (value != '' && typeof(value) != 'undefined') {
                getRegionCitiesAddress(value,page);
            }
            jQuery('#region_id').change(function(event) {
                var value = jQuery('#region_id').val();
                if (value != '') {
                    getRegionCitiesAddress(value,page);
                }
            });
            jQuery('#country_id').change(function(event) {
                var value = jQuery('#region_id').val();
                if (value != '') {
                    getRegionCitiesAddress(value,page);
                    jQuery('#region_id').removeAttr('disabled');
                } else {
                    jQuery('#city').html(inp);
                    jQuery('#city').val('');
                    jQuery('.billing_notinlist').remove();
                    jQuery('.br_billing_notinlist').remove();
                    jQuery('.postcode_billing_notinlist').remove();
                    jQuery('.postcode_br_billing_notinlist').remove();
                    jQuery('#zip-select,#zip-select-error,#zip-error').remove();
                    jQuery('#zip').removeClass('mage-error');
                    jQuery('#zip').val('');
                    jQuery('#zip').show();
                }
            });
        }
    }

    window.customerAddress = function(){
        var region_id = jQuery('.form-address-edit [name="region_id"]');
        if (typeof(region_id) != 'undefined' && region_id != null
            && jQuery('.form-address-edit [name="city"]') != 'undefined'
            && jQuery('.form-address-edit [name="city"]') !=null) {
            var city_id =  jQuery('.form-address-edit [name="city"]').attr('id');
            inp = document.getElementById(city_id);
            var value = jQuery('.form-address-edit [name="region_id"]').val();
            if (value != '' && typeof(value) != 'undefined') {
                getRegionCities(value,'form-validate ');
            }
            jQuery('.form-address-edit [name="region_id"]').change(function(event) {
                var value = jQuery('.form-address-edit [name="region_id"]').val();
                if (value != '') {
                    getRegionCities(value,'form-validate');
                }
            });
            jQuery('.form-address-edit [name="country_id"]').change(function(event) {
                var value = jQuery('.form-address-edit [name="region_id"]').val();
                if (value != '') {
                    getRegionCities(value,'form-validate ');
                } else {
                    jQuery('.form-address-edit [name="city"]').html(inp);
                }
            });
        }
    }


    window.shippingmainCityCart = function(){
        var retries = 0;
        var shippingEstemationFormWatch = setInterval(function(){
            if(retries > 10000) clearInterval(shippingEstemationFormWatch);
            if(jQuery('#shipping-zip-form [name="region_id"]').length != 0){

                var region_id = jQuery('#shipping-zip-form [name="region_id"]');
                if (typeof(region_id) != 'undefined' && region_id != null
                    && jQuery('#shipping-zip-form [name="city"]') != 'undefined'
                    && jQuery('#shipping-zip-form [name="city"]') !=null) {
                    var city_id =  jQuery('#shipping-zip-form [name="city"]').attr('id');
                    inp = document.getElementById(city_id);
                    var value = jQuery('#shipping-zip-form [name="region_id"]').val();
                    if (value != '' && typeof(value) != 'undefined') {
                        console.log("getRegionCities", value,'shipping-zip-form');
                        getRegionCities(value,'shipping-zip-form');
                    }
                    jQuery('#shipping-zip-form *[name="region_id"]').change(function(event) {
                        var value = jQuery('#shipping-zip-form [name="region_id"]').val();
                        if (value != '') {
                            getRegionCities(value,'shipping-zip-form');
                        }
                    });
                    jQuery('#shipping-zip-form [name="country_id"]').change(function(event) {
                        var value = jQuery('#shipping-zip-form [name="region_id"]').val();
                        if (value != '') {
                            getRegionCities(value, 'shipping-zip-form');
                        } else {
                            var city_id =  jQuery('#shipping-zip-form [name="postcode"]').attr('id');
                            jQuery('#'+city_id+'-select').remove();
                            jQuery('#shipping-zip-form [name="city"]').val('');
                            jQuery('#shipping-zip-form [name="city"]').show();
                            jQuery('#shipping-zip-form .billing_notinlist').remove();
                            var postcode_id =  jQuery('#shipping-zip-form [name="postcode"]').attr('id');
                            jQuery('#'+postcode_id+'-select').remove();
                            jQuery('#shipping-zip-form .postcode_billing_notinlist').remove();
                            jQuery('#shipping-zip-form .postcode_br_billing_notinlist').remove();
                            jQuery('#shipping-zip-form [name="postcode"]').val('');
                            jQuery('#shipping-zip-form [name="postcode"]').show();
                            jQuery('#shipping-zip-form .billing_notinlist').remove();

                        }
                    });
                }

                clearInterval(shippingEstemationFormWatch);
            }
            retries++;
        }, 500);
    }
    window.bilingmainCityCall = function(){
        /*if(jQuery('#billing-new-address-form [name="region_id"]').length == 0){
            setTimeout(function(){ bilingmainCityCall();}, 1000);
        }*/
        jQuery('.onestep-billing-address').prop('id', 'billing-new-address-form')
        var region_id = jQuery('#billing-new-address-form [name="region_id"]');
        if (typeof(region_id) != 'undefined' && region_id != null) {
            var city_id =  jQuery('#billing-new-address-form [name="city"]').attr('id');
            inp = document.getElementById(city_id);
            var value = jQuery('#billing-new-address-form [name="region_id"]').val();
            if (value != '' && typeof(value) != 'undefined') {
                getRegionCities(value,'billing-new-address-form');
            }
            jQuery('#billing-new-address-form [name="region_id"]').change(function(event) {
                var value = jQuery('#billing-new-address-form [name="region_id"]').val();
                if (value != '') {
                    getRegionCities(value,'billing-new-address-form');
                }
            });
            jQuery('#billing-new-address-form [name="country_id"]').change(function(event) {
                var value = jQuery('#billing-new-address-form [name="region_id"]').val();
                if (value != '') {
                    getRegionCities(value,'billing-new-address-form');
                } else {
                    var city_id =  jQuery('#billing-new-address-form [name="city"]').attr('id');
                    jQuery('#'+city_id+'-select').remove();
                    jQuery('#billing-new-address-form [name="city"]').val('');
                    jQuery('#billing-new-address-form [name="city"]').show();
                    var postcode_id =  jQuery('#billing-new-address-form [name="postcode"]').attr('id');
                    jQuery('#'+postcode_id+'-select').remove();
                    jQuery('#billing-new-address-form .postcode_billing_notinlist').remove();
                    jQuery('#billing-new-address-form .postcode_br_billing_notinlist').remove();
                    jQuery('#billing-new-address-form [name="postcode"]').val('');
                    jQuery('#billing-new-address-form [name="postcode"]').show();
                    jQuery('#billing-new-address-form .billing_notinlist').remove();
                }
            });
        }
    }

    window.shippingmainCityCall = function(){
        /*if(jQuery('.onestep-shipping-address [name="region_id"]').length == 0){
            setTimeout(function(){ shippingmainCityCall();}, 1000);
        }else if(jQuery('#shipping').css('display') == 'none' || jQuery('.onestep-shipping-address').css('display')== 'none'){
            setTimeout(function(){ bilingmainCityCall();}, 1000);
        }*/
        jQuery('.onestep-shipping-address').prop('id', 'onestep-shipping-address');
        var region_id = jQuery('.onestep-shipping-address [name="region_id"]');
        if (typeof(region_id) != 'undefined' && region_id != null) {
            var city_id =  jQuery('.onestep-shipping-address [name="city"]').attr('id');
            inp = document.getElementById(city_id);
            var value = jQuery('.onestep-shipping-address [name="region_id"]').val();
            if (value != '' && typeof(value) != 'undefined') {
                getRegionCities(value,'onestep-shipping-address');
            }
            jQuery('.onestep-shipping-address [name="region_id"]').change(function(event) {
                var value = jQuery('.onestep-shipping-address [name="region_id"]').val();
                if (value != '') {
                    getRegionCities(value,'onestep-shipping-address');
                }
            });
            jQuery('.onestep-shipping-address [name="country_id"]').change(function(event) {
                var value = jQuery('.onestep-shipping-address [name="region_id"]').val();
                if (value != '') {
                    getRegionCities(value,'onestep-shipping-address');
                } else {
                    var city_id =  jQuery('.onestep-shipping-address [name="city"]').attr('id');
                    jQuery('#'+city_id+'-select').remove();
                    jQuery('.onestep-shipping-address [name="city"]').show();
                    jQuery('.onestep-shipping-address [name="city"]').val('');
                    var postcode_id =  jQuery('.onestep-shipping-address [name="postcode"]').attr('id');
                    jQuery('#'+postcode_id+'-select').remove();
                    jQuery('.onestep-shipping-address .postcode_billing_notinlist').remove();
                    jQuery('.onestep-shipping-address .postcode_br_billing_notinlist').remove();
                    jQuery('.onestep-shipping-address [name="postcode"]').show();
                    jQuery('.onestep-shipping-address [name="postcode"]').val('');
                    jQuery('.onestep-shipping-address .billing_notinlist').remove();
                }
            });
        }
    }

    window.shippingAmastyMainCityCall = function(){
        /*if(jQuery('.onestep-shipping-address [name="region_id"]').length == 0){
            setTimeout(function(){ shippingmainCityCall();}, 1000);
        }else if(jQuery('#shipping').css('display') == 'none' || jQuery('.onestep-shipping-address').css('display')== 'none'){
            setTimeout(function(){ bilingmainCityCall();}, 1000);
        }*/
        //jQuery('#shipping-new-address-form').prop('id', 'onestep-shipping-address');
        var region_id = jQuery('#shipping-new-address-form [name="region_id"]');
        if (typeof(region_id) != 'undefined' && region_id != null) {
            var city_id =  jQuery('#shipping-new-address-form [name="city"]').attr('id');
            var inp = document.getElementById(city_id);
            var value = jQuery('#shipping-new-address-form [name="region_id"]').val();
            if (value != '' && typeof(value) != 'undefined') {
                getRegionCities(value, 'shipping-new-address-form');
            }
            jQuery('#shipping-new-address-form [name="region_id"]').change(function(event) {
                var value = jQuery('#shipping-new-address-form [name="region_id"]').val();
                if (value != '') {
                    getRegionCities(value,'shipping-new-address-form');
                }
            });
            jQuery('#shipping-new-address-form [name="country_id"]').change(function(event) {
                var value = jQuery('#shipping-new-address-form [name="region_id"]').val();
                if (value != '') {
                    getRegionCities(value,'shipping-new-address-form');
                } else {
                    var city_id =  jQuery('#shipping-new-address-form [name="city"]').attr('id');
                    jQuery('#'+city_id+'-select').remove();
                    jQuery('#shipping-new-address-form [name="city"]').show();
                    jQuery('#shipping-new-address-form [name="city"]').val('');
                    /*var postcode_id =  jQuery('.onestep-shipping-address [name="postcode"]').attr('id');
                    jQuery('#'+postcode_id+'-select').remove();
                    jQuery('.onestep-shipping-address .postcode_billing_notinlist').remove();
                    jQuery('.onestep-shipping-address .postcode_br_billing_notinlist').remove();
                    jQuery('.onestep-shipping-address [name="postcode"]').show();
                    jQuery('.onestep-shipping-address [name="postcode"]').val('');*/
                    jQuery('#shipping-new-address-form .billing_notinlist').remove();
                }
            });
        }
    }


    /* This is for checkout Step */
    var ajaxLoading = false;
    window.getRegionCities = function(value,main_id) {
        if(!ajaxLoading) {
            ajaxLoading = true;
            var city_id =  jQuery('#'+main_id+' [name="city"]').attr('id');
            var url = window.data_url;
            var loader = '<div data-role="loader" class="loading-mask city_loading_mask" style="position: relative;text-align:right;"><div class="loader"><img src="'+window.loading_url+'" alt="Loading..." style="position: absolute;text-align:center;"></div>Please wait loading cities...</div>';
            if(jQuery('#'+main_id+' .city_loading_mask').length==0){
                jQuery('#'+main_id+' [name="city"]').after(loader);
            }
            emptyInput('',main_id);
            jQuery('#error-'+city_id).hide();
            jQuery('.mage-error').hide();
            jQuery('#'+main_id+' [name="city"]').hide();
            jQuery('#'+city_id+'-select').remove();
            jQuery('#'+main_id+' .billing_notinlist').remove();
            jQuery('#'+main_id+' .br_billing_notinlist').remove();
            jQuery('#'+main_id+' .postcode_billing_notinlist').remove();
            jQuery('#'+main_id+' .postcode_br_billing_notinlist').remove();
            jQuery('#'+main_id+' [name="zip-select"]').remove();
            jQuery('#'+main_id+' [name="postcode"]').show();
            jQuery.ajax({
                url : url,
                type: "get",
                data:"state="+value+'&country_id='+jQuery('#'+main_id+' [name="country_id"]').val(),
                dataType: 'json',
            }).done(function (transport) {
                ajaxLoading = false;
                jQuery('#error-'+city_id).show();
                jQuery('.mage-error').show();
                jQuery('#'+main_id+' .city_loading_mask').remove();
                jQuery('#'+main_id+' [name="city"]').show();
                var response = transport;

                //var options = '<select onchange="getCityState(this.value,\''+main_id+'\'),getZipcodes(this.value,\''+main_id+'\')" id="'+city_id+'-select" class="select" title="City" name="city-select" ><option value="">اختر الحي</option>';
                var options = '<select id="'+city_id+'-select" class="select" title="City" name="city-select" ><option value="">اختر الحي</option>';
                if (response.length > 0) {
                    for (var i = 0; i < response.length; i++) {
                        options += '<option value="' + response[i] + '">' + response[i] + '</option>';
                    }
                    options += "</select>";
                    if(window.data_city_link!=""){
                        var title = window.data_city_title;
                        options+= "<br class='br_billing_notinlist' /><a onclick='notInList(\"billing\",\""+main_id+"\")' class='billing_notinlist' href='javascript:void(0)' class='notinlist'>"+title+"</a>";
                    }
                    jQuery('#'+main_id+' [name="city"]').hide();
                    if(jQuery('#'+city_id+'-select').length==0){
                        jQuery('#'+main_id+' [name="city"]').after(options);
                    }

                    jQuery('#'+city_id+'-select').unbind();
                    jQuery('#'+city_id+'-select').bind('change', function () {
                        var $val = jQuery(this).val();
                        jQuery('#'+main_id+' [name="city"]').val($val).change();
                    });
                } else {
                    jQuery('#'+main_id+' [name="city"]').html(inp);
                    jQuery('#'+main_id+' .billing_notinlist').remove();
                }
            }).fail( function ( error )
            {
                ajaxLoading = false;
                jQuery('#error-'+city_id).show();
                jQuery('#'+main_id+' .city_loading_mask').remove();
                jQuery('#'+main_id+' [name="city"]').show();
                console.log(error);
            });
        }
    }
    window.getRegionCitiesAddress = function(value,main_id) {
        var main_id = 'edit';
        if(!ajaxLoading) {
            ajaxLoading = true;
            var city_id =  "city";
            var url = window.data_url;
            var loader = '<div data-role="loader" class="loading-mask city_loading_mask" style="position: relative;text-align:right;"><div class="loader"><img src="'+window.loading_url+'" alt="Loading..." style="position: absolute;text-align:center;"></div>Please wait loading cities...</div>';
            if(jQuery('.city_loading_mask').length==0){
                jQuery('#city').after(loader);
            }
            emptyInput('',main_id);
            jQuery('#error-'+city_id).hide();
            jQuery('#city-select-error').remove();
            jQuery('.mage-error').hide();
            jQuery('#city').hide();
            jQuery('#'+city_id+'-select').remove();
            jQuery('.billing_notinlist').remove();
            jQuery('.br_billing_notinlist').remove();
            jQuery('.postcode_billing_notinlist').remove();
            jQuery('.postcode_br_billing_notinlist').remove();
            jQuery('#zip-select,#zip-select-error,#zip-error').remove();
            jQuery('#zip').removeClass('mage-error');
            jQuery('#zip').show();
            jQuery.ajax({
                url : url,
                type: "get",
                data:"state="+value+'&country_id='+jQuery('#country').val(),
                dataType: 'json',
            }).done(function (transport) {
                ajaxLoading = false;
                jQuery('#error-'+city_id).show();
                jQuery('.mage-error').show();
                jQuery('.city_loading_mask').remove();
                jQuery('#city').show();
                var response = transport;

                var options = '<select onchange="getCityState(this.value,\''+main_id+'\'),getZipcodes(this.value,\''+main_id+'\')" id="'+city_id+'-select" class="validate-select select" title="City" name="city-select" ><option value="">اختر الحي</option>';
                if (response.length > 0) {
                    for (var i = 0; i < response.length; i++) {
                        options += '<option value="' + response[i] + '">' + response[i] + '</option>';
                    }
                    options += "</select>";
                    if(window.data_city_link!=""){
                        var title = window.data_city_title;
                        options+= "<br class='br_billing_notinlist' /><a onclick='notInList(\"billing\",\""+main_id+"\")' class='billing_notinlist' href='javascript:void(0)' class='notinlist'>"+title+"</a>";
                    }
                    jQuery('#city').hide();
                    if(jQuery('#'+city_id+'-select').length==0){
                        jQuery('#city').after(options);
                    }
                } else {
                    jQuery('#city').html(inp);
                    jQuery('.billing_notinlist').remove();
                }
            }).fail( function ( error )
            {
                ajaxLoading = false;
                jQuery('#error-'+city_id).show();
                jQuery('.city_loading_mask').remove();
                jQuery('#city').show();
                console.log(error);
            });
        }
    }
    /* City not in list */
    window.notInList = function(type,main_id){
        if(main_id=='edit'){
            var city_id =  "city";
            jQuery('#'+city_id+'-select').remove();
            jQuery('.billing_notinlist').remove();
            jQuery('.br_billing_notinlist').remove();
            jQuery('#city').show();
        }else{
            var city_id =  jQuery('#'+main_id+' [name="city"]').attr('id');
            jQuery('#'+city_id+'-select').remove();
            jQuery('#'+main_id+' .billing_notinlist').remove();
            jQuery('#'+main_id+' .br_billing_notinlist').remove();
            jQuery('#'+main_id+' [name="city"]').show();
        }

    }
    window.getCityState = function(val,main_id){
        emptyInput(val,main_id);

    }
    window.getZipState = function(val,main_id){
        emptyInputZip(val,main_id);
    }
    window.emptyInput = function(val,main_id){
        console.log(main_id);
        if(main_id=='edit'){
            jQuery('#city').focus();
            jQuery('#city').val(val);
            if(val!=""){
                jQuery('#zip-error').remove();
                jQuery('#city-select-error').remove();
                jQuery('#city-select').removeClass('mage-error');
            }
            jQuery('#city').focus();
        }else{
            jQuery('#'+main_id+' [name="city"]').focus();
            jQuery('#'+main_id+' [name="city"]').val(val);
            var input=$('#'+main_id+' [name="city"]');
            setTimeout(function(){
                var koInput = ko.dataFor(input[0]);
                if(input.length && input.value) input.value(val);
            }, 1000);





            if(val!=""){
                jQuery('#city-select-error').remove();
                jQuery('#'+main_id+' [name="city"]').removeClass('mage-error');
            }
            jQuery('#'+main_id+' [name="city"]').focus();
        }
    }

    window.emptyInputZip = function(val,main_id){
        if(main_id=='edit'){
            jQuery('#postcode').focus();
            jQuery('#postcode').val(val);
            if(val!=""){
                jQuery('#zip-select-error').remove();
                jQuery('#zip-error').remove();
                jQuery('#zip-select').removeClass('mage-error');
            }
            jQuery('#postcode').focus();
        }else{
            jQuery('#'+main_id+' [name="postcode"]').focus();
            jQuery('#'+main_id+' [name="postcode"]').val(val);
            /*var koInput = ko.dataFor(jQuery('#'+main_id+' [name="postcode"]')[0]);
            koInput.value(val);*/
            if(val!=""){
                jQuery('#zip-select-error').remove();
                jQuery('#'+main_id+' [name="postcode"]').removeClass('mage-error');
                jQuery('#zip-select').removeClass('mage-error');
            }
            jQuery('#'+main_id+' [name="postcode"]').focus();
        }
    }


    window.getZipcodes = function(value,type){
        if(type!='edit'){
            if (value != '' && jQuery('#'+type+' [name="city-select"]').length > 0 &&  jQuery('#'+type+' [name="city-select"]').is('select')) {
                getPostcodes(value,type);
            }
        }else{
            if (value != '' && jQuery('#city-select').length > 0 &&  jQuery('#city-select').is('select')) {
                getPostcodesForAddress(value,type);
            }
        }
    }

    /* This is for Zip codes */
    window.getPostcodes = function(value,main_id) {
        var postcode_id =  jQuery('#'+main_id+' [name="postcode"]').attr('id');
        var url = window.data_zip_url;
        var loader = '<div data-role="loader" class="loading-mask postcode_loading_mask" style="position: relative;text-align:right;"><div class="loader"><img src="'+window.loading_url+'" alt="Loading..." style="position: absolute;text-align:center;"></div>Loading...</div>';
        if(jQuery('#'+main_id+' .postcode_loading_mask').length==0){
            jQuery('#'+main_id+' [name="postcode"]').after(loader);
        }
        emptyInputZip('',main_id);
        jQuery('#error-'+postcode_id).hide();
        jQuery('.mage-error').hide();
        jQuery('#'+main_id+' [name="postcode"]').hide();
        jQuery('#'+postcode_id+'-select').remove();
        jQuery('#'+main_id+' .postcode_billing_notinlist').remove();
        jQuery('#'+main_id+' .postcode_br_billing_notinlist').remove();
        jQuery.ajax({
            url : url,
            type: "get",
            data:"city="+value+'&state='+jQuery('#'+main_id+' [name="region_id"]').val()+'&country_id='+jQuery('#'+main_id+' [name="country_id"]').val(),
            dataType: 'json',
            async: false
        }).done(function (transport) {
            jQuery('#error-'+postcode_id).show();
            jQuery('.mage-error').show();
            jQuery('#'+main_id+' .postcode_loading_mask').remove();
            jQuery('#'+main_id+' [name="postcode"]').show();
            var response = transport;

            var options = '<select onchange="getZipState(this.value,\''+main_id+'\')" id="'+postcode_id+'-select" class="validate-select select" title="Postcode" name="zip-select" ><option value="">Please select zip code</option>';
            if (response.length > 0) {
                for (var i = 0; i < response.length; i++) {
                    options += '<option value="' + response[i] + '">' + response[i] + '</option>';
                }
                options += "</select>";
                if(window.data_zip_link!=""){
                    var title = window.data_zip_title;
                    options+= "<br class='postcode_br_billing_notinlist' /><a onclick='notInListZip(\"billing\",\""+main_id+"\")' class='postcode_billing_notinlist' href='javascript:void(0)' class='postcode_notinlist'>"+title+"</a>";
                }
                jQuery('#'+main_id+' [name="postcode"]').hide();
                if(jQuery('#'+postcode_id+'-select').length==0){
                    jQuery('#'+main_id+' [name="postcode"]').after(options);
                }
            } else {
                jQuery('#'+main_id+' [name="postcode"]').html(inp);
                jQuery('#'+main_id+' .postcode_billing_notinlist').remove();
            }
        }).fail( function ( error )
        {
            jQuery('#error-'+postcode_id).show();
            jQuery('#'+main_id+' .postcode_loading_mask').remove();
            jQuery('#'+main_id+' [name="postcode"]').show();
            console.log(error);
        });
    }
    window.getPostcodesForAddress = function(value, main_id) {
        var postcode_id =  jQuery('#zip').attr('id');
        var url = window.data_zip_url;
        var loader = '<div data-role="loader" class="loading-mask postcode_loading_mask" style="position: relative;text-align:right;"><div class="loader"><img src="'+window.loading_url+'" alt="Loading..." style="position: absolute;text-align:center;"></div>Loading...</div>';
        if(jQuery('.postcode_loading_mask').length==0){
            jQuery('#zip').after(loader);
        }
        emptyInputZip('',main_id);
        jQuery('#error-'+postcode_id).hide();
        jQuery('.mage-error').hide();
        jQuery('#zip').hide();
        jQuery('#zip-select-error').remove();
        jQuery('#zip-select').remove();
        jQuery('.postcode_billing_notinlist').remove();
        jQuery('.postcode_br_billing_notinlist').remove();
        jQuery.ajax({
            url : url,
            type: "get",
            data:"city="+value+'&state='+jQuery('#region_id').val()+'&country_id='+jQuery('#country').val(),
            dataType: 'json',
        }).done(function (transport) {
            jQuery('#error-'+postcode_id).show();
            jQuery('.mage-error').show();
            jQuery('.postcode_loading_mask').remove();
            jQuery('#zip').show();
            var response = transport;

            var options = '<select onchange="getZipState(this.value,\''+main_id+'\')" id="'+postcode_id+'-select" class="validate-select select" title="Postcode" name="zip-select" ><option value="">Please select zip code</option>';
            if (response.length > 0) {
                for (var i = 0; i < response.length; i++) {
                    options += '<option value="' + response[i] + '">' + response[i] + '</option>';
                }
                options += "</select>";
                if(window.data_zip_link!=""){
                    var title = window.data_zip_title;
                    options+= "<br class='postcode_br_billing_notinlist' /><a onclick='notInListZip(\"billing\",\""+main_id+"\")' class='postcode_billing_notinlist' href='javascript:void(0)' class='postcode_notinlist'>"+title+"</a>";
                }
                jQuery('#zip').hide();
                if(jQuery('#zip-select').length==0){
                    jQuery('#zip').after(options);
                }
            } else {
                jQuery('#zip').html(inp);
                jQuery('.postcode_billing_notinlist').remove();
            }
        }).fail( function ( error )
        {
            jQuery('#error-'+postcode_id).show();
            jQuery('.postcode_loading_mask').remove();
            jQuery('#zip').show();
            console.log(error);
        });
    }
    /* Zip not in list */
    window.notInListZip = function(type,main_id){
        if(main_id=='edit'){
            var postcode_id =  "postcode";
            jQuery('#'+postcode_id+'-select').remove();
            jQuery('.postcode_billing_notinlist').remove();
            jQuery('.postcode_br_billing_notinlist').remove();
            jQuery('#postcode').show();
        }else{
            var postcode_id =  jQuery('#'+main_id+' [name="postcode"]').attr('id');
            jQuery('#'+postcode_id+'-select').remove();
            jQuery('#'+main_id+' .postcode_billing_notinlist').remove();
            jQuery('#'+main_id+' .postcode_br_billing_notinlist').remove();
            jQuery('#'+main_id+' [name="postcode"]').show();
        }

    }

});
