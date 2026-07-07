<?php
namespace Custom\City\Setup\Seed;

class LocationData
{
    /**
     * Get seed data for regions and cities.
     *
     * @return array
     */
    public static function getSeedData()
    {
        return [
            'SA' => [
                [
                    'state_name' => 'Riyadh',
                    'state_code' => 'SA-01',
                    'cities' => ['Riyadh', 'Al-Kharj', 'Ad-Diriyah', 'Majmaah', 'Wadi ad-Dawasir']
                ],
                [
                    'state_name' => 'Makkah',
                    'state_code' => 'SA-02',
                    'cities' => ['Jeddah', 'Makkah', 'Taif', 'Rabigh', 'Khulais']
                ],
                [
                    'state_name' => 'Medina',
                    'state_code' => 'SA-03',
                    'cities' => ['Medina', 'Yanbu', 'Al-Ula', 'Badr']
                ],
                [
                    'state_name' => 'Eastern Province',
                    'state_code' => 'SA-04',
                    'cities' => ['Dammam', 'Khobar', 'Jubail', 'Hofuf', 'Qatif', 'Abqaiq', 'Hafar Al-Batin']
                ],
                [
                    'state_name' => 'Qassim',
                    'state_code' => 'SA-05',
                    'cities' => ['Buraidah', 'Unaizah', 'Ar Rass']
                ],
                [
                    'state_name' => 'Asir',
                    'state_code' => 'SA-06',
                    'cities' => ['Abha', 'Khamis Mushait', 'Bisha', 'Bareq']
                ],
                [
                    'state_name' => 'Tabuk',
                    'state_code' => 'SA-07',
                    'cities' => ['Tabuk', 'Duba', 'Tayma']
                ],
                [
                    'state_name' => 'Hail',
                    'state_code' => 'SA-08',
                    'cities' => ['Hail']
                ],
                [
                    'state_name' => 'Northern Borders',
                    'state_code' => 'SA-15',
                    'cities' => ['Arar', 'Rafha', 'Turaif']
                ],
                [
                    'state_name' => 'Jizan',
                    'state_code' => 'SA-09',
                    'cities' => ['Jizan', 'Sabya', 'Abu Arish']
                ],
                [
                    'state_name' => 'Najran',
                    'state_code' => 'SA-10',
                    'cities' => ['Najran', 'Sharurah']
                ],
                [
                    'state_name' => 'Al Bahah',
                    'state_code' => 'SA-11',
                    'cities' => ['Al Bahah', 'Baljurashi']
                ],
                [
                    'state_name' => 'Al Jawf',
                    'state_code' => 'SA-12',
                    'cities' => ['Sakakah', 'Qurayyat']
                ]
            ],
            'EG' => [
                [
                    'state_name' => 'Cairo',
                    'state_code' => 'EG-C',
                    'cities' => ['Cairo', 'Helwan', 'New Cairo', 'Shoubra El-Kheima', 'Maadi']
                ],
                [
                    'state_name' => 'Giza',
                    'state_code' => 'EG-G',
                    'cities' => ['Giza', '6th of October', 'Sheikh Zayed', 'Haram']
                ],
                [
                    'state_name' => 'Alexandria',
                    'state_code' => 'EG-ALX',
                    'cities' => ['Alexandria', 'Borg El Arab']
                ],
                [
                    'state_name' => 'Qalyubia',
                    'state_code' => 'EG-KB',
                    'cities' => ['Banha', 'Qalyub', 'El Qanatir El Khayriya']
                ],
                [
                    'state_name' => 'Gharbia',
                    'state_code' => 'EG-GH',
                    'cities' => ['Tanta', 'Kafr El Zayat', 'El Mahalla El Kubra']
                ],
                [
                    'state_name' => 'Monufia',
                    'state_code' => 'EG-MN',
                    'cities' => ['Shibin El Kom', 'Menouf', 'Ashmoun']
                ],
                [
                    'state_name' => 'Dakahlia',
                    'state_code' => 'EG-DK',
                    'cities' => ['Mansoura', 'Talkha', 'Mit Ghamr']
                ],
                [
                    'state_name' => 'Sharqia',
                    'state_code' => 'EG-SHR',
                    'cities' => ['Zagazig', 'Bilbeis', '10th of Ramadan']
                ],
                [
                    'state_name' => 'Beheira',
                    'state_code' => 'EG-BH',
                    'cities' => ['Damanhur', 'Kafr El Dawwar', 'Kom Hamada']
                ],
                [
                    'state_name' => 'Kafr El Sheikh',
                    'state_code' => 'EG-KFS',
                    'cities' => ['Kafr El Sheikh', 'Desouk', 'Baltim']
                ],
                [
                    'state_name' => 'Damietta',
                    'state_code' => 'EG-DT',
                    'cities' => ['Damietta', 'Ras El Bar', 'New Damietta']
                ],
                [
                    'state_name' => 'Port Said',
                    'state_code' => 'EG-PTS',
                    'cities' => ['Port Said']
                ],
                [
                    'state_name' => 'Ismailia',
                    'state_code' => 'EG-IS',
                    'cities' => ['Ismailia']
                ],
                [
                    'state_name' => 'Suez',
                    'state_code' => 'EG-JS',
                    'cities' => ['Suez']
                ],
                [
                    'state_name' => 'Sinai North',
                    'state_code' => 'EG-SIN',
                    'cities' => ['El Arish']
                ],
                [
                    'state_name' => 'Sinai South',
                    'state_code' => 'EG-JS',
                    'cities' => ['Sharm El Sheikh', 'Dahab', 'Nuweiba', 'El Tor']
                ],
                [
                    'state_name' => 'Beni Suef',
                    'state_code' => 'EG-BNS',
                    'cities' => ['Beni Suef']
                ],
                [
                    'state_name' => 'Faiyum',
                    'state_code' => 'EG-FYM',
                    'cities' => ['Faiyum']
                ],
                [
                    'state_name' => 'Minya',
                    'state_code' => 'EG-MNY',
                    'cities' => ['Minya', 'Mallawi']
                ],
                [
                    'state_name' => 'Asyut',
                    'state_code' => 'EG-AST',
                    'cities' => ['Asyut']
                ],
                [
                    'state_name' => 'Sohag',
                    'state_code' => 'EG-SHG',
                    'cities' => ['Sohag', 'Akhmim']
                ],
                [
                    'state_name' => 'Qena',
                    'state_code' => 'EG-QNA',
                    'cities' => ['Qena', 'Nag Hammadi']
                ],
                [
                    'state_name' => 'Luxor',
                    'state_code' => 'EG-LX',
                    'cities' => ['Luxor']
                ],
                [
                    'state_name' => 'Aswan',
                    'state_code' => 'EG-ASN',
                    'cities' => ['Aswan', 'Kom Ombo']
                ],
                [
                    'state_name' => 'Red Sea',
                    'state_code' => 'EG-BA',
                    'cities' => ['Hurghada', 'Safaga', 'El Gouna', 'Marsa Alam']
                ],
                [
                    'state_name' => 'New Valley',
                    'state_code' => 'EG-WAD',
                    'cities' => ['Kharga', 'Dakhla']
                ],
                [
                    'state_name' => 'Matrouh',
                    'state_code' => 'EG-MT',
                    'cities' => ['Marsa Matrouh', 'Siwa']
                ]
            ]
        ];
    }

