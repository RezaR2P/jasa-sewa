USE camping_rental;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price_per_day DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  rent_start DATE NOT NULL,
  rent_end DATE NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status ENUM('pending','active','returned','cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  item_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  price_per_day DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (item_id) REFERENCES items(id)
);

INSERT INTO items (name, description, price_per_day, stock) VALUES
('Tenda Dome 4 Orang', 'Tenda dome kapasitas 4 orang, waterproof', 75000, 5),
('Sleeping Bag', 'Sleeping bag bahan fleece, hangat hingga 5 derajat', 25000, 10),
('Kompor Portable', 'Kompor gas portable 1 tungku', 20000, 8),
('Carrier 60L', 'Tas carrier 60 liter dengan frame aluminium', 40000, 6),
('Matras Gulung', 'Matras foam gulung, tebal 2cm', 15000, 12);

SELECT * FROM items;