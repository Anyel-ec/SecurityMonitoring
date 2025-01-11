package ec.edu.espe.security.monitoring.common.enums;

import lombok.Getter;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 11/01/2025
 */
@Getter
public enum DatabaseTypeEnum {
    POSTGRESQL("postgresql"),
    MARIADB("mariadb"),
    MONGODB("mongodb");

    private final String name;

    DatabaseTypeEnum(String name) {
        this.name = name;
    }

    /**
     * Converts a string to the corresponding DatabaseTypeEnum.
     * @param name The name of the database type.
     * @return The corresponding DatabaseTypeEnum value.
     */
    public static DatabaseTypeEnum fromString(String name) {
        for (DatabaseTypeEnum type : DatabaseTypeEnum.values()) {
            if (type.name.equalsIgnoreCase(name)) {
                return type;
            }
        }
        throw new IllegalArgumentException("DatabaseTypeEnum not found for value: " + name);
    }
}