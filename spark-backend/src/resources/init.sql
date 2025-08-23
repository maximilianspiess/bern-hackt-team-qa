INSERT INTO spark_account (id, amount) VALUES ('71a85b37-0cf0-44f5-bea0-334c4d44e6c7', 0);
INSERT INTO spark_account (id, amount) VALUES ('eca42309-135e-4359-b4bc-998f2993b90b', 0);
INSERT INTO spark_account (id, amount) VALUES ('bcd93ab0-8075-11f0-8ec8-325096b39f47', 0);
INSERT INTO spark_account (id, amount) VALUES ('c21bc830-8075-11f0-930b-325096b39f47', 0);
INSERT INTO spark_account (id, amount) VALUES ('c61c620a-8075-11f0-ac1e-325096b39f47', 0);

INSERT INTO public."user" (id, username, password, "sparkAccountId") VALUES ('c8cb9364-f601-4891-b4e8-ecf8bfebc631', 'Etienne', '$2b$10$EzInNJrzNeyVklfLMidwi.30b/e4Yx9sbcTpYEbn5qN/6rNyVVWSu', '71a85b37-0cf0-44f5-bea0-334c4d44e6c7');
INSERT INTO public."user" (id, username, password, "sparkAccountId") VALUES ('cb97841f-8b0f-42d0-9d04-91901d272c2a', 'Maximilian', '$2b$10$EQCknWYdHQlATrfcRZjTYuwgFJMCL2w8q4rCsGLFNKZmK6sby7zX6', 'eca42309-135e-4359-b4bc-998f2993b90b');
INSERT INTO public."user" (id, username, password, "sparkAccountId") VALUES ('3b72939e-22a5-4be9-9301-928f4049dacf', 'Paul', '$2b$10$bVJwv2EWNf5pY6EeNBY16OeTP8MUm7zaPvTZuDM8yDoyFSIBO0vX.', 'bcd93ab0-8075-11f0-8ec8-325096b39f47');
INSERT INTO public."user" (id, username, password, "sparkAccountId") VALUES ('98acac72-f1a3-4d9e-beb7-abf9a0a1aaf8', 'Patrick', '$2b$10$BrlEU3fGs3Zh0Gv2RpaIIulOkewzDypy0qz2k.DD8erKGdXKcHTaK', 'c21bc830-8075-11f0-930b-325096b39f47');
INSERT INTO public."user" (id, username, password, "sparkAccountId") VALUES ('8358b14e-b0cb-4407-81bc-394b962ebeb2', 'Tetyana', '$2b$10$SgHh.ABQ5r6zFCYTlafTtel4NGoLjK/0Uw7hhMf7EWOW2T2OdAPve', 'c61c620a-8075-11f0-ac1e-325096b39f47');

INSERT INTO public.habit (id, title, icon, "userId") VALUES ('bb03db61-9c3e-49e5-9a8a-48b6bd42017a', 'Go outside', 'test.png', 'c8cb9364-f601-4891-b4e8-ecf8bfebc631');
INSERT INTO public.habit (id, title, icon, "userId") VALUES ('4d18a968-ee5c-4f91-afb9-33d659159eaf', 'Jog', 'test.png', 'c8cb9364-f601-4891-b4e8-ecf8bfebc631');
INSERT INTO public.habit (id, title, icon, "userId") VALUES ('aeae4929-d91c-4369-8540-1f831bce88c2', 'Drive bike', 'test.png', 'cb97841f-8b0f-42d0-9d04-91901d272c2a');
INSERT INTO public.habit (id, title, icon, "userId") VALUES ('ffa143a5-5054-4a22-8053-b4b64928fedf', 'Write journal', 'test.png', 'cb97841f-8b0f-42d0-9d04-91901d272c2a');
INSERT INTO public.habit (id, title, icon, "userId") VALUES ('8df356e2-a3dc-487c-ad56-60f372a2a894', 'Do headstand', 'test.png', '3b72939e-22a5-4be9-9301-928f4049dacf');
INSERT INTO public.habit (id, title, icon, "userId") VALUES ('0ae30b62-f50f-4440-a347-1f4f7093e838', 'Yoga', 'test.png', '3b72939e-22a5-4be9-9301-928f4049dacf');
INSERT INTO public.habit (id, title, icon, "userId") VALUES ('4645964c-ed68-473c-8653-9fbce30901d7', 'Gym', 'test.png', '98acac72-f1a3-4d9e-beb7-abf9a0a1aaf8');
INSERT INTO public.habit (id, title, icon, "userId") VALUES ('63d75f2b-6bab-4f96-a5ae-fa3886b5305e', 'Read', 'test.png', '8358b14e-b0cb-4407-81bc-394b962ebeb2');
INSERT INTO public.habit (id, title, icon, "userId") VALUES ('95388f6a-f348-4501-aa62-1c9cd2e31618', 'Hiking', 'test.png', '8358b14e-b0cb-4407-81bc-394b962ebeb2');

