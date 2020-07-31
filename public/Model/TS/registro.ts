
namespace SegundoParcial{
    export class Registro{

        public static Registrar(){
            if(Registro.IsComplete()){
                let payload = Registro.PreparePayload();
                $.ajax({
                    method : 'POST',
                    async : true,
                    url : Controller.BASEPATH + '/usuarios',
                    dataType : 'json',
                    cache : false,
                    contentType : false,
                    processData : false,
                    data : payload
                }).done(function(data){
                    if(data.status == 200){
                        PageLoader.Login();
                    }else{
                        let alert : string = Alerts.Warning('Ups.', 'Nos encontramos con el siguiente problema: ' + data.mensaje);
                        $('#alert_container').html(alert);
                    }
                }).fail(function(jqXHR:any, textStatus:any, errorThrown:any){
                    let alert : string = Alerts.Danger(jqXHR.status, jqXHR.statusText);
                    $('#alert_container').html(alert);
                });
            }else{
                $('#alert_container').html(Alerts.Warning('','Campos incompletos'));
            }
        }
        public static Limpiar(){
            $('#registro_clave_text').val('');
            $('#registro_correo_text').val('');
            $('#registro_nombre_text').val('');
            $('#registro_apellido_text').val('');
            $('#registro_perfil_select').val('Seleccionar perfil');
            $('#registro_foto_file').val('');
        }
        public static IsComplete() : boolean{
            if($('#registro_clave_text').val() == ''){return false;}    
            if($('#registro_correo_text').val() == ''){return false;}
            if($('#registro_nombre_text').val() == ''){return false;}
            if($('#registro_apellido_text').val() == ''){return false;}
            if($('#registro_perfil_select').val() == 'Seleccionar perfil'){return false;}
            if($('#registro_foto_file').val() == ''){return false;}
            return true;
        }
        public static PreparePayload(){
            let foto = $('#registro_foto_file').prop('files')[0];
            let userData = {
                correo : $('#registro_correo_text').val(),
                clave : $('#registro_clave_text').val() ,
                nombre : $('#registro_nombre_text').val() ,
                apellido : $('#registro_apellido_text').val() ,
                perfil : $('#registro_perfil_select').val()
            };
            let payload = new FormData();
            payload.append('usuario' , JSON.stringify(userData));
            payload.append('foto', foto);
            return payload;
        }    
    }
}