<?php
namespace Custom\City\Plugin\Block\Checkout;

use \Closure;

class LayoutProcessor{

    public function aroundProcess(
        Config $subject,
        Closure $proceed,
        $jsLayout
    ) {
        /**
         * Fix Checkout address sorting
         */
        //@ Shipping Address
        $jsLayout['components']['checkout']['children']['shippingAddress']['children']['shipping-address-fieldset']
        ['children']['lastname']['sortOrder'] = 20;

        $customJsLayout = $proceed($jsLayout);

        return $customJsLayout;
    }
}