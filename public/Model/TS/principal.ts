/// <reference path="../../depend/node_modules/@types/jquery/index.d.ts"/>
namespace SegundoParcial{
    export class Principal{


        public static ListarBarbijos(){
            let token = Controller.GetToken();  
            $.ajax({
                method : 'GET',
                async : true,
                url : Controller.BASEPATH + '/barbijos',
                cache : false,
                contentType : false,
                processData : false,
                headers : {'token' : token}
            }).done(function(data){
                data = JSON.parse(data);
                if(data.exito){
                    Tables.Barbijos(data.tabla, 'izquierda');
                }else{
                    if(data.status == 403){
                        PageLoader.Login();
                    }else{
                        let alert = Alerts.Danger('Ups.', 'Nos encontramos con el siguiente problema: ' + data.mensaje);
                        $('#alert_container').html(alert);
                    }
                }
            }).fail(function(jqXHR:any, textStatus:any, errorThrown:any){
                $('#spinner_izquierda').attr('style', 'display: none;');
                let alert : string = Alerts.Danger(jqXHR.status, jqXHR.statusText);
                $('#alert_container').html(alert);
            });
        }
        public static ListarUsuarios(){
            Controller.VerifySession_noReload();
            let token = Controller.GetToken();
            $.ajax({
                method : 'GET',
                async : true,
                url : Controller.BASEPATH + '/',
                cache : false,
                contentType : false,
                processData : false,
                headers : {'token' : token}
            }).done(function(data){
                data = JSON.parse(data);
                if(data.exito == true){
                    Tables.Usuarios(data.tabla);
                }else{
                    let alert = Alerts.Warning('Ups.', 'Nos encontramos con el siguiente problema: ' + data.mensaje);
                    $('#alert_container').html(alert);
                }
            }).fail(function(jqXHR:any, textStatus:any, errorThrown:any){
                let alert : string = Alerts.Danger(jqXHR.status, jqXHR.statusText);
                $('#alert_container').html(alert);
            });
        }
        public static BorrarItem(item : string){
            Controller.VerifySession_noReload();
            let obj = JSON.parse(item.split("'").join('"'));
            if(window.confirm('Esta seguro que desea borrar el articulo:\n\tID:'+obj.id+'\n\tColor:'+obj.color+'\n\tTipo:'+obj.tipo+'\n\tPrecio:'+obj.precio)){
                let token = Controller.GetToken();
                $.ajax({
                    method : 'DELETE',
                    async : true,
                    url : Controller.BASEPATH + '/',
                    headers : {'token' : token},
                    data : {'barbijo' : JSON.stringify({"id" : obj.id})}
                }).done(function(data){
                    data = JSON.parse(data);
                    if(data.exito == true){
                        Principal.ListarBarbijos();
                    }else{
                        if(data.status == 403){
                            PageLoader.Login();
                        }
                        let alert : string = Alerts.Warning('Ups.', 'Nos encontramos con el siguiente problema: ' + data.mensaje);
                        $('#alert_container').html(alert);
                    }
                }).fail(function(jqXHR:any, textStatus:any, errorThrown:any){
                    let alert : string = Alerts.Danger(jqXHR.status, jqXHR.statusText);
                    $('#alert_container').html(alert);
                });
            }
        }
        public static ModificarItem(item : string){
            Controller.VerifySession_noReload();
            let token = Controller.GetToken();
            let payload = Principal.PreparePayload(true);
            $.ajax({
                url : Controller.BASEPATH + '/',
                method : 'PUT',
                type : 'PUT',
                dataType : 'json',
                async : true,
                headers : {'token' : token},
                data : {"barbijo" : payload}
            }).done(function(data){
                if(data.exito){
                    Principal.ListarBarbijos();
                }else{
                    let alert : string = Alerts.Warning('Error.', data.mensaje);
                    $('#alert_container').html(alert);
                }
            }).fail(function(jqXHR:any, textStatus:any, errorThrown:any){
                let alert : string = Alerts.Danger(jqXHR.status, jqXHR.statusText);
                $('#alert_container').html(alert);
            });
        }
        public static AgregarItem(){
            Controller.VerifySession_noReload();
            let token = Controller.GetToken();
            let payload = Principal.PreparePayload(false);
            console.log(payload);
            $.ajax({
                url : Controller.BASEPATH + '/',
                method : 'POST',
                type : 'POST',
                dataType : 'json',
                async : true,
                headers : {'token' : token},
                data : {"barbijo" : payload}
            }).done(function(data){
                if(data.exito){
                    let alert : string = Alerts.Success('', data.mensaje);
                    $('#alert_container').html(alert);
                    Principal.ListarBarbijos();
                    Principal.LimpiarForm();
                }else{
                    let alert : string = Alerts.Warning('Error.', data.mensaje);
                    $('#alert_container').html(alert);
                }
            }).fail(function(jqXHR:any, textStatus:any, errorThrown:any){
                let alert : string = Alerts.Danger(jqXHR.status, jqXHR.statusText);
                $('#alert_container').html(alert);
            });
        }
        public static LimpiarForm(){
            $('#input_tipo').val('');
            $('#input_color').val('');
            $('#input_precio').val('');
        }
        public static PreparePayload(mod : boolean){
            let _id = mod ? $('#input_id').val() : null;
            let _color = $('#input_color').val();
            let _tipo = $('#input_tipo').val();
            let _precio = $('#input_precio').val();
            let payload = {};
            if(mod){
                payload = {
                    id : _id,
                    color : _color,
                    tipo : _tipo,
                    precio : _precio
                };
            }else{
                payload = {
                    color : _color,
                    tipo : _tipo,
                    precio : _precio
                };
            }
            return JSON.stringify(payload);
        }
        public static CancelarModificar(){
            $('#form_item').attr('style', 'display:none;');
            $('#titulo_derecha').attr('style', 'display:block;');
        }
    }
}