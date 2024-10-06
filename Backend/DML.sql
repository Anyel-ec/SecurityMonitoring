INSERT INTO system_parameters (name, description, param_value, is_active, created_at)
VALUES ('GRAFANA_INSTALL', 'Configuration for installing Grafana', null, true, NOW());

INSERT INTO system_parameters (name, description, param_value, is_active, created_at)
VALUES ('PROMETHEUS_INSTALL', 'Configuration for installing Prometheus', null, true, NOW());

INSERT INTO system_parameters (name, description, param_value, is_active, created_at)
VALUES ('USERS_INSTALL', 'Configuration for installing user accounts', null, true, NOW());

INSERT INTO system_parameters (name, description, param_value, is_active, created_at)
VALUES ('COMPLETE_INSTALL', 'Configuration for installing user accounts', '0', true, NOW());
