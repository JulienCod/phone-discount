<?php

namespace App\Controller;

use App\Entity\Phones;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api', name:'api_main')]
class PhonesController extends AbstractController
{
    
        private $entityManager;
        private $doctrine;
    
        public function __construct(
            EntityManagerInterface $entityManager,
            ManagerRegistry $doctrine,
        ) {
            $this->entityManager = $entityManager;
            $this->doctrine = $doctrine;
        }
        /**
         * get phones
         *
         * @return Response
         */
        #[Route('/phone', name: 'phone_index', methods: ['GET'])]
        public function index(): Response
        {
            $phones = $this->entityManager->getRepository(Phones::class)->findAll();
            $data = [];
            foreach ($phones as $phone) {
                $data[] = [
                    'id' => $phone->getId(),
                    'brand' => $phone->getBrand(),
                    'description' => $phone->getDescription(),
                    'model' => $phone->getModel(),
                    'color' => $phone->getColor(),
                    'storage' => $phone->getStorage(),
                    'stock'=>$phone->getStock(),
                    'price' => $phone->getPrice(),
                    'promotion' => $phone->getPromotion(),
                    // 'is_active' => $phone->getIsActive(),
                ];
            }
            return $this->json($data);
        }
    
        /**
         * create phones
         *
         * @param Request $request
         * @return Response
         */
        #[Route('/phone', name: 'phone_new', methods: ['POST'])]
        public function new(Request $request): Response
        {
            $em = $this->doctrine->getManager();
            $phone = new Phones();
            $phone->setBrand($request->request->get('brand'));
            $phone->setDescription($request->request->get('description'));
            $phone->setModel($request->request->get('model'));
            $phone->setColor($request->request->get('color'));
            $phone->setStorage($request->request->get('storage'));
            $phone->setStock($request->request->get('stock'));
            $phone->setPrice($request->request->get('price'));
            $phone->setPromotion($request->request->get('promotion'));
            $phone->setIsActive($request->request->get('is_active'));
            $em->persist($phone);
            $em->flush();
    
            return $this->json('Created new phone successfully');
        }
    
        /**
         * get a product
         */
        #[Route('/phone/{id}', name: 'phone_show', methods: ['GET'])]
        public function show(Request $request): Response
        {
            $id = (['id' => $request->get('id')]);
            $phone = $this->doctrine->getRepository(Phones::class)->find($id);
            if (!$phone) {
                return $this->json('No phone found for id ' . $id, 404);
            }
            $data[] = [
                'id' => $phone->getId(),
                'brand' => $phone->getBrand(),
                'description' => $phone->getDescription(),
                'model' => $phone->getModel(),
                'color' => $phone->getColor(),
                'storage' => $phone->getStorage(),
                'stock'=>$phone->getStock(),
                'price' => $phone->getPrice(),
                'promotion' => $phone->getPromotion(),
                'is_active' => $phone->getIsActive(),
            ];
            return $this->json($data);
        }
    
        /**
         * update a phone
         */
        #[Route('/phone/{id}', name: 'phone_edit', methods: ['PUT', 'PATCH'])]
        public function edit(Request $request): Response
        {
            $id = (['id' => $request->get('id')]);
            $phone = $this->doctrine->getRepository(Product::class)->find($id);
            if (!$phone) {
                return $this->json('No phone found for id ' . $id, 404);
            }
            $content = json_decode($request->getContent());
            $phone->setBrand($content->brand);
            $phone->setDescription($content->description);
            $phone->setModel($content->model);
            $phone->setColor($content->color);
            $phone->setStorage($content->storage);
            $phone->setStock($content->stock);
            $phone->setPrice($content->price);
            $phone->setPromotion($content->promotion);
            $phone->setIsActive($content->isActive);
            $this->entityManager->flush();
            
            $data[] = [
                'id' => $phone->getId(),
                'brand' => $phone->getBrand(),
                'description' => $phone->getDescription(),
                'model' => $phone->getModel(),
                'color' => $phone->getColor(),
                'storage' => $phone->getStorage(),
                'stock'=>$phone->getStock(),
                'price' => $phone->getPrice(),
                'promotion' => $phone->getPromotion(),
                'is_active' => $phone->getIsActive(),
            ];
            return $this->json($data);
        }
    
        /**
         * delete a phone
         */
        #[Route('/phone/{id}', name: 'phone_delete', methods: ['DELETE'])]
        public function delete(Request $request): Response
        {
            $id = (['id' => $request->get('id')]);
            $phone = $this->doctrine->getManager()->getRepository(Phones::class)->find($id);
            if (!$phone) {
                return $this->json('No phone found for id ' . $id, 404);
            }
            $this->doctrine->getManager()->remove($phone);
            $this->doctrine->getManager()->flush();
    
            return $this->json('Deleted a phone successfully');
        }
}