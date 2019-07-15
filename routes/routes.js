var express = require('express');
var router = express.Router();
var views = require('.././routes/views');
var controllers = require('.././controllers');
/*
router.get('/', function(req, res, next)
{
    res.sendFile(views.viewFile('index.html'));
});
*/
/**
 * MÓDULOS
 */
//router.get('/login', controllers.account_controller.login);
//router.get('/logout', controllers.account_controller.logout);

//router.get('/programacion/index', controllers.programacion_controller.index);

/**
 * API REST
 */

var sub_path = "/sireis/api/v1/";

// SEGAM - Servidor Web

router.post(sub_path + 'rws_usuario_registro', controllers.usuario_controller.post_registro);
router.post(sub_path + 'rws_usuario_actualiza', controllers.usuario_controller.post_actualiza);
router.post(sub_path + 'rws_usuario_elimina', controllers.usuario_controller.post_elimina);
router.post(sub_path + 'rws_usuario_actualiza_token', controllers.usuario_controller.post_actualiza_token);
router.post(sub_path + 'rws_vehiculo_registro', controllers.vehiculo_controller.post_registro);
router.post(sub_path + 'rws_vehiculo_actualiza', controllers.vehiculo_controller.post_actualiza);
router.post(sub_path + 'rws_vehiculo_elimina', controllers.vehiculo_controller.post_elimina);

//router.post(sub_path + 'rws_programacion_registro', controllers.programacion_controller.post_registro);
//router.post(sub_path + 'rws_programacion_actualiza_operario', controllers.programacion_controller.post_actualiza_operario);
//rws_archivos_descarga
//router.post(sub_path + 'rws_observacion_lista_por_programacion', controllers.observacion_controller.post_lista_por_programacion);
//router.post(sub_path + 'rws_proceso_lista_por_programacion', controllers.proceso_controller.post_lista_por_programacion);


// Servidor Web - App Operario

router.post(sub_path + 'rws_operario_valida', controllers.usuario_controller.post_validar_operario);

router.post(sub_path + 'rws_programacion_lista_por_operario', controllers.programacion_controller.post_lista_por_operario);
router.post(sub_path + 'rws_programacion_actualiza_estado', controllers.programacion_controller.post_actualiza_estado);
router.post(sub_path + 'rws_programacion_archivos_guarda', controllers.programacion_controller.post_archivos_guarda);
router.post(sub_path + 'rws_programacion_registro', controllers.programacion_controller.post_registro);
router.post(sub_path + 'rws_programacion_registro_multiple', controllers.programacion_controller.post_registro_multiple);
router.post(sub_path + 'rws_programacion_cambio', controllers.programacion_controller.post_cambio);
router.post(sub_path + 'rws_programacion_lista_sin_operario', controllers.programacion_controller.post_lista_sin_operario);
router.post(sub_path + 'rws_programacion_actualiza_operario', controllers.programacion_controller.post_actualiza_operario);
router.post(sub_path + 'rws_programacion_elimina_historial', controllers.programacion_controller.post_elimina_historial);
router.post(sub_path + 'rws_programacion_notifica_cambio_estado', controllers.programacion_controller.post_notifica_cambio_estado); //F.
router.post(sub_path + 'rws_programacion_envia_mensaje_whatsapp', controllers.programacion_controller.post_envia_mensaje_whatsapp); //F.
router.post(sub_path + 'rws_programacion_obtiene_personal', controllers.programacion_controller.post_obtiene_personal);
router.post(sub_path + 'rws_programacion_lista_sin_descargar', controllers.programacion_controller.post_lista_sin_descargar);
router.post(sub_path + 'rws_programacion_actualiza_descargado', controllers.programacion_controller.post_actualiza_descargado);
router.post(sub_path + 'rws_programacion_obtener_por_id', controllers.programacion_controller.post_obtener_por_id);
router.get(sub_path + 'rws_programacion_descarga/:id_programacion', controllers.programacion_controller.get_descarga);

router.post(sub_path + 'rws_observacion_lista_por_programacion', controllers.observacion_controller.post_lista_por_programacion);
router.post(sub_path + 'rws_observacion_registro', controllers.observacion_controller.post_registro);
router.post(sub_path + 'rws_observacion_registro_multiple', controllers.observacion_controller.post_registro_multiple);
router.post(sub_path + 'rws_observacion_actualiza', controllers.observacion_controller.post_actualiza);
router.post(sub_path + 'rws_observacion_elimina', controllers.observacion_controller.post_elimina);

router.post(sub_path + 'rws_proceso_lista_por_programacion', controllers.proceso_controller.post_lista_por_programacion);
router.post(sub_path + 'rws_proceso_registro', controllers.proceso_controller.post_registro);
router.post(sub_path + 'rws_proceso_actualiza', controllers.proceso_controller.post_actualiza);
router.post(sub_path + 'rws_proceso_confirma', controllers.proceso_controller.post_confirma);
router.post(sub_path + 'rws_proceso_elimina', controllers.proceso_controller.post_elimina);
router.post(sub_path + 'rws_proceso_lista_pendientes', controllers.proceso_controller.post_lista_pendientes);
router.post(sub_path + 'rws_proceso_archivos_guarda', controllers.proceso_controller.post_archivos_guarda);

