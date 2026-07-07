<?php
namespace Custom\City\Setup;

use Magento\Framework\Setup\UpgradeDataInterface;
use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\ModuleDataSetupInterface;
use Custom\City\Setup\Seed\LocationData;

class UpgradeData implements UpgradeDataInterface
{
    /**
     * @var \Custom\City\Model\StateFactory
     */
    private $stateFactory;

    /**
     * @var \Custom\City\Model\CityFactory
     */
    private $cityFactory;

    /**
     * @var \Custom\City\Model\StatelocaleFactory
     */
    private $stateLocaleFactory;

    /**
     * @var \Custom\City\Model\Resource\State\CollectionFactory
     */
    private $stateCollectionFactory;

    /**
     * @var \Custom\City\Model\Resource\City\CollectionFactory
     */
    private $cityCollectionFactory;

    /**
     * Constructor.
     *
     * @param \Custom\City\Model\StateFactory $stateFactory
     * @param \Custom\City\Model\CityFactory $cityFactory
     * @param \Custom\City\Model\StatelocaleFactory $stateLocaleFactory
     * @param \Custom\City\Model\Resource\State\CollectionFactory $stateCollectionFactory
     * @param \Custom\City\Model\Resource\City\CollectionFactory $cityCollectionFactory
     */
    public function __construct(
        \Custom\City\Model\StateFactory $stateFactory,
        \Custom\City\Model\CityFactory $cityFactory,
        \Custom\City\Model\StatelocaleFactory $stateLocaleFactory,
        \Custom\City\Model\Resource\State\CollectionFactory $stateCollectionFactory,
        \Custom\City\Model\Resource\City\CollectionFactory $cityCollectionFactory
    ) {
        $this->stateFactory = $stateFactory;
        $this->cityFactory = $cityFactory;
        $this->stateLocaleFactory = $stateLocaleFactory;
        $this->stateCollectionFactory = $stateCollectionFactory;
        $this->cityCollectionFactory = $cityCollectionFactory;
    }

    /**
     * Upgrade data for the module.
     *
     * @param ModuleDataSetupInterface $setup
     * @param ModuleContextInterface $context
     * @return void
     */
    public function upgrade(ModuleDataSetupInterface $setup, ModuleContextInterface $context)
    {
        $setup->startSetup();

        if (version_compare($context->getVersion(), '4.0.2') < 0) {
            // Seed Saudi Arabia (SA)
            LocationData::seed(
                'SA',
                $this->stateFactory,
                $this->cityFactory,
                $this->stateLocaleFactory,
                $this->stateCollectionFactory,
                $this->cityCollectionFactory
            );

            // Seed Egypt (EG)
            LocationData::seed(
                'EG',
                $this->stateFactory,
                $this->cityFactory,
                $this->stateLocaleFactory,
                $this->stateCollectionFactory,
                $this->cityCollectionFactory
            );
        }

        $setup->endSetup();
    }
}
