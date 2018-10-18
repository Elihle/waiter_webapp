drop table if exists waiter, weekdays, shift;
create table waiter (
id serial not null primary key,
waiter_name text not null
);

create table weekdays (
id serial not null primary key,
week_days text not null
);

create table shift (
waiter_id int not null,
weekday_id int not null,
foreign key (waiter_id) references waiter (id),
foreign key (weekday_id) references weekdays (id)
);

insert into waiter (waiter_name) VALUES ('Lihle');
insert into weekdays (week_days) VALUES ('Monday');