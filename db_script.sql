CREATE TABLE meteo_cache (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ville VARCHAR(100) NOT NULL,
    insee VARCHAR(20) NOT NULL,
    data_forecast LONGTEXT NOT NULL,
    last_updated DATETIME NOT NULL,
    UNIQUE(insee) 
);
