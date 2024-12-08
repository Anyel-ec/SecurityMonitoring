CREATE TABLE system_parameters
(
    id          BIGINT PRIMARY KEY,
    name        VARCHAR(255) UNIQUE NOT NULL,
    description VARCHAR(255),
    param_value VARCHAR(255),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active   BOOLEAN   DEFAULT TRUE
);

CREATE TABLE database_credential
(
    id          BIGINT PRIMARY KEY,
    host        VARCHAR(255),
    port        INT,
    username    VARCHAR(255),
    password    VARCHAR(255),
    type_bd     BIGINT, -- Foreign key to system_parameters
    user_id     BIGINT, -- Foreign key to user_info
    comment     TEXT,
    param_value VARCHAR(255),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active   BOOLEAN   DEFAULT TRUE,
    FOREIGN KEY (type_bd) REFERENCES system_parameters (id),
    FOREIGN KEY (user_id) REFERENCES user_info (id)
);

CREATE TABLE installation_config
(
    id            BIGINT PRIMARY KEY,
    internal_port INT,
    external_port INT,
    username      VARCHAR(255),
    password      VARCHAR(255),
    type          BIGINT, -- Foreign key to system_parameters
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active     BOOLEAN   DEFAULT TRUE,
    FOREIGN KEY (type) REFERENCES system_parameters (id)
);

CREATE TABLE user_role
(
    id          BIGINT PRIMARY KEY,
    name        VARCHAR(255),
    description VARCHAR(255),
    hierarchy   INT,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active   BOOLEAN   DEFAULT TRUE
);

CREATE TABLE user_info
(
    id         BIGINT PRIMARY KEY,
    username   VARCHAR(255),
    email      VARCHAR(255),
    phone      VARCHAR(255),
    password   VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active  BOOLEAN   DEFAULT TRUE
);

CREATE TABLE user_info_user_role
(
    user_info_id BIGINT NOT NULL, -- Foreign key to user_info
    user_role_id BIGINT NOT NULL, -- Foreign key to user_role
    PRIMARY KEY (user_info_id, user_role_id),
    FOREIGN KEY (user_info_id) REFERENCES user_info (id),
    FOREIGN KEY (user_role_id) REFERENCES user_role (id)
);

CREATE TABLE alert_configuration
(
    id         BIGINT PRIMARY KEY,
    name       VARCHAR(255) UNIQUE NOT NULL, -- e.g., CPU, RAM, Disk, Network
    threshold DOUBLE NOT NULL,               -- Percentage or value for the threshold
    duration   VARCHAR(255)        NOT NULL, -- e.g., '5m', '1h'
    severity   VARCHAR(255)        NOT NULL, -- e.g., CRITICAL, WARNING
    type       BIGINT              NOT NULL, -- Foreign key to system_parameters
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active  BOOLEAN   DEFAULT TRUE,
    FOREIGN KEY (type) REFERENCES system_parameters (id)
);

CREATE TABLE email_configuration
(
    id          BIGINT PRIMARY KEY,
    smtp_server VARCHAR(255) NOT NULL,
    port        INT          NOT NULL,
    username    VARCHAR(255) NOT NULL,
    password    VARCHAR(255) NOT NULL,
    from_email  VARCHAR(255) NOT NULL,
    to_email    VARCHAR(255) NOT NULL,
    type        BIGINT       NOT NULL, -- Foreign key to system_parameters
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active   BOOLEAN   DEFAULT TRUE,
    FOREIGN KEY (type) REFERENCES system_parameters (id)
);
