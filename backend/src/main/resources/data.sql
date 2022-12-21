insert into chart(chart_id,chart_title,chart_type) values (1,'My fabulous line chart.','line');

insert into chart_chart_labels values (1,'January');
insert into chart_chart_labels values (1,'February');
insert into chart_chart_labels values (1,'March');
insert into chart_chart_labels values (1,'April');
insert into chart_chart_labels values (1,'May');

insert into chart_dataset(id,background_Color,label,border_Color) values (1,'rgb(255, 99, 132)','My First dataset','rgb(255, 99, 132)');

insert into chart_chart_datasets values (1,1);

insert into chart_dataset_dataset_values values (1,10);
insert into chart_dataset_dataset_values values (1,5);
insert into chart_dataset_dataset_values values (1,2);
insert into chart_dataset_dataset_values values (1,20);
insert into chart_dataset_dataset_values values (1,30);
insert into chart_dataset_dataset_values values (1,45);

insert into chart_dataset(id,background_Color,label,border_Color) values (2,'rgb(255,150, 132)','My Second dataset','rgb(255, 134, 132)');

insert into chart_chart_datasets values (1,2);

insert into chart_dataset_dataset_values values (2,1440);
insert into chart_dataset_dataset_values values (2,523);
insert into chart_dataset_dataset_values values (2,223);
insert into chart_dataset_dataset_values values (2,204);
insert into chart_dataset_dataset_values values (2,303);
insert into chart_dataset_dataset_values values (2,4335);

insert into chart(chart_id,chart_title,chart_type) values (2,'My fabulous pie chart.','pie');

insert into chart_chart_labels values (2,'January');
insert into chart_chart_labels values (2,'February');
insert into chart_chart_labels values (2,'March');
insert into chart_chart_labels values (2,'April');
insert into chart_chart_labels values (2,'May');

insert into chart_dataset(id,background_Color,label,border_Color) values (3,'rgb(255,150, 132)','My Second dataset','rgb(255, 134, 132)');

insert into chart_chart_datasets values (2,3);

insert into chart_dataset_dataset_values values (3,1440);
insert into chart_dataset_dataset_values values (3,523);
insert into chart_dataset_dataset_values values (3,223);
insert into chart_dataset_dataset_values values (3,204);
insert into chart_dataset_dataset_values values (3,303);
insert into chart_dataset_dataset_values values (3,4335);