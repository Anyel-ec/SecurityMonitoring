INSERT INTO system_parameters (name, description, param_value, is_active, created_at)
VALUES ('GRAFANA_INSTALL', 'Configuration for installing Grafana', null, true, NOW());

INSERT INTO system_parameters (name, description, param_value, is_active, created_at)
VALUES ('PROMETHEUS_INSTALL', 'Configuration for installing Prometheus', null, true, NOW());

INSERT INTO system_parameters (name, description, param_value, is_active, created_at)
VALUES ('USERS_INSTALL', 'Configuration for installing user accounts', null, true, NOW());

INSERT INTO system_parameters (name, description, param_value, is_active, created_at)
VALUES ('COMPLETE_INSTALL', 'Configuration for installing complete', '0', true, NOW());

INSERT INTO system_parameters (name, description, param_value, is_active, created_at)
VALUES ('PROMETHEUS_EXPORTER_POSTGRESQL', 'Configuration for Prometheus PostgreSQL exporter', null, true, NOW());

INSERT INTO system_parameters (name, description, param_value, is_active, created_at)
VALUES ('PROMETHEUS_EXPORTER_MONGODB', 'Configuration for Prometheus MongoDB exporter', null, true, NOW());

INSERT INTO system_parameters (name, description, param_value, is_active, created_at)
VALUES ('PROMETHEUS_EXPORTER_MARIADB', 'Configuration for Prometheus MariaDB exporter', null, true, NOW());