router.post(sub_path + 'rws_ficha_registro', controllers.ficha_controller.post_registro);
router.post(sub_path + 'rws_ficha_enviar_por_email', controllers.ficha_controller.post_enviar_por_email); //F.
router.post(sub_path + 'rws_ficha_lista_por_programacion', controllers.ficha_controller.post_lista_por_programacion);
router.get('/ficha/ver/:id_programacion', controllers.ficha_controller.get_ver);

router.post(sub_path + 'rws_proceso_archivo_registro', controllers.proceso_archivo_controller.post_registro);
router.post(sub_path + 'rws_proceso_archivo_actualiza', controllers.proceso_archivo_controller.post_actualiza);
router.post(sub_path + 'rws_proceso_archivo_elimina', controllers.proceso_archivo_controller.post_elimina);

router.post(sub_path + 'rws_vehiculo_lista', controllers.vehiculo_controller.post_lista);
router.post(sub_path + 'rws_vehiculo_movimiento_lista_por_usuario', controllers.vehiculo_movimiento_controller.post_lista_por_usuario);
router.post(sub_path + 'rws_vehiculo_movimiento_registro', controllers.vehiculo_movimiento_controller.post_registro);
router.post(sub_path + 'rws_vehiculo_movimiento_actualiza', controllers.vehiculo_movimiento_controller.post_actualiza);
router.post(sub_path + 'rws_vehiculo_movimiento_elimina', controllers.vehiculo_movimiento_controller.post_elimina);
router.post(sub_path + 'rws_vehiculo_observacion_registro', controllers.vehiculo_observacion_controller.post_registro);
router.post(sub_path + 'rws_vehiculo_observacion_actualiza', controllers.vehiculo_observacion_controller.post_actualiza);
router.post(sub_path + 'rws_vehiculo_observacion_elimina', controllers.vehiculo_observacion_controller.post_elimina);

// Servidor Web - App Web
router.post(sub_path + 'rws_programacion_lista_por_operario_fecha', controllers.programacion_controller.post_lista_por_operario_fecha);
router.post(sub_path + 'rws_usuario_lista_por_tipo', controllers.usuario_controller.post_lista_por_tipo);
router.post(sub_path + 'rws_ficha_lista_por_programacion_completa', controllers.ficha_controller.post_lista_por_programacion_completa);


// Servidor Web - App Programador
router.post(sub_path + 'rws_programador_valida', controllers.usuario_controller.post_validar_programador);
router.post(sub_path + 'rws_usuario_lista', controllers.usuario_controller.post_lista);
router.post(sub_path + 'rws_programacion_actualiza_operarios', controllers.programacion_controller.post_actualiza_operarios);
router.post(sub_path + 'rws_programacion_actualiza_encargados', controllers.programacion_controller.post_actualiza_encargados);
router.post(sub_path + 'rws_programacion_actualiza_supervisores', controllers.programacion_controller.post_actualiza_supervisores);
router.post(sub_path + 'rws_programacion_lista_por_fecha', controllers.programacion_controller.post_lista_por_fecha);

var fs = require('fs');
var path = require('path');
var myhtml = '';

router.get('/archivos', (req, res, next) => {
    
    var directory = 'public/files/';
    myhtml = '';

    getFilesFromDir(directory, [""]);
    
    res.write('<html><head><link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">');
    res.write("<style>html, body{font-family: 'Roboto', sans-serif;}.folder{font-size:13px;padding:3px;}.file{font-size:12px;padding:3px;}</style></head><body>");
    res.write('<p>LISTA DE ARCHIVOS</p>');
    //res.write('<ul>');
    res.write(myhtml);
    //res.write('</ul>');
    res.end('</body></html>');
});

router.get('/pdfs', (req, res, next) => {
    
  var directory = 'public/pdfs/';
  myhtml = '';

  getFilesFromDir(directory, [""]);
  
  res.write('<html><head><link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">');
  res.write("<style>html, body{font-family: 'Roboto', sans-serif;}.folder{font-size:13px;padding:3px;}.file{font-size:12px;padding:3px;}</style></head><body>");
  res.write('<p>LISTA DE PDFS</p>');
  //res.write('<ul>');
  res.write(myhtml);
  //res.write('</ul>');
  res.end('</body></html>');
});

function getFilesFromDir(dir, fileTypes) {
  var filesToReturn = [];
  var filename = '';
  function walkDir(currentPath) {
      var dirname = path.basename(currentPath)
      myhtml += "<li class='folder'><b>"+dirname+"</b></li>";
      myhtml += '<ul>';
    var files = fs.readdirSync(currentPath);
    for (var i in files) {
      var curFile = path.join(currentPath, files[i]);      
      if (fs.statSync(curFile).isFile()) {
        filesToReturn.push(curFile.replace(dir, ''));
        filename = curFile.replace(currentPath+'/', '');
        filename = filename.replace(dir, '');
        var link = curFile.replace(dir, '');
        link = curFile.replace('public/', '');
        myhtml += "<li class='file'><a target='_blank' href='"+link+"'>"+filename+"</a></li>";

      } else if (fs.statSync(curFile).isDirectory()) {
       walkDir(curFile);
      }
    }
    myhtml += '</ul>';
  };
  walkDir(dir);
  return filesToReturn; 
}

module.exports = router;
