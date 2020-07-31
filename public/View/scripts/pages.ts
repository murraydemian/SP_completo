namespace SegundoParcial{
    export class PageLoader{
        public static Login(){
            $('#page_body').load('./public/View/pages/login.html');
            $('#page_body').attr('style', 'background-color:lightpink');
        }
        public static Registro(){
            $('#page_body').load('./public/View/pages/registro.html');
            $('#page_body').attr('style', 'background-color: rgb(153, 167, 184);');
        }
        public static Principal(){
            $('#page_body').load('./public/View/pages/principal.html');
            $('#page_body').attr('style', 'background-color: rgb(153, 167, 184);');
        }
    }
}