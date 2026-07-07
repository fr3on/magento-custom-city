<?php
namespace Custom\City\Console\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Custom\City\Setup\Seed\LocationData;

class SeedCommand extends Command
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
     * @param string|null $name
     */
    public function __construct(
        \Custom\City\Model\StateFactory $stateFactory,
        \Custom\City\Model\CityFactory $cityFactory,
        \Custom\City\Model\StatelocaleFactory $stateLocaleFactory,
        \Custom\City\Model\Resource\State\CollectionFactory $stateCollectionFactory,
        \Custom\City\Model\Resource\City\CollectionFactory $cityCollectionFactory,
        $name = null
    ) {
        $this->stateFactory = $stateFactory;
        $this->cityFactory = $cityFactory;
        $this->stateLocaleFactory = $stateLocaleFactory;
        $this->stateCollectionFactory = $stateCollectionFactory;
        $this->cityCollectionFactory = $cityCollectionFactory;
        parent::__construct($name);
    }

    /**
     * Configure command.
     */
    protected function configure()
    {
        $this->setName('custom:city:seed')
            ->setDescription('Seed regions/states and cities for Egypt (EG) and Saudi Arabia (SA)')
            ->addOption(
                'countries',
                'c',
                InputOption::VALUE_OPTIONAL,
                'Comma-separated list of country ISO codes to seed (e.g. EG,SA)',
                'EG,SA'
            );
        parent::configure();
    }

    /**
     * Execute command.
     *
     * @param InputInterface $input
     * @param OutputInterface $output
     * @return int
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $output->writeln('<info>Starting location data seeding...</info>');

        $countriesOption = $input->getOption('countries');
        $countriesToSeed = array_map('trim', explode(',', strtoupper($countriesOption)));

        $logger = function ($msg) use ($output) {
            $output->writeln("<info>{$msg}</info>");
        };

        foreach ($countriesToSeed as $countryId) {
            $output->writeln("<comment>Processing country: {$countryId}...</comment>");
            try {
                $results = LocationData::seed(
                    $countryId,
                    $this->stateFactory,
                    $this->cityFactory,
                    $this->stateLocaleFactory,
                    $this->stateCollectionFactory,
                    $this->cityCollectionFactory,
                    $logger
                );
            } catch (\Exception $e) {
                $output->writeln("<error>Error seeding {$countryId}: {$e->getMessage()}</error>");
            }
        }

        $output->writeln('<info>Location data seeding completed successfully.</info>');
        return 0;
    }
}
