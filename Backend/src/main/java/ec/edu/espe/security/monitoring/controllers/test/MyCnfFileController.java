package ec.edu.espe.security.monitoring.controllers.test;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 16/11/2024
 */

import ec.edu.espe.security.monitoring.utils.MyCnfFileGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controlador para probar la generación del archivo .my.cnf
 */
@RestController
@RequiredArgsConstructor
public class MyCnfFileController {
    private final MyCnfFileGenerator myCnfFileGenerator;
    @GetMapping("/generate-my-cnf")
    public ResponseEntity<String> generateMyCnfFile(@RequestParam(name = "path", required = false) String path) {
        try {
            String targetPath = (path != null && !path.isEmpty()) ? path : "../.container";
            myCnfFileGenerator.generateMyCnfFile();
            return ResponseEntity.ok("Archivo .my.cnf generado exitosamente en: " + targetPath);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al generar el archivo .my.cnf: " + e.getMessage());
        }
    }
}
