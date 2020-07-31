/// <reference path="../../depend/node_modules/@types/jquery/index.d.ts"/>

namespace SegundoParcial{

    
    export class Controller{
        static BASEPATH : string = './src/Controller/api.php';

        public static InitialLoad(){
            this.VerifySession();
        }
        public static VerifySession(){
            let token =  Controller.GetToken();
            $.ajax({
                method : 'GET',
                async : true,
                url : Controller.BASEPATH + '/login',
                headers : {"token":token}
            }).done(function(data){
                data = JSON.parse(data);
                if(data.status === 200){
                    PageLoader.Principal();
                }else{
                    PageLoader.Login();
                }
            }).fail(function(){
                PageLoader.Login();
                $('#alert_container').html(Alerts.Danger('Error.', 'No se pudo verificar sesion.'));
            });
        }
        public static VerifySession_noReload(){
            let token =  Controller.GetToken();
            $.ajax({
                method : 'GET',
                async : true,
                url : Controller.BASEPATH + '/login',
                headers : {"token":token}
            }).done(function(data){
                data = JSON.parse(data);
                if(data.status === 200){
                    
                }else{
                    PageLoader.Login();
                }
            }).fail(function(){
                PageLoader.Login();
                $('#alert_container').html(Alerts.Danger('Error.', 'No se pudo verificar sesion.'));
            });
        }
        public static LoginComplete(token){
            Controller.SaveToken(token);
            PageLoader.Principal();
            $('#alert_container').html(Alerts.Success('Bienvenido.',''));
        }
        public static Registro(){
            PageLoader.Registro();
        }
        public static GetToken() : string{
            return window.localStorage.getItem('token');
        }
        public static SaveToken(token){
            window.localStorage.setItem('token', token);
        }
        public static CerrarSesion(){
            window.localStorage.setItem('token', '');
            Controller.VerifySession();
        }
    }
}