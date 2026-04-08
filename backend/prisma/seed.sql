-- Random generated seed data for development
-- Run with: psql $DATABASE_URL -f prisma/seed.sql

TRUNCATE "Expense" RESTART IDENTITY CASCADE;

INSERT INTO "Expense" ("id", "title", "category", "amount", "date", "description", "createdAt", "updatedAt") VALUES

-- January 2026
('seed_01', 'Woolworths grocery run',       'Food & Drink',   134.50, '2026-01-03 09:15:00', 'Weekly shop - stocked up on fruit, veg, pasta, chicken, and snacks for the week. Also grabbed cleaning supplies and some frozen meals for late nights.',                  NOW(), NOW()),
('seed_02', 'Opal card top-up',             'Transport',       50.00, '2026-01-06 08:30:00', NULL,                           NOW(), NOW()),
('seed_03', 'Netflix',                      'Entertainment',   18.99, '2026-01-07 00:00:00', 'Monthly subscription',         NOW(), NOW()),
('seed_04', 'Chemist Warehouse',            'Health',          42.30, '2026-01-09 11:20:00', 'Vitamins and cold medicine',   NOW(), NOW()),
('seed_05', 'Rent',                         'Housing',       1800.00, '2026-01-10 09:00:00', 'January rent',                 NOW(), NOW()),
('seed_06', 'Coffee + bagel',               'Food & Drink',    14.50, '2026-01-13 08:45:00', NULL,                           NOW(), NOW()),
('seed_07', 'Electricity bill',             'Housing',        110.40, '2026-01-14 10:00:00', 'AGL quarterly',                NOW(), NOW()),
('seed_08', 'Uber to airport',              'Transport',       38.00, '2026-01-17 05:30:00', NULL,                           NOW(), NOW()),
('seed_09', 'ASOS order',                   'Shopping',        89.95, '2026-01-18 19:00:00', 'Two linen shirts and a pair of chino shorts. Used the 20% off sale - original total was around $112. Delivery took 5 days, everything fit well.',        NOW(), NOW()),
('seed_10', 'Dinner at Chin Chin',          'Food & Drink',    95.00, '2026-01-22 20:00:00', 'Sarah''s birthday dinner - group of 4, split the bill. Had the larb, green curry, and pad see ew. Two rounds of drinks included. Would have been more but we skipped dessert.',              NOW(), NOW()),
('seed_11', 'Spotify',                      'Entertainment',   12.99, '2026-01-24 00:00:00', NULL,                           NOW(), NOW()),
('seed_12', 'Textbook',                     'Education',       65.00, '2026-01-27 14:00:00', 'COMP3900 prescribed text',     NOW(), NOW()),
('seed_13', 'Coles mid-week top-up',        'Food & Drink',    47.20, '2026-01-29 17:30:00', NULL,                           NOW(), NOW()),

-- February 2026
('seed_14', 'Rent',                         'Housing',       1800.00, '2026-02-10 09:00:00', 'February rent',                NOW(), NOW()),
('seed_15', 'Weekly groceries',             'Food & Drink',   121.80, '2026-02-02 10:00:00', NULL,                           NOW(), NOW()),
('seed_16', 'Bus + train weekly',           'Transport',       25.00, '2026-02-03 08:00:00', NULL,                           NOW(), NOW()),
('seed_17', 'Gym membership',               'Health',          59.00, '2026-02-05 00:00:00', 'Monthly - Fitness First',      NOW(), NOW()),
('seed_18', 'Netflix',                      'Entertainment',   18.99, '2026-02-07 00:00:00', 'Monthly subscription',         NOW(), NOW()),
('seed_19', 'Lunch with team',              'Food & Drink',    32.50, '2026-02-11 13:00:00', 'Thai place near office',       NOW(), NOW()),
('seed_20', 'Haircut',                      'Shopping',        45.00, '2026-02-13 11:00:00', NULL,                           NOW(), NOW()),
('seed_21', 'GP visit',                     'Health',          89.00, '2026-02-17 09:30:00', 'Routine checkup plus referral to a specialist. Bulk billed for the consult itself but paid out of pocket for the prescription - antibiotics for a sinus infection that had been dragging on for two weeks.',   NOW(), NOW()),
('seed_22', 'Internet bill',               'Housing',         79.00, '2026-02-18 10:00:00', 'Aussie Broadband monthly',     NOW(), NOW()),
('seed_23', 'Spotify',                      'Entertainment',   12.99, '2026-02-24 00:00:00', NULL,                           NOW(), NOW()),
('seed_24', 'Udemy course',                 'Education',       24.99, '2026-02-25 20:00:00', 'Vue 3 advanced patterns',      NOW(), NOW()),
('seed_25', 'Farmers market',               'Food & Drink',    38.00, '2026-02-28 09:00:00', 'Fruit, veg, sourdough',        NOW(), NOW()),

