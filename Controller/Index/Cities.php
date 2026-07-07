<?php
 
namespace Custom\City\Controller\Index;
 
use Custom\City\Controller\City;
use Custom\City\Helper\Data;
use Custom\City\Model\CityFactory;
use Magento\Framework\App\Action\Context;
use Magento\Framework\Controller\Result\JsonFactory;
use Magento\Framework\View\Result\PageFactory;

class Cities extends City
{
    protected $jsonFactory;
    public function __construct(
        Context $context,
        PageFactory $pageFactory,
        Data $dataHelper,
        CityFactory $cityFactory,
        JsonFactory $jsonFactory
    )
    {
        $this->jsonFactory = $jsonFactory;
        parent::__construct($context, $pageFactory, $dataHelper, $cityFactory);
    }

    public function execute()
    {
        $state_id = $this->getRequest()->getParam('state');
		$cities = array();
		if( $state_id!=""){
			$cities_options = $this->_cityFactory->create()->getCollection()->addFieldToFilter('state_id',$state_id)
			->addFieldToFilter('status',1);
			 $cities_options->getSelect()
			 ->order('city ASC');
			if($cities_options->count() > 0){
				foreach($cities_options as $city){
					$cities[] = ucfirst($city->getCity());
				}
			}
		}
        return  $this->jsonFactory->create()->setData($cities);
    }
}