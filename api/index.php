<?php
require '../vendor/autoload.php';

use Dotenv\Dotenv;

// --- CORS headers ---
header('Access-Control-Allow-Origin: http://localhost:8000');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Max-Age: 86400');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$dotenv = Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

$token = $_ENV['METEO_CONCEPT_API_KEY'];

$ville = isset($_GET['ville']) ? trim($_GET['ville']) : '';

if (empty($ville)) {
    http_response_code(400);
    echo json_encode(['error' => 'Le paramètre "ville" est requis.']);
    exit();
}

$pdo = new PDO("mysql:host={$_ENV['DB_HOST']};dbname={$_ENV['DB_NAME']}", $_ENV['DB_USER'], $_ENV['DB_PASS'], [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
]);

$url_location = "https://api.meteo-concept.com/api/location/cities?token=$token&search=$ville&world=true";

$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => $url_location,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPAUTH => CURLAUTH_BASIC,
]);

$response = curl_exec($curl);
curl_close($curl);

$insee_code = null;
$data = json_decode($response, true);

if (isset($data['cities']) && count($data['cities']) > 0) {
    $insee_code = $data['cities'][0]['insee'];
    $ville_api = $data['cities'][0]['name'];
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Ville non trouvée.']);
    exit();
}

$stmt = $pdo->prepare("
    SELECT data_forecast, last_updated
    FROM meteo_cache
    WHERE insee = :insee
    LIMIT 1
");
$stmt->execute(['insee' => $insee_code]);
$cache = $stmt->fetch();

$now = new DateTime();
$oneDayAgo = clone $now;
$oneDayAgo->modify('-24 hours');

if ($cache && $cache['last_updated'] > $oneDayAgo->format('Y-m-d H:i:s')) {
    header('Content-Type: application/json');
    echo $cache['data_forecast'];
    exit();
}

$url_forecast = "https://api.meteo-concept.com/api/forecast/daily?token=$token&insee=$insee_code";

$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => $url_forecast,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPAUTH => CURLAUTH_BASIC,
]);

$response = curl_exec($curl);
curl_close($curl);

if ($response === false) {
    http_response_code(503);
    echo json_encode(['error' => 'Erreur lors de la requête API Meteo']);
    exit();
}

$stmt = $pdo->prepare("
    INSERT INTO meteo_cache (ville, insee, data_forecast, last_updated)
    VALUES (:ville, :insee, :data, NOW())
    ON DUPLICATE KEY UPDATE
        data_forecast = VALUES(data_forecast),
        last_updated = NOW()
");
$stmt->execute([
    'ville' => $ville_api,
    'insee' => $insee_code,
    'data' => $response,
]);

header('Content-Type: application/json');
echo $response;
