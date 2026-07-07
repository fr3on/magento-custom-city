<?php

namespace Custom\City\Controller\Adminhtml\City;
use Custom\City\Controller\Adminhtml\City;

class Importcities extends City
{
    /**
     * @return void
     */
    public function execute()
    {
        $isPost = $this->getRequest()->isPost();
        try{
            if ($isPost) {
                $file = $_FILES['import_city'];
                $data = $this->getRequest()->getParam('import_city');
                $this->_getSession()->setFormData($data);
                $country_id = $data['country_id'];
                if (!isset($file['tmp_name']['csv'])) {
                    throw new \Magento\Framework\Exception\LocalizedException(__('Invalid file upload attempt.'));
                }
                $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
                $csvProcessor = $objectManager->get('\Magento\Framework\File\Csv');
                $importProductRawData = $csvProcessor->getData($file['tmp_name']['csv']);
                $counter=1;
                $import = 0;
                $not_exists = '';
                foreach ($importProductRawData as $rowIndex => $dataRow) {
                    if(trim($dataRow[0])!='City' && trim($dataRow[1]!='State') && $counter==1){
                        $this->messageManager->addError(__('Columns (City and State) are not exists in csv file.'));
                        $this->_redirect('*/*/import');
                        return;
                    }
                    if($counter > 1 && $dataRow[0]!="" && $dataRow[1]!==""){
                        $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
                        $_states = $objectManager->create('Custom\City\Model\Resource\State\Collection');
                        $_states = $_states->addFieldToFilter('default_name',trim($dataRow[1]))
                            ->addFieldToFilter('country_id', $country_id);

                        if($_states->count() > 0){
                            $state_data = $_states->getFirstItem();
                            $state_id = $state_data->getRegionId();
                            $city_check = $objectManager->create('Custom\City\Model\Resource\City\Collection');
                            $city_check = $city_check->addFieldToFilter('state_id',$state_id)->addFieldToFilter('country_id', $country_id)
                                ->addFieldToFilter('city', trim($dataRow[0]));
                            if($city_check->count() == 0){
                                $data = array('city'=>trim($dataRow[0]),'state_id'=>$state_id,'country_id'=>$country_id,'status'=>1,'created_at'=>date('Y-m-d'));
                                $cityModel = $this->_cityFactory->create();
                                $cityModel->setData($data);
                                try {
                                    // Save city
                                    $cityModel->save();
                                    $import++;
                                }catch (\Exception $e) {
                                    $this->messageManager->addError($e->getMessage());
                                }
                            }else{
                                $not_exists.='<br />City <b>"'.$dataRow[0].'"</b> is already exists.';
                            }
                        }else{
                            $not_exists.='<br />State <b>"'.$dataRow[1].'"</b> is not exists in selected country.';
                        }
                    }
                    $counter++;
                }
                if($import > 0){
                    $this->messageManager->addSuccess('cities imported successfully.'.$not_exists);
                }else{
                    $this->messageManager->addError('No city imported, either already exists or data is not correct, check your file.'.$not_exists);
                }

            }
        }catch(\Exception $e){
            $this->messageManager->addError($e->getMessage());
        }
        $this->_redirect('*/*/import');
    }

}