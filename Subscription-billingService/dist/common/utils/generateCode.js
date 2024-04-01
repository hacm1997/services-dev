"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generatorCode(group) {
    const separador = "-";
    const separacion = 5;
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id_sid = "";
    for (let i = 0; i < 15; i++) {
        if (i > 0 && i % separacion === 0) {
            id_sid += separador;
        }
        const indice = Math.floor(Math.random() * caracteres.length);
        id_sid += caracteres.charAt(indice);
    }
    return group + "-" + id_sid;
}
exports.default = generatorCode;
//# sourceMappingURL=generateCode.js.map