INSERT INTO public.goal (id, type, "rewardedSparks", "startDate", "doneDays", "missedDays", "dueDate", "numIterations", "doneIterations", "habitId") VALUES ('9e9517a1-72c3-488d-8e75-4bb1cb90e5ee', 'iterative', 10, null, null, null, null, 10, 4, 'aeae4929-d91c-4369-8540-1f831bce88c2');
INSERT INTO public.goal (id, type, "rewardedSparks", "startDate", "doneDays", "missedDays", "dueDate", "numIterations", "doneIterations", "habitId") VALUES ('cbc98e10-724d-4989-9f3f-a7c05bb14cf5', 'daily', 2, '2025-08-23 00:00:00.000000', '2025-08-23,2025-08-25,2025-08-26,2025-08-27', '2025-08-24', null, null, null, 'ffa143a5-5054-4a22-8053-b4b64928fedf');
INSERT INTO public.goal (id, type, "rewardedSparks", "startDate", "doneDays", "missedDays", "dueDate", "numIterations", "doneIterations", "habitId") VALUES ('6e6a2404-0aee-4f50-9c69-a7eac39f1114', 'daily', 1, '2025-08-23 00:00:00.000000', '', '2025-08-23,2025-08-24,2025-08-25,2025-08-26,2025-08-27,2025-08-28,2025-08-29', null, null, null, 'bb03db61-9c3e-49e5-9a8a-48b6bd42017a');
INSERT INTO public.goal (id, type, "rewardedSparks", "startDate", "doneDays", "missedDays", "dueDate", "numIterations", "doneIterations", "habitId") VALUES ('b9e8bba5-72e9-4fb9-ac08-c81e5a66d132', 'iterative', 4, null, null, null, null, 5, 0, '0ae30b62-f50f-4440-a347-1f4f7093e838');
INSERT INTO public.goal (id, type, "rewardedSparks", "startDate", "doneDays", "missedDays", "dueDate", "numIterations", "doneIterations", "habitId") VALUES ('4505962f-6c2e-497d-badf-bf97a9d95ff2', 'scheduled', 4, '2025-08-23 00:00:00.000000', '2025-08-23,2025-08-24', '', '2025-08-25 00:00:00.000000', null, null, '0ae30b62-f50f-4440-a347-1f4f7093e838');
INSERT INTO public.goal (id, type, "rewardedSparks", "startDate", "doneDays", "missedDays", "dueDate", "numIterations", "doneIterations", "habitId") VALUES ('95c051db-bd1b-4fe7-840e-97703c2c5172', 'iterative', 10, null, null, null, null, 20, 18, '4645964c-ed68-473c-8653-9fbce30901d7');
INSERT INTO public.goal (id, type, "rewardedSparks", "startDate", "doneDays", "missedDays", "dueDate", "numIterations", "doneIterations", "habitId") VALUES ('fb2edcc2-9bc4-40ab-abd9-4c52736edf79', 'daily', 3, '2025-08-20 00:00:00.000000', '', '', null, null, null, '63d75f2b-6bab-4f96-a5ae-fa3886b5305e');
INSERT INTO public.goal (id, type, "rewardedSparks", "startDate", "doneDays", "missedDays", "dueDate", "numIterations", "doneIterations", "habitId") VALUES ('c407841e-0187-48d1-916d-6e3bfcf3aa50', 'iterative', 10, null, null, null, null, 10, 4, '95388f6a-f348-4501-aa62-1c9cd2e31618');

