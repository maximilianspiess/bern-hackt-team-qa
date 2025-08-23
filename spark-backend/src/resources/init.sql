create table "user"
(
    id               uuid default uuid_generate_v4() not null
        constraint "PK_cace4a159ff9f2512dd42373760"
            primary key,
    username         varchar                         not null,
    password         varchar                         not null,
    "sparkAccountId" uuid
        constraint "REL_47fee551e69ab3251fc1cff413"
            unique
        constraint "FK_47fee551e69ab3251fc1cff413b"
            references spark_account
);

alter table "user"
    owner to spark_user;

INSERT INTO public."user" (id, username, password, "sparkAccountId") VALUES ('c8cb9364-f601-4891-b4e8-ecf8bfebc631', 'Etienne', '$2b$10$EzInNJrzNeyVklfLMidwi.30b/e4Yx9sbcTpYEbn5qN/6rNyVVWSu', null);
INSERT INTO public."user" (id, username, password, "sparkAccountId") VALUES ('cb97841f-8b0f-42d0-9d04-91901d272c2a', 'Maximilian', '$2b$10$EQCknWYdHQlATrfcRZjTYuwgFJMCL2w8q4rCsGLFNKZmK6sby7zX6', null);
INSERT INTO public."user" (id, username, password, "sparkAccountId") VALUES ('3b72939e-22a5-4be9-9301-928f4049dacf', 'Paul', '$2b$10$bVJwv2EWNf5pY6EeNBY16OeTP8MUm7zaPvTZuDM8yDoyFSIBO0vX.', null);
INSERT INTO public."user" (id, username, password, "sparkAccountId") VALUES ('98acac72-f1a3-4d9e-beb7-abf9a0a1aaf8', 'Patrick', '$2b$10$BrlEU3fGs3Zh0Gv2RpaIIulOkewzDypy0qz2k.DD8erKGdXKcHTaK', null);
INSERT INTO public."user" (id, username, password, "sparkAccountId") VALUES ('8358b14e-b0cb-4407-81bc-394b962ebeb2', 'Tetyana', '$2b$10$SgHh.ABQ5r6zFCYTlafTtel4NGoLjK/0Uw7hhMf7EWOW2T2OdAPve', null);


create table habit
(
    id       uuid default uuid_generate_v4() not null
        constraint "PK_71654d5d0512043db43bac9abfc"
            primary key,
    title    varchar                         not null,
    icon     varchar                         not null,
    "userId" uuid
        constraint "FK_999000e9ce7a69128f471f0a3f9"
            references "user"
);

alter table habit
    owner to spark_user;

INSERT INTO public.habit (id, title, icon, "userId") VALUES ('bb03db61-9c3e-49e5-9a8a-48b6bd42017a', 'Go outside', 'test.png', 'c8cb9364-f601-4891-b4e8-ecf8bfebc631');
INSERT INTO public.habit (id, title, icon, "userId") VALUES ('4d18a968-ee5c-4f91-afb9-33d659159eaf', 'Jog', 'test.png', 'c8cb9364-f601-4891-b4e8-ecf8bfebc631');
INSERT INTO public.habit (id, title, icon, "userId") VALUES ('aeae4929-d91c-4369-8540-1f831bce88c2', 'Drive bike', 'test.png', 'cb97841f-8b0f-42d0-9d04-91901d272c2a');
INSERT INTO public.habit (id, title, icon, "userId") VALUES ('ffa143a5-5054-4a22-8053-b4b64928fedf', 'Write journal', 'test.png', 'cb97841f-8b0f-42d0-9d04-91901d272c2a');
INSERT INTO public.habit (id, title, icon, "userId") VALUES ('8df356e2-a3dc-487c-ad56-60f372a2a894', 'Do headstand', 'test.png', '3b72939e-22a5-4be9-9301-928f4049dacf');
INSERT INTO public.habit (id, title, icon, "userId") VALUES ('0ae30b62-f50f-4440-a347-1f4f7093e838', 'Yoga', 'test.png', '3b72939e-22a5-4be9-9301-928f4049dacf');
INSERT INTO public.habit (id, title, icon, "userId") VALUES ('4645964c-ed68-473c-8653-9fbce30901d7', 'Gym', 'test.png', '98acac72-f1a3-4d9e-beb7-abf9a0a1aaf8');
INSERT INTO public.habit (id, title, icon, "userId") VALUES ('63d75f2b-6bab-4f96-a5ae-fa3886b5305e', 'Read', 'test.png', '8358b14e-b0cb-4407-81bc-394b962ebeb2');
INSERT INTO public.habit (id, title, icon, "userId") VALUES ('95388f6a-f348-4501-aa62-1c9cd2e31618', 'Hiking', 'test.png', '8358b14e-b0cb-4407-81bc-394b962ebeb2');


