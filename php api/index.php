<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers:Content-Type");
header("Content-Type: application/json; charset=UTF-8");

$uri = parse_url($_SERVER['REQUEST_URI'])['path'];
$method = $_SERVER['REQUEST_METHOD'];

$routes = [

    'GET' => [
        '/famille' => 'Controllers/Famille/index.php',
        '/famille/show' => 'Controllers/Famille/show.php',

        '/client' => 'Controllers/Client/index.php',
        '/client/show' => 'Controllers/Client/show.php',

        '/article' => 'Controllers/Article/index.php',
        '/article/show' => 'Controllers/Article/show.php',

        '/caissier' => 'Controllers/Caissier/index.php',
        '/caissier/show' => 'Controllers/Caissier/show.php',

        '/bonLivraison' => 'Controllers/BonLivraison/index.php',
        '/bonLivraison/show' => 'Controllers/BonLivraison/show.php',
        '/bonLivraison/nextId' => 'Controllers/BonLivraison/nextId.php',

        '/modeReglement' => 'Controllers/ModeReglement/index.php',
        '/modeReglement/show' => 'Controllers/ModeReglement/show.php',

        '/detailBl' => 'Controllers/DetailBl/index.php',
        '/detailBl/show' => 'Controllers/DetailBl/show.php',
        
        '/reglement' => 'Controllers/Reglement/index.php',
        '/reglement/show' => 'Controllers/Reglement/show.php',
    ],

    'POST' => [
        '/famille/store' => 'Controllers/Famille/store.php',
        '/client/store' => 'Controllers/Client/store.php',
        '/article/store' => 'Controllers/Article/store.php',
        '/bonLivraison/store' => 'Controllers/BonLivraison/store.php',
        '/modeReglement/store' => 'Controllers/ModeReglement/store.php',
        '/reglement/store' => 'Controllers/Reglement/store.php',

        '/caissier/store' => 'Controllers/Caissier/store.php',
        '/caissier/login' => 'Controllers/Caissier/login.php',

        '/detailBl/store' => 'Controllers/DetailBl/store.php',
        '/detailBl/storeCollection' => 'Controllers/DetailBl/storeCollection.php',
    ],

    'PUT' => [
        '/famille/update' => 'Controllers/Famille/update.php',
        '/client/update' => 'Controllers/Client/update.php',
        '/article/update' => 'Controllers/Article/update.php',
        '/caissier/update' => 'Controllers/Caissier/update.php',
        '/bonLivraison/update' => 'Controllers/BonLivraison/update.php',
        '/modeReglement/update' => 'Controllers/ModeReglement/update.php',
        '/detailBl/update' => 'Controllers/DetailBl/update.php',
        '/reglement/update' => 'Controllers/Reglement/update.php',
    ],

    'DELETE' => [
        '/famille/destroy' => 'Controllers/Famille/destroy.php',
        '/client/destroy' => 'Controllers/Client/destroy.php',
        '/article/destroy' => 'Controllers/Article/destroy.php',
        '/caissier/destroy' => 'Controllers/Caissier/destroy.php',
        '/bonLivraison/destroy' => 'Controllers/BonLivraison/destroy.php',
        '/modeReglement/destroy' => 'Controllers/ModeReglement/destroy.php',
        '/detailBl/destroy' => 'Controllers/DetailBl/destroy.php',
        '/reglement/destroy' => 'Controllers/Reglement/destroy.php',
    ],
];




function routesController($uri, $method, $routes)
{

    $method = strtoupper($method);

    if (array_key_exists($method, $routes) && array_key_exists($uri, $routes[$method])) {
        require $routes[$method][$uri];
    } else {
        echo "<h1> Page not found </h1>";
        die();
    }
}

routesController($uri, $method, $routes);
