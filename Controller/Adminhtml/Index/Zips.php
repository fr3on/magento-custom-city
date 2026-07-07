<?php
 
namespace Custom\City\Controller\Adminhtml\Index;
 
use Custom\City\Controller\Zip;
use Custom\City\Helper\Data;
use Custom\City\Model\ZipFactory;
use Custom\City\Model\CityFactory;
use Magento\Framework\App\Action\Context;
use Magento\Framework\Controller\Result\JsonFactory;
use Magento\Framework\View\Result\PageFactory;
 
class Zips extends Zip
{
	protected $jsonFactory;
    public function __construct(
        Context $context,
        PageFactory $pageFactory,
        Data $dataHelper,
        ZipFactory $zipFactory,
        CityFactory $cityFactory,
        JsonFactory $jsonFactory
    )
    {
        $this->jsonFactory = $jsonFactory;
        parent::__construct($context, $pageFactory, $dataHelper, $cityFactory, $zipFactory);
    }
    public function execute()
    {
        $city = $this->getRequest()->getParam('city');
		$zip_codes_options = array();
		if($city!=""){
			$city_id = $this->_cityFactory->create()->getCollection()->addFieldToFilter('city',$city)->getFirstItem()->getId();
			$zip_codes = $this->_zipFactory->create()->getCollection()->addFieldToFilter('city_id',$city_id)
			->addFieldToFilter('main_table.status',1);
			$zip_codes->getSelect()
			 ->order('id DESC');
			if($zip_codes->count() > 0){
				foreach($zip_codes as $zip){
					$zip_codes_options[] = ucfirst($zip->getZipName());
				}
			}
		}
		return  $this->jsonFactory->create()->setData($zip_codes_options);
    }
}