create table goal
(
    id               uuid    default uuid_generate_v4() not null
        constraint "PK_88c8e2b461b711336c836b1e130"
            primary key,
    type             goal_type_enum                     not null,
    "rewardedSparks" integer default 0                  not null,
    "startDate"      timestamp,
    "doneDays"       text,
    "missedDays"     text,
    "dueDate"        timestamp,
    "numIterations"  integer,
    "doneIterations" integer,
    "habitId"        uuid
        constraint "FK_9fcdc46270fc6f82bd75f201c07"
            references habit
            on delete cascade
);

alter table goal
    owner to spark_user;

INSERT INTO public.goal (id, type, "rewardedSparks", "startDate", "doneDays", "missedDays", "dueDate", "numIterations", "doneIterations", "habitId") VALUES ('9e9517a1-72c3-488d-8e75-4bb1cb90e5ee', 'iterative', 10, null, null, null, null, 10, 4, 'aeae4929-d91c-4369-8540-1f831bce88c2');
INSERT INTO public.goal (id, type, "rewardedSparks", "startDate", "doneDays", "missedDays", "dueDate", "numIterations", "doneIterations", "habitId") VALUES ('cbc98e10-724d-4989-9f3f-a7c05bb14cf5', 'daily', 2, '2025-08-23 00:00:00.000000', '2025-08-23,2025-08-25,2025-08-26,2025-08-27', '2025-08-24', null, null, null, 'ffa143a5-5054-4a22-8053-b4b64928fedf');
INSERT INTO public.goal (id, type, "rewardedSparks", "startDate", "doneDays", "missedDays", "dueDate", "numIterations", "doneIterations", "habitId") VALUES ('6e6a2404-0aee-4f50-9c69-a7eac39f1114', 'daily', 1, '2025-08-23 00:00:00.000000', '', '2025-08-23,2025-08-24,2025-08-25,2025-08-26,2025-08-27,2025-08-28,2025-08-29', null, null, null, 'bb03db61-9c3e-49e5-9a8a-48b6bd42017a');
INSERT INTO public.goal (id, type, "rewardedSparks", "startDate", "doneDays", "missedDays", "dueDate", "numIterations", "doneIterations", "habitId") VALUES ('b9e8bba5-72e9-4fb9-ac08-c81e5a66d132', 'iterative', 4, null, null, null, null, 5, 0, '0ae30b62-f50f-4440-a347-1f4f7093e838');
INSERT INTO public.goal (id, type, "rewardedSparks", "startDate", "doneDays", "missedDays", "dueDate", "numIterations", "doneIterations", "habitId") VALUES ('4505962f-6c2e-497d-badf-bf97a9d95ff2', 'scheduled', 4, '2025-08-23 00:00:00.000000', '2025-08-23,2025-08-24', '', '2025-08-25 00:00:00.000000', null, null, '0ae30b62-f50f-4440-a347-1f4f7093e838');
INSERT INTO public.goal (id, type, "rewardedSparks", "startDate", "doneDays", "missedDays", "dueDate", "numIterations", "doneIterations", "habitId") VALUES ('95c051db-bd1b-4fe7-840e-97703c2c5172', 'iterative', 10, null, null, null, null, 20, 18, '4645964c-ed68-473c-8653-9fbce30901d7');
INSERT INTO public.goal (id, type, "rewardedSparks", "startDate", "doneDays", "missedDays", "dueDate", "numIterations", "doneIterations", "habitId") VALUES ('fb2edcc2-9bc4-40ab-abd9-4c52736edf79', 'daily', 3, '2025-08-20 00:00:00.000000', '', '', null, null, null, '63d75f2b-6bab-4f96-a5ae-fa3886b5305e');
INSERT INTO public.goal (id, type, "rewardedSparks", "startDate", "doneDays", "missedDays", "dueDate", "numIterations", "doneIterations", "habitId") VALUES ('c407841e-0187-48d1-916d-6e3bfcf3aa50', 'iterative', 10, null, null, null, null, 10, 4, '95388f6a-f348-4501-aa62-1c9cd2e31618');


create table friend_bucket
(
    id           uuid default uuid_generate_v4() not null
        constraint "PK_e88557b26a175f339fb930c9ea4"
            primary key,
    "inviteCode" varchar                         not null
);

