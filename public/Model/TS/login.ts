
namespace SegundoParcial{

    export class LoginPage{
        static BASEPATH : string = './src/Controller/api.php';

        public static Login(){
            let userObj = 
                {correo : $('#login_correo_text').val(),
                clave : $('#login_clave_text').val()};
            let frmData : FormData = new FormData();
            frmData.set('user', (JSON.stringify(userObj)));
            $.ajax({
                method : 'POST',
                async : true,
                url : Controller.BASEPATH + '/login',
                dataType : 'json',
                cache : false,
                contentType : false,
                processData : false,
                data : frmData
            }).done(function(data){
                if(data.exito){
                    //redirecciona
                    Controller.LoginComplete(data.jwt);
                }else{
                    let alert : string = Alerts.Danger('Error.', data.mensaje);
                    $('#alert_container').html(alert);
                }
            }).fail(function(data){
                $('#alert_container').html(Alerts.Danger('Error.', 'Hubo un error en la conexion'));
            });
            
        }
        public static Limpiar(){
            $('#login_clave_text').val('');
            $('#login_correo_text').val('');
        }
    }
}