    /**
     * Seed location data for a specific country.
     *
     * @param string $countryId
     * @param \Custom\City\Model\StateFactory $stateFactory
     * @param \Custom\City\Model\CityFactory $cityFactory
     * @param \Custom\City\Model\StatelocaleFactory $stateLocaleFactory
     * @param \Custom\City\Model\Resource\State\CollectionFactory $stateCollectionFactory
     * @param \Custom\City\Model\Resource\City\CollectionFactory $cityCollectionFactory
     * @param callable|null $logger
     * @return array
     */
    public static function seed(
        $countryId,
        $stateFactory,
        $cityFactory,
        $stateLocaleFactory,
        $stateCollectionFactory,
        $cityCollectionFactory,
        $logger = null
    ) {
        $seedData = self::getSeedData();
        if (!isset($seedData[$countryId])) {
            if ($logger) {
                $logger("No seed data found for country: " . $countryId);
            }
            return ['states' => 0, 'cities' => 0];
        }

        $states = $seedData[$countryId];
        $stateCount = 0;
        $cityCount = 0;

        foreach ($states as $stateInfo) {
            $stateName = $stateInfo['state_name'];
            $stateCode = $stateInfo['state_code'];
            $cities = $stateInfo['cities'];

            // 1. Check if state already exists
            $stateCollection = $stateCollectionFactory->create()
                ->addFieldToFilter('default_name', $stateName)
                ->addFieldToFilter('country_id', $countryId);

            if ($stateCollection->getSize() == 0) {
                $stateModel = $stateFactory->create();
                $stateModel->setData([
                    'default_name' => $stateName,
                    'code' => $stateCode,
                    'country_id' => $countryId
                ]);
                $stateModel->save();
                $stateId = $stateModel->getId();
                $stateCount++;

                // Add locale translations
                $locales = ['en_US', 'ar_SA', 'ar_EG'];
                foreach ($locales as $locale) {
                    $stateLocaleModel = $stateLocaleFactory->create();
                    $stateLocaleModel->setData([
                        'locale' => $locale,
                        'region_id' => $stateId,
                        'name' => $stateName
                    ]);
                    $stateLocaleModel->save();
                }
            } else {
                $stateId = $stateCollection->getFirstItem()->getRegionId();
            }

            // 2. Add cities for this state
            foreach ($cities as $cityName) {
                $cityCollection = $cityCollectionFactory->create()
                    ->addFieldToFilter('city', $cityName)
                    ->addFieldToFilter('state_id', $stateId)
                    ->addFieldToFilter('country_id', $countryId);

                if ($cityCollection->getSize() == 0) {
                    $cityModel = $cityFactory->create();
                    $cityModel->setData([
                        'city' => $cityName,
                        'state_id' => $stateId,
                        'country_id' => $countryId,
                        'status' => 1,
                        'created_at' => date('Y-m-d')
                    ]);
                    $cityModel->save();
                    $cityCount++;
                }
            }
        }

        if ($logger) {
            call_user_func($logger, "Seeded {$stateCount} states and {$cityCount} cities for {$countryId}.");
        }

        return ['states' => $stateCount, 'cities' => $cityCount];
    }
}