alter table friend_bucket
    owner to spark_user;

INSERT INTO public.friend_bucket (id, "inviteCode") VALUES ('902cc936-66d2-4fd2-b160-f77b9820fae1', 'NY8yXY-j3no');


create table friend_bucket_habits
(
    "friendBucketId" uuid not null
        constraint "FK_426cc5bedc364bf8713076e904b"
            references friend_bucket
            on update cascade on delete cascade,
    "habitId"        uuid not null
        constraint "FK_e68293cbbbc9a2979f6b8776dd0"
            references habit
            on update cascade on delete cascade,
    constraint "PK_ee8bcdae523ef4141bac9116031"
        primary key ("friendBucketId", "habitId")
);

alter table friend_bucket_habits
    owner to spark_user;

create index "IDX_426cc5bedc364bf8713076e904"
    on friend_bucket_habits ("friendBucketId");

create index "IDX_e68293cbbbc9a2979f6b8776dd"
    on friend_bucket_habits ("habitId");



create table friend_bucket_users
(
    "friendBucketId" uuid not null
        constraint "FK_3724b6f3a5668901c8bb8f63194"
            references friend_bucket
            on update cascade on delete cascade,
    user_id          uuid not null
        constraint "FK_f2476daf8998bd83c7755582477"
            references "user"
            on update cascade on delete cascade,
    constraint "PK_1eb1bbf3329b92c8306cdb10916"
        primary key ("friendBucketId", user_id)
);

alter table friend_bucket_users
    owner to spark_user;

create index "IDX_3724b6f3a5668901c8bb8f6319"
    on friend_bucket_users ("friendBucketId");

create index "IDX_f2476daf8998bd83c775558247"
    on friend_bucket_users (user_id);

INSERT INTO public.friend_bucket_users ("friendBucketId", user_id) VALUES ('902cc936-66d2-4fd2-b160-f77b9820fae1', '8358b14e-b0cb-4407-81bc-394b962ebeb2');
INSERT INTO public.friend_bucket_users ("friendBucketId", user_id) VALUES ('902cc936-66d2-4fd2-b160-f77b9820fae1', '98acac72-f1a3-4d9e-beb7-abf9a0a1aaf8');
INSERT INTO public.friend_bucket_users ("friendBucketId", user_id) VALUES ('902cc936-66d2-4fd2-b160-f77b9820fae1', 'cb97841f-8b0f-42d0-9d04-91901d272c2a');


create table habit_bucket
(
    id uuid default uuid_generate_v4() not null
        constraint "PK_bb9fe73e4897150935a83af6ac6"
            primary key
);

alter table habit_bucket
    owner to spark_user;



create table habit_bucket_habits
(
    "habitBucketId" uuid not null
        constraint "FK_ce4f6f3b7ca6d13b7e918dc7c8c"
            references habit_bucket
            on update cascade on delete cascade,
    "habitId"       uuid not null
        constraint "FK_0ebba64f521c10a83461201f5b1"
            references habit
            on update cascade on delete cascade,
    constraint "PK_728261de7a5ea22bd683a4d218c"
        primary key ("habitBucketId", "habitId")
);

alter table habit_bucket_habits
    owner to spark_user;

create index "IDX_ce4f6f3b7ca6d13b7e918dc7c8"
    on habit_bucket_habits ("habitBucketId");

create index "IDX_0ebba64f521c10a83461201f5b"
    on habit_bucket_habits ("habitId");



create table habit_bucket_users
(
    "habitBucketId" uuid not null
        constraint "FK_67bc48d09f204e692f866b7760f"
            references habit_bucket
            on update cascade on delete cascade,
    "userId"        uuid not null
        constraint "FK_b913e3102c126a7dec89d3638da"
            references "user"
            on update cascade on delete cascade,
    constraint "PK_b7b4b4eb3cad997f08911bb3ba3"
        primary key ("habitBucketId", "userId")
);

alter table habit_bucket_users
    owner to spark_user;

create index "IDX_67bc48d09f204e692f866b7760"
    on habit_bucket_users ("habitBucketId");

create index "IDX_b913e3102c126a7dec89d3638d"
    on habit_bucket_users ("userId");



create table spark_account
(
    id     uuid default uuid_generate_v4() not null
        constraint "PK_e0d7f0dc1c130dcade4778b21bc"
            primary key,
    amount integer                         not null
);

alter table spark_account
    owner to spark_user;

