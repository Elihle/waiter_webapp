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

INSERT into weekdays (week_days) VALUES ('Monday');
INSERT into weekdays (week_days) VALUES ('Tuesday');
INSERT into weekdays (week_days) VALUES ('Wednesday');
INSERT into weekdays (week_days) VALUES ('Thursday');
INSERT into weekdays (week_days) VALUES ('Friday');
INSERT into weekdays (week_days) VALUES ('Saturday');
INSERT into weekdays (week_days) VALUES ('Sunday');