<?php

namespace App\Controller;

use App\Entity\Users;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[Route('/api', name:'api_main_')]
class UserController extends AbstractController
{
    
    private $entityManager;
    private $userPasswordHasher;
    
    public function __construct(
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $userPasswordHasher,

    ) {
        $this->entityManager = $entityManager;
        $this->userPasswordHasher = $userPasswordHasher;

    }
    #[Route('/user', name: 'user_create', methods: ['POST'])]
    public function create(Request $request): Response
    {
        $user = new Users();
        $user->setEmail($request->request->get('email'));
        $user->setPassword($this->userPasswordHasher->hashPassword($user, $request->request->get('password')));
        $user->setLastname($request->request->get('lastname'));
        $user->setFirstname($request->request->get('firstname'));
        $user->setAddress($request->request->get('address'));
        $user->setPostalCode($request->request->get('postal_code'));
        $user->setRgpd($request->request->get('rgpd'));
        $user->setIsActive(true);
        $user->setRoles(['ROLE_USER']);

        $this->entityManager->persist($user);
        $this->entityManager->flush();
        return $this->json('Created new user successfully');
    }


    /**
     * update a phone
     */
    #[Route('/user/{id}', name: 'user_edit', methods: ['PUT', 'PATCH'])]
    public function edit(Request $request): Response
    {
        $id = (['id' => $request->get('id')]);
        $user = $this->entityManager->getRepository(Product::class)->find($id);
        if (!$user) {
            return $this->json('User found for id ' . $id, 404);
        }
        $content = json_decode($request->getContent());
        $user->setEmail($content->email);
        $user->setPassword($content->password);
        $user->setLastname($content->lastname);
        $user->setFirstname($content->firstname);
        $user->setAddress($content->address);
        $user->setPostalCode($content->postal_code);
        $user->setRgpd($content->rgpd);
        $this->entityManager->flush();
        
        $data[] = [
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'password' => $user->getPassword(),
            'lastname' => $user->getLastname(),
            'firstname' => $user->getFirstname(),
            'address' => $user->getAddress(),
            'postal_code'=>$user->getPostalCode(),
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
        $phone =$this->entityManager->getRepository(Phones::class)->find($id);
        if (!$phone) {
            return $this->json('No phone found for id ' . $id, 404);
        }
        $this->entityManager->remove($phone);
        $this->entityManager->flush();

        return $this->json('Deleted a phone successfully');
    }
}
