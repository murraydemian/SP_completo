<?php
require __DIR__ . '/../depend/vendor/autoload.php';
require __DIR__ . '/../model/dataAccess.php';
require __DIR__ . '/../model/auth.php';
require __DIR__ . '/../model/usuario.php';
require __DIR__ . '/../model/barbijo.php';
require __DIR__ . '/../model/MW.php';
require __DIR__ . '/../model/pdf.php';

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$app = new \Slim\App(["settings" => $config]);

$app->get('/', \Usuario::class . '::GetAll');

$app->post('/', \Barbijo::class . '::AddOne')
    ->add(\MW::class . '::VerifyToken');

$app->get('/barbijos', \Barbijo::class . '::GetAll');

$app->get('/login', \Usuario::class . '::VerifyToken');

$app->post('/login', \Usuario::class . '::Login')
    ->add(\MW::class . '::VerifyExistsLogin')
    ->add(\MW::class . '::VerifyEmailPasswordEmpty')
    ->add(\MW::class . '::VerifyEmailPasswordSet');

$app->post('/usuarios', \Usuario::class . '::AddOne');

$app->delete('/', \Barbijo::class . '::Delete')
    ->add(\MW::class . '::VerifyToken');

$app->put('/', \Barbijo::class . '::Modify')
    ->add(\MW::class . '::VerifyToken');

$app->get('/pdf/{tipo}', \PDFGenerator::class . '::List');
///
$app->post('/test', function($request, $response, $args){
    var_dump($_SERVER);
});

$app->run();