INSERT INTO public.friend_bucket (id, "inviteCode") VALUES ('902cc936-66d2-4fd2-b160-f77b9820fae1', 'NY8yXY-j3no');

INSERT INTO public.friend_bucket_users ("friendBucketId", user_id) VALUES ('902cc936-66d2-4fd2-b160-f77b9820fae1', '8358b14e-b0cb-4407-81bc-394b962ebeb2');
INSERT INTO public.friend_bucket_users ("friendBucketId", user_id) VALUES ('902cc936-66d2-4fd2-b160-f77b9820fae1', '98acac72-f1a3-4d9e-beb7-abf9a0a1aaf8');
INSERT INTO public.friend_bucket_users ("friendBucketId", user_id) VALUES ('902cc936-66d2-4fd2-b160-f77b9820fae1', 'cb97841f-8b0f-42d0-9d04-91901d272c2a');

INSERT INTO company (id, name, image) VALUES ('7ac854cf-9ac1-45a3-89e9-f7eb9da9dac3', 'Nike', 'images/company_icons/nike_logo.svg.png');
INSERT INTO company (id, name, image) VALUES ('de22555f-2545-43e3-bb35-6b39a8fa47f0', 'Lululemon', 'images/company_icons/lululemon_logo.svg.png');
INSERT INTO company (id, name, image) VALUES ('7a8f7a08-8074-11f0-b0e9-325096b39f47', 'HelloFresh', 'images/company_icons/hellofresh_logo.wine.png');
INSERT INTO company (id, name, image) VALUES ('80234115-abf7-47a5-8a24-cfc15b52b7c8', 'Headspace', 'images/company_icons/headspace_logo.png');
INSERT INTO company (id, name, image) VALUES ('8f2bef0a-8074-11f0-afe6-325096b39f47', 'Adidas', 'images/company_icons/adidas_logo.png');
INSERT INTO company (id, name, image) VALUES ('9fe27564-760d-4414-a4fd-97fb86211f95', 'Spotify', 'images/company_icons/spotify_logo.svg.png');
INSERT INTO company (id, name, image) VALUES ('9ec6af68-8074-11f0-b865-325096b39f47', 'Fitbit', 'images/company_icons/fitbit_logo.png');
INSERT INTO company (id, name, image) VALUES ('828e21ac-0091-45f6-a1de-16eae8cac0f0', 'Calm', 'images/company_icons/calm_logo.svg.png');
INSERT INTO company (id, name, image) VALUES ('af976332-8074-11f0-9861-325096b39f47', 'MyProtein', 'images/company_icons/myprotein_logo.png');
INSERT INTO company (id, name, image) VALUES ('b9c08e9c-8074-11f0-8922-325096b39f47', 'Hydro Flask', 'images/company_icons/hydro_flask_logo.png');
INSERT INTO company (id, name, image) VALUES ('85929676-5aff-4396-be59-bab4d9166e85', 'Therabody', 'images/company_icons/therabody_logo.avif');
INSERT INTO company (id, name, image) VALUES ('c260dba6-8074-11f0-8d5a-325096b39f47', 'Moleskine', 'images/company_icons/moleskine_logo.png');

