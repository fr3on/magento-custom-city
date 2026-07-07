<?php

namespace Custom\City\Controller\Adminhtml\Zip;
use Custom\City\Controller\Adminhtml\Zip;

class Importzips extends Zip
{
    /**
     * @return void
     */
    public function execute()
    {
        $isPost = $this->getRequest()->isPost();
        try{
            if ($isPost) {
                $file = $_FILES['import_zip'];
                $data = $this->getRequest()->getParam('import_zip');
                $this->_getSession()->setFormData($data);

                $country_id = $data['country_id'];
                //$state_id = $data['state_id'];
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
                    if(trim($dataRow[0])!='Zipcode' && trim($dataRow[1])!='City' && trim($dataRow[2])!='State' && $counter==1){
                        $this->messageManager->addError(__('Columns (Zipcode, City, and State) are not exists in csv file.'));
                        $this->_redirect('*/*/import');
                        return;
                    }
                    if($counter > 1 && $dataRow[0]!="" && $dataRow[1]!=="" && $dataRow[2]!==""){
                        $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
                        $region = $objectManager->create('Magento\Directory\Model\ResourceModel\Region\Collection')
                            ->addFieldToFilter('name', ['eq' => $dataRow[2]])
                            ->getFirstItem();
                        $state_id = $region->getId();


                        $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
                        $_cities = $objectManager->create('Custom\City\Model\Resource\City\Collection');
                        $_cities = $_cities->addFieldToFilter('city',trim($dataRow[1]))->addFieldToFilter('state_id', $state_id)
                            ->addFieldToFilter('country_id',$country_id);
                        if($_cities->count() > 0){
                            $city_data = $_cities->getFirstItem();
                            $city_id = $city_data->getId();
                            $zip_check = $objectManager->create('Custom\City\Model\Resource\Zip\Collection');
                            $zip_check = $zip_check->addFieldToFilter('city_id',$city_id)
                                ->addFieldToFilter('state_id',$state_id)
                                ->addFieldToFilter('country_id',$country_id)
                                ->addFieldToFilter('zip_name', trim($dataRow[0]));
                            if($zip_check->count() == 0){
                                $data = array('zip_name'=>trim($dataRow[0]),'city_id'=>$city_id,'state_id'=>$state_id,'country_id'=>$country_id,'status'=>1,'created_at'=>date('Y-m-d'));
                                $zipModel = $this->_zipFactory->create();
                                $zipModel->setData($data);
                                try {
                                    // Save zip
                                    $zipModel->save();
                                    $import++;
                                }catch (\Exception $e) {
                                    $this->messageManager->addError($e->getMessage());
                                }
                            }else{
                                $not_exists.='<br />Zip code <b>"'.$dataRow[0].'"</b> is already exists.';
                            }
                        }else{
                            $not_exists.='<br />City <b>"'.$dataRow[1].'"</b> is not exists in selected country.';
                        }
                    }
                    $counter++;
                }
                if($import > 0){
                    $this->messageManager->addSuccess('Zip codes imported successfully.'.$not_exists);
                }else{
                    $this->messageManager->addError('No zip code imported, either already exists or data is not correct, check your file.'.$not_exists);
                }

            }
        }catch(\Exception $e){
            $this->messageManager->addError($e->getMessage());
        }
        $this->_redirect('*/*/import');
    }

}