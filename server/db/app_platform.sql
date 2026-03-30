-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 30, 2026 at 07:10 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `app_platform`
--

-- --------------------------------------------------------

--
-- Table structure for table `applications`
--

CREATE TABLE `applications` (
  `id` int(11) NOT NULL,
  `job_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `status` enum('applied','accepted','rejected') DEFAULT 'applied',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `phone` varchar(50) DEFAULT NULL,
  `cover_letter` text DEFAULT NULL,
  `resume_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications` (`id`, `job_id`, `user_id`, `status`, `created_at`, `phone`, `cover_letter`, `resume_url`) VALUES
(2, 2, 1, '', '2026-03-14 04:20:50', '123456789', 'test', '1773462050513-Resume.pdf'),
(3, 3, 4, '', '2026-03-28 11:23:31', '', '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `listing_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`id`, `user_id`, `listing_id`, `created_at`) VALUES
(1, 5, 2, '2026-03-27 08:17:13');

-- --------------------------------------------------------

--
-- Table structure for table `inquiries`
--

CREATE TABLE `inquiries` (
  `id` int(11) NOT NULL,
  `listing_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `status` enum('new','replied','closed') DEFAULT 'new',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inquiries`
--

INSERT INTO `inquiries` (`id`, `listing_id`, `sender_id`, `receiver_id`, `message`, `phone`, `status`, `created_at`, `updated_at`) VALUES
(1, 2, 5, 8, 'I want to rent', '08080808', 'new', '2026-03-27 08:16:53', '2026-03-27 08:16:53'),
(2, 2, 5, 8, 'xcvxccxv', '123123', 'new', '2026-03-28 11:12:11', '2026-03-28 11:12:11');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `job_type` enum('permanent','casual','parttime','one_off') NOT NULL DEFAULT 'casual',
  `description` text DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `pay_rate` decimal(10,2) DEFAULT NULL,
  `job_date` date DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `title`, `job_type`, `description`, `location`, `pay_rate`, `job_date`, `created_by`, `created_at`) VALUES
(2, 'babysitter', 'casual', 'take care of baby', 'city', 30.00, '2026-04-01', 2, '2026-03-14 04:19:42'),
(3, 'singer', 'casual', 'singing', 'cbd', 30.00, '2026-04-14', 2, '2026-03-14 04:53:52'),
(5, 'accountant', 'casual', 'level 2', 'darwin', 40.00, '2026-03-31', 2, '2026-03-28 11:26:14');

-- --------------------------------------------------------

--
-- Table structure for table `listings`
--

CREATE TABLE `listings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `listing_type` enum('rent_out','sell_out','rent_wanted','buy_wanted') NOT NULL,
  `property_type` enum('apartment','house','room','studio','townhouse','land','other') DEFAULT 'apartment',
  `price` decimal(12,2) DEFAULT NULL,
  `suburb` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `postcode` varchar(20) DEFAULT NULL,
  `address_line` varchar(255) DEFAULT NULL,
  `bedrooms` int(11) DEFAULT NULL,
  `bathrooms` int(11) DEFAULT NULL,
  `car_spaces` int(11) DEFAULT NULL,
  `area_size` decimal(10,2) DEFAULT NULL,
  `contact_name` varchar(100) DEFAULT NULL,
  `contact_phone` varchar(30) DEFAULT NULL,
  `status` enum('active','pending','rented','sold','closed') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `listings`
--

INSERT INTO `listings` (`id`, `user_id`, `title`, `description`, `listing_type`, `property_type`, `price`, `suburb`, `city`, `state`, `postcode`, `address_line`, `bedrooms`, `bathrooms`, `car_spaces`, `area_size`, `contact_name`, `contact_phone`, `status`, `created_at`, `updated_at`) VALUES
(1, 5, 'need 2 b 2 b in Darwin', 'from Apr.1 to Apr.10', 'rent_wanted', 'apartment', 500.00, 'Darwin', 'Darwin', 'NT', '0800', NULL, 2, 2, 1, 100.00, 'tom', '08080808', 'active', '2026-03-27 07:39:38', '2026-03-27 07:39:38'),
(2, 8, '2b3b', 'Available from Apr.1', 'rent_out', 'house', 600.00, 'Darwin', 'Darwin', 'NT', '0800', NULL, 2, 3, 2, NULL, 'POtest', '09090909', 'active', '2026-03-27 08:15:45', '2026-03-27 08:15:45');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('worker','employer','customer','property_owner') NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `nin_number` varchar(50) DEFAULT NULL,
  `bank_account_number` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `role`, `phone`, `nin_number`, `bank_account_number`, `created_at`) VALUES
(1, 'test', 'test@test.com', '$2b$10$DetYPgTVH0LY/.9jEYXqG.fnsJFtNKiD6Ra9umXX.57cyoXQPQ96K', 'worker', NULL, NULL, NULL, '2026-03-12 10:09:26'),
(2, 'test_emp', 'testemp@test.com', '$2b$10$9.VF5wD9beDVYhRZYgQcBub.I6Bb1ZVAAt1wzNbL4HZc2c8Qyih7u', 'employer', NULL, NULL, NULL, '2026-03-12 10:17:06'),
(3, 'testemp2', 'testemp2@test.com', '$2b$10$2CQYuN56ngpj8WOJdFsOrOE0MR6rJGeVZzPsQxBCJSkVNR0FZqZ9q', 'employer', NULL, NULL, NULL, '2026-03-14 05:44:49'),
(4, 'test2', 'test2@test.com', '$2b$10$8vcDOyoaHI1IUJkw9rr7XOhFP2F8QZQRyMpAauROkf4WM7TPZZhDO', 'worker', NULL, NULL, NULL, '2026-03-14 06:10:01'),
(5, 'tom', '123@123.com', '$2b$10$EpIDJ5Akgs8wC9/PFtIk0uhD/KSTxH7NiFNIBp3wGIin891GpotKK', 'customer', NULL, NULL, NULL, '2026-03-27 07:36:31'),
(8, 'POtest', 'po_test@test.com', '$2b$10$GPL/1LIdZzE04cIPHvhjLePDIv9j9AZeYAFBifsDpUanJmQII6mjm', 'property_owner', NULL, NULL, NULL, '2026-03-27 08:09:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `job_id` (`job_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_user_listing` (`user_id`,`listing_id`),
  ADD KEY `listing_id` (`listing_id`);

--
-- Indexes for table `inquiries`
--
ALTER TABLE `inquiries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `listing_id` (`listing_id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `listings`
--
ALTER TABLE `listings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applications`
--
ALTER TABLE `applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `inquiries`
--
ALTER TABLE `inquiries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `listings`
--
ALTER TABLE `listings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `applications`
--
ALTER TABLE `applications`
  ADD CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`),
  ADD CONSTRAINT `applications_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`listing_id`) REFERENCES `listings` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `inquiries`
--
ALTER TABLE `inquiries`
  ADD CONSTRAINT `inquiries_ibfk_1` FOREIGN KEY (`listing_id`) REFERENCES `listings` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `inquiries_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `inquiries_ibfk_3` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `jobs`
--
ALTER TABLE `jobs`
  ADD CONSTRAINT `jobs_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `listings`
--
ALTER TABLE `listings`
  ADD CONSTRAINT `listings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