INSERT INTO benefit (id, discount, text, image, "expirationDate", "sparkPrice", company_id) VALUES (DEFAULT, 15, 'Off Running Shoes', 'images/benefits_icons/nike-running-shoes.avif', '2025-09-30', '350', '7ac854cf-9ac1-45a3-89e9-f7eb9da9dac3');
INSERT INTO benefit (id, discount, text, image, "expirationDate", "sparkPrice", company_id) VALUES (DEFAULT, 20, 'Off Purchases Over 50£', 'images/benefits_icons/lululemon_Feature.jpg', '2025-10-15', '500', 'de22555f-2545-43e3-bb35-6b39a8fa47f0');
INSERT INTO benefit (id, discount, text, image, "expirationDate", "sparkPrice", company_id) VALUES (DEFAULT, 40, 'Off the First 3 Boxes', 'images/benefits_icons/hello_fresh.webp', '2025-09-30', '350', '7a8f7a08-8074-11f0-b0e9-325096b39f47');
INSERT INTO benefit (id, discount, text, image, "expirationDate", "sparkPrice", company_id) VALUES (DEFAULT, 50, 'Off 3 Months Premium', 'images/benefits_icons/photo-1526724038726-3007ffb8025f.avif', '2025-09-15', '250', '80234115-abf7-47a5-8a24-cfc15b52b7c8');
INSERT INTO benefit (id, discount, text, image, "expirationDate", "sparkPrice", company_id) VALUES (DEFAULT, 15, 'Off Purchases Over 50£', 'images/benefits_icons/premium_photo-1747861981436-a86fcf4c9901.avif', '2025-11-15', '250', '8f2bef0a-8074-11f0-afe6-325096b39f47');
INSERT INTO benefit (id, discount, text, image, "expirationDate", "sparkPrice", company_id) VALUES (DEFAULT, 100, '6 Months Free, Then Regular Pricing', 'images/benefits_icons/photo-1720960204779-34a8a155cc0a.avif', '2025-12-31', '1000', '9fe27564-760d-4414-a4fd-97fb86211f95');
INSERT INTO benefit (id, discount, text, image, "expirationDate", "sparkPrice", company_id) VALUES (DEFAULT, 20, 'Off Charge 6 or Inspire 3', 'images/benefits_icons/watch_thing.avif', '2025-09-30', '350', '9ec6af68-8074-11f0-b865-325096b39f47');
INSERT INTO benefit (id, discount, text, image, "expirationDate", "sparkPrice", company_id) VALUES (DEFAULT, 50, 'Off 1-Year-Subscription', 'images/benefits_icons/ferns_probably.avif', '2025-11-30', '500', '828e21ac-0091-45f6-a1de-16eae8cac0f0');
INSERT INTO benefit (id, discount, text, image, "expirationDate", "sparkPrice", company_id) VALUES (DEFAULT, 30, 'Off Whey Protein & Supplements', 'images/benefits_icons/impact.avif', '2025-10-15', '500', 'af976332-8074-11f0-9861-325096b39f47');
INSERT INTO benefit (id, discount, text, image, "expirationDate", "sparkPrice", company_id) VALUES (DEFAULT, 100, '500ml Water Bottle', 'images/benefits_icons/bo_oh_o_wo_ah.avif', '2025-12-31', '4500', 'b9c08e9c-8074-11f0-8922-325096b39f47');
INSERT INTO benefit (id, discount, text, image, "expirationDate", "sparkPrice", company_id) VALUES (DEFAULT, 100, 'Mini Massage Ball', 'images/benefits_icons/vibrator.webp', '2025-11-30', '8000', '85929676-5aff-4396-be59-bab4d9166e85');
INSERT INTO benefit (id, discount, text, image, "expirationDate", "sparkPrice", company_id) VALUES (DEFAULT, 100, 'Wellness or Habit Journal', 'images/benefits_icons/books.webp', '2025-11-30', '3500', 'c260dba6-8074-11f0-8d5a-325096b39f47');
INSERT INTO benefit (id, discount, text, image, "expirationDate", "sparkPrice", company_id) VALUES (DEFAULT, 100, 'Free Headband', 'images/benefits_icons/horsetail.webp', '2025-12-31', '2250', 'de22555f-2545-43e3-bb35-6b39a8fa47f0');
INSERT INTO benefit (id, discount, text, image, "expirationDate", "sparkPrice", company_id) VALUES (DEFAULT, 100, 'Running Socks 3-Pack', 'images/benefits_icons/uggo_shoes.avif', '2025-12-31', '2500', '7ac854cf-9ac1-45a3-89e9-f7eb9da9dac3');
