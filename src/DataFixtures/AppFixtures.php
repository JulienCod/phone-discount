<?php

namespace App\DataFixtures;

use App\Entity\Phones;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $phones = [];
        for ($i=0; $i < 30; $i++) { 
            # code...
            $phone = new Phones();
            $phone->setBrand('xiaomi');
            $phone->setDescription('un super téléphone');
            $phone->setModel('mi-9t');
            $phone->setColor('noir');
            $phone->setStorage(mt_rand(128, 1000));
            $phone->setStock(mt_rand(0, 30));
            $phone->setPrice(mt_rand(150, 700));
            $phone->setPromotion(mt_rand(0, 30));
            $phone->setIsActive(true);
            $manager->persist($phone);
        }

        $manager->flush();
    }
}