-- March 2026
('seed_26', 'Rent',                         'Housing',       1800.00, '2026-03-10 09:00:00', 'March rent',                   NOW(), NOW()),
('seed_27', 'Woolworths',                   'Food & Drink',   156.30, '2026-03-03 18:30:00', NULL,                           NOW(), NOW()),
('seed_28', 'Opal card top-up',             'Transport',       50.00, '2026-03-04 08:15:00', NULL,                           NOW(), NOW()),
('seed_29', 'Netflix',                      'Entertainment',   18.99, '2026-03-07 00:00:00', 'Monthly subscription',         NOW(), NOW()),
('seed_30', 'Gym membership',               'Health',          59.00, '2026-03-05 00:00:00', 'Monthly - Fitness First',      NOW(), NOW()),
('seed_31', 'New sneakers',                 'Shopping',       179.99, '2026-03-08 14:00:00', 'Nike Air Max 97 in white/silver from JD Sports at Westfield. Had been eyeing these for months - finally caved when they dropped to $180 from $230. Replacing my old pair that had worn through the sole.',     NOW(), NOW()),
('seed_32', 'Coffee subscription',          'Food & Drink',    42.00, '2026-03-10 07:00:00', 'Single O monthly bag',         NOW(), NOW()),
('seed_33', 'Uber Eats',                    'Food & Drink',    28.90, '2026-03-14 19:30:00', 'Late night - Guzman y Gomez',  NOW(), NOW()),
('seed_34', 'Water bill',                   'Housing',         88.50, '2026-03-17 10:00:00', NULL,                           NOW(), NOW()),
('seed_35', 'Cinema tickets x2',            'Entertainment',   38.00, '2026-03-21 19:00:00', 'Dune 3 opening night',         NOW(), NOW()),
('seed_36', 'Spotify',                      'Entertainment',   12.99, '2026-03-24 00:00:00', NULL,                           NOW(), NOW()),
('seed_37', 'Pharmacy',                     'Health',          22.50, '2026-03-26 12:00:00', NULL,                           NOW(), NOW()),
('seed_38', 'AWS course voucher',           'Education',       49.00, '2026-03-28 10:00:00', 'Exam voucher for AWS Solutions Architect Associate. Booked the exam for late April - been studying with the Stephane Maarek course on Udemy for the past 6 weeks. Feeling about 70% ready.',     NOW(), NOW()),

-- April 2026 (current month)
('seed_39', 'Rent',                         'Housing',       1800.00, '2026-04-01 09:00:00', 'April rent',                   NOW(), NOW()),
('seed_40', 'Woolworths',                   'Food & Drink',   112.40, '2026-04-01 17:00:00', NULL,                           NOW(), NOW()),
('seed_41', 'Opal card top-up',             'Transport',       30.00, '2026-04-02 08:00:00', NULL,                           NOW(), NOW()),
('seed_42', 'Gym membership',               'Health',          59.00, '2026-04-05 00:00:00', 'Monthly - Fitness First',      NOW(), NOW()),
('seed_43', 'Netflix',                      'Entertainment',   18.99, '2026-04-07 00:00:00', 'Monthly subscription',         NOW(), NOW()),
('seed_44', 'Coffee + pastry',              'Food & Drink',    11.50, '2026-04-08 08:30:00', NULL,                           NOW(), NOW()),
('seed_45', 'Lunch',                        'Food & Drink',    18.00, '2026-04-09 12:30:00', 'Banh mi + drink',              NOW(), NOW());
