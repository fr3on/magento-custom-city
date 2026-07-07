<?php
namespace Custom\City\Controller\Adminhtml\Zip;

class Citylist extends \Magento\Framework\App\Action\Action
{
    /**
     * @var \Magento\Framework\View\Result\PageFactory
     */
    protected $resultPageFactory;
    /**
     * @var \Magento\Directory\Model\CountryFactory
     */
    protected $_cityCollection;

    /**
     * @param \Magento\Framework\App\Action\Context $context
     * @param \Magento\Framework\View\Result\PageFactory resultPageFactory
     */
    public function __construct(
        \Magento\Framework\App\Action\Context $context,
        \Custom\City\Model\CityFactory $cityFactory,
        \Custom\City\Model\Resource\City\Collection $cityCollection,
        \Magento\Framework\View\Result\PageFactory $resultPageFactory
    )
    {
        $this->_cityFactory = $cityFactory;
        $this->_cityCollection = $cityCollection;
        $this->resultPageFactory = $resultPageFactory;
        parent::__construct($context);
    }
    /**
     *
     *
     * @return void
     */
    public function execute()
    {
        $stateId = $this->getRequest()->getParam('state');
        $city = "<option value=''>--Please Select--</option>";
        if ($stateId != '') {
            $citiesArray = $this->_cityCollection->addFieldToFilter('state_id',$stateId);
            foreach ($citiesArray as $_city) {
                if($_city['id']){
                    $value = $_city['id'];
                    $city .= "<option value='".$value."'>" . $_city['city'] . "</option>";
                }
            }
        }
        $result['htmlconent']=$city;
        $this->getResponse()->representJson(
            $this->_objectManager->get('Magento\Framework\Json\Helper\Data')->jsonEncode($result)
        );
